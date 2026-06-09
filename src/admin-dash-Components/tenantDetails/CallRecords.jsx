import { useParams } from "react-router-dom";
import TenantSidebar from "./tenantSidebar";
import { useState, useEffect, useCallback  } from "react";
import TopBar from "./TopBar";
import CallsOverview from "./calls-components/CallsOverview";
import apiFetch from "../shared/ApiFetch";

export default function CallRecords() {
    const {id} = useParams();

    const [tenant, setTenant] = useState(null);
    const [calls, setCalls] = useState(null);
    const [callSessions, setCallSessions] = useState(null);
    const [loading, setLoading] = useState(false);

    //filters 
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    {/* fetch tenants */}
    useEffect(() => {
        const fetchTenant = async () => {
    
            const res = await apiFetch(`https://api.mazia.ai/admin/tenants/${id}`);

            if (!res) return;
            
            const data = await res.json();
            setTenant(data);
        }
        fetchTenant();
    }, [id]);

    {/* fetch calls overview */}
    useEffect(() => {
        const fetchCalls = async () => {
            try {
    
            const res = await apiFetch(`https://api.mazia.ai/admin/tenants/${id}/calls/overview`);

            if (!res) return;


            const data = await res.json();

            if (!res.ok) {
                alert(data?.detail || "Failed to fetch tenant metrics");
                setCalls(null);
                return;
            }

            setCalls(data);

        } catch (err) {
            console.error(err)
            setCalls(null)
        }
    }
        fetchCalls();
    },[id]);

    {/* fetch call sessions */}
    const fetchCallSessions = useCallback(async () => {
    try {
        setLoading(true);

        const params = new URLSearchParams();
        
        if (page) params.append("page", page);
        if (pageSize) params.append("page_size", pageSize);


        const res = await apiFetch(
            `https://api.mazia.ai/admin/tenants/${id}/calls/sessions?${params.toString()}`
        );

        if (!res) return;

        if (!res.ok) {
            const data = await res.json();
            alert(data?.detail || "Failed to fetch call sessions");
            setCallSessions([]);
            return;
        }

        const data = await res.json();
        setCallSessions(Array.isArray(data) ? data : []);
    } catch (err) {
        console.error(err);
        setCallSessions([]);
    } finally {
        setLoading(false);
    }
}, [id, page, pageSize]);

    useEffect(() => {
    (async () => {
        await fetchCallSessions();
    })();
}, [fetchCallSessions]);

    return(
        <div className="flex min-h-screen bg-[#0d1117] text-white">
            <TenantSidebar tenant={tenant} />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1 flex flex-col min-h-screen ml-55">
                <TopBar tenant={tenant} activeNav={{name: "Call Records"}} />
                <CallsOverview 
                calls={calls} 
                tenant={tenant}
                callSessions={callSessions}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                setPageSize={setPageSize}
                loading={loading}
                />
            </main>
        </div>
    )
}
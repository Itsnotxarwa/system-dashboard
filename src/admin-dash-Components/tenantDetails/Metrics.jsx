import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TenantSidebar from "./tenantSidebar";
import Logo from "../../assets/image_logo.png";
import Mazia from "../../assets/mazia.png";
import KpiCards from "./metrics-components/kpiCards";
import SessionsTable from "./metrics-components/SessionsTable";
import SessionDetails from "./metrics-components/SessionDetails";
import {apiFetch} from "../shared/ApiFetch";

export default function Metrics() {
    
        const {id} = useParams();

        const [metrics, setMetrics] = useState([]);
        const [tenant, setTenant] = useState(null);
        const [sessions, setSessions] = useState(null);
        const [total, setTotal] = useState(0);
        const [selectedSession, setSelectedSession] = useState(null);
        const [loading, setLoading] = useState(false);

        //filters
        const [page, setPage] = useState(1);
        const [pageSize, setPageSize] = useState(20);

        {/* fetch tenant */}
        useEffect(() => {
        const fetchTenant = async () => {

            const res = await apiFetch(`https://api.mazia.ai/admin/tenants/${id}`);

            const data = await res.json();
            setTenant(data);
        }
        fetchTenant();
        }, [id]);

        {/* Get metrics */}
        useEffect(() => {
        const fetchMetrics = async() => {
            try{
                setLoading(true);
                const response = await apiFetch(`https://api.mazia.ai/admin/metrics/tenants/${id}`, {
                    method: "GET",

                });

                if(!response) return;
    
                if (!response.ok) {
                    const data = await response.json();
                    alert(data?.detail || "Failed to fetch tenant metrics");
                    setMetrics([]);
                    return;
                }
    
                const data = await response.json();
                setMetrics([data]);
    
            } catch (error) {
                console.error("Error fetching metrics:", error);
                setMetrics([]);
            } finally {
                setLoading(false);
            }
        }
        fetchMetrics();
        },[id]);

        {/* Get tenant sessions */}
        useEffect(() => {
            const fetchSessions = async() => {
                try{
                    setLoading(true);

                    const params = new URLSearchParams();

                    if (page) params.append("page", page);
                    if (pageSize) params.append("page_size", pageSize);

                    const response = await apiFetch(
                        `https://api.mazia.ai/admin/metrics/tenants/${id}/sessions?${params.toString()}`, {
                        method: "GET",
                    });
                    
                    if(!response) return;
    
                    if (!response.ok) {
                        const data = await response.json();
                        alert(data?.detail || "Failed to fetch sessions");
                        setSessions(null);
                        return;
                    }
    
                    const data = await response.json();
                    setSessions(data);
                    setTotal(data.total);

                } catch(err) {
                    console.error("Error fetching sessions:", err);
                    setSessions(null);
                } finally {
                    setLoading(false)
                }
            }
            fetchSessions();
        }, [id, page, pageSize]);

        {/* Set first session as selected by default */}
        useEffect(() => {
            if (sessions?.items?.length > 0) {
                setSelectedSession(sessions.items[0]);
            }
        }, [sessions]);


    return(
        <div className="flex min-h-screen bg-[#0d1117] text-white">
            <TenantSidebar tenant={tenant} />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1 flex flex-col ml-55">
                <div className="max-w-7xl mx-auto p-6">
                    {/* Header */}
                    <div>
                        <div className="flex items-center justify-start gap-2">
                            <img src={Logo} alt="Mazia" className="w-3.5" />
                            <img src={Mazia} alt="Mazia" className="w-7" />
                        </div>
                        <h1 className="text-2xl font-black tracking-tighter"
                        style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                            Metrics Overview
                        </h1> 
                        <p className="text-[16px] text-slate-500 pb-4"
                        style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                            Overview of tenant activity and performance.
                        </p>
                    </div>

                    {metrics && (
                        <KpiCards metrics={metrics} loading={loading} />
                    )}

                    <div className="flex gap-3 items-start py-6 flex-col lg:flex-row">
                        {sessions && (
                            <SessionsTable 
                            setPage={setPage}
                            page={page}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            loading={loading} 
                            sessions={sessions}
                            total={total}
                            selectedSession={selectedSession}
                            setSelectedSession={setSelectedSession} />
                        )}

                        {selectedSession && (
                            <SessionDetails 
                            loading={loading}
                            selectedSession={selectedSession}
                            onClose={() => setSelectedSession(null)} />
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
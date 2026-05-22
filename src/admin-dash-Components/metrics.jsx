import Sidebar from "./sidebar";
import Logo from "../assets/image.png";
import { useCallback, useEffect, useState } from "react";
import { handleUnauthorized } from "../utils/auth";
import KpiCards from "./metrics-components/KpiCards";

export default function Metrics() {
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(false);
    //filters
    const [tenantId, setTenantId] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    const token = localStorage.getItem("token");

    const fetchMetrics = useCallback(async() => {
        try{
            setLoading(true);

            const params = new URLSearchParams();
            if(tenantId) params.append("tenantId", tenantId);
            params.append("page", page);
            params.append("pageSize", pageSize);

            const url = `https://api.voixup.fr/admin/metrics/overview?${params.toString()}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.status === 401) {
                handleUnauthorized(401);
                return;
            }

            if (response.status === 404) {
                setMetrics([]);
                return;
            }

            if (!response.ok) {
                throw new Error(`Error fetching metrics: ${response.statusText}`);
            }

            const data = await response.json();
            setMetrics(data);
            console.log("metrics:", data);

        } catch (error) {
            console.error("Error fetching metrics:", error);
            setMetrics([]);
        } finally {
            setLoading(false);
        }
    }, [tenantId, page, pageSize, token]);

    useEffect(() => {
        fetchMetrics();
    }, [fetchMetrics]
    );

    return(
        <div className="flex min-h-screen bg-white text-black">
            <Sidebar />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1">
                <div className="max-w-7xl mx-auto p-6">
                    {/* Header */}
                    <div>
                        <img src={Logo} alt="Logo" className="w-14" />
                        <h1 className="text-2xl font-black text-slate-900 tracking-tighter"
                        style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                            Metrics 
                        </h1>
                    </div>

                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tighter">
                            Tenants
                        </h1>
                        <p className="text-[16px] text-slate-500 pb-4"
                        style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                            Overview of tenant activity and performance.
                        </p>
                    </div>

                    <KpiCards metrics={metrics} loading={loading} />
                </div>
            </main>
        </div>
    )
}
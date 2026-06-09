import Sidebar from "./sidebar";
import Logo from "../assets/image_logo.png";
import Mazia from "../assets/mazia.png";
import { useCallback, useEffect, useState } from "react";
import KpiCards from "./metrics-components/KpiCards";
import GlobalMetrics from "./metrics-components/GlobalMetrics";
import Spotlight from "./metrics-components/Spotlight";
import TenantsMetricsTable from "./metrics-components/TenantsMetricsTable";
import TenantMetricsDetails from "./metrics-components/TenantMetricsDetails";
import apiFetch from "./shared/ApiFetch";

export default function Metrics() {
    const [overview, setOverview] = useState([]);
    const [tenantsMetrics, setTenantsMetrics] = useState([]);
    const [selectedTenant, setSelectedTenant] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchOverview = useCallback(async() => {
        try{
            setLoading(true);

            const response = await apiFetch("https://api.mazia.ai/admin/metrics/overview", {
                method: "GET",
            });

            if(!response) return;

            if (!response.ok) {
                const data = await response.json();
                alert(data?.detail || "Failed to fetch overview");
                setOverview([]);
                return;
            }

            const data = await response.json();
            setOverview(data);

        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOverview();
    }, [fetchOverview]
    );

    const fetchTenantsMetrics = useCallback(async() => {
        try{
            setLoading(true);

            const response = await apiFetch(`https://api.mazia.ai/admin/metrics/tenants`, {
                method: "GET",
            });

            if (!response) return;

            if (!response.ok) {
                const data = await response.json();
                alert(data?.detail || "Failed to fetch tenants metrics");
                setTenantsMetrics([]);
                return;
            }

            const data = await response.json();
            setTenantsMetrics(data);

        } catch (error) {
            console.error("Error fetching tenants metrics:", error);
            setTenantsMetrics([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTenantsMetrics();
    }, [fetchTenantsMetrics]
    ); 

    {/* Set first tenant as selected by default */}
    useEffect(() => {
        if (tenantsMetrics?.length > 0) {
        setSelectedTenant(tenantsMetrics[0]);
        }      
    }, [tenantsMetrics]);

    if (!overview) {
        return (
            <div className="flex items-center justify-center h-64">
                <svg className="w-[3.25em] origin-center animate-[spin_2s_linear_infinite]" 
                viewBox="25 25 50 50">
                    <circle
                    className="loading-circle" 
                    r="20" cy="50" cx="50"></circle>
                </svg>
            </div>
        )
    }

    return(
        <div className="flex min-h-screen bg-[#0d1117] text-white">
            <Sidebar />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1 ml-55">
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
                    </div>

                    <p className="text-[16px] text-slate-500 pb-4"
                    style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                        Overview of tenant activity and performance.
                    </p>
                    {overview && (
                        <KpiCards overview={overview} loading={loading} />
                    )}

                    {overview && (
                        <GlobalMetrics overview={overview} loading={loading} />
                    )}

                    {overview && (
                        <Spotlight spotlight={overview?.spotlight} loading={loading} />
                    )}

                    <div className="flex gap-3 items-start py-6">
                        {tenantsMetrics && (
                            <TenantsMetricsTable 
                            tenantsMetrics={tenantsMetrics} 
                            selectedTenant={selectedTenant}
                            setSelectedTenant={setSelectedTenant}
                            loading={loading} />
                        )}

                        {selectedTenant && (
                            <TenantMetricsDetails 
                            loading={loading}
                            selectedTenant={selectedTenant} 
                            onClose={() => setSelectedTenant(null)} />
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
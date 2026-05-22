import Sidebar from "./sidebar";
import Logo from "../assets/image.png";
import { useCallback, useEffect, useState } from "react";
import { handleUnauthorized } from "../utils/auth";
import KpiCards from "./metrics-components/KpiCards";
import TenantsTable from "./metrics-components/TenantsTable";

export default function Metrics() {
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (!metrics) {
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

                    <p className="text-[16px] text-slate-500 pb-4"
                    style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                        Overview of tenant activity and performance.
                    </p>
                    {metrics && (
                        <KpiCards metrics={metrics} />
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
                        <div>
                            {/* filters */}
<div className="flex items-center justify-between gap-4 mb-6 flex-wrap">

    {/* search */}
    <input
        type="text"
        placeholder="Tenant ID"
        value={tenantId}
        onChange={(e) => {
            setTenantId(e.target.value);
            setPage(1);
        }}
        className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px]
        p-[7px_12px] bg-white w-65 text-[#0a1628]"
    />

    {/* pagination */}
    <div className="flex items-center gap-3 flex-wrap">

        {/* info */}
        <span className="text-sm text-slate-500">
            Showing {(page - 1) * pageSize + 1}
            {" "}to{" "}
            {Math.min(page * pageSize, metrics.length)}
            {" "}of {metrics.length} tenants
        </span>

        {/* prev */}
        <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="w-9 h-9 rounded-lg border border-[rgba(3,44,166,.14)]
            bg-white flex items-center justify-center
            disabled:opacity-40"
        >
            ←
        </button>

        {/* page numbers */}
        {[...Array(5)].map((_, index) => {
            const pageNumber = index + 1;

            return (
                <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`w-9 h-9 rounded-lg text-sm border
                    flex items-center justify-center
                    ${
                        page === pageNumber
                            ? "bg-[#032ca6] text-white border-[#032ca6]"
                            : "bg-white border-[rgba(3,44,166,.14)] text-[#0a1628]"
                    }`}
                >
                    {pageNumber}
                </button>
            );
        })}

        {/* next */}
        <button
            onClick={() => setPage((prev) => prev + 1)}
            className="w-9 h-9 rounded-lg border border-[rgba(3,44,166,.14)]
            bg-white flex items-center justify-center"
        >
            →
        </button>

        {/* page size */}
        <select
            value={pageSize}
            onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
            }}
            className="border border-[rgba(3,44,166,.14)] text-sm rounded-[9px]
            p-[7px_12px] bg-white text-[#0a1628]"
        >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
        </select>

    </div>
</div>
                            <TenantsTable metrics={metrics} loading={loading} />
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}
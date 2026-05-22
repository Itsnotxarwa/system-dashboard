export default function TenantsTable({metrics, loading}) {
    return(
        <div className="py-6">
            {metrics.length === 0 && !loading && (
                <div className="text-center text-gray-500 py-10">
                    No tenants found.
                </div>
            )}

            {/* Table */}
            {metrics.length > 0 && (
                <div className="overflow-y-auto scroll bg-white rounded-lg shadow-md">
                    <table className="w-full border-collapse text-sm roumded-lg">
                        <thead className="sticky top-0 bg-[#fafafa]">
                            <tr className="border-b border-[rgba(3,44,166,.07)]">
                                {["Tenant ID / Name", "Sessions", "Total Turns", "TTFT (p50)", "TPS (p50)"].map((header) => (
                                    <th key={header} className="text-left px-4 py-3 text-gray-700 font-medium">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-6"
                                    >
                                        <div className="flex items-center justify-center">
                                            <svg className="w-[3.25em] origin-center animate-[spin_2s_linear_infinite]" 
                                            viewBox="25 25 50 50">
                                                <circle
                                                className="loading-circle" 
                                                r="20" cy="50" cx="50"></circle>
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                            ) : metrics.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-slate-800">
                                        No call sessions found for this call.
                                    </td>
                                </tr>
                            ) : (
                                metrics.map((tenant) => (
                                    <tr
                                    key={tenant.tenant_id}
                                    className={`border-b border-[rgba(3,44,166,.05)] hover:bg-[rgba(3,44,166,.02)] 
                                    cursor-pointer`}>
                                        <td className="p-[13px_20px] flex gap-2 items-center">
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white 
                                            text-[11px] font-black shrink-0 bg-linear-to-br from-[#0366a6] to-[#1e40af] 
                                            shadow-[0_6px_18px_rgba(3,44,166,.22)]">
                                                {tenant?.tenant_id ? tenant.tenant_id
                                                .split(" ")
                                                .map(word => word.charAt(0).toUpperCase())
                                                .slice(0,2)
                                                .join("") 
                                                : ""}
                                            </div>
                                            {tenant.tenant_id}
                                        </td>
                                        <td className="p-[13px_20px]">
                                            {tenant.sessions.total}
                                        </td>
                                        <td className="p-[13px_20px]">
                                            {tenant.summary.ttft_p50 ? tenant.summary.ttft_p50.toFixed(2) + "s" : "N/A"}
                                        </td>
                                        <td className="p-[13px_20px]">
                                            {tenant.summary.tps_p50 ? tenant.summary.tps_p50.toFixed(2) : "N/A"}
                                        </td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
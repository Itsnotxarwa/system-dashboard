export default function TenantsList() {
    return(
        <div className="flex flex-col bg-[#161b22] border border-[#21262d] rounded-[10px] overflow-hidden">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-[#21262d]">
                        {["Tenant ID / Name", "Sessions", "Total Turns", "TTFT (p50)", "TPS (p50)", ""].map((item) => (
                            <th className="text-left p-[7px_10px] text-xs font-medium tracking-widest 
                            uppercase text-[#8b949e]">
                                {item}
                            </th>
                        ))}
                    </tr>
                    <tbody></tbody>
                </thead>
            </table>
        </div>
    )
}
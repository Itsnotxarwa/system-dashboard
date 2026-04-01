export default function CampaignTable() {
    return(
        <div className="bg-white rounded-2xl overflow-hidden mb-6 border border-[rgba(3,44,166,.09)] shadow-[0_2px_12px_rgba(3,44,166,.06)]" >
            <table className="w-full border-collapse">
                <thead className="bg-[rgba(3,44,166,.025)] border-b border-[rgba(3,44,166,.07)]">
                    <tr>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                            Campaign Name
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                            Agent
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                            Status
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                            Start Date
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                            Batch
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                            Time Slots
                        </th>
                        <th className="text-left px-5 py-3 text-[9px] font-medium tracking-widest uppercase text-slate-400">
                            Actions
                        </th>
                        <th className="px-5 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr></tr>
                </tbody>
            </table>
        </div>
    )
}
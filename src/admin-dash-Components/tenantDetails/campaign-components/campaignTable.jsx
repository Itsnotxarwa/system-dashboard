import { Edit, Pause, Play, RotateCcw, Trash } from "lucide-react";

export default function CampaignTable({filteredcampaigns, updateStatus, campaigns}) {

    return(
        <div className="bg-white rounded-2xl overflow-hidden mb-6 border border-[rgba(3,44,166,.09)] shadow-[0_2px_12px_rgba(3,44,166,.06)]" >
            {campaigns.length === 0 ? (
                <div className="py-6 text-center text-[11px] text-slate-300 rounded-xl
                border-dashed border-[rgba(3,44,166,0.12)]">
                    No campaigns yet — click 
                    <strong className="text-blue-700">+ Add Campaign</strong> 
                    to create one.
                </div>
            ) : (
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
                    {campaigns.length === 0 ? (
                        <tr>
                            <td colSpan="10" className="text-center py-6 text-sm text-slate-500">
                                No campaigns for this tenant
                            </td>
                        </tr>
                        ) : (
                        filteredcampaigns.map((c) => (
                        <tr
                        key={c.id}>
                            <td className="p-[13px_20px]">
                                <div className="text-sm font-semibold text-slate-800">
                                    {c?.name || ""}
                                </div>
                                <div className="text-[9px] text-[#9aabca] mt-0.5">
                                    {c.id}
                                </div>
                            </td>
                            <td className="p-[13px_20px] text-[#374151] text-xs">
                                {c.agent_id}
                            </td>
                            <td className="p-[13px_20px]">
                                <span className={`flex items-center gap-1 text-xs font-medium py-1 px-2.5 rounded-[20px] border
                                ${c.status === "READY" ? "bg-[rgba(5,150,105,.08)] text-[#059669] border-[rgba(5,150,105,.20)]" : ""}
                                ${c.status === "PAUSED" ? "bg-[rgba(245,158,11,.08)] text-[#d97706] border-[rgba(245,158,11,.20)]" : ""}
                                ${c.status === "COMPLETED" ? "bg-[rgba(124,58,237,.08)] text-[#7c3aed] border-[rgba(3,44,166,.20)]" : ""}
                                ${c.status === "DRAFT" ? "bg-[rgba(3,44,166,.08)] text-[#032ca6] border-[rgba(3,44,166,.20)]" : ""}
                                `}>
                                    <span className={`w-1.5 h-1.5 shrink-0 rounded-full
                                    ${c.status === "READY" ? "bg-[#22c55e]" : ""}
                                    ${c.status === "PAUSED" ? "bg-[#f59e0b]" : ""}
                                    ${c.status === "COMPLETED" ? "bg-[#a78bfa]" : ""}
                                    ${c.status === "DRAFT" ? "bg-[#6b8fef]" : ""}
                                    `}></span>
                                    {c?.status || ""}
                                </span>
                            </td>
                            <td className="p-[13px_20px] text-xs text-[#374151]">
                                {c.start_date ? new Date(c.start_date).toLocaleDateString("fr-FR", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                }) : ""}
                            </td>
                            <td className="p-[13px_20px] text-xs font-semibold text-[#0a1628]"
                            style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                                {c.batch_size}
                            </td>
                            <td className="p-[13px_20px] text-xs text-[#7a8bb5] max-w-40">
                                <div className="flex-nowrap overflow-hidden text-ellipsis">
                                    {c.time_slots?.map((slot, index) => (
                                        <div key={index}>
                                            {slot.start_time} - {slot.end_time}
                                        </div>
                                    ))}
                                </div>
                            </td>
                            <td className="p-[13px_20px]">
                                <div className="flex gap-1 flex-wrap">
                                    {c.status !== "READY" && c.status !== 'PAUSED' && (
                                        <button 
                                        onClick={() => {
                                            updateStatus(c.id, 'READY')
                                        }}
                                        className="bg-[rgba(5,150,105,.08)] text-[#059669]
                                        border border-[rgba(5,150,105,.25)] flex items-center gap-1 text-xs 
                                        font-medium py-1 px-2.5 rounded-[20px]">
                                            <Play size={12} />
                                            Start
                                        </button>
                                    )}

                                    {c.status === "READY" && (
                                        <button 
                                        onClick={() => {
                                            updateStatus(c.id, 'PAUSED')
                                        }}
                                        className="bg-[rgba(245,158,11,.08)] border border-[rgba(245,158,11,.25)]
                                        text-[#d97706] flex items-center gap-1 text-xs 
                                        font-medium py-1 px-2.5 rounded-[20px]">
                                            <Pause size={12} />
                                            Pause
                                        </button>
                                    )}

                                    {c.status === "PAUSED" && (
                                        <button 
                                        onClick={() => {
                                            updateStatus(c.id, 'READY')
                                        }}
                                        className="bg-[rgba(5,150,105,.08)] text-[#059669]
                                        border border-[rgba(5,150,105,.25)] flex items-center gap-1 text-xs
                                        font-medium py-1 px-2.5 rounded-[20px]">
                                            <Play size={12} />
                                            Resume
                                        </button>
                                    )}

                                    {c.status !== "DRAFT" && (
                                        <button 
                                        onClick={() => {
                                            updateStatus(c.id, 'DRAFT')
                                        }}
                                        className="bg-[rgba(3,44,166,.07)] text-[#032ca6]
                                        border border-[rgba(3,44,166,.18)] flex items-center gap-1 text-xs
                                        font-medium py-1 px-2.5 rounded-[20px]">
                                            <RotateCcw size={12} />
                                            Reset
                                        </button>
                                    )}
                                </div>
                            </td>
                            <td className="p-[13px_20px]">
                                <div className="flex gap-1">
                                    <button className="bg-[rgba(3,44,166,.06)] text-[#032ca6] border
                                    border-[rgba(3,44,166,.14)]">
                                        <Edit size={21} />
                                    </button>
                                    <button className="bg-[rgba(220,38,38,.06)] text-[#dc2626] border
                                    border-[rgba(220,38,38,.16)]">
                                        <Trash size={21} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
            </table>
            )}
        </div>
    )
}
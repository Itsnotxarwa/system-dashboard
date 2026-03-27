export default function AgentsList({agents}) {
    return (
    <div className="py-3 pr-6">
        {agents.length === 0
        ? (
        <div className="py-6 text-center text-[11px] text-slate-300 rounded-xl" style="border:1px dashed rgba(3,44,166,0.12)">
            No agents yet — click 
            <strong className="text-blue-700">+ Add Agent</strong> 
            to create one.
        </div>
        )
        :  
        (
        <div className="rounded-xl overflow-hidden border border-[rgba(3,44,166,0.10)]">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="rgba(3,44,166,0.04)">
                        <th className="text-left px-4 py-2.5 text-[9px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            Agent Name
                        </th>
                        <th className="text-left px-4 py-2.5 text-[9px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            Type
                        </th>
                        <th className="text-left px-4 py-2.5 text-[9px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            SIP Number
                        </th>
                        <th className="text-left px-4 py-2.5 text-[9px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            LLM
                        </th>
 
                        <th className="text-left px-4 py-2.5 text-[9px] font-medium tracking-widest 
                        uppercase text-slate-400">
                            Created
                        </th>
                        <th className="px-4 py-2.5"></th>
                    </tr>
                </thead>
                <tbody>
                        {agents.map((a) => (
                        <tr className="border-t border-[rgba(3,44,166,0.06)]">
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-2.5">
                                    <span className="text-xs font-semibold text-slate-700">
                                        ${a.name}
                                    </span>
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md capitalize" 
                                style=
                                {{ 
                                    background:
                                    a.type==='inbound' ? 'rgba(3,44,166,0.08)' 
                                    : a.type==='outbound' ? 'rgba(124,58,237,0.08)' 
                                    : 'rgba(5,150,105,0.08)',
                                    
                                    color:
                                    a.type==='inbound' ? '#032ca6'
                                    : a.type==='outbound' ? '#7c3aed'
                                    : '#059669',

                                    border:
                                    a.type==='inbound' ?  '1px solid rgba(3,44,166,0.16)'
                                    : a.type==='outbound' ? 'border:1px solid rgba(124,58,237,0.16)'
                                    : '1px solid rgba(5,150,105,0.16)',

                                }}>
                                    {a.type}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-[11px] text-slate-400">
                                {a.sip || ''}
                            </td>
                            <td className="px-4 py-3">
                                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[rgba(3,44,166,0.05)] border
                                border-[rgba(3,44,166,0.09)]">
                                    {a.llm || ""}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-[11px] text-slate-400">
                                {a.created || ""}
                            </td>

                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>)
            }
        </div>
    )
}
import { useState } from "react";
import Logo from "../../../assets/image.png";
import CallsBarChart from "./CallsBarChart";
import KpiCards from "./KpiCards";
import CallSummary from "./CallSummary";

export default function CallsOverview({tenant, calls}) {
    const [range, setRange] = useState("30");
    return(
        <div className="min-h-screen bg-linear-to-br from-white to-[rgba(3,44,166,0.09)]">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <img src={Logo} alt="Logo" className="w-12" />
                            <span className="text-[10px] text-slate-400 tracking-widest uppercase">
                                {tenant?.name}
                            </span>
                        </div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tighter"
                        style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                            Call Records & Analytics
                        </h1>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {tenant?.id}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <select 
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                        className="px-3 py-2 rounded-xl text-xs bg-white cursor-pointer border 
                        border-[rgba(3,44,166,.14)] text-[#374152]"
                        style={{fontFamily: "'DM Mono',monospace"}}>
                            <option value="7">Last 7 days</option>
                            <option value="30">Last 30 days</option>
                        </select>
                    </div>
                </div>

                {calls && 
                    <KpiCards calls={calls} />
                }

                <div className="grid grid-cols-3 gap-4 mb-5">
                {/* Chart */}
                <div className="col-span-2 bg-white rounded-2xl p-5 border border-[rgba(3,44,166,.09)]
                shadow-[0_2px_8px_rgba(3,44,166,.05)] bg-linear-to-br from-white to-[rgba(3,44,166,0.04)]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-sm font-bold text-slate-800"
                        style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                            Daily Call Volume
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                            Last {range} days
                        </div>
                        <span className="text-[10px] px-2.5 py-1 rounded-full font-medium bg-[rgba(3,44,166,.07)]
                        text-[#032ca6] border border-[rgba(3,44,166,.14)]">
                            {range === "7" ? calls?.volume.last_7_days : calls?.volume.last_30_days} calls
                        </span>
                    </div>
                    {calls && 
                        <CallsBarChart 
                        last7Days={calls.volume.last_7_days} 
                        last30Days={calls.volume.last_30_days}
                        range={range}
                        />
                    }
                </div>

                {/* Summary */}
                {calls && 
                    <CallSummary calls={calls} />
                }
                </div>
            </div>
        </div>
    )
}
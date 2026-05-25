import { useState } from "react";
import Logo from "../../../assets/image_logo.png";
import Mazia from "../../../assets/mazia.png";
import CallsBarChart from "./CallsBarChart";
import KpiCards from "./KpiCards";
import CallSummary from "./CallSummary";
import CallSession from "./CallSession";
import SessionDrawer from "./sessionDrawer";

export default function CallsOverview({tenant, calls, callSessions, onChange}) {
    const [range, setRange] = useState("30");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null)

        if (!calls) {
            return (
            <div className="flex items-center justify-center h-64">
                <svg className="w-[3.25em] origin-center animate-[spin_2s_linear_infinite]" 
                viewBox="25 25 50 50">
                    <circle
                    className="loading-circle" 
                    r="20" cy="50" cx="50"></circle>
                </svg>
            </div>
            );
        }
    
    return(
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="flex items-center justify-start gap-2">
                                <img src={Logo} alt="Mazia" className="w-3.5" />
                                <img src={Mazia} alt="Mazia" className="w-7" />
                            </div>
                            <span className="text-xs text-slate-400 tracking-widest uppercase">
                                {tenant?.name}
                            </span>
                        </div>
                        <h1 className="text-2xl font-black tracking-tighter"
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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
                {/* Chart */}
                <div className="col-span-3 bg-white rounded-2xl p-5 border border-[rgba(3,44,166,.09)]
                shadow-[0_2px_8px_rgba(3,44,166,.05)] bg-linear-to-br from-white to-[rgba(3,44,166,0.04)]">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className="text-lg font-bold text-slate-800"
                            style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                                Daily Call Volume
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                                Last {range} days
                            </div>
                        </div>
                        {calls &&
                        <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-[rgba(3,44,166,.07)]
                        text-[#032ca6] border border-[rgba(3,44,166,.14)]">
                            {range === "30" ? calls?.volume.calls_last_30_days : calls?.volume.calls_last_7_days} calls
                        </span>
}
                    </div>
                    {calls && 
                        <CallsBarChart 
                        last7Days={calls.daily_counts.last_7_days} 
                        last30Days={calls.daily_counts.last_30_days}
                        range={range}
                        /> 
                    }
                </div>

                {/* Summary */}
                {calls && 
                    <CallSummary calls={calls} />
                }
                </div>

                <div className="grid grid-cols-1 mb-5">
                    <CallSession 
                    callSessions={callSessions} 
                    setOpenDrawer={setOpenDrawer} 
                    setSelectedSession={setSelectedSession}
                    onChange={onChange} />
                </div>
            </div>
            {openDrawer && (
                <SessionDrawer 
                selectedSession={selectedSession} 
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}  />
            )}
        </div>
    )
}
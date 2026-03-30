import Logo from "../../../assets/image.png";
import KpiCards from "./KpiCards";

export default function CallsOverview({tenant, calls}) {
    return(
        <div className="min-h-screen bg-linear-to-br from-white to-[rgba(3,44,166,0.09)]">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <img src={Logo} alt="Logo" className="w-8" />
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
                        name="" 
                        id=""
                        className="px-3 py-2 rounded-xl text-xs bg-white cursor-pointer border 
                        border-[rgba(3,44,166,.14)] text-[#374152]"
                        style={{fontFamily: "'DM Mono',monospace"}}>
                            <option value="7">Last 7 days</option>
                            <option value="30" selected>Last 30 days</option>
                        </select>
                    </div>
                </div>

                <KpiCards calls={calls} />
            </div>
        </div>
    )
}
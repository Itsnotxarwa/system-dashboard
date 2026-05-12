import Logo from "../../assets/image.png";
import { ArrowDownToLine, Plus } from "lucide-react";
import KpiCards from "./kpiCards";

export default function Overview({setShowModal, tenants}) {
    return (
    <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <img src={Logo} alt="Logo" className="w-14" />
                    <h1 className="text-2xl font-black text-slate-900 tracking-tighter"
                    style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                        Tenants Overview
                    </h1>                            
                </div>
                <button className="py-2 px-4 bg-[#032ca6] text-white rounded-md font-semibold
                cursor-pointer hover:bg-[#032ca6]/90 transition-colors duration-300 text-sm"
                style={{fontFamily: "'DM Mono', monospace"}}
                onClick={() => setShowModal(true)}>
                    <Plus size={16} className="inline mr-1" />
                    Add Tenant
                </button>
            </div>

        <div className="py-2">
            <KpiCards tenants={tenants} />
        </div>
    </div>
)
}
import Logo from "../../assets/image_logo.png";
import { ArrowDownToLine, Plus } from "lucide-react";
import KpiCards from "./kpiCards";
import Mazia from "../../assets/mazia.png";

export default function Overview({setShowModal, tenants}) {
    return (
    <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex items-center justify-center gap-2">
                        <img src={Logo} alt="Mazia" className="w-3.5" />
                        <img src={Mazia} alt="Mazia" className="w-7" />
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter"
                    style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                        Tenants Overview
                    </h1>                            
                </div>
                <button className="py-2 px-4 bg-linear-to-r from-[#1c50a0] to-[#58a6ff] text-white rounded-md font-medium 
                flex items-center gap-2 cursor-pointer transition-colors duration-300 text-sm hover:opacity-90
                active:scale-95"
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
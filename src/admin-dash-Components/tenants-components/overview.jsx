import { ArrowDownToLine, Plus } from "lucide-react";
import KpiCards from "./kpiCards";

export default function Overview({setShowModal, tenants}) {
    return (
    <div className="p-4">
        <div className="flex items-center justify-between mb-4">
            <div className="flex tenant-title justify-start items-start gap-2 mt-4">
                <h1 className="text-2xl font-bold text-slate-800 mb-4"
                style={{fontFamily: "'Cabinet', sans-serif"}}>Tenants</h1>
            </div>
            <div>
                <button className="py-2 px-4 bg-[#032ca6] text-white rounded-md font-semibold
                cursor-pointer hover:bg-[#032ca6]/90 transition-colors duration-300 text-sm"
                style={{fontFamily: "'DM Mono', monospace"}}
                onClick={() => setShowModal(true)}>
                    <Plus size={16} className="inline mr-1" />
                    Add Tenant
                </button>
            </div>
        </div>
        <div className="py-2">
            <KpiCards tenants={tenants} />
        </div>
    </div>
)
}
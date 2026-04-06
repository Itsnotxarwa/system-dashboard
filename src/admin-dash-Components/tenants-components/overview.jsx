import { ArrowDownToLine, Plus } from "lucide-react";
import KpiCards from "../kpiCards";

export default function Overview({setShowModal, tenants}) {
    return (
    <div className="p-4">
        <div className="flex items-center justify-between mb-4">
            <div className="flex tenant-title justify-start items-start gap-2 mt-4">
                <h1 className=" mb-4 text-[22px] font-bold tracking-[-0.5px]">Tenants</h1>
                <p className="text-sm font-medium">/Overview</p>
            </div>
            <div>
                <button className="py-2 px-4 border border-gray-300 text-gray-400 
                cursor-pointer rounded-md mr-2">
                    <ArrowDownToLine size={16} className="inline mr-1" />
                    Export
                </button>
                <button className="py-2 px-4 bg-[#032ca6] text-white rounded-md
                cursor-pointer hover:bg-[#032ca6]/90 transition-colors duration-300"
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
import Logo from "../../../assets/image.png";
import CampaignTable from "./campaignTable";

export default function CampaignOverview({tenant, campaigns}) {
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
                            Campaigns Overview
                        </h1>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {tenant?.id}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Manage outbound call campaigns
                        </p>
                    </div>
                </div>

                <CampaignTable campaigns={campaigns} />
            </div>
        </div>
    )
}
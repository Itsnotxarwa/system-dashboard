import Logo from "../../../assets/image.png";
import CampaignTable from "./campaignTable";
import { useState } from "react";

export default function CampaignOverview({tenant, campaigns}) {

    const [filter, setFilter] = useState("ALL");
    const filteredCampaigns = filter === "ALL" ? campaigns : campaigns.filter(c => c.status === filter);

    return(
        <div className="min-h-screen bg-linear-to-br from-white to-[rgba(3,44,166,0.09)]">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
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
                    </div>
                </div>

                <div className="flex items-center gap-3 my-4">
                    <div className="flex gap-1 p-1 rounded-xl bg-[rgba(3,44,166,.05)] border
                    border-[rgba(3,44,166,.10)]">
                        {["ALL", "READY", "PAUSED", "COMPLETED", "DRAFT"].map((status) => {
                            const isActive = filter === status;
                            return (
                                <button
                                    key={status}
                                    className={`px-3 py-1.5 text-xs transition-all rounded-xl
                                        ${isActive ? "bg-[#032ca6] text-white font-medium" 
                                            : "text-slate-500 hover:bg-white"
                                        }
                                    `}
                                    onClick={() => setFilter(status)}
                                >
                                    {status}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {campaigns && (
                <p className="text-sm text-slate-400 mt-0.5">
                    Manage outbound call campaigns
                    <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-[rgba(3,44,166,.08)] text-[#032ca6]">
                        {campaigns?.length} campaigns
                    </span>
                </p>
                )}

                <CampaignTable filteredcampaigns={filteredCampaigns} campaigns={campaigns} />

            </div>
        </div>
    )
}
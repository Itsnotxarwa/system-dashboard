import { Copy, Edit } from "lucide-react";
import AllTenants from "../data/tenants";
import { useState } from "react";
import Prompt from "./prompt";

export default function ConfigViewer() {
    const TABS = ["System Prompt", "Tools", "Guardrails"];
    const [activeTab, setActiveTab] = useState(TABS[0]);

    return (
        <div className="p-4">
            <h1 className="text-[17px] font-bold tracking-[-0.03em] mb-4">Config Viewer</h1>
                <div className="bg-[rgba(3,44,166,0.04)] border border-[rgba(3,44,166,0.14)]
                py-2 px-4 rounded-[5px] flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#032ca6]">
                            {AllTenants[0].tenant}
                        </h3> 
                        <p
                        style={{
                            fontSize: 12,
                            fontFamily: "'DM Mono', monospace",
                        }}>
                            {AllTenants[0].accountId} {AllTenants[0].phoneNumber} {AllTenants[0].configVersion} {AllTenants[0].status} 
                        </p>
                    </div>
                    <div>
                        <button className="bg-[#032ca6] text-white py-2 px-4 rounded-[5px] 
                        text-sm font-medium tracking-[-0.02em]">
                            Edit Config
                        </button>
                    </div>
                </div>

            <div style={{ display: "flex", gap: 0 }}>
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "9px 18px",
                    fontSize: 12,
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: activeTab === tab ? 600 : 400,
                    background: "none",
                    border: "none",
                    borderBottom: activeTab === tab ? "2px solid #032ca6" : "2px solid transparent",
                    color: activeTab === tab ? "#032ca6" : "#9aabca",
                    cursor: "pointer",
                    marginBottom: -1,
                    transition: "all 0.15s",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

          <div style={{ flex: 1, padding: 26, overflowY: "auto" }}>

            {/* ── SYSTEM PROMPT TAB ── */}
            {activeTab === "System Prompt" && (
              <div>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14,
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0a1628", fontFamily: "'Cabinet Grotesk', sans-serif" }}>
                      System Prompt — label
                    </div>
                    <div style={{ fontSize: 10, color: "#9aabca", marginTop: 2 }}>
                      title - par author - date
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className=" flex gap-1 items-center py-1 px-3 rounded-[7px] text-[10px] border border-[rgba(3,44,166,0.12)] bg-[rgba(3,44,166,0.04)] text-[#032ca6] cursor-pointer">
                      <Copy size={12} /> Copier
                    </button>
                    <button className=" flex gap-1 items-center py-1 px-3 rounded-[7px] text-[10px] border border-[rgba(3,44,166,0.12)] text-[#7a8bb5] cursor-pointer">
                      <Edit size={12} /> Modifier
                    </button>
                  </div>
                </div>

                {/* Prompt box */}
                <div style={{
                  background: "rgba(3,44,166,0.025)",
                  border: "1px solid rgba(3,44,166,0.10)",
                  borderRadius: 12,
                  padding: "18px 20px",
                  lineHeight: 1.75,
                }}>
                  <Prompt />
                </div>

              </div>
            )}  
            </div>   
        </div>
    )         
}

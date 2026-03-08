import { useState } from "react";
import { Search } from "lucide-react";
import AllTenants from "./data/tenants"

export default function Tenants() {
    const [search, setSearch] = useState("");    
    const [filter, setFilter] = useState("All");

    const filtered = AllTenants.filter((t) => {
        const matchFilter =
        filter === "All" ||
        (filter === "Active" && t.status === "Active") ||
        (filter === "Inactive" && t.status === "Inactive");
        const q = search.toLowerCase();

        const matchSearch =
        !q ||
        t.tenant.toLowerCase().includes(q) ||
        t.accountId.toLowerCase().includes(q);
        return matchFilter && matchSearch;
    });

    return (
    <div className="p-4">
        <div className="flex tenant-title justify-start items-start gap-2 mt-4">
            <h1 className=" mb-4 text-[17px] font-bold tracking-[-0.03em]">
                All Tenants
            </h1>
            <p className="text-[11px] font-semibold bg-[rgba(3,44,166,0.08)] border border-[rgba(3,44,166,0.14)]
            text-[#032ca6] py-1 px-2 tracking-[-0.02em] rounded-[20px]">
                {AllTenants.length} tenants
            </p>
        </div>
        <div className="flex gap-2 items-center justify-start flex-wrap mb-4">
        <div className="flex items-center gap-2 pb-4 bg-[rgba(3,44,166,0.04)] border
        border-[rgba(3,44,166,0.14)] rounded-[10px] py-2 px-3.5 w-80">
            <Search size={14} color="#9aabca" />
            <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tenants by name or account ID"
            className="text"
            style={{
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: 12,
                color: "#0a1628",
                fontFamily: "'DM Mono', monospace",
                width: "100%",
            }}
            />
        </div>
        {["All", "Active", "Inactive"].map((f) => {
          const active = filter === f;
          const accentMap = {
            All: { bg: "#032ca6", txt: "white", border: "#032ca6" },
            Active: { bg: "#059669", txt: "white", border: "#059669" },
            Inactive: { bg: "#6b7280", txt: "white", border: "#6b7280" },
          };
            return (
              <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 10,
                    fontSize: 12,
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: active ? 600 : 400,
                    cursor: "pointer",
                    border: active
                      ? `1px solid ${accentMap[f].border}`
                      : "1px solid rgba(3,44,166,0.12)",
                    background: active
                      ? accentMap[f].bg
                      : "rgba(3,44,166,0.03)",
                    color: active ? accentMap[f].txt : "#7a8bb5",
                    transition: "all 0.15s",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {f !== "All" && (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: active
                          ? "rgba(255,255,255,0.7)"
                          : f === "Active"
                          ? "#22c55e"
                          : "#d1d5db",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {f}
                </button>
              );
            })}
        </div>
        <div className="py-2">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="text-left text-[11px] font-semibold text-[#7a8bb5] border-b border-[#e5e7eb]"></tr>
                    <tr className="text-left text-[11px] font-semibold text-[#7a8bb5] border-b border-[#e5e7eb]">
                        <th className="py-2">Tenant</th>
                        <th className="py-2">Account ID</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Config Version</th>
                        <th className="py-2">Created</th>
                    </tr>   
                </thead>
                <tbody>
                    {filtered.map((t) => (
                    <tr key={t.accountId} className="border-b border-[#e5e7eb]">
                        <td className="py-2">{t.tenant}</td>
                        <td className="py-2">{t.accountId}</td> 
                        <td className="py-2">
                            <span
                                style={{
                                    padding: "4px 12px",
                                    borderRadius: 20,
                                    fontSize: 11,   
                                    fontWeight: 500,
                                    color: t.status === "Active" ? "#059669" : "#6b7280",
                                    background: t.status === "Active" ? "rgba(5,150,105,0.1)" : "rgba(107,114,128,0.1)",
                                    border: t.status === "Active" ? "1px solid rgba(5,150,105,0.2)" : "1px solid rgba(107,114,128,0.2)",
                                    display: "inline-block",
                                }}
                            >
                                {t.status}
                            </span>
                        </td>
                        <td className="py-2">{t.configVersion}</td>
                        <td className="py-2">{t.created}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
)
}
import {  ChartNoAxesColumn } from "lucide-react";
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

export default function SpotlightChart({ spotlight, loading }) {
    if (!spotlight) return null;

    const data = [
        {
            name: spotlight?.best?.tenant_name,
            value: spotlight.best.e2e_p50,
        },
        {
            name: spotlight?.worst?.tenant_name,
            value: spotlight.worst.e2e_p50,
        },
    ];


    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <svg className="w-[3.25em] origin-center animate-[spin_2s_linear_infinite]" 
                viewBox="25 25 50 50">
                    <circle
                    className="loading-circle" 
                    r="20" cy="50" cx="50"></circle>
                </svg>
            </div>
        )
    }

    return (
        <div className="bg-[#161b22] rounded-2xl p-5 border border-[#21262d] mt-6">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg grid place-items-center shrink-0"
                    style={{background: "rgba(88,166,255,0.12)"}}>
                        <ChartNoAxesColumn size={20} stroke="#58a6ff" strokeWidth="4" />
                    </div>
                    <h2 className="text-[16px] font-semibold tracking-widest text-[#58a6ff] font-mono uppercase">
                    E2E Latency 
                    </h2>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium
                bg-[rgba(88,166,255,.12)] text-[#58a6ff] border border-[rgba(88,166,255,.25)]">
                    Best vs Worst tenants
                </span>
            </div>
            {/* CHART */}
                <ResponsiveContainer width="100%" height={180}>
                    <Legend  verticalAlign="top" align="left" wrapperStyle={{ marginBottom: 10 }} />
                    <BarChart data={data} barCategoryGap="80%">
                        <CartesianGrid
                        stroke="#8b949e"
                        strokeDasharray="3 3"
                        opacity={0.5}
                        />
                        <XAxis dataKey="name"  tickLine={false} tick={{ dy: 10, dx:-5, fill: "#8b949e", fontFamily: "'IBM Plex Mono', monospace" }}  />
                        <YAxis  tickLine={false} tick={{dy: 10, dx: -5,  fill: "#8b949e" }} />
                        <Tooltip
                        contentStyle={{
                            backgroundColor: "#161b22",
                            border: "1px solid #21262d",
                            borderRadius: "10px",
                            color: "#8b949e",
                            fontFamily: "monospace",
                        }}
                        labelStyle={{ fontFamily: "monospace" }}
                        itemStyle={{ fontFamily: "monospace" }}
                        />
                        <Bar dataKey="value" name="E2E p50" radius={[4, 4, 0, 0]} fill="#58a6ff">
                            {data.map((_, index) => (
                                <Cell key={index} fill={index === 0 ? "#58a6ff" : "#8b949e"} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
        </div>
    );
}
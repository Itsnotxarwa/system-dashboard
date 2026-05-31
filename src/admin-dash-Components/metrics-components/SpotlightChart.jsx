import { BarChart3 } from "lucide-react";
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

    const COLORS = ["#3fb950", "#f85149"];

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
        <div className="bg-[#161b22] rounded-2xl p-5 border border-[#21262d]
        shadow-[0_2px_8px_rgba(0,0,0,.4)] transition-all duration-300 hover:scale-[1.02]">
            {/* HEADER */}
            <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg grid place-items-center shrink-0"
                style={{background: "rgba(88,166,255,0.12)"}}>
                    <BarChart3 color="#58a6ff" stroke="1.8" />
                </div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[#e6edf3]">
                Spotlight Comparison
                </h2>
            </div>
            {/* CHART */}
            <div className="bg-[rgba(20,20,19,0.5)] rounded-xl p-4">
                <ResponsiveContainer width="100%" height={180}>
                    <CartesianGrid
                        stroke="#30363d"
                        strokeDasharray="3 3"
                        opacity={0.4}
                    />
                    <BarChart data={data} barCategoryGap="40%">
                        <XAxis dataKey="name"  tick={false} />
                        <YAxis  tick={false} />
                        <Tooltip
                        contentStyle={{
                            backgroundColor: "#161b22",
                            border: "1px solid #21262d",
                            borderRadius: "10px",
                            color: "#e6edf3",
                            fontFamily: "monospace",
                        }}
                        labelStyle={{ fontFamily: "monospace" }}
                        itemStyle={{ fontFamily: "monospace" }}
                        />
                        <Legend />
                        <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={18}>
                            {data.map((_, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
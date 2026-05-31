import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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

    if (!loading) {
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
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                dataKey="value"
                fill={({ name }) =>
                    name.includes("Best") ? "#39d3bb" : "#f85149"
                }
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
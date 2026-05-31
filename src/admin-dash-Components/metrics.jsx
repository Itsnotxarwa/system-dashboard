import Sidebar from "./sidebar";
import Logo from "../assets/image_logo.png";
import Mazia from "../assets/mazia.png";
import { useCallback, useEffect, useState } from "react";
import { handleUnauthorized } from "../utils/auth";
import KpiCards from "./metrics-components/KpiCards";
import GlobalMetrics from "./metrics-components/GlobalMetrics";
import Spotlight from "./metrics-components/Spotlight";

export default function Metrics() {
    const [overview, setOverview] = useState([]);
    const [loading, setLoading] = useState(true);


    const token = localStorage.getItem("token");

    const fetchOverview = useCallback(async() => {
        try{
            setLoading(true);

            const response = await fetch(`https://api.voixup.fr/admin/metrics/overview`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.status === 401) {
                handleUnauthorized(401);
                return;
            }

            if (response.status === 404) {
                setOverview([]);
                return;
            }

            if (!response.ok) {
                throw new Error(`Error fetching overview: ${response.statusText}`);
            }

            const data = await response.json();
            setOverview(data);
            setLoading(false);
            console.log("overview:", data);

        } catch (error) {
            console.error("Error fetching overview:", error);
            setOverview([]);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchOverview();
    }, [fetchOverview]
    );

    if (!overview) {
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

    return(
        <div className="flex min-h-screen bg-[#0d1117] text-white">
            <Sidebar />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1 ml-55">
                <div className="max-w-7xl mx-auto p-6">
                    {/* Header */}
                    <div>
                        <div className="flex items-center justify-start gap-2">
                            <img src={Logo} alt="Mazia" className="w-3.5" />
                            <img src={Mazia} alt="Mazia" className="w-7" />
                        </div>
                        <h1 className="text-2xl font-black tracking-tighter"
                        style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                            Metrics Overview
                        </h1> 
                    </div>

                    <p className="text-[16px] text-slate-500 pb-4"
                    style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                        Overview of tenant activity and performance.
                    </p>
                    {overview && (
                        <KpiCards overview={overview} loading={loading} />
                    )}

                    {overview && (
                        <GlobalMetrics overview={overview} loading={loading} />
                    )}

                    {overview && (
                        <Spotlight spotlight={overview?.spotlight} />
                    )}
                </div>
            </main>
        </div>
    )
}
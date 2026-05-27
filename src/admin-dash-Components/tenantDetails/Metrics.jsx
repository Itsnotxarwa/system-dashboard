import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TenantSidebar from "./tenantSidebar";
import { handleUnauthorized } from "../../utils/auth";
import Logo from "../../assets/image_logo.png";
import Mazia from "../../assets/mazia.png";
import KpiCards from "./metrics-components/kpiCards";
import SessionsTable from "./metrics-components/SessionsTable";

export default function Metrics() {
    
        const {id} = useParams();

        const [metrics, setMetrics] = useState([]);
        const [tenant, setTenant] = useState(null);
        const [sessions, setSessions] = useState([]);
        const [loading, setLoading] = useState(false);

        {/* fetch tenant */}
        useEffect(() => {
        const fetchTenant = async () => {
            const token = localStorage.getItem("token");

            const res = await fetch(`https://api.voixup.fr/admin/tenants/${id}`,{
                headers: {
                accept: "application/json",
                authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 401) {
                handleUnauthorized(401);
                return;
            }

            const data = await res.json();
            setTenant(data);
        }
        fetchTenant();
        }, [id]);

        {/* Get metrics */}
        useEffect(() => {
        const fetchMetrics = async() => {
            try{
                setLoading(true);
                const token = localStorage.getItem("token");
                const response = await fetch(`https://api.voixup.fr/admin/metrics/tenants/${id}`, {
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
                    setMetrics([]);
                    return;
                }
    
                if (!response.ok) {
                    throw new Error(`Error fetching metrics: ${response.statusText}`);
                }
    
                const data = await response.json();
                setMetrics([data]);
                console.log("metrics:", data);
    
            } catch (error) {
                console.error("Error fetching metrics:", error);
                setMetrics([]);
            } finally {
                setLoading(false);
            }
        }
        fetchMetrics();
        },[id]);

        {/* Get tenant sessions */}
        useEffect(() => {
            const fetchSessions = async() => {
                try{
                    setLoading(true);
                    const token = localStorage.getItem("token");
                    const response = await fetch(`https://api.voixup.fr/admin/metrics/tenants/${id}/sessions`, {
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
                        setSessions([]);
                        return;
                    }
    
                    if (!response.ok) {
                        throw new Error(`Error fetching sessions: ${response.statusText}`);
                    }
    
                    const data = await response.json();
                    setSessions([data]);
                    console.log("sessions:", data);
                } catch(err) {
                    console.error("Error fetching metrics:", err);
                    setSessions([]);
                } finally {
                    setLoading(false)
                }
            }
            fetchSessions();
        }, [id]);

    
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
    return(
        <div className="flex min-h-screen bg-[#0d1117] text-white">
            <TenantSidebar tenant={tenant} />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1 flex flex-col ml-55">
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

                    {metrics && (
                        <KpiCards metrics={metrics} loading={loading} />
                    )}

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-lg font-bold text-white"
                            style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                                Recent Sessions
                            </h1>
                            {sessions && (
                                <span className="text-xs px-2.5 py-1 rounded-full font-medium
                                bg-[rgba(88,166,255,.12)] text-[#58a6ff] border border-[rgba(88,166,255,.25)]">
                                    Total {sessions.total}
                                </span>
                            )}
                        </div>
                        {sessions && (
                            <SessionsTable loading={loading} sessions={sessions} />
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TenantSidebar from "./tenantSidebar";
import { handleUnauthorized } from "../../utils/auth";

export default function Metrics() {
        const {id} = useParams();

        const [metrics, setMetrics] = useState([]);
        const [loading, setLoading] = useState(true);
    
    
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
                setMetrics(data);
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

    
        if (!metrics) {
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
            <TenantSidebar />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1 flex flex-col ml-55"></main>
        </div>
    )
}
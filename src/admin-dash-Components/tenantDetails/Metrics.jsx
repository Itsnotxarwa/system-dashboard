import TenantSidebar from "./tenantSidebar";

export default function Metrics() {
    return(
        <div className="flex min-h-screen bg-[#0d1117] text-white">
            <TenantSidebar />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1 flex flex-col ml-55"></main>
        </div>
    )
}
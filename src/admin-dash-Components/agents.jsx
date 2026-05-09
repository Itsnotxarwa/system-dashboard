import Sidebar from "./sidebar";

export default function Agents() {
    return(
        <div className="flex min-h-screen bg-white text-black">
            <Sidebar />
            <main className="bg-linear-to-br from-white to-[rgba(3,44,166,0.09)] flex-1">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">
                        Agents Configuration
                    </h2>
                    <p className="text-sm text-slate-600">
                        Configure your agents' settings, including models, voicemail, and more.
                    </p>
                </div>
            </main>
        </div>
    )
}
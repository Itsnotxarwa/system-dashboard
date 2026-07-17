import Sidebar from "./sidebar";
import { useState } from "react";
import Sessions from "./calls-sessions-components/sessions";
import SessionDrawer from "./calls-sessions-components/SessionDrawer";
import Logo from "../assets/image_logo.png";
import Calls from "./calls-sessions-components/calls";
import Mazia from "../assets/mazia.png";

export default function CallsSessions() {
    const [selectedSession, setSelectedSession] = useState(null);
    const [openSessionDrawer, setOpenSessionDrawer] = useState(false);

    const [range, setRange] = useState("30");

    return(
        <div className="flex min-h-screen bg-[#0d1117] text-white">
            <Sidebar />
            <main className="flex-1 ml-55">
                <div className="max-w-7xl mx-auto p-6 bg-[#0d1117] ">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="flex items-center justify-start gap-2">
                                <img src={Logo} alt="Mazia" className="w-3.5" />
                                <img src={Mazia} alt="Mazia" className="w-7" />
                            </div>
                            <h1 className="text-2xl font-black tracking-tighter"
                            style={{fontFamily: "'Cabinet Grotesk',sans-serif"}}>
                                Call Records and Analytics
                            </h1>                            
                        </div>
                        <div className="flex gap-2">
                            <select 
                            value={range}
                            onChange={(e) => setRange(e.target.value)}
                            className="px-3 py-2 rounded-xl text-xs bg-white cursor-pointer border 
                            border-[rgba(3,44,166,.14)] text-[#374152]"
                            style={{fontFamily: "'DM Mono',monospace"}}>
                                <option value="7">Last 7 days</option>
                                <option value="30">Last 30 days</option>
                            </select>
                        </div>
                    </div>

                    <Calls range={range} />

                    <Sessions 
                    setSelectedSession={setSelectedSession}
                    setOpenSessionDrawer={setOpenSessionDrawer} />
                </div>
            </main>
            {openSessionDrawer && (
                <SessionDrawer 
                selectedSession={selectedSession}
                onClose={() => setOpenSessionDrawer(false)}
                open={openSessionDrawer} />
            )}
        </div>
    )
}
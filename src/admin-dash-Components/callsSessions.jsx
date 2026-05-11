import Sidebar from "./sidebar";
import { useState } from "react";
import Sessions from "./calls-sessions-components/sessions";
import SessionDrawer from "./calls-sessions-components/SessionDrawer";
export default function CallsSessions() {
    const [selectedSession, setSelectedSession] = useState(null);
    const [openSessionDrawer, setOpenSessionDrawer] = useState(false);
    return(
        <div className="flex min-h-screen bg-white text-black">
            <Sidebar />
            <main className="bg-[rgba(3,44,166,0.09)] flex-1">
                <div className="max-w-7xl mx-auto">
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
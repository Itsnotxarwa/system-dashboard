import { CircleAlert } from "lucide-react";

export default function SessionExpired() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117]"
        style={{fontFamily: "'IBM Plex Sans', 'sans-serif'"}}>
            <div class="fixed inset-0 pointer-events-nonebg-[linear-gradient(rgba(88,166,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(88,166,255,0.03)_1px,transparent_1px)] bg-size[32px_32px]">
            </div>
            <div className="animate-fade-in bg-[#161b22] rounded-2xl border border-[#21262d] 
            mx-4 p-10 flex flex-col items-center gap-4 max-w-sm w-full shadow-[0_0_0_1px_#21262d,0_24px_64px_rgba(0,0,0,0.6)]">
                <div className="relative">
                    <div class="animate-pulse-ring absolute inset-0 rounded-full bg-[rgba(248,81,73,.12)]">
                    </div>
                    <div className="w-14 h-14 rounded-full bg-[rgba(220,38,38,.08)] 
                    flex items-center justify-center">
                        <CircleAlert size={28} stroke="red" />
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <h2 className="text-lg font-semibold tracking-tight text-[#e6edf3]">Session Expired</h2>
                    <p className="text-sm text-[#8b949e] text-center leading-relaxed max-w-60">
                        Your session has expired. Please log in again to continue.
                    </p>
                </div>

                <div className="w-full h-px bg-[#21262d]"></div>
                
                <a
                    href="https://mazia-login.vercel.app/" 
                    className="w-full text-center bg-linear-to-r from-[#1c50a0] to-[#58a6ff] text-white text-sm 
                    font-semibold tracking-wide transition-all duration-150 py-2.5 px-6 
                    rounded-lg hover:opacity-90 active:scale-[.98] shadow-[0_0_20px_rgba(88,166,255,.25)]"
                >
                    Log In
                </a>
            </div>
        </div>
    );
}
export default function SessionExpired() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f9ff]">
            <div className="bg-white rounded-2xl border border-[rgba(3,44,166,.09)] 
            shadow-[0_2px_12px_rgba(3,44,166,.06)] p-10 flex flex-col items-center gap-4 max-w-sm w-full">
                <div className="w-14 h-14 rounded-full bg-[rgba(220,38,38,.08)] 
                flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" 
                    stroke="#dc2626" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                </div>
                <h2 className="text-lg font-bold text-[#0a1628]">Session Expired</h2>
                <p className="text-sm text-slate-400 text-center">
                    Your session has expired. Please log in again to continue.
                </p>
                <a
                    href="https://mazia-login.vercel.app/" 
                    className="w-full text-center bg-[#032ca6] text-white text-sm 
                    font-medium py-2.5 px-6 rounded-xl hover:bg-[#0237c9] transition-colors"
                >
                    Log In
                </a>
            </div>
        </div>
    );
}
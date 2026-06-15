import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
    const [checking, setChecking] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("https://api.mazia.ai/auth/me", {
                    method: "GET",
                    credentials: "include",
                });

                if (res.status === 401) {
                    window.location.replace("https://auth.mazia.ai/");
                    return;
                }

                setAuthorized(true);
            } catch {
                window.location.replace("https://auth.mazia.ai/");
            } finally {
                setChecking(false);
            }
        };

        checkAuth();
    }, []);

    if (checking) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0d1117]">
                <div className="w-5 h-5 border-2 border-[#58a6ff] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!authorized) return null;

    return children;
}
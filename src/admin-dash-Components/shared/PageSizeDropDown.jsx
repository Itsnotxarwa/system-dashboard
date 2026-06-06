import { useState, useEffect, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function PageSizeDropdown({ pageSize, setPageSize, setPage }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const options = [5, 10, 15, 20];

    useEffect(() => {
        const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                bg-[#0d1117] border border-[#30363d] text-[#e6edf3]
                hover:border-[#58a6ff] hover:text-[#58a6ff] transition-all duration-200
                text-xs font-mono group">
                <span className="text-[#8b949e] group-hover:text-[#58a6ff] transition-colors">rows</span>
                <span className="font-semibold">{pageSize}</span>
                <ChevronDown
                    size={11}
                    className={`text-[#8b949e] group-hover:text-[#58a6ff] transition-all duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute bottom-full mb-2 right-0 z-50
                bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden
                shadow-[0_8px_32px_rgba(0,0,0,.5)] w-28">
                    <div className="px-3 py-2 border-b border-[#21262d]">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8b949e]">
                            Rows per page
                        </span>
                    </div>
                    {options.map(opt => (
                        <button
                            key={opt}
                            onClick={() => { setPageSize(opt); setPage(1); setOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2
                            text-xs font-mono transition-colors
                            ${pageSize === opt
                                ? "bg-[rgba(88,166,255,.12)] text-[#58a6ff]"
                                : "text-[#8b949e] hover:bg-[rgba(255,255,255,.04)] hover:text-[#e6edf3]"
                            }`}>
                            <span>{opt} rows</span>
                            {pageSize === opt && <Check size={11} stroke="#58a6ff" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
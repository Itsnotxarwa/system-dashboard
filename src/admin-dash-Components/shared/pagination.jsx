import PageSizeDropdown from "./PageSizeDropDown";

export default function Pagination({ page, setPage, pageSize, setPageSize, total, label }) {
    const totalPages = Math.ceil(total / pageSize);
    const startItem = (page - 1) * pageSize + 1;
    const endItem = Math.min(page * pageSize, total);

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return(
        <div className="flex items-center justify-between mt-4 px-4 py-3
        bg-[#161b22] border-t border-[#21262d] rounded-xl">

            <p className="text-sm text-[#8b949e] font-mono">
                Showing <span className="text-white font-medium"> {" "} {startItem}-{endItem} {" "}</span> of{" "}
                <span className="text-white font-medium">{total}</span> {label}
            </p>
                
            <div className="flex items-center gap-3">
                <button 
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="w-7 h-7 grid place-items-center rounded-[5px] border border-[#30363d] text-[#8b949e] bg-transparent
                hover:bg-[#21262d] hover:text-[#e6edf3] transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                    <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                {pages.map((p) => (
                    <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-7 h-7 grid place-items-center rounded-[5px]
                        border transition-all duration-300 cursor-pointer
                        ${page === p
                            ? "bg-[#58a6ff] text-black border-[#58a6ff]"
                            : "border-[#30363d] text-[#8b949e] hover:bg-[#21262d] hover:text-[#e6edf3]"
                        }`}
                    >
                        {p}
                    </button>
                ))}
                <button 
                className="w-7 h-7 grid place-items-center rounded-[5px] border border-[#30363d] text-[#8b949e] bg-transparent
                hover:bg-[#21262d] hover:text-[#e6edf3] transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}>
                    <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
            </div>

            <PageSizeDropdown 
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            />
        </div>
    )
}
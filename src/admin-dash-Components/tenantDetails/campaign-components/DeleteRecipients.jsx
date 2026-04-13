import {  CircleAlert, Trash2 } from "lucide-react";

export default function DeleteRecipients({selectedCampaign, onCancel, onConfirm }) {
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,22,40,0.38)] backdrop-blur-sm p-5">
        <div className="bg-white border border-orange-100 rounded-2xl animate-[popIn_0.22s_cubic-bezier(0.34,1.56,0.64,1)_both]
        w-full shadow-2xl shadow-orange-100/50 overflow-hidden lg:max-w-md">
            <div className="h-1 bg-linear-to-r from-[#d97706] to-[#f59e0b]"></div>

            <div className="px-7 py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[rgba(245,158,11,.08)] border border-[rgba(245,158,11,.22)] flex 
                items-center justify-center text-2xl mx-auto mb-5 text-[#d97706]">
                    <CircleAlert />
                </div>

                <h2 className="text-lg font-bold text-[#0a1628] tracking-tight mb-2">
                    Delete all recipients?
                </h2>

                <p className="text-xs text-slate-400 leading-relaxed mb-1">
                    This will remove all contacts from <strong classNameName="text-[#d97706]">{selectedCampaign?.name}</strong> ?
                </p>

                <div className="flex gap-3">
                    <button
                    className="flex-1 py-3 rounded-xl border border-blue-100 bg-blue-50/60 
                    text-slate-500 text-sm font-semibold hover:bg-blue-100/60 
                    hover:text-slate-700 transition-all"
                    onClick={onCancel}
                    >
                        No, keep it
                    </button>
                    {selectedCampaign?.recipients?.map((r) => (
                        <div key={r.id}>
                        <button
                        onClick={() => onConfirm(r.id)}
                        className="flex-1 py-3 rounded-xl bg-[#d97706] hover:bg-orange-700 border border-[#d97706]
                        text-white text-sm font-bold shadow-md shadow-orange-200 hover:shadow-orange-300 
                        transition-all flex items-center justify-center gap-1.5"
                        >
                            <Trash2 size={16} />
                            Yes, delete
                        </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    )
}
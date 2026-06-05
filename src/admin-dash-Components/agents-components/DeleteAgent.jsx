import {  CircleAlert, Trash2, TriangleAlert } from "lucide-react";

export default function DeleteAgent({ selectedAgent, onConfirm, onCancel}) {
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,22,40,0.38)] backdrop-blur-sm p-5">
        <div className="bg-white border border-red-100 rounded-2xl animate-[popIn_0.22s_cubic-bezier(0.34,1.56,0.64,1)_both]
        w-full shadow-2xl shadow-red-100/50 overflow-hidden lg:max-w-md">
            <div className="h-1 bg-linear-to-r from-red-500 to-red-400"></div>

            <div className="px-7 py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex 
                items-center justify-center text-2xl mx-auto mb-5 text-red-500">
                    <CircleAlert />
                </div>

                <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-2">
                    Delete this Agent?
                </h2>

                <p className="text-xs text-slate-400 leading-relaxed mb-1">
                    Are you sure you want to delete this agent <strong classNameName="text-red-500">{selectedAgent?.name}</strong> ?
                </p>

                <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl p-3 mb-6 text-left">
                    <span className="text-yellow-500 mt-px shrink-0">
                        <TriangleAlert />
                    </span>
                    <p className="text-[11px] text-red-700 leading-relaxed">
                        All sessions, configs and data associated with this agent will be permanently removed.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                    className="flex-1 py-3 rounded-xl border border-blue-100 bg-blue-50/60 
                    text-slate-500 text-sm font-semibold hover:bg-blue-100/60 
                    hover:text-slate-700 transition-all"
                    onClick={onCancel}
                    >
                        No, keep it
                    </button>
                    <button
                    className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 border border-red-600 
                    text-white text-sm font-bold shadow-md shadow-red-200 hover:shadow-red-300 
                    transition-all flex items-center justify-center gap-1.5"
                    onClick={() => onConfirm(selectedAgent.id)}>
                        <Trash2 size={16} />
                        Yes, delete
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
}
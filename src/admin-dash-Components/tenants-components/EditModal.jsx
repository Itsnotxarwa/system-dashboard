import { Key, X } from "lucide-react";
import { useState } from "react";

export default function EditModal({ selectedTenant, setShowEditModal, resetPassword }) {
    const [newPassword, setNewPassword] = useState("");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)] backdrop-blur-sm p-5">
            <div className="bg-[#161b22] border border-[#30363d] rounded-3xl 
            w-full shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-hidden lg:w-96
            animate-[popIn_0.22s_cubic-bezier(0.34,1.56,0.64,1)_both]">

                {/* HEADER */}
                <div className="p-[22px_26px_18px] border-b border-[#21262d] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 flex items-center justify-center">
                            <Key className="text-[#58a6ff]" />
                        </div>
                        <div className="font-extrabold text-[16px] text-[#e6edf3] tracking-tight">
                            Réinitialiser le mot de passe
                        </div>
                    </div>

                    <button
                    className="w-7.5 h-7.5 rounded-lg border border-[#30363d]
                    bg-[rgba(255,255,255,.04)] text-[#8b949e] cursor-pointer text-[16px] flex items-center
                    justify-center hover:text-[#e6edf3] transition-colors" 
                    onClick={() => setShowEditModal(false)}>
                        <X />
                    </button>
                </div>

                {/* BODY */}
                <div className="px-6 py-6.5">

                    {/* Tenant name (readonly) */}
                    <div className="flex flex-col gap-4">
                        <label className="text-xs text-[#8b949e] tracking-[0.08em] uppercase
                        block mb-1.5">
                            Tenant
                        </label>
                        <input
                        type="text"
                        value={selectedTenant.name}
                        readOnly
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        bg-[#0d1117] border-[#30363d] text-[#8b949e] font-mono
                        focus:border-[#58a6ff] transition-colors"
                        />
                    </div>

                    {/* New password */}
                    <div className="flex flex-col gap-4 mt-6">
                        <label className="text-xs text-[#8b949e] tracking-[0.08em] uppercase
                        block mb-1.5">
                            Nouveau mot de passe
                        </label>
                        <input
                        type="text"
                        placeholder="Entrez le nouveau mot de passe"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        bg-[#0d1117] border-[#30363d] text-[#e6edf3] placeholder-[#8b949e] font-mono
                        focus:border-[#58a6ff] transition-colors"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2.5 mt-6">
                        <button
                        onClick={() => setShowEditModal(false)}
                        className="flex-1 py-2.5 text-xs rounded-lg 
                        border border-[#30363d] 
                        bg-[rgba(255,255,255,.04)] text-[#8b949e]
                        hover:bg-[rgba(255,255,255,.08)] transition-colors"
                        >
                            Annuler
                        </button>

                        <button
                        onClick={() => resetPassword(selectedTenant.id, newPassword)}
                        className="flex items-center justify-center flex-2 gap-1.5 py-2.5 text-xs font-bold 
                        text-white rounded-lg border border-[rgba(88,166,255,.25)]
                        bg-linear-to-r from-[#1c50a0] to-[#58a6ff]
                        shadow-[0_4px_14px_rgba(88,166,255,.2)] hover:opacity-90 transition cursor-pointer"
                        >
                            Réinitialiser
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
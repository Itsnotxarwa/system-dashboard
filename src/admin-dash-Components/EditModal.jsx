import { Key, X } from "lucide-react";
import { useState } from "react";

export default function EditModal({ selectedTenant, setShowEditModal, resetPassword }) {
    const [newPassword, setNewPassword] = useState("");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,22,40,0.38)] backdrop-blur-sm p-5">
            <div className="bg-white/90 border border-[rgba(3,44,166,0.15)] rounded-3xl 
            w-full shadow-[0_24px_80px_rgba(3,44,166,0.18)] overflow-hidden lg:w-96">

                {/* HEADER */}
                <div className="p-[22px_26px_18px] border-b border-[rgba(3,44,166,0.08)] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 flex items-center justify-center">
                            <Key />
                        </div>
                        <div className="font-extrabold text-[16px] text-[#0a1628] tracking-tight">
                            Réinitialiser le mot de passe
                        </div>
                    </div>

                    <button
                    className="w-7.5 h-7.5 rounded-lg border border-[rgba(3,44,166,0.12)]
                    bg-[rgba(3,44,166,0.04)] text-[#9aabca] cursor-pointer text-[16px] flex items-center
                    justify-center" 
                    onClick={() => setShowEditModal(false)}>
                        <X />
                    </button>
                </div>

                {/* BODY */}
                <div className="px-6 py-6.5">

                    {/* Tenant name (readonly) */}
                    <div className="flex flex-col gap-4">
                        <label className="text-xs text-[#7a8bb5] tracking-[0.08em] uppercase
                        block mb-1.5">
                            Tenant
                        </label>
                        <input
                        type="text"
                        value={selectedTenant.name}
                        readOnly
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6]"
                        />
                    </div>

                    {/* New password */}
                    <div>
                        <label className="text-xs text-[#7a8bb5] tracking-[0.08em] uppercase
                        block mb-1.5">
                            Nouveau mot de passe
                        </label>
                        <input
                        type="text"
                        placeholder="Entrez le nouveau mot de passe"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6]"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2.5 mt-6">
                        <button
                        onClick={() => setShowEditModal(false)}
                        className="flex-1 py-2.5 text-xs rounded-lg 
                        border border-[rgba(3,44,166,0.14)] 
                        bg-[rgba(3,44,166,0.04)] text-[#7a8bb5]
                        hover:bg-[rgba(3,44,166,0.08)] transition"
                        >
                            Annuler
                        </button>

                        <button
                        onClick={() => resetPassword(selectedTenant.id, newPassword)}
                        className="flex items-center justify-center flex-2 gap-1.5 py-2.5 text-xs font-bold 
                        text-white rounded-lg border border-[#032ca6] bg-[#032ca6]
                        shadow-md hover:bg-[#02238a] transition cursor-pointer"
                        >
                            Réinitialiser
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
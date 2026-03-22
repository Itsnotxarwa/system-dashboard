import { Key, X } from "lucide-react";
import { useState } from "react";

export default function EditModal({ selectedTenant, setShowEditModal, resetPassword }) {
    const [newPassword, setNewPassword] = useState("");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,22,40,0.38)] backdrop-blur-sm p-5">
            <div className="bg-white/90 border border-[rgba(3,44,166,0.15)] rounded-3xl w-full shadow-[0_24px_80px_rgba(3,44,166,0.18)] overflow-hidden">

                {/* HEADER */}
                <div className="p-[22px_26px_18px] border-b border-[rgba(3,44,166,0.08)] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 flex items-center justify-center">
                            <Key />
                        </div>
                        <div className="font-extrabold text-[16px] text-[#0a1628]">
                            Reset Password
                        </div>
                    </div>

                    <button onClick={() => setShowEditModal(false)}>
                        <X />
                    </button>
                </div>

                {/* BODY */}
                <div className="px-6 py-6 space-y-4">

                    {/* Tenant name (readonly) */}
                    <div>
                        <label className="text-xs text-gray-400 uppercase">Tenant</label>
                        <div className="p-2 border rounded-md bg-gray-100 text-sm">
                            {selectedTenant.name}
                        </div>
                    </div>

                    {/* New password */}
                    <div>
                        <label className="text-xs uppercase">New Password</label>
                        <input
                            type="text"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="flex-1 py-2 border rounded-md"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() => resetPassword(selectedTenant.id, newPassword)}
                            className="flex-1 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
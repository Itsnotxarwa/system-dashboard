import { Edit, X } from "lucide-react";

export default function EditModal({selectedTenant, setSelectedTenant, setShowEditModal, updateTenant}) {
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,22,40,0.38)] 
        backdrop-blur-sm p-5">
            <div className="bg-white/90 border border-[rgba(3,44,166,0.15)] rounded-3xl w-full
            shadow-[0_24px_80px_rgba(3,44,166,0.18)] overflow-hidden">
                
                {/* HEADER */}
                <div className="p-[22px_26px_18px] border-b border-[rgba(3,44,166,0.08)] flex items-center
                gap-3 justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center">
                            <Edit />
                        </div>
                        <div className="font-extrabold text-[16px] text-[#0a1628] tracking-tight">
                            Edit tenant
                        </div>
                    </div>
                    <button className="w-7.5 h-7.5 rounded-lg border border-[rgba(3,44,166,0.12)]
                    bg-[rgba(3,44,166,0.04)] text-[#9aabca] cursor-pointer text-[16px] flex items-center
                    justify-center"
                    onClick={() => setShowEditModal(false)}>
                        <X />
                    </button>
                </div>
                
                {/* FORM */}
                <div className="px-6 py-6.5">
                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider uppercase">
                            Name <span className="text-[#ef4444]">*</span>
                        </label>
                        <input
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6]"
                        value={selectedTenant.name}
                        onChange={(e) =>
                            setSelectedTenant({ ...selectedTenant, name: e.target.value })
                        }
                        />
                    </div>

                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider uppercase">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                    className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6]"
                        value={selectedTenant.email}
                        onChange={(e) =>
                            setSelectedTenant({ ...selectedTenant, email: e.target.value })
                        }
                        />
                    </div>

                    <div>
                        <label className="block mb-1.5 text-[10px] text-[#7a8bb5] tracking-wider uppercase">
                            Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                        className="w-full px-3 py-2 text-sm border rounded-md outline-none 
                        border-gray-300 placeholder-gray-400
                        focus:border-[#032ca6]"
                        value={selectedTenant.phone}
                        onChange={(e) =>
                            setSelectedTenant({ ...selectedTenant, phone: e.target.value })
                        }
                        />
                    </div>

                     <div className="flex gap-2.5 mt-6">
                    <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 py-2.5 text-xs rounded-lg 
                    border border-[rgba(3,44,166,0.14)] 
                    bg-[rgba(3,44,166,0.04)] text-[#7a8bb5]
                    hover:bg-[rgba(3,44,166,0.08)] transition"
                    >
                        Cancel
                    </button>

                    <button
                    onClick={() => updateTenant(selectedTenant.id, selectedTenant)}
                    className="flex items-center justify-center flex-2 gap-1.5 py-2.5 text-xs font-bold 
                    text-white rounded-lg border border-[#032ca6] bg-[#032ca6]
                    shadow-md hover:bg-[#02238a] transition cursor-pointer"
                    >
                        Save
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}
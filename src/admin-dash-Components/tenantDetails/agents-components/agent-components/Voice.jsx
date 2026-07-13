export default function Voice({form, isEditing, setForm}) {
    const voicemail = form?.voicemail || {
        leave_message: false,
        message: "",
    };

    return(
        <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="flex-1 p-6">
                <div className="mb-5">
                    <p className="text-[16px] text-white mb-0.5 font-bold">Voicemail</p>
                    <p className="text-sm text-[#8b949e]">Configure the voicemail settings for your agent.</p>
                </div>

                <div className="h-px w-full bg-[#30363d] mb-5" />

                {isEditing ? (
                    <div className="space-y-5">
                        <div className="flex items-center justify-between py-2.5 px-3 rounded-[10px]
                        bg-[rgba(255,255,255,.03)] border border-[#21262d] mb-5">
                            
                            <div>
                                <p className="text-sm font-medium text-white">
                                    Enable Voicemail
                                </p>
                                <p className="text-xs text-[#8b949e]">
                                    Leave a voicemail when the call isn't answered.
                                </p>
                            </div>

                            <label className="relative inline-block w-14 h-7 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={voicemail.leave_message}
                                    onChange={(e) =>
                                        setForm(prev => ({
                                            ...prev,
                                            voicemail: {
                                                ...prev.voicemail,
                                                leave_message: e.target.checked,
                                            },
                                        }))
                                    }
                                    className="peer sr-only"
                                />

                                <span
                                className="absolute inset-0 rounded-full bg-[#30363d]
                                transition-all duration-300 peer-checked:bg-[#58a6ff]"
                                    />

                                <span
                                className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-lg
                                transition-all duration-300 peer-checked:translate-x-7"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm text-white mb-2">
                                Voicemail Message
                            </label>
                            
                            <textarea
                                disabled={!voicemail.leave_message}
                                rows={8}
                                maxLength={1000}
                                placeholder="Enter the voicemail message..."
                                value={voicemail.message}
                                onChange={(e) =>
                                    setForm(prev => ({
                                        ...prev,
                                        voicemail: {
                                            ...prev.voicemail,
                                            message: e.target.value,
                                        },
                                    }))
                                }
                                className="w-full p-3 rounded-lg bg-[#0d1117] border border-[#30363d]
                                text-white text-sm resize-none disabled:opacity-50 disabled:cursor-not-allowe"
                            />
                            <div className="text-right text-xs text-[#8b949e] mt-1">
                                {voicemail.message.length} / 1000
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-5">
                        <div className="flex items-center gap-2">
                            <span
                                className={`w-2 h-2 rounded-full ${
                                    voicemail.leave_message
                                        ? "bg-[#3fb950]"
                                        : "bg-[#8b949e]"
                                }`}
                            />

                            <span className="text-sm text-white">
                                {voicemail.leave_message ? "Voicemail Enabled" : "Voicemail Disabled"}
                            </span>
                        </div>


                        {voicemail.leave_message && (
    <div>
        <p className="font-semibold text-white mb-2">
            Message
        </p>

        <div className="p-3 rounded-lg bg-[rgba(63,185,80,.06)]
        border border-[rgba(63,185,80,.15)]
        text-sm text-[#e6edf3] whitespace-pre-wrap">
            {voicemail.message || "No voicemail message"}
        </div>
    </div>
)}

                    </div>
                )}
            </div>
        </div>
    )
}
export default function Voice({agent}) {
    const voice = agent?.voicemail || "";
    return(
        <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="flex-1 p-6">
                <div className="mb-5">
                    <p className="text-[16px] text-white mb-0.5 font-bold">Voicemail</p>
                    <p className="text-sm text-[#8b949e]">Configure the voicemail settings for your agent.</p>
                </div>

                <div className="h-px w-full bg-[#30363d] mb-5" />

                <div className="mb-6">
                    {!voice || voice.length === 0 ? (
                        <div className="text-xs text-[#8b949e] italic font-mono">No voicemail configured</div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    )
}
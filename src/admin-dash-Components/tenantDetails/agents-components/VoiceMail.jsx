import { AudioLines } from "lucide-react";

export default function VoiceMail({ agentData, setAgentData }) {
    const vmEnabled = agentData?.voicemail?.leave_message || false;
    const vmMessage = agentData?.voicemail?.message || "";

    return(
        <div className="p-4 rounded-xl mb-4 bg-[rgba(255,255,255,.03)] border border-[#21262d]">
            <div className="flex items-center justify-between mb-4">
                <div className="flex justify-center gap-2 text-[#58a6ff]">
                    <AudioLines />
                    <div>
                        <p className="text-xs font-bold text-[#e6edf3]">Leave Voicemail</p>
                        <p className="text-[10px] text-[#8b949e]">Allow the agent to leave a voicemail message</p>
                    </div>
                </div>
                <div
                onClick={() => setAgentData(prev => ({
                    ...prev,
                    voicemail: { ...prev.voicemail, leave_message: !prev?.voicemail?.leave_message, message: prev?.voicemail?.message || "" }
                }))}
                className={`w-10 h-5 rounded-full cursor-pointer transition-all relative shrink-0 ${
                    vmEnabled ? "bg-[#58a6ff]" : "bg-[#30363d]"
                }`}>
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 shadow transition-all ${
                        vmEnabled ? "translate-x-5" : "translate-x-0.5"
                    }`} />
                </div>
            </div>

            {vmEnabled && (
                <div>
                    <label className="block text-[9px] text-[#8b949e] uppercase mb-1.5">
                        Voicemail Message
                    </label>
                    <textarea
                    rows="4"
                    value={vmMessage}
                    onChange={(e) => setAgentData(prev => ({
                        ...prev,
                        voicemail: { ...prev.voicemail, message: e.target.value }
                    }))}
                    placeholder="Hi, you've reached our service. Please leave a message..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs resize-none leading-relaxed
                    bg-[#0d1117] border border-[#30363d] text-[#e6edf3] placeholder-[#8b949e]
                    focus:border-[#58a6ff] outline-none transition-colors"
                    />
                </div>
            )}
        </div>
    );
}
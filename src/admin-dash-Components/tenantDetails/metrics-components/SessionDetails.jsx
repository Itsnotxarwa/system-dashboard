import { formatDistanceToNow } from "date-fns";
import { X, Cpu, Volume2, Mic } from "lucide-react";
import MetricSection from "./MetricSection";
import MetricRow from "./MetricRow";

export default function SessionDetails({selectedSession, loading, onClose}) {
    if (!selectedSession) return null;

    const fmt = (v, unit = "s", dec = 2) => {
        return v != null && v !== 0 ? `${Number(v).toFixed(dec)}${unit}` : "0";
    };

    const ttftColor = (v) => {
        if (!v) return "";
        if (v < 0.8)  return "text-[#3fb950]";
        if (v < 1.1)  return "text-[#d29922]";
        return "text-[#f85149]";
    }

    const s = selectedSession;
    const l = s.llm?.metrics || {};
    const t = s.tts?.metrics || {};
    const e = s.eou || {};
    const hasTTS = !!s.tts?.model_name;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <svg className="w-[3.25em] origin-center animate-[spin_2s_linear_infinite]" 
                viewBox="25 25 50 50">
                    <circle
                    className="loading-circle" 
                    r="20" cy="50" cx="50"></circle>
                </svg>
            </div>
        )
    }
    return(
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl flex flex-col overflow-hidden w-full lg:w-[320px] shrink-0">
            {/* Head */}
            <div className="px-4 py-3 border-b border-[#21262d]">
                <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg grid place-items-center text-sm font-bold text-white 
                    font-mono shrink-0"
                    style={{background:"linear-gradient(135deg,#1c50a0,#58a6ff)"}}>
                        {s?.room_name ? s?.room_name
                        .split(" ")
                        .map(word => word.charAt(0).toUpperCase())
                        .slice(0, 2)
                        .join("") 
                        : ""}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[#e6edf3] text-[16px] tracking-tight font-mono">
                            {s?.room_name}
                        </div>
                        <div className="text-sm text-[#8b949e] mt-0.5 font-mono">
                            Last active: {" "}
                            {s?.last_active && !isNaN(s?.last_active)
                            ? formatDistanceToNow(new Date(Number(s?.last_active) * 1000), {
                                addSuffix: true,
                            })
                            : ""}  
                        </div>
                    </div>
                    <button onClick={onClose}
                        className="w-6 h-6 rounded-md border border-[#30363d] bg-transparent text-[#8b949e]
                        hover:text-[#e6edf3] hover:bg-[#21262d] flex items-center justify-center transition-colors shrink-0">
                        <X />
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="p-4 flex flex-col gap-3">

                {/* LLM */}
                <MetricSection icon={Cpu} title="LLM" color="#58a6ff">
                    <MetricRow label="Model"        value={s.llm?.model_name || "—"} />
                    <MetricRow label="Provider"     value={s.llm?.model_provider || "—"} />
                    <MetricRow label="Turns"        value={l.turn_count} />
                    <MetricRow
                        label="Avg TTFT"
                        value={fmt(l.avg_ttft)}
                        valueClass={ttftColor(l.avg_ttft)}
                    />
                    <MetricRow
                        label="Avg TPS"
                        value={l.avg_token_per_second ? l.avg_token_per_second.toFixed(2) : "—"}
                    />
                    <MetricRow
                        label="Avg prompt tokens"
                        value={l.avg_prompt_tokens != null ? Number(l.avg_prompt_tokens).toFixed(0) : "—"}
                    />
                </MetricSection>

                {/* TTS */}
                <MetricSection icon={Volume2} title="TTS" color="#bc8cff">
                    <MetricRow label="Model"    value={s.tts?.model_name || "—"} />
                    <MetricRow label="Provider" value={s.tts?.model_provider || "—"} />
                    <MetricRow label="Turns"    value={t.turn_count ?? "—"} />
                    <MetricRow
                        label="Avg TTFB"
                        value={hasTTS && t.avg_ttfb ? fmt(t.avg_ttfb) : "—"}
                        valueClass="text-[#bc8cff]"
                    />
                </MetricSection>

                {/* EOU */}
                <MetricSection icon={Mic} title="EOU" color="#F97316">
                    <MetricRow
                        label="Utterance delay"
                        value={fmt(e.avg_end_of_utterance_delay)}
                        valueClass="text-[#F97316]"
                    />
                    <MetricRow
                        label="Transcription delay"
                        value={fmt(e.avg_transcription_delay)}
                    />
                    <MetricRow
                        label="Turn completed delay"
                        value={fmt(e.avg_on_user_turn_completed_delay)}
                    />
                </MetricSection>

                {/* Timestamp */}
                <div className="bg-[rgba(255,255,255,.03)] border border-[#21262d] rounded-lg p-3">
                    <MetricRow
                        label="Full timestamp"
                        value={
                            s.last_active
                                ? new Date(Number(s.last_active) * 1000).toLocaleDateString("fr-FR", {
                                    day: "2-digit", month: "short", year: "numeric",
                                    hour: "2-digit", minute: "2-digit",
                                })
                                : "—"
                        }
                    />
                    <MetricRow label="Unix timestamp" value={s.last_active?.toFixed(0)} />
                </div>
            </div>
        </div>
    )
}
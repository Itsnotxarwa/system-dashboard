import { Zap, Volume2, Mic } from "lucide-react";
import SectionHeader from "./SectionHeader";
import MetricCell from "./MetricCell";

export default function GlobalMetrics({ overview, loading }) {
    if (!overview) return null;

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
    const { llm_metrics, tts_metrics, eou_metrics } = overview;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
            {/* LLM */}
            <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5 transition-all duration-300 hover:scale-[1.02]">
                <SectionHeader icon={Zap} label="LLM Metrics" color="#58a6ff" />
                <div className="grid grid-cols-2 gap-2.5">
                    <MetricCell label="TTFT" p50={llm_metrics?.ttft_p50} p90={llm_metrics?.ttft_p90} color="#58a6ff" />
                    <MetricCell label="TPS" p50={llm_metrics?.tps_p50} p90={llm_metrics?.tps_p90} unit="" color="#39d3bb" />
                </div>
            </div>

            {/* TTS */}
            <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5 transition-all duration-300 hover:scale-[1.02]">
                <SectionHeader icon={Volume2} label="TTS Metrics" color="#bc8cff" />
                <div className="grid grid-cols-2 gap-2.5">
                    <MetricCell label="TTFB" p50={tts_metrics?.ttfb_p50} p90={tts_metrics?.ttfb_p90} color="#bc8cff" />
                    <div className="bg-[rgba(255,255,255,.03)] border border-[#21262d] rounded-xl p-4 flex flex-col justify-center">
                        <p className="text-sm font-semibold uppercase tracking-tighter text-[#8b949e] mb-2">E2E Latency</p>
                        <p className="text-lg font-semibold text-[#bc8cff]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                            {overview.e2e_latency?.p50}s
                        </p>
                        <p className="text-sm font-semibold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                            p90 {overview.e2e_latency?.p90}s
                        </p>
                    </div>
                </div>
            </div>

            {/* EOU */}
            <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5 transition-all duration-300 hover:scale-[1.02]">
                <SectionHeader icon={Mic} label="EOU Metrics" color="#F97316" />
                <div className="grid grid-cols-2 gap-2.5">
                    <MetricCell label="Transcription Delay"
                        p50={eou_metrics?.transcription_delay_p50}
                        p90={eou_metrics?.transcription_delay_p90}
                        color="#F97316" />
                    <MetricCell label="End of Utterance"
                        p50={eou_metrics?.end_of_utterance_delay_p50}
                        p90={eou_metrics?.end_of_utterance_delay_p90}
                        color="#d29922" />
                </div>
            </div>
        </div>
    );
}
import {Clock} from "lucide-react";

export default function TimeInput({ value, onChange }) {
    return (
        <div className="flex items-center gap-2 bg-[#0d1117] border border-[#21262d] rounded-lg px-2.5 py-1.5">
            <Clock size={13} className="text-[#8b949e]" />
            <input
                type="time"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="bg-transparent text-xs text-[#e6edf3] focus:outline-none w-17"
            />
        </div>
    );
}
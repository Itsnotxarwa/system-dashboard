import { Paperclip, Upload } from "lucide-react";

export default function UploadRecipient() {
    return(
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-[rgba(3,44,166,.08)]
        bg-[rgba(3,44,166,.015)]">
            <div>
                <span className="text-xs font-semibold text-slate-600">
                    Upload recipients to your campaign to start making calls. 
                </span>
                <span className="ml-2 text-[10px] text-slate-400">
                    Supported formats: CSV, XLSX
                </span>
            </div>
            <div className="flex gap-2">
                <select className="px-3 py-2 rounded-xl text-xs bg-white cursor-pointer border
                border-[rgba(3,44,166,.14)]">
                    <option value="">Select campaign…</option>
                </select>
                <label className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold 
                cursor-pointer transition-all bg-[rgba(3,44,166,.08)] text-[#032ca6] border
                border-[rgba(3,44,166,.20)]">
                    <Paperclip />
                    Choose File
                    <input type="file" className="hidden" />
                </label>
                <button className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#032ca6] border
                border-[#032ca6] flex items-center gap-1">
                    <Upload size={14} />
                    Upload
                </button>
            </div>
        </div>
    )
}
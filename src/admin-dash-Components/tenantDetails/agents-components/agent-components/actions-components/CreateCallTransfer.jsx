import { useState, useEffect } from "react";
import { X, Volume2, Plus, Repeat, Info, Trash2, ChevronDown } from "lucide-react";
import TimeInput from "./InputTime";
import { allCountries } from "../../../data/countries";

    const DAY_MAP = {
        mon: 1,
        tue: 2,
        wed: 3,
        thu: 4,
        fri: 5,
        sat: 6,
        sun: 7,
    };

export default function CreateCallTransfer({onClose, onCancel, handleSubmit, submitting, form, setForm}) {
    const DAYS = [
        { key: "mon", label: "M", full: "Monday" },
        { key: "tue", label: "T", full: "Tuesday" },
        { key: "wed", label: "W", full: "Wednesday" },
        { key: "thu", label: "T", full: "Thursday" },
        { key: "fri", label: "F", full: "Friday" },
        { key: "sat", label: "S", full: "Saturday" },
        { key: "sun", label: "S", full: "Sunday" },
    ];


    const [activeDays, setActiveDays] = useState([]);
    const [ranges, setRanges] = useState({});

    const toggleDay = (day) => {
        if (activeDays.includes(day)) {
            setActiveDays(activeDays.filter(d => d !== day));

            const updated = { ...ranges };
            delete updated[day];
            setRanges(updated);
        } else {
            setActiveDays([...activeDays, day]);
            setRanges({
                ...ranges,
                [day]: [{ start: "09:00", end: "17:00" }],
            });
        }
    };

    const addRange = (day) => {
        setRanges({
            ...ranges,
            [day]: [
                ...(ranges[day] || []),
                { start: "09:00", end: "17:00" },
            ],
        });
    };

    const removeRange = (day, index) => {
        setRanges({
            ...ranges,
            [day]: ranges[day].filter((_, i) => i !== index),
        });
    };

    const updateRange = (day, index, field, value) => {
        const updated = [...ranges[day]];
        updated[index][field] = value;

        setRanges({
            ...ranges,
            [day]: updated,
        });
    };

    useEffect(() => {
    const schedule = activeDays.map(day => ({
        day_of_week: DAY_MAP[day],
        time_slots: (ranges[day] || []).map((r, index) => ({
            slot_index: index + 1,
            start_time: `${r.start}:00`,
            end_time: `${r.end}:00`,
        })),
    }));

    setForm(prev => ({
        ...prev,
        schedule_days: schedule,
    }));
    }, [activeDays, ranges, setForm]);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [description, setDescription] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(allCountries[0]);
    const [openDropdown, setOpenDropdown] = useState(null);

    const addNumber = () => {
        if (!phoneNumber.trim()) return;
        
        setForm(prev => ({
            ...prev,
            
            numbers: [
                ...prev.numbers,
                {
                    country_code: `+${selectedCountry.code}`,
                    phone_number: phoneNumber,
                    description,
                    message: "",
                    source: "manual",
                    display_order: prev.numbers.length,
                },
            ],
        }));

        setPhoneNumber("");
        setDescription("");
        setSelectedCountry(allCountries[0]);
    };

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className={`flex-col fixed top-0 right-0 h-full z-50 bg-[#161b22] border-l scroll overflow-y-auto w-120 shrink-0 border-[#21262d]
                shadow-[-4px_0_24px_rgba(0,0,0,.4)] ${open ? "translate-x-0" : "translate-x-full"}`}>
                {/* HEADER */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-[#8b949e] shrink-0">
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-[#e6edf3] text-base tracking-tight">
                            Add an Action
                        </div>
                        <div className="text-xs text-[#8b949e] mt-0.5">
                            During the Call 
                        </div>
                    </div>
                    <button onClick={onClose}
                    className="w-7 h-7 rounded-lg border border-[#30363d]
                    bg-[rgba(255,255,255,.04)] text-[#8b949e] cursor-pointer flex items-center
                    justify-center hover:text-[#e6edf3] transition-colors">
                        <X size={18}/>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-5">

                    <div className="flex items-start gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[#39d3bb] flex items-center justify-center shrink-0">
                            <Repeat size={18} className="text-white" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-white">Call Transfer</div>
                            <div className="text-xs text-[#8b949e] mt-0.5 leading-relaxed">
                            Transfers the call to another number from a list of chosen numbers.
                            </div>
                        </div>
                    </div>

                {/*Form */}
                <div className="px-4 py-4.5">
                    <div className="flex flex-col gap-4">

                        {/* Name */}
                        <div className="mb-4">
                            <label className="block mb-1.5 text-[10px] text-[#8b949e] tracking-wider uppercase">
                                Action Name <span className="text-[#f85149]">*</span>
                            </label>

                            <input
                                value={form.name}
                                onChange={(e) =>
                                    setForm(prev => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                                placeholder="Transfer"
                                className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                bg-[#0d1117] border-[#30363d] text-[#e6edf3]
                                placeholder-[#8b949e] focus:border-[#58a6ff]
                                transition-colors font-mono"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-1.5 text-[10px] text-[#8b949e] tracking-wider uppercase">
                                Description
                            </label>

                            <textarea
                                rows={3}
                                value={form.description}
                                onChange={(e) =>
                                    setForm(prev => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="Describe when this transfer action should be used."
                                className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                bg-[#0d1117] border-[#30363d] text-[#e6edf3]
                                placeholder-[#8b949e] resize-none
                                focus:border-[#58a6ff] transition-colors font-mono"
                            />
                        </div>

                        <div className="h-px bg-[#8b949e] my-6" />

                        {/*before_execution */}
                        <div>
                            <div className="text-sm font-semibold text-white mb-1">
                                Message before execution
                            </div>
                            <p className="text-xs text-[#8b949e] mb-3 leading-relaxed">
                                Configure the message spoken by the agent before executing the action.
                            </p>

                            <div className="flex items-center justify-between bg-[#161b22] border border-[#21262d] rounded-xl px-4 py-3 mb-3">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xs text-[#e6edf3]">
                                        Should the agent say something before execution?
                                    </span>
                                </div>
                                {/*Toggle */}
                            <div
                            onClick={() => setForm(prev => ({
                                ...prev,
                                say_before_execution: !prev.say_before_execution,
                            }))}
                            className={`w-10 h-5 rounded-full cursor-pointer transition-all relative shrink-0 ${
                                form.say_before_execution ? "bg-[#58a6ff]" : "bg-[#30363d]"
                            }`}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full bg-white absolute top-0.5 shadow transition-all ${
                                        form.say_before_execution
                                            ? "translate-x-5"
                                            : "translate-x-0.5"
                                    }`}
                                />
                            </div>
                            </div>

                            {form.say_before_execution && (
                            <div>
                                <div className="flex items-center gap-1 mb-1.5">
                                    <label className="text-xs text-[#8b949e]">Example message to say before execution</label>
                                    <Info size={11} className="text-[#484f58]" />
                                </div>

                                <textarea
                                    value={form.before_execution_message}
                                    onChange={(e) =>
                                        setForm(prev => ({
                                            ...prev,
                                            before_execution_message: e.target.value,
                                        }))
                                    }
                                    rows={2}
                                    placeholder="I'll transfer you to an agent. Please hold for a moment."
                                    className="w-full px-3 py-2 text-sm border rounded-md outline-none
                                    bg-[#0d1117] border-[#30363d] text-[#e6edf3]
                                    placeholder-[#8b949e] resize-none
                                    focus:border-[#58a6ff] transition-colors font-mono"
                                />
                            </div>
                            )}
                        </div>

                        <div className="h-px bg-[#8b949e] my-6" />

                        {/* Restrict Schedule */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-semibold text-white">Restrict the transfer to time slots</span>
                                <input
                                type="checkbox"
                                checked={form.restrict_to_schedule}
                                onChange={(e)=>
                                    setForm(prev=>({
                                        ...prev,
                                        restrict_to_schedule:e.target.checked
                                    }))
                                }
                                />
                            </div>

                            {form.restrict_to_schedule && (
                                <>
                                    <div className="mb-4">
                                        <div className="text-xs text-[#8b949e] mb-2">
                                            Available Days
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {DAYS.map((d) => (
                                                <button
                                                    type="button"
                                                    key={d.key}
                                                    onClick={() => toggleDay(d.key)}
                                                    className={`w-9 h-9 rounded-full text-xs font-semibold transition-colors ${
                                                        activeDays.includes(d.key)
                                                            ? "bg-[#58a6ff] text-white"
                                                            : "bg-[#161b22] border border-[#21262d] text-[#8b949e] hover:bg-[#1c2128]"
                                                    }`}
                                                >
                                                    {d.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {DAYS.filter((d) => activeDays.includes(d.key)).map((d) => (
                                        <div key={d.key} className="mb-4">

                                            <div className="text-sm text-[#e6edf3] mb-2">
                                                {d.full}
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                {(ranges[d.key] || []).map((rg, idx) => (
                                                    <div key={idx} className="flex items-end gap-2">

                                                        <div className="flex-1">
                                                            <div className="text-[10px] text-[#8b949e] mb-1">
                                                                Start Time
                                                            </div>

                                                            <TimeInput
                                                                value={rg.start}
                                                                onChange={(v) =>
                                                                    updateRange(d.key, idx, "start", v)
                                                                }
                                                            />
                                                        </div>

                                                        <div className="flex-1">
                                                            <div className="text-[10px] text-[#8b949e] mb-1">
                                                                End Time
                                                            </div>

                                                            <TimeInput
                                                                value={rg.end}
                                                                onChange={(v) =>
                                                                    updateRange(d.key, idx, "end", v)
                                                                }
                                                            />
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() => removeRange(d.key, idx)}
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-[#f85149]"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => addRange(d.key)}
                                                className="flex items-center gap-1.5 text-xs text-[#58a6ff] hover:text-[#79b8ff] mt-2"
                                            >
                                                <Plus size={12} />
                                                Add Time Range
                                            </button>
                                        </div>
                                    ))}
                                </>
                                )}
                        </div>

                        <div className="h-px bg-[#8b949e] my-6" />

                        {/* Ring duration */}
                        <div>
                            <label className="text-xs font-semibold text-white mb-1.5 block leading-relaxed">
                                Maximum ring duration (in seconds) before interrupting the transfer and resuming the call
                            </label>

                            <input
                                type="number"
                                min={1}
                                value={form.max_ring_duration_seconds}
                                onChange={(e)=>
                                    setForm(prev=>({
                                        ...prev,
                                        max_ring_duration_seconds:Number(e.target.value)
                                    }))
                                }
                                className="w-full px-3 py-2 rounded-md border
                                bg-[#0d1117] border-[#30363d] text-[#e6edf3]
                                focus:border-[#58a6ff] outline-none"
                            />
                        </div>
                        
                        <div className="h-px bg-[#8b949e] my-6" />

                        {/* Add Phone Number */}
                        <div>
                            <div className="text-sm font-semibold text-white mb-3">
                                Add a transfer number manually 
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                                    <div
                                        className="text-sm outline-none rounded-lg h-full text-[#e6edf3] cursor-pointer flex 
                                        items-center justify-between"
                                        onClick={() => setOpenDropdown(!openDropdown)}
                                        >
                                            <span>{selectedCountry ? `+${selectedCountry.code}` : " +33"}</span>
                                            <ChevronDown size={14} />
                                    </div>
                                </div>

                                <input
                                    type="tel"
                                    placeholder="189317006"
                                    value={phoneNumber}
                                    onChange={(e)=> {
                                        let value = e.target.value.replace(/\D/g, "");
                                        if (value.startsWith("0")) value = value.slice(1);
                                        setPhoneNumber(value)
                                    }}
                                    className="w-full px-3 py-2 rounded-md bg-[#0d1117] border border-[#30363d]"
                                    />
                            </div>

                            {/* Dropdown menu */}
                            {openDropdown  && (
                                <ul className="absolute z-50 mt-1 w-full max-h-60 overflow-auto bg-[#161b22] border border-[#30363d] rounded-md shadow-lg">
                                    {allCountries.map((c) => (
                                        <li
                                        key={c.code}
                                        className="px-3 py-2 text-sm text-[#e6edf3] hover:bg-[#21262d] cursor-pointer"
                                        onClick={() => {
                                            setSelectedCountry(c);
                                            setOpenDropdown(null);
                                            }}
                                        >
                                            <span>{c.country} (+{c.code})</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <input
                            placeholder="Description"
                            value={description}
                            onChange={(e)=> setDescription(e.target.value)}
                            className="w-full px-3 py-2 rounded-md bg-[#0d1117] border border-[#30363d]"
                            />

                            <button
                            type="button"
                            onClick={addNumber}
                            className="cursor-pointer flex items-center gap-1.5 text-[13px] px-6 py-2.5 rounded-lg 
                            text-[#58a6ff] hover:bg-[rgba(88,166,255,.08)] border border-[rgba(88,166,255,.25)]
                            transition-colors font-mono"
                            >
                                <Plus size={12} />
                                Add Number
                            </button>


                            <div className="flex flex-col gap-2 mb-6">
                                {form.numbers.map((number, index) => (
                                    <div
                                    key={index}
                                    className="flex items-center justify-between bg-[#161b22] border border-[#21262d] rounded-xl px-4 py-3"
                                    >
                                    <div className="flex items-center gap-3 flex-1">
                                        <div>
                                            <div className="text-xs text-[#e6edf3] flex items-center gap-1">
                                            <span>{number.country_code}</span>
                                            <span>{number.phone_number}</span>
                                            </div>

                                            {number.description && (
                                            <div className="text-[11px] text-[#8b949e] mt-0.5">
                                                {number.description}
                                            </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <button
                                        type="button"
                                        onClick={() => {
                                        setForm(prev=>({
                                            ...prev,
                                            numbers: prev.numbers.filter((_,i)=>i!==index)
                                        }));
                                        }}
                                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-500/10 text-[#f85149]"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end px-4 py-4 border-t
                border-[#21262d] shrink-0">
                    <div className="flex gap-2.5">
                        <button onClick={onCancel}
                        className="cursor-pointer px-5 py-2.5 rounded-xl text-sm font-medium text-[#8b949e]
                        hover:text-[#e6edf3] transition-colors border border-[#30363d]
                        bg-[rgba(255,255,255,.04)]">
                            Cancel
                        </button>
                        <button 
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="cursor-pointer px-6 py-2.5 rounded-xl text-sm font-bold text-white
                        transition-all flex items-center gap-1.5
                        bg-linear-to-r from-[#1c50a0] to-[#58a6ff] border border-[rgba(88,166,255,.25)]
                        shadow-[0_4px_14px_rgba(88,166,255,.2)] hover:opacity-90">
                            {submitting ? "Creating..." : "Create Action"}
                        </button>
                    </div>
                </div>

                </div>
            </div>
        </div>
    )
}
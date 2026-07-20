import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import TimeInput from "../InputTime";

    const DAY_MAP = {
            mon: 1,
            tue: 2,
            wed: 3,
            thu: 4,
            fri: 5,
            sat: 6,
            sun: 7,
    };

export default function RestrictSchedule({form, setForm}) {
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
        if((ranges[day] || []).length >= 2) {
            alert("Maximum 2 time slots allowed");
            return;
        }
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
    return(
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
                                disabled={(ranges[d.key] || []).length >= 2}
                                className={`flex items-center gap-1.5 text-xs mt-2 ${
                                    (ranges[d.key] || []).length >= 2
                                        ? "text-[#484f58] cursor-not-allowed"
                                        : "text-[#58a6ff] hover:text-[#79b8ff]"
                                }`}
                            >
                                <Plus size={12} />
                                Add Time Range
                            </button>
                        </div>
                    ))}
                </>
                )}
        </div>
    )
}
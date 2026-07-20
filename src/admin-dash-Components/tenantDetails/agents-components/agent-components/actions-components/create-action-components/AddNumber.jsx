import { allCountries } from "../../../../data/countries";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function AddNumber({form, setForm}) {
    const [newNumber, setNewNumber] = useState({
        country_code: "+33",
        phone_number: "",
        description: "",
    });
    const [selectedCountry, setSelectedCountry] = useState(allCountries[0]);
    const [openDropdown, setOpenDropdown] = useState(false);

    const addNumber = () => {
        if (!newNumber.phone_number.trim()) return;
        
        setForm(prev => ({
            ...prev,
            
            numbers: [
                ...prev.numbers,
                {
                    ...newNumber,
                    message: "",
                    source: "manual",
                    display_order: prev.numbers.length,
                },
            ],
        }));

        setNewNumber({
            country_code: "+33",
            phone_number: "",
            description: "",
        });

        setSelectedCountry(allCountries[0]);
        setOpenDropdown(false);
    };
    return(
        <div>
            <div className="text-sm font-semibold text-white mb-3">
                Add a transfer number manually 
            </div>
        
            <div className="relative">
                <div className="relative mb-2">
                    <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                        <div
                            className="text-sm outline-none rounded-lg h-full text-[#e6edf3] cursor-pointer flex 
                            items-center justify-between"
                            onClick={() => setOpenDropdown(prev => !prev)}
                            >
                                <span>{selectedCountry ? `+${selectedCountry.code}` : " +33"}</span>
                                <ChevronDown size={14} />
                        </div>
                    </div>
        
                    <input
                        type="tel"
                        placeholder="189317006"
                        value={newNumber.phone_number}
                        onChange={(e)=> {
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.startsWith("0")) {
                                value = value.slice(1);
                            }
                            setNewNumber(prev => ({
                                ...prev,
                                phone_number: e.target.value
                            }))
                        }}
                        className="w-full px-3 py-2 pl-18 rounded-md bg-[#0d1117] border border-[#30363d]"
                    />
                </div>
            </div>
        
            {/* Dropdown menu */}
            {openDropdown  && (
                <ul className="absolute z-50 mt-1 w-full max-h-60 overflow-auto bg-[#161b22] border border-[#30363d] rounded-md shadow-lg">
                    {allCountries.map((c) => (
                        <li
                        key={c.code}
                        className="px-3 py-2 text-sm text-[#e6edf3] hover:bg-[#21262d] cursor-pointer"
                        onClick={() => {
                                setNewNumber(prev => ({
                                    ...prev,
                                    country_code: `+${c.code}`,
                                }));
                                setSelectedCountry(c);
                                setOpenDropdown(false);
                            }}
                            
                        >
                            <span>{c.country} (+{c.code})</span>
                        </li>
                    ))}
                </ul>
            )}
        
            <input
            placeholder="Description"
            value={newNumber.description}
            onChange={(e)=> setNewNumber(prev => ({
                ...prev,
                description: e.target.value
            }))}
            className="w-full px-3 py-2 mb-2 rounded-md bg-[#0d1117] border border-[#30363d]"
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
                {form.numbers.filter(number => number.phone_number).map((number, index) => (
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
    )
}
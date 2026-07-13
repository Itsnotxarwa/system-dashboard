import { useState } from "react";
import ConfigMenu from "./ConfigMenu";
import Prompt from "./Prompt";
import Models from "./Models";
import Tools from "./Tools";

export default function ConfigPanel({agent}) {
    const [section, setSection] = useState("Prompt");
    
    return(
        <div className="flex flex-1 overflow-hidden">
            <ConfigMenu section={section} setSection={setSection} />

            <div className="flex-1 border-t border-[#30363d]">
                {section === "Prompt" && <Prompt agent={agent} />}
                {section === "Models" && <Models agent={agent} />}
                {section === "Tools" && <Tools agent={agent} />}
                {section === "Voice" && <div>Voice Content</div>}
            </div>
        </div>
    )
}
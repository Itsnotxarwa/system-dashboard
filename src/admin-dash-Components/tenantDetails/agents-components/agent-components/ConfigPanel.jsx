import { useState } from "react";
import ConfigMenu from "./ConfigMenu";
import Prompt from "./Prompt";

export default function ConfigPanel({agent}) {
    const [section, setSection] = useState("Prompt");
    
    return(
        <div className="flex flex-1 overflow-hidden">
            <ConfigMenu section={section} setSection={setSection} />

            <div className="flex-1 p-6">
                {section === "Prompt" && <Prompt agent={agent} />}
                {section === "Models" && <div>Models Content</div>}
                {section === "Tools" && <div>Tools Content</div>}
                {section === "Voice" && <div>Voice Content</div>}
            </div>
        </div>
    )
}
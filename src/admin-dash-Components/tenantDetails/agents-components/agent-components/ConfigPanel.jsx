import { useState } from "react";
import ConfigMenu from "./ConfigMenu";
import Prompt from "./Prompt";
import Models from "./Models";
import Tools from "./Tools";
import Voice from "./Voice";
import Actions from "./Actions";

export default function ConfigPanel({isEditing, form, setForm, handleModelChange, updateTool, addTool, removeTool}) {
    const [section, setSection] = useState("Prompt");

    return(
        <div className="flex flex-1 overflow-hidden">
            <ConfigMenu section={section} setSection={setSection} />

            <div className="flex-1 border-t border-[#30363d]">
                {section === "Prompt" && <Prompt form={form} setForm={setForm} isEditing={isEditing} />}
                {section === "Models" && <Models  models={form?.models_config} handleModelChange={handleModelChange} isEditing={isEditing} />}
                {section === "Tools" && <Tools tools={form?.tools} updateTool={updateTool} addTool={addTool} removeTool={removeTool} isEditing={isEditing} />}
                {section === "Voice" && <Voice form={form} setForm={setForm} isEditing={isEditing}  />}
                {section === "Actions" && <Actions />}
            </div>
        </div>
    )
}
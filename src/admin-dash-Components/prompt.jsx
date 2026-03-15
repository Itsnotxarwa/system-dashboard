export default function Prompt() {
    const text = "Voici un exemple de prompt système pour une application de support client alimentée par l'IA. Ce prompt est conçu pour guider l'agent conversationnel dans la fourniture d'assistance efficace et personnalisée aux utilisateurs finaux."
    return (
    <div 
    className="text-sm whitespace-pre-wrap leading-4 text-[#1e293b]"
    >
        <div>
            <span>{text}</span>
        </div>

    </div>
  );
}
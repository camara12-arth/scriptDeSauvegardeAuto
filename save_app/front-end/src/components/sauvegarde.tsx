

import { HistoryIcon } from "lucide-react";
import useSauvegarde from "../hooks/useSauvegarde";
import InputField from "./InputField";

type SauvegardeProps = {
  onVue: React.Dispatch<React.SetStateAction<boolean>>;
  
}

export default function Sauvegarde({onVue}:SauvegardeProps) {

  const {
    sourceFiles,
    destination,
    recurrence,
    isLoading,
    handleSourceChange, 
    handleSubmit,
    setDestination,
    setRecurrence,
  } = useSauvegarde();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-6">
      <div className="relative w-full max-w-2xl bg-card/60 backdrop-blur rounded-xl shadow-lg p-8">
              <button className="absolute top-3 right-3 flex items-center gap-2 text-primary cursor-pointer hover:text-primary/80 transition" onClick={()=>onVue(prev=>!prev)}>
       <HistoryIcon className="w-5 h-5 bg-primary text-primary-foreground" />
       History
      </button>
          {/* header de l'app (tu pourra creer le composant Header) */}
        <div className="flex items-center gap-4 mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-primary">
            <path d="M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <h1 className="text-2xl font-bold">Sauvegarde automatique</h1>
            <p className="text-sm text-primary">Sélectionnez un dossier, choisissez la destination et la fréquence.</p>
          </div>
        </div>
          {/* composant de selection du dossier source, destination et recurrence */}
        {/* regarde bien comment est InputField puis tu vas creer un autre composant SubmitButton */}
        <InputField sourceFiles={sourceFiles} destination={destination} recurrence={recurrence}  handleSourceChange={handleSourceChange} setDestination={setDestination} setRecurrence={setRecurrence}/>
          {/* bouton de lancement de la sauvegarde */}
          {/* //----- ici tu vas faire un composant qui s'appelle SubmitButton et qui va prendre en props isLoading et handleSubmit et qui va afficher un bouton avec un spinner quand isLoading est true et qui va appeler handleSubmit quand on clique dessus */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-secondary-foreground">Prêt à lancer la sauvegarde</div>
          <button
            onClick={handleSubmit}
            disabled={!sourceFiles || isLoading}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            ) : null}
            <span>{isLoading ? "En cours..." : "Lancer la sauvegarde"}</span>
          </button>
        </div>
        {/* //----------- */}
      </div>
    </div>
  );
}
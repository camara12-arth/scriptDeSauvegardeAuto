

import { HistoryIcon } from "lucide-react";
import useSauvegarde from "../hooks/useSauvegarde";

import SubmitButton from "./SubmitButton";

import InputField from "./InputField";

type SauvegardeProps = {
  onVue: React.Dispatch<React.SetStateAction<boolean>>;
  
}

export default function Sauvegarde({onVue}:SauvegardeProps) {
console.log(salut)
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

      

       
        <InputField sourceFiles={sourceFiles} destination={destination} recurrence={recurrence}  handleSourceChange={handleSourceChange} setDestination={setDestination} setRecurrence={setRecurrence}/>
          
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-secondary-foreground">
            Prêt à lancer la sauvegarde
          </div>

          <SubmitButton
            isLoading={isLoading}
            onClick={handleSubmit}
            disabled={!sourceFiles || !destination}
          >
            sauvegarder
          </SubmitButton>
        </div>


      </div>

        
      </div>
  );
}
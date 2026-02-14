

import { HistoryIcon } from "lucide-react";
import useSauvegarde from "../hooks/useSauvegarde";

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
        {/* choix du dossier source et de la destination de sauvegarde (tu pourras creer un composant pour InputField pour cette parti puis passer les diffrentes handle... en callback)*/}
        {/* puis creer un composant Config qui vas nous permettre de recuperer les config de sauvegarde par exemple la recurrence, le chemin du dossier source et dest puis la date de la derniere sauvegarde */}
        {/* j'ai creer un type pour t'aider exe: const [configs,setconfigs]= useState<ConfigType>() */}
        {/* tu pourras recuperer les configs grace a axios.get(http://localhost:5000/backup) dans un useEffect avec un tableau de dependance vide exe:[] */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-2">Dossier source</label>
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-2 bg-secondary/10 border border-border rounded px-3 py-2  hover:bg-secondary/20 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-foreground" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 3a2 2 0 00-2 2v2h16V5a2 2 0 00-2-2H4z" />
                  <path d="M18 9H2v5a3 3 0 003 3h10a3 3 0 003-3V9z" />
                </svg>
                <span className="text-sm">Choisir dossier</span>
               
                <input type="text"  onChange={handleSourceChange} value={sourceFiles} className="w-full border p-2 rounded" />
              </label>
              {(sourceFiles=="")?<div className="text-sm text-secondary-foreground"> Aucun dossier sélectionné</div>:null}
            </div>
           
          </div>

          <div>
            <label className="block text-sm mb-2">Destination</label>
            <input
              type="text"
              placeholder="Chemin destination (ex: /backups)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <label className="block text-sm mt-4 mb-2">Récurrence</label>
            <select value={recurrence} onChange={(e) => setRecurrence(e.target.value)} className="w-full border p-2 rounded">
              <option value="daily">Quotidienne</option>
              <option value="weekly">Hebdomadaire</option>
              <option value="monthly">Mensuelle</option>
            </select>
          </div>
        </div>

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
      </div>
    </div>
  );
}
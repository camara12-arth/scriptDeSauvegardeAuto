
import useSauvegarde from "../hooks/useSauvegarde";

export default function Sauvegarde() {
 
  const {
    sourceFiles,
    destination,
    recurrence,
    isLoading,
    handleSourceChange, 
    handleConfig,
    handleSubmit,
    setDestination,
    setRecurrence,
  } = useSauvegarde();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-6">
      <div className="relative w-full max-w-2xl bg-card/60 backdrop-blur rounded-xl shadow-lg p-8">
              <button className="absolute top-3 right-3 flex items-center gap-2 text-primary cursor-pointer hover:text-primary/80 transition" onClick={handleConfig}>
        <svg
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6"
        >
          <path
           d="M12 8.5C10.07 8.5 8.5 10.07 8.5 12C8.5 13.93 10.07 15.5 12 15.5C13.93 15.5 15.5 13.93 15.5 12C15.5 10.07 13.93 8.5 12 8.5ZM19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.05 9.76C21.21 9.63 21.26 9.39 21.17 9.19L19.37 5.81C19.27 5.61 19.05 5.52 18.84 5.58L16.86 6.18C16.45 5.86 16.01 5.59 15.53 5.37L15.25 3.32C15.22 3.14 15.08 3 14.9 3H9.1C8.92 3 8.78 3.14 8.75 3.32L8.47 5.37C7.99 5.59 7.55 5.87 7.14 6.18L5.16 5.58C4.95 5.52 4.73 5.61 4.63 5.81L2.83 9.19C2.74 9.39 2.79 9.63 2.95 9.76L4.57 11.02C4.53 11.34 4.5 11.66 4.5 12C4.5 12.34 4.53 12.66 4.57 12.98L2.95 14.24C2.79 14.37 2.74 14.61 2.83 14.81L4.63 18.19C4.73 18.39 4.95 18.48 5.16 18.42L7.14 17.82C7.55 18.14 7.99 18.41 8.47 18.63L8.75 20.68C8.78 20.86 8.92 21 9.1 21H14.9C15.08 21 15.22 20.86 15.25 20.68L15.53 18.63C16.01 18.41 16.45 18.13 16.86 17.82L18.84 18.42C19.05 18.48 19.27 18.39 19.37 18.19L21.17 14.81C21.26 14.61 21.21 14.37 21.05 14.24L19.43 12.98Z"
          />
        </svg>
        configurations
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
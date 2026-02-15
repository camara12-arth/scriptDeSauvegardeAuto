import type { InputFieldType } from "../types";


export default function InputField({ sourceFiles, destination, recurrence, handleSourceChange, setDestination, setRecurrence }: InputFieldType) {
  return (
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
  )
}
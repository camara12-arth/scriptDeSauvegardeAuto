import { useState } from "react";
import axios from "axios";

export default function Sauvegarde() {
  const [sourceFiles, setSourceFiles] = useState<FileList | null>(null);
  const [destination, setDestination] = useState("");
  const [recurrence, setRecurrence] = useState("daily");
  const [isLoading, setIsLoading] = useState(false);

  const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSourceFiles(e.target.files);
    }
  };

  const getFolderName = () => {
    if (!sourceFiles || sourceFiles.length === 0) return "";
    // webkitRelativePath usually contains the directory at index 0
    const p = (sourceFiles[0] as any).webkitRelativePath as string | undefined;
    if (p) return p.split("/")[0];
    return sourceFiles[0].name;
  };

  const filePreview = () => {
    if (!sourceFiles) return [] as string[];
    return Array.from(sourceFiles).slice(0, 6).map((f) => f.name);
  };

  const handleSubmit = async () => {
    if (!sourceFiles) {
      alert("Veuillez sélectionner un dossier source.");
      return;
    }

    const sourcePath = getFolderName();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/backup", {
        source: sourcePath,
        destination,
        recurrence,
      });

      alert(`Sauvegarde créée: ${res.data.path}`);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      alert("Une erreur est survenue lors de la création de la sauvegarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-6">
      <div className="w-full max-w-2xl bg-card/60 backdrop-blur rounded-xl shadow-lg p-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-2">Dossier source</label>
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-2 bg-secondary/10 border border-border rounded px-3 py-2 cursor-pointer hover:bg-secondary/20 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-foreground" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 3a2 2 0 00-2 2v2h16V5a2 2 0 00-2-2H4z" />
                  <path d="M18 9H2v5a3 3 0 003 3h10a3 3 0 003-3V9z" />
                </svg>
                <span className="text-sm">Choisir dossier</span>
                {/* hidden file input */}
                {/* @ts-ignore */}
                <input type="file" webkitdirectory="true" directory="true" multiple onChange={handleSourceChange} className="hidden" />
              </label>
              <div className="text-sm text-secondary-foreground">{getFolderName() || "Aucun dossier sélectionné"}</div>
            </div>
            {sourceFiles && (
              <div className="mt-3 bg-background/40 border border-border rounded p-2 text-sm max-h-13 overflow-auto">
                <div className="font-medium mb-1 ">Aperçu ({sourceFiles.length} fichiers)</div>
                <ul className="list-disc pl-5 space-y-1">
                  {filePreview().map((name) => (
                    <li key={name} className="truncate">{name}</li>
                  ))}
                </ul>
              </div>
            )}
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
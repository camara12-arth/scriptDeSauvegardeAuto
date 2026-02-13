import axios from "axios";
import { useState } from "react";

export default function useSauvegarde() {
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
  const handleConfig = () => {
    alert("Fonctionnalité de configuration à venir !");
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
  return {
    sourceFiles,
    destination,
    recurrence,
    isLoading,
    handleSourceChange, 
    getFolderName,
    filePreview,
    handleConfig,
    handleSubmit,
    setDestination,
    setRecurrence,
  };
}
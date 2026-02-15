import axios from "axios";
import { useState } from "react";

export default function useSauvegarde() {
 const [sourceFiles, setSourceFiles] = useState<string>("");
  const [destination, setDestination] = useState("");
  const [recurrence, setRecurrence] = useState("daily");
  const [isLoading, setIsLoading] = useState(false);

  const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value.trim();
  // Supprimer guillemets de début/fin s'il y en a
  if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }
  setSourceFiles(value);
};


  const handleSubmit = async () => {
    if (!sourceFiles) {
      alert("Veuillez sélectionner un dossier source.");
      return;
    }

    
    setIsLoading(true);
    try {
       await axios.post("http://127.0.0.1:5000/api/backup", {
        source: sourceFiles,
        destination: "~"+destination,
        frequency: recurrence,
      }).then((response) => {
         alert(response.data.message);
      if (response.data.success) {
        setDestination("");
        setRecurrence("daily");
        setSourceFiles("");
      }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête:", error);
        
        alert("Une erreur est survenue lors de la création de la sauvegarde.\nDétails: " + error.response?.data?.error);
        setSourceFiles("");
      });
    
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
    handleSubmit,
    setDestination,
    setRecurrence,
    setSourceFiles,

  };
}
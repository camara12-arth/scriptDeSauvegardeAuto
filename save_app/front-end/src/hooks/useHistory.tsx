import { useState } from "react";
import type { BackupType } from "../types";
import axios from "axios";

export default function useHistory() {
const [history, setHistory] = useState<BackupType[]>([]);

const getHistory = async () => {
    await axios.get("http://127.0.0.1:5000/api/history").then((response) => {
        setHistory(response.data as BackupType[]);

    }).catch((error) => {
        console.error("Erreur lors de la récupération de l'historique:", error);
        alert("Une erreur est survenue lors de la récupération de l'historique.");
    });
}
return {
    history,
    getHistory,
};
}
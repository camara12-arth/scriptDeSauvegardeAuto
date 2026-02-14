import { useEffect } from "react";
import useHistory from "../hooks/useHistory";
import { HomeIcon } from "lucide-react";
import { format } from "date-fns";

type HistoryProps = {
    onVue: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function History({onVue}:HistoryProps) {
    const { history, getHistory } = useHistory();

    useEffect(() => {
        getHistory();
    }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-6">
      <div className="relative w-full max-w-2xl bg-card/60 backdrop-blur rounded-xl shadow-lg p-8">
             <button className="absolute top-3 right-3 flex items-center gap-2 text-primary cursor-pointer hover:text-primary/80 transition" onClick={()=>onVue(prev=>!prev)}>
       <HomeIcon className="w-5 h-5 bg-primary text-primary-foreground" />
       home
      </button>
        <h1 className="text-2xl font-bold mb-4 text-primary">Historique des sauvegardes</h1>
        {(history?.length === 0 || !history) ? (
          <p className="text-sm text-secondary-foreground">Aucune sauvegarde effectuée pour le moment.</p>
        ) : history.map((backup, index) => (
          <div key={index} className="border-b border-border py-4">
            <h2 className="text-lg font-semibold">{backup.filename ??"Nom Absent"}</h2>
            <p className="text-sm text-blue-900"><span className="text-secondary-foreground">Source:</span> {backup.source}</p>
            <p className="text-sm text-blue-900"><span className="text-secondary-foreground">Destination:</span> {backup.destination}</p>
            <p className="text-sm text-blue-900"><span className="text-secondary-foreground">Fréquence:</span> {backup.frequency}</p>
            <p className="text-sm text-blue-900"><span className="text-secondary-foreground">Statut:</span> {backup.status==="Success"?<span className="text-green-300">{backup.status}</span>:<span className="text-red-500">{backup.status}</span>}</p>
            <p className="text-sm text-blue-900"><span className="text-secondary-foreground">Dernière sauvegarde:</span> {backup.last_backup?format(new Date(backup.last_backup), "dd/MM/yyyy HH:mm:ss"):"Pas Sauvegarder"}</p>
            <hr className="w-full text-primary" />
          </div>
          
        ))}
      </div>
    </div>
  );
}
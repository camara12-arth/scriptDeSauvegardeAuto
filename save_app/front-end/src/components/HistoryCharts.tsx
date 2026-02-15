import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type HistoryChartsProps = {
  history: any[];
};

export default function HistoryCharts({ history }: HistoryChartsProps) {
  // Compteurs initialisés à 0 pour chaque fréquence de sauvegarde
  let daily = 0;
  let weekly = 0;
  let monthly = 0;
  let yearly = 0;

  //  On parcourt l'historique
  history.forEach((backup) => {
    if (backup.frequency === "daily") daily++;
    if (backup.frequency === "weekly") weekly++;
    if (backup.frequency === "monthly") monthly++;
    if (backup.frequency === "yearly") yearly++;
  });

  // Données pour le graphique  c'est a dire le nombre de sauvegarde pour chaque fréquence j'ai installe recharts pour faire le graphique tu peux faire un graphique a barre ou un graphique en camembert c'est comme tu veux :)
  const data = [
    { name: "Quotidienne", value: daily },
    { name: "Hebdomadaire", value: weekly },
    { name: "Mensuelle", value: monthly },
    { name: "Annuelle", value: yearly },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-lg font-bold mb-4 text-primary">
        Statistiques des sauvegardes
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

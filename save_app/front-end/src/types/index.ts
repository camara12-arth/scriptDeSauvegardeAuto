export type ConfigType = {
  source: string;
  destination: string;
    recurrence: string;
    lastBackup: string;
};
export type BackupType = {
    filename: string;
        source: string;
        destination: string;
        frequency:string;
        status: "Success" | "Echec";
        last_backup: string;
}
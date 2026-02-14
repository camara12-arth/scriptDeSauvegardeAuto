export type InputFieldType = {
   sourceFiles: string;
    destination: string;
    recurrence: string;
    handleSourceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setDestination: React.Dispatch<React.SetStateAction<string>>;
    setRecurrence: React.Dispatch<React.SetStateAction<string>>;
};
export type BackupType = {
    filename: string;
        source: string;
        destination: string;
        frequency:string;
        status: "Success" | "Echec";
        last_backup: string;
}
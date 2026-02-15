import React from "react";

type SubmitButtonProps = {
  isLoading: boolean;
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode; // permet de mettre texte ou icône
};

export default function SubmitButton({
  isLoading,
  onClick,
  disabled,
  children,
}: SubmitButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {/* animation quand c'est en cours */}
      {isLoading && (
        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
      )}

      {/* texte ou icône passé via children */}
      {isLoading ? "En cours..." : children}
    </button>
  );
}

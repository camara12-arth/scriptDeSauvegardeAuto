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
      className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {/* animation quand c'est en cours */}
      {isLoading ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            ) : null}
            <span>{isLoading ? "En cours..." : children}</span>
    </button>
  );
}

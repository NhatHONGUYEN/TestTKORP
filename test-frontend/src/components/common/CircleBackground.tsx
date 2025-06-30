import React from "react";

interface CircleBackgroundProps {
  children: React.ReactNode;
  className?: string;
  showFooter?: boolean;
}

export default function CircleBackground({
  children,
  className = "",
  showFooter = true,
}: CircleBackgroundProps) {
  return (
    <section
      className={
        `relative overflow-hidden min-h-screen flex flex-col ` + className
      }
    >
      {/* Cercle jaune */}
      <div
        className="absolute -top-[100px] -left-[100px] w-[300px] h-[300px]
                   bg-[#FFB347] rounded-full opacity-30"
      />
      {/* Cercle bleu */}
      <div
        className="absolute -bottom-[120px] -right-[120px] w-[450px] h-[450px]
                   bg-[#87CEEB] rounded-full opacity-25"
      />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex-1 py-16 px-4">
        {children}
      </div>

      {/* Footer intégré */}
      {showFooter && (
        <footer className="relative z-20 h-[10vh] w-full bg-background/50 backdrop-blur-md">
          <div className="max-w-5xl mx-auto h-full flex items-center justify-center px-4">
            <p className="text-sm text-muted-foreground font-medium">
              &copy; 2025 PetKeeper. Tous droits réservés.
            </p>
          </div>
        </footer>
      )}
    </section>
  );
}

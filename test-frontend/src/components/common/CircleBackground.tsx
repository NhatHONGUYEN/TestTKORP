import React from "react";

interface CircleBackgroundProps {
  children: React.ReactNode;
  className?: string;
  showFooter?: boolean;
}

export default function CircleBackground({
  children,
  className = "",
}: CircleBackgroundProps) {
  return (
    <section
      className={
        `relative overflow-hidden min-h-screen flex flex-col ` + className
      }
    >
      {/* Cercle orange clair */}
      <div
        className="absolute -top-[100px] -left-[100px] w-[300px] h-[300px]
                   bg-[#FFB347] rounded-full opacity-30"
      />
      {/* Cercle orange plus foncé */}
      <div
        className="absolute -bottom-[120px] -right-[120px] w-[450px] h-[450px]
                   bg-[#FF8C00] rounded-full opacity-25"
      />

      {/* Contenu par-dessus */}
      <div className="relative z-10 max-w-5xl mx-auto text-left py-16 px-4">
        {children}
      </div>
    </section>
  );
}

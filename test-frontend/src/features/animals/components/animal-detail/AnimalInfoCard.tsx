import { LucideIcon } from "lucide-react";

interface AnimalInfoCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
}

export default function AnimalInfoCard({
  icon: Icon,
  title,
  value,
}: AnimalInfoCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
      <Icon className="size-5 text-primary" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}

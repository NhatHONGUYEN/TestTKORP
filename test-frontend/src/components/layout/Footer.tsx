export default function Footer() {
  return (
    <footer className="h-[6vh] absolute bottom-0 w-full bg-background/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto h-full flex items-center justify-center px-4">
        <p className="text-sm text-muted-foreground font-medium">
          &copy; 2025 PetKeeper. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

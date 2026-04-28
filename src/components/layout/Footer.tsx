export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-black border-t border-white/10">
      <div className="container px-6 mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-muted-foreground text-sm">
          &copy; {currentYear} Advanced AI Portfolio. All rights reserved.
        </p>
        <div className="flex items-center gap-6 mt-4 md:mt-0 text-sm font-medium">
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">Skills</a>
          <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a>
        </div>
      </div>
    </footer>
  );
}

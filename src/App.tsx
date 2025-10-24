import { CodeReviewForm } from "@/components/code-review-form";
import { ThemeProvider } from "@/contexts/theme-context";
import { ThemeToggle } from "@/components/theme-toggle";

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-svh bg-background p-4">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-3xl font-bold mb-2">Code Review Tool</h1>
          <ThemeToggle />
        </div>
        <p className="text-muted-foreground">Get expert AI-powered analysis on codebases with over 100,000 lines</p>
      </header>
      <main className="w-full max-w-4xl">
        <CodeReviewForm />
      </main>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <p>© {new Date().getFullYear()} Code Review Tool - Powered by Google Gemini 2.5 Pro</p>
        </div>
        <div className="mt-2 flex justify-center">
          <a href="https://github.com/AmanKadam-16/AI-Code-Reviewer" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
    </ThemeProvider>
  );
}

export default App

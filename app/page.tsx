import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { InvoiceProvider } from "@/components/invoice-provider"
import { InvoiceContent } from "@/components/invoice-content"

export default function Home() {
  return (
    <InvoiceProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <header className="border-b bg-white dark:bg-slate-900">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-cyan-500 text-white">
                <span className="text-xl font-bold">I</span>
              </div>
              <h1 className="text-xl font-medium text-cyan-500">Invoice</h1>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="container mx-auto p-4">
          <InvoiceContent />
        </main>
        <footer className="container mx-auto p-4 text-center">
          <span className="text-xs"><a href="https://samneng-dev.vercel.app/" target="_blank" className="text-cyan-500">Samneng</a>, Made with ❤️</span>
        </footer>
      </div>
    </InvoiceProvider>
  )
}


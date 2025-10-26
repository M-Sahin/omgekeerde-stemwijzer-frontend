import Link from "next/link"
import { CheckCircle, Database, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="De Omgekeerde Stemwijzer Logo" width={40} height={40} className="rounded-lg" />
            <span className="text-xl font-semibold">De Omgekeerde Stemwijzer</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button className="bg-foreground text-background hover:bg-foreground/90">Begin met vragen</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-tight">
            Objectieve antwoorden over de Tweede Kamerverkiezingen 2025
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            Stel vragen over alle partijprogramma's en krijg 100% feitelijke antwoorden. Geen hallucinaties, alleen
            feiten uit de verkiezingsprogramma's.
          </p>
          <div className="pt-6 flex items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="text-base px-8 h-12 bg-foreground text-background hover:bg-foreground/90">
                Begin met vragen →
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="ghost" className="text-base px-8 h-12">
                Hoe het werkt →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Election Info Banner */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Tweede Kamerverkiezingen 2025</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-foreground">26 november</div>
              <div className="text-sm text-muted-foreground mt-1">Verkiezingsdatum</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">150 zetels</div>
              <div className="text-sm text-muted-foreground mt-1">Te verdelen</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">20+ partijen</div>
              <div className="text-sm text-muted-foreground mt-1">Verkiezingsprogramma's</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4 p-8 rounded-xl border border-border bg-card">
              <div className="size-12 rounded-lg bg-foreground/10 flex items-center justify-center">
                <Database className="size-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-semibold">Alle Partijprogramma's</h3>
              <p className="text-muted-foreground leading-relaxed">
                Getraind op alle verkiezingsprogramma's van de deelnemende partijen. Vergelijk standpunten direct uit de
                bron.
              </p>
            </div>

            <div className="space-y-4 p-8 rounded-xl border border-border bg-card">
              <div className="size-12 rounded-lg bg-foreground/10 flex items-center justify-center">
                <CheckCircle className="size-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-semibold">100% Feitelijk</h3>
              <p className="text-muted-foreground leading-relaxed">
                Dankzij RAG-technologie (Retrieval Augmented Generation) geen hallucinaties. Elk antwoord is geworteld
                in de daadwerkelijke programma's.
              </p>
            </div>

            <div className="space-y-4 p-8 rounded-xl border border-border bg-card">
              <div className="size-12 rounded-lg bg-foreground/10 flex items-center justify-center">
                <Shield className="size-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-semibold">Objectief & Onpartijdig</h3>
              <p className="text-muted-foreground leading-relaxed">
                Geen meningen of interpretaties, alleen wat er letterlijk in de programma's staat. Maak een
                geïnformeerde keuze.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Hoe werkt het?</h2>
          <div className="space-y-6 bg-card border border-border rounded-xl p-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 size-8 rounded-full bg-foreground text-background flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Stel je vraag</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Vraag wat je wilt weten over de standpunten van partijen. Bijvoorbeeld: "Wat vinden partijen over
                  klimaat?" of "Welke partij wil de zorg verbeteren?"
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 size-8 rounded-full bg-foreground text-background flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AI zoekt in alle programma's</h3>
                <p className="text-muted-foreground leading-relaxed">
                  De AI doorzoekt alle verkiezingsprogramma's en haalt relevante passages op die je vraag beantwoorden.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 size-8 rounded-full bg-foreground text-background flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Krijg een feitelijk antwoord</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Je krijgt een helder overzicht van wat elke partij hierover schrijft in hun programma. Geen
                  interpretaties, alleen feiten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 De Omgekeerde Stemwijzer. Objectieve informatie voor geïnformeerde kiezers.
          </p>
        </div>
      </footer>
    </div>
  )
}

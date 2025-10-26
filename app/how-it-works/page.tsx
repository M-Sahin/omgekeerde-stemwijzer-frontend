"use client"

import Link from "next/link"
import { Brain, Database, CheckCircle, Zap, Globe, AlertCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"

export default function HowItWorksPage() {
  const { user, loading } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="De Omgekeerde Stemwijzer Logo" width={40} height={40} className="rounded-lg" />
            <span className="text-xl font-semibold">De Omgekeerde Stemwijzer</span>
          </Link>
          <div className="flex items-center gap-4">
            {loading ? (
              <div className="size-4 border-2 border-muted border-t-foreground rounded-full animate-spin" />
            ) : user ? (
              <Link href="/chat">
                <Button className="bg-foreground text-background hover:bg-foreground/90">Naar Chat</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="bg-foreground text-background hover:bg-foreground/90">Begin met vragen</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">Hoe het werkt</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            Ontdek waarom RAG-technologie zorgt voor 100% feitelijke antwoorden zonder hallucinaties
          </p>
        </div>
      </section>

      {/* RAG vs Normal LLM Comparison */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">RAG vs Normale AI</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Normal LLM */}
            <div className="space-y-4 p-8 rounded-xl border-2 border-destructive/20 bg-destructive/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-12 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <Globe className="size-6 text-destructive" />
                </div>
                <h3 className="text-2xl font-semibold">Normale AI (LLM)</h3>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <AlertCircle className="size-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>Hallucinaties:</strong> Verzint soms feiten die niet kloppen
                  </p>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="size-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>Verouderde data:</strong> Getraind op oude internetdata
                  </p>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="size-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>Geen bronvermelding:</strong> Weet niet waar informatie vandaan komt
                  </p>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="size-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>Bias:</strong> Beïnvloed door willekeurige internetbronnen
                  </p>
                </div>
              </div>
            </div>

            {/* RAG System */}
            <div className="space-y-4 p-8 rounded-xl border-2 border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Database className="size-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold">RAG (Onze AI)</h3>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>Geen hallucinaties:</strong> Alleen feiten uit verkiezingsprogramma's in vector database
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>Geen internet:</strong> Zoekt alleen in specifieke database met verkiezingsdata
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>Actuele data:</strong> Direct uit de programma's van 2025
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>Volledige transparantie:</strong> Weet precies uit welk programma info komt
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>100% objectief:</strong> Alleen wat partijen zelf schrijven
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How RAG Works - Step by Step */}
      <section className="container mx-auto px-4 py-16 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Zo werkt RAG-technologie</h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 size-12 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold">Je stelt een vraag</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Bijvoorbeeld: "Wat vinden partijen over klimaatverandering?" of "Welke partij wil de zorg verbeteren?"
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 size-12 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-semibold">Retrieval: Zoeken in de database</h3>
                  <Database className="size-6 text-foreground" />
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  De AI doorzoekt alle 20+ verkiezingsprogramma's die zijn opgeslagen in een vector database. 
                  Er wordt <strong>niet</strong> op internet gekeken - alleen in deze specifieke database met verkiezingsinformatie. 
                  Dit gebeurt in milliseconden.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 size-12 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-semibold">Augmented: Verrijken met context</h3>
                  <Brain className="size-6 text-foreground" />
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  De AI krijgt de gevonden passages als context mee. Het mag ALLEEN informatie gebruiken uit deze
                  passages - niets verzinnen of toevoegen.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 size-12 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-semibold">Generation: Helder antwoord</h3>
                  <Zap className="size-6 text-foreground" />
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  De AI formuleert een helder, begrijpelijk antwoord gebaseerd op de gevonden feiten. Je krijgt een
                  overzicht van wat elke relevante partij schrijft in hun programma.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limitations Section */}
      <section className="container mx-auto px-4 py-16 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Belangrijk: Alleen verkiezingsvragen</h2>
          <div className="space-y-6 p-8 rounded-xl border-2 border-orange-500/20 bg-orange-500/5">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="size-6 text-orange-600" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">De AI kent alleen verkiezingsprogramma's</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Onze AI is <strong>100% getraind op verkiezingsprogramma's</strong> en zoekt alleen in deze vector database. 
                  Dit betekent dat algemene vragen die niets met de verkiezingen te maken hebben niet goed beantwoord kunnen worden.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-600 flex items-center gap-2">
                      <CheckCircle className="size-5" />
                      Deze vragen werken goed:
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• "Wat vinden partijen over klimaatverandering?"</li>
                      <li>• "Welke partij wil de zorg verbeteren?"</li>
                      <li>• "Standpunten over belastingen?"</li>
                      <li>• "Wat schrijven partijen over onderwijs?"</li>
                      <li>• "Asielbeleid van verschillende partijen?"</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-600 flex items-center gap-2">
                      <AlertCircle className="size-5" />
                      Deze vragen werken niet:
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• "Wat is de hoofdstad van Frankrijk?"</li>
                      <li>• "Hoe maak je een taart?"</li>
                      <li>• "Wanneer is de volgende voetbalwedstrijd?"</li>
                      <li>• "Wat is het weer vandaag?"</li>
                      <li>• "Help me met programmeren"</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-background/50 rounded-lg border border-orange-500/20">
                  <p className="text-sm text-muted-foreground">
                    <strong>Tip:</strong> Richt je vragen op politieke onderwerpen, partijstandpunten, of beleidsvoorstellen. 
                    De AI heeft toegang tot alle verkiezingsprogramma's van 2025 en kan deze perfect vergelijken en doorzoeken.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Waarom is dit belangrijk?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card space-y-3">
              <div className="size-12 rounded-lg bg-foreground/10 flex items-center justify-center">
                <CheckCircle className="size-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold">100% Betrouwbaar</h3>
              <p className="text-muted-foreground leading-relaxed">
                Geen risico op verzonnen informatie. Alle antwoorden komen direct uit de vector database 
                met verkiezingsprogramma's - geen internet, geen hallucinaties.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card space-y-3">
              <div className="size-12 rounded-lg bg-foreground/10 flex items-center justify-center">
                <Shield className="size-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Objectief</h3>
              <p className="text-muted-foreground leading-relaxed">
                Geen interpretaties of meningen. Alleen wat partijen letterlijk schrijven.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card space-y-3">
              <div className="size-12 rounded-lg bg-foreground/10 flex items-center justify-center">
                <Zap className="size-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Efficiënt</h3>
              <p className="text-muted-foreground leading-relaxed">
                Geen uren programma's lezen. Krijg direct antwoord op je specifieke vraag.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6 p-12 rounded-2xl border-2 border-border bg-card">
          <h2 className="text-3xl md:text-4xl font-bold">Klaar om te beginnen?</h2>
          <p className="text-xl text-muted-foreground">
            {user ? "Ga naar de chat en stel je vraag over de verkiezingen" : "Maak een account en stel je eerste vraag over de verkiezingen"}
          </p>
          {user ? (
            <Link href="/chat">
              <Button size="lg" className="text-base px-8 h-12 bg-foreground text-background hover:bg-foreground/90">
                Naar Chat →
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button size="lg" className="text-base px-8 h-12 bg-foreground text-background hover:bg-foreground/90">
                Inloggen of Registreren →
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 space-y-4">
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              Over de maker
            </Link>
            <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              Hoe het werkt
            </Link>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © 2025 De Omgekeerde Stemwijzer. Objectieve informatie voor geïnformeerde kiezers.
          </p>
        </div>
      </footer>
    </div>
  )
}

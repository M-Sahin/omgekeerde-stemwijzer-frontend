"use client"

import Link from "next/link"
import { CheckCircle, Database, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"

export default function LandingPage() {
  const { user, loading } = useAuth()

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
      <section className="container mx-auto px-4 py-10 md:py-20">
        <div className="max-w-full md:max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance leading-tight">
            Objectieve antwoorden over de Tweede Kamerverkiezingen 2025
          </h1>
          <p className="text-base md:text-xl text-muted-foreground text-balance max-w-full md:max-w-3xl mx-auto leading-relaxed">
            Stel vragen over alle partijprogramma's en krijg 100% feitelijke antwoorden. Geen hallucinaties, alleen
            feiten uit de verkiezingsprogramma's.
          </p>
          <div className="pt-4 flex flex-col md:flex-row items-center justify-center gap-4">
            {user ? (
              <Link href="/chat">
                <Button size="lg" className="text-base px-8 h-12 bg-foreground text-background hover:bg-foreground/90">
                  Naar Chat →
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button size="lg" className="text-base px-8 h-12 bg-foreground text-background hover:bg-foreground/90">
                  Begin met vragen →
                </Button>
              </Link>
            )}
            <Link href="/how-it-works">
              <Button size="lg" variant="ghost" className="text-base px-8 h-12">
                Hoe het werkt →
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="ghost" className="text-base px-8 h-12">
                Over de maker →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Election Info Banner */}
      <section className="container mx-auto px-4 pb-8 md:pb-12">
        <div className="max-w-full md:max-w-4xl mx-auto bg-card border border-border rounded-xl p-4 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">Tweede Kamerverkiezingen 2025</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">29 oktober</div>
              <div className="text-sm text-muted-foreground mt-1">Verkiezingsdatum</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">150 zetels</div>
              <div className="text-sm text-muted-foreground mt-1">Te verdelen</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">20+ partijen</div>
              <div className="text-sm text-muted-foreground mt-1">Verkiezingsprogramma's</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-10 md:py-20">
        <div className="max-w-full md:max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 p-4 md:p-8 rounded-xl border border-border bg-card">
              <div className="size-12 rounded-lg bg-foreground/10 flex items-center justify-center">
                <Database className="size-6 text-foreground" />
              </div>
              <h3 className="text-lg md:text-2xl font-semibold">Alle Partijprogramma's</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Getraind op alle verkiezingsprogramma's van de deelnemende partijen. Vergelijk standpunten direct uit de
                bron.
              </p>
            </div>

            <div className="space-y-4 p-4 md:p-8 rounded-xl border border-border bg-card">
              <div className="size-12 rounded-lg bg-foreground/10 flex items-center justify-center">
                <CheckCircle className="size-6 text-foreground" />
              </div>
              <h3 className="text-lg md:text-2xl font-semibold">100% Feitelijk</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Dankzij RAG-technologie (Retrieval Augmented Generation) geen hallucinaties. Elk antwoord is geworteld
                in de daadwerkelijke programma's.
              </p>
            </div>

            <div className="space-y-4 p-4 md:p-8 rounded-xl border border-border bg-card">
              <div className="size-12 rounded-lg bg-foreground/10 flex items-center justify-center">
                <Shield className="size-6 text-foreground" />
              </div>
              <h3 className="text-lg md:text-2xl font-semibold">Objectief & Onpartijdig</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Geen meningen of interpretaties, alleen wat er letterlijk in de programma's staat. Maak een
                geïnformeerde keuze.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="container mx-auto px-4 py-10 md:py-20">
        <div className="max-w-full md:max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Hoe werkt het?</h2>
          <div className="space-y-6 bg-card border border-border rounded-xl p-4 md:p-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-shrink-0 size-8 rounded-full bg-foreground text-background flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Stel je vraag</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  Vraag wat je wilt weten over de standpunten van partijen. Bijvoorbeeld: "Wat vinden partijen over
                  klimaat?" of "Welke partij wil de zorg verbeteren?"
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-shrink-0 size-8 rounded-full bg-foreground text-background flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">AI zoekt in alle programma's</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  De AI doorzoekt alle verkiezingsprogramma's en haalt relevante passages op die je vraag beantwoorden.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-shrink-0 size-8 rounded-full bg-foreground text-background flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Krijg een feitelijk antwoord</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  Je krijgt een helder overzicht van wat elke partij hierover schrijft in hun programma. Geen
                  interpretaties, alleen feiten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waarschuwing voor gebruikers */}
      <section className="container mx-auto px-4 pt-4">
        <div className="max-w-full md:max-w-4xl mx-auto mb-4">
          <div className="bg-orange-100 border border-orange-300 text-orange-900 rounded-xl p-4 text-sm md:text-base text-center">
            <strong>Let op:</strong> Deze app werkt alleen voor{" "}
            <span className="font-semibold">politieke vragen</span> over de verkiezingen en partijprogramma's. Algemene
            vragen of vragen zonder politieke context geven geen (goed) antwoord. Stel dus altijd een vraag over een
            politiek onderwerp!
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 space-y-4">
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              Hoe het werkt
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              Over de maker
            </Link>
            {user && (
              <Link href="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
                Chat
              </Link>
            )}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © 2025 De Omgekeerde Stemwijzer. Objectieve informatie voor geïnformeerde kiezers.
          </p>
        </div>
      </footer>
    </div>
  )
}

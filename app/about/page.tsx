"use client"

import Link from "next/link"
import { Github, Linkedin, Heart, Lightbulb, Target, Code, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"

export default function AboutPage() {
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
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">Over de maker</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            Waarom ik deze app heb gemaakt en wat mijn visie is op betere verkiezingsinformatie
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* About Me */}
          <div className="space-y-6 p-8 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-full bg-foreground text-background flex items-center justify-center text-2xl font-bold">
                M
              </div>
              <div>
                <h2 className="text-3xl font-bold">Murat Sahin</h2>
                <p className="text-muted-foreground text-lg">Ontwikkelaar & AI Enthousiast</p>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed text-lg">
              Hallo! Welkom op de Omgekeerde Stemwijzer.
              Ik ben Murat, een softwareontwikkelaar met een passie voor technologie.
              Ik wilde een snelle manier om politieke manifesten te indexeren en te spelen met semantische zoekopdrachten.
              En ik was het zat dat elke stemwijzer hetzelfde was; je krijgt een aantal stellingen en je moet maar antwoord geven.
              Deze app is mijn manier om iets nieuws te proberen en hopelijk bij te dragen aan een beter geïnformeerde kiezer.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="https://www.linkedin.com/in/murat-s-70545987/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  <Linkedin className="size-4" />
                  LinkedIn Profiel
                  <ExternalLink className="size-3" />
                </Button>
              </Link>
              <Link 
                href="https://github.com/M-Sahin" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  <Github className="size-4" />
                  GitHub Profiel
                  <ExternalLink className="size-3" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Motivation */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Waarom deze app?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Problem */}
              <div className="space-y-4 p-6 rounded-xl border-2 border-red-500/20 bg-red-500/5">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <Target className="size-6 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-semibold">Het probleem</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Ik was het zat dat elke stemwijzer hetzelfde was: een heleboel multiple choice vragen 
                  waar geen nuance in zit, en dat je maar moet kiezen uit voorgedefinieerde antwoorden. 
                  Je kan niet vragen stellen over dingen die JIJ belangrijk vindt.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">Problemen met traditionele stemwijzers:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Beperkte, voorgedefinieerde vragen</li>
                    <li>• Geen ruimte voor nuance</li>
                    <li>• Je kunt niet je eigen prioriteiten aangeven</li>
                    <li>• Vaak oppervlakkige antwoorden</li>
                  </ul>
                </div>
              </div>

              {/* Solution */}
              <div className="space-y-4 p-6 rounded-xl border-2 border-green-500/20 bg-green-500/5">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Lightbulb className="size-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold">Mijn visie</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Ik wilde een app waarin ik zelf kon vragen over dingen die ik belangrijk vind, 
                  en die 100% gebaseerd is op de daadwerkelijke partijprogramma's. Geen interpretaties, 
                  geen bias - alleen pure feiten uit de bron.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">Voordelen van deze aanpak:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Stel je eigen vragen</li>
                    <li>• 100% gebaseerd op partijprogramma's</li>
                    <li>• Ruimte voor nuance en detail</li>
                    <li>• Geen vooringenomenheid</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Choice */}
          <div className="space-y-6 p-8 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-lg bg-foreground/10 flex items-center justify-center">
                <Code className="size-6 text-foreground" />
              </div>
              <h3 className="text-2xl font-semibold">Waarom RAG-technologie?</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Ik koos voor RAG (Retrieval Augmented Generation) omdat dit de enige manier is om te garanderen 
              dat de AI geen informatie verzint. Door alle verkiezingsprogramma's in een vector database op te slaan 
              en de AI alleen daaruit te laten putten, krijg je altijd betrouwbare, feitelijke antwoorden.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div>• Next.js & TypeScript</div>
              <div>• Firebase Authentication</div>
              <div>• Vector Database (ChromaDB)</div>
              <div>• Google Cloud Run</div>
              <div>• RAG Architecture</div>
            </div>
          </div>

          {/* Mission */}
          <div className="space-y-6 p-8 rounded-xl border-2 border-blue-500/20 bg-blue-500/5 text-center">
            <div className="flex justify-center">
              <div className="size-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Heart className="size-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-3xl font-semibold">Mijn missie</h3>
            <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl mx-auto">
              Ik geloof dat elke kiezer toegang moet hebben tot objectieve, feitelijke informatie over 
              politieke partijen. Deze app is mijn bijdrage aan een beter geïnformeerde democratie, 
              waar mensen hun stemkeuze kunnen baseren op feiten in plaats van interpretaties.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6 p-12 rounded-2xl border-2 border-border bg-card">
          <h2 className="text-3xl md:text-4xl font-bold">Probeer het zelf!</h2>
          <p className="text-xl text-muted-foreground">
            {user ? "Ga naar de chat en stel je eigen verkiezingsvragen" : "Maak een account en ontdek hoe deze app werkt"}
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
                Begin met vragen →
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 De Omgekeerde Stemwijzer. Gemaakt door Murat Sahin voor een beter geïnformeerde democratie.
          </p>
        </div>
      </footer>
    </div>
  )
}
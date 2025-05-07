"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { RESEARCH_PAPER_LINK } from "@/lib/constants"
import { researchers } from "@/lib/researchers"

export default function TeamPage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleBackToHome = () => {
    router.push("/")
    setMobileMenuOpen(false)
  }

  const handleTeamMemberClick = (id: number) => {
    setActiveTeamMember(activeTeamMember === id ? null : id)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center text-lumina-600">
            <Image src="/images/lumina-logo.svg" width={32} height={32} alt="LUMINA logo" className="h-8 w-auto" />
            <span className="text-xl font-bold">LUMINA</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-black/60 transition-colors hover:text-lumina-600 hover:bg-lumina-50 rounded-md"
              >
                Home
              </Link>
              <Link
                href={`${RESEARCH_PAPER_LINK}`}
                target="_blank"
                className="px-3 py-2 text-sm font-medium text-black/60 transition-colors hover:text-lumina-600 hover:bg-lumina-50 rounded-md"
              >
                Research Paper
              </Link>
              <Button
                variant="default"
                size="sm"
                className="bg-lumina-600 hover:bg-lumina-700 px-4 text-white"
                onClick={() => router.push("/scan-analysis")}
              >
                Get Started
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-black/60 hover:text-lumina-600 hover:bg-lumina-50"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-black/60 hover:text-lumina-600 hover:bg-lumina-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href={`${RESEARCH_PAPER_LINK}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-black/60 hover:text-lumina-600 hover:bg-lumina-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Research Paper
              </Link>
              <div className="pt-2">
                <Button
                  variant="default"
                  className="w-full bg-lumina-600 hover:bg-lumina-700 text-white"
                  onClick={() => {
                    router.push("/scan-analysis")
                    setMobileMenuOpen(false)
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4">
              <Button
                variant="ghost"
                className="text-lumina-600 hover:bg-lumina-50 hover:text-lumina-700 -ml-4"
                onClick={handleBackToHome}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-lumina-100 px-3 py-1 text-sm text-lumina-800">Our Team</div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Meet the <span className="text-lumina-600">LUMINA</span> Research Team
                </h1>
                <p className="max-w-[800px] text-black/60 md:text-xl">
                  Our interdisciplinary team combines expertise in medical imaging, deep learning, and clinical practice
                  to advance lung cancer detection and classification.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12 bg-lumina-50">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {researchers.map((member) => (
                <Card
                  key={member.id}
                  className={`flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-md ${
                    activeTeamMember === member.id ? "ring-2 ring-lumina-500" : ""
                  }`}
                  onClick={() => handleTeamMemberClick(member.id)}
                >
                  <div className="aspect-square relative overflow-hidden bg-lumina-100">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-lumina-600 font-medium">{member.role}</p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-black/60">{member.bio}</p>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start space-y-2 pt-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Specialization:</span>
                      <span className="text-sm text-black/60">{member.specialization}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Contact:</span>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-sm text-lumina-600 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {member.email}
                      </a>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Join Our Research</h2>
                <p className="max-w-[600px] text-black/60 md:text-xl">
                  Interested in collaborating with the LUMINA team? We're always looking for talented researchers and
                  clinicians.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-lumina-600 hover:bg-lumina-700 text-white">Contact Us</Button>
                <Button variant="outline" className="border-lumina-600 text-lumina-600 hover:bg-lumina-50">
                  View Opportunities
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0 bg-lumina-50">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Image src="/images/lumina-logo.svg" width={24} height={24} alt="LUMINA logo" className="h-6 w-auto" />
            <p className="text-center text-sm leading-loose text-black/60 md:text-left">
              © 2025 LUMINA. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-black/60">
            <Link href="/team/#" className="underline underline-offset-4 hover:text-lumina-600">
              Terms of Service
            </Link>
            <Link href="/team/#" className="underline underline-offset-4 hover:text-lumina-600">
              Privacy
            </Link>
            <Link href="/team/#" className="underline underline-offset-4 hover:text-lumina-600">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

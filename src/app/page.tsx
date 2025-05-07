"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Brain, Menu, Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RESEARCH_PAPER_LINK } from "@/lib/constants"

export default function Home() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleScanAnalysis = () => {
    router.push("/scan-analysis")
    setMobileMenuOpen(false)
  }

  const handleSymptomAnalysis = () => {
    router.push("/symptom-analysis")
    setMobileMenuOpen(false)
  }

  const handleGetStarted = () => {
    router.push("/scan-analysis")
    setMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
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
                href="/team"
                className="px-3 py-2 text-sm font-medium text-black/60 transition-colors hover:text-lumina-600 hover:bg-lumina-50 rounded-md"
              >
                Team
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
                onClick={handleGetStarted}
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
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-black/60 hover:text-lumina-600 hover:bg-lumina-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/research"
                className="block px-3 py-2 rounded-md text-base font-medium text-black/60 hover:text-lumina-600 hover:bg-lumina-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Research
              </Link>
              <Link
                href="/team"
                className="block px-3 py-2 rounded-md text-base font-medium text-black/60 hover:text-lumina-600 hover:bg-lumina-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Team
              </Link>
              <div className="pt-2">
                <Button
                  variant="default"
                  className="w-full bg-lumina-600 hover:bg-lumina-700 text-white"
                  onClick={handleGetStarted}
                >
                  Get Started
                </Button>
              </div>
              <div className="pt-2 grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="w-full border-lumina-600 text-lumina-600 hover:bg-lumina-50"
                  onClick={handleScanAnalysis}
                >
                  Scan Analysis
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-lumina-600 text-lumina-600 hover:bg-lumina-50"
                  onClick={handleSymptomAnalysis}
                >
                  Symptom Analysis
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    LUMINA: <span className="text-lumina-600">LUng Multimodal Integrated Network Assistant</span>
                  </h1>
                  <p className="max-w-[600px] text-black/60 md:text-xl">
                    Advanced lung cancer classification using 3D DenseNet on multimodal data and symptom-based
                    prediction through logistic regression.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <Button className="w-full bg-lumina-600 hover:bg-lumina-700 text-white" onClick={handleScanAnalysis}>
                    Start Scan Analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-lumina-600 text-lumina-600 hover:bg-lumina-50"
                    onClick={handleSymptomAnalysis}
                  >
                    Symptom Analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center w-full">
                <Image
                  src="/images/lumina-logo.svg"
                  width={600}
                  height={600}
                  alt="LUMINA Lung Cancer Analysis"
                  className="w-full max-w-[400px] h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-lumina-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-lumina-100 px-3 py-1 text-sm text-lumina-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Comprehensive Lung Cancer Analysis</h2>
                <p className="max-w-[900px] text-black/60 md:text-xl">
                  LUMINA combines advanced imaging analysis with symptom-based prediction for accurate lung cancer
                  detection and classification.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <Card className="border-lumina-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Multimodal Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-black/60">
                    Combines CT and PET scans using 3D DenseNet architecture for accurate lung cancer subtype
                    classification.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-lumina-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Symptom-Based Prediction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-black/60">
                    Uses logistic regression to predict lung cancer presence based on patient symptoms and demographic
                    data.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-lumina-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Research-Backed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-black/60">
                    Built on extensive research comparing 3D DenseNet with other architectures for optimal performance.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-lumina-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Automated Preprocessing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-black/60">
                    Automatic standardization, segmentation, and normalization of medical imaging data for consistent
                    analysis.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-lumina-100 px-3 py-1 text-sm text-lumina-800">
                    Scan Analysis
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                    3D DenseNet for Lung Cancer Classification
                  </h2>
                  <p className="max-w-[600px] text-black/60 md:text-xl">
                    Our advanced deep learning model analyzes CT and PET scans to accurately classify non-small cell
                    lung cancer subtypes.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="w-full bg-lumina-600 hover:bg-lumina-700 text-white" onClick={handleScanAnalysis}>
                    Upload Scans
                    <Upload className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-lumina-100 px-3 py-1 text-sm text-lumina-800">
                    Symptom Analysis
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                    Logistic Regression for Cancer Prediction
                  </h2>
                  <p className="max-w-[600px] text-black/60 md:text-xl">
                    Our symptom-based model predicts the likelihood of lung cancer based on patient symptoms and
                    demographic data.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="w-full bg-lumina-600 hover:bg-lumina-700 text-white" onClick={handleSymptomAnalysis}>
                    Enter Symptoms
                    <Brain className="ml-2 h-4 w-4" />
                  </Button>
                </div>
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
            <Link href="/terms" className="underline underline-offset-4 hover:text-lumina-600">
              Terms of Service
            </Link>
            <Link href="/privacy" className="underline underline-offset-4 hover:text-lumina-600">
              Privacy
            </Link>
            <Link href="/contact" className="underline underline-offset-4 hover:text-lumina-600">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

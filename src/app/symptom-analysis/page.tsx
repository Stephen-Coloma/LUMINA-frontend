"use client"

import { ArrowLeft, Brain } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SymptomForm } from "@/components/symptom-form"
import { PredictionResults } from "@/components/prediction-results"
import { useCustomToast } from "@/hooks/useCustomToast"

export default function SymptomAnalysisPage() {
  const [activeTab, setActiveTab] = useState("input")
  const [formData, setFormData] = useState({})
  const [isPredicting, setIsPredicting] = useState(false)
  const [predictionComplete, setPredictionComplete] = useState(false);
  const { showToast } = useCustomToast()

  const handleFormDataChange = (data: any) => {
    setFormData(data)
  }

  const handleGeneratePrediction = () => {
    // Check if at least some symptoms are selected
    const hasSymptoms = Object.values(formData).some((value) => value === true)

    if (!hasSymptoms) {
      showToast({
        title: "No symptoms selected",
        description: "Please select at least one symptom to generate a prediction.",
        variant: "destructive",
      })
      return
    }

    setIsPredicting(true)

    // Simulate prediction process
    setTimeout(() => {
      setIsPredicting(false)
      setPredictionComplete(true)
      setActiveTab("results")
      showToast({
        title: "Prediction complete",
        description: "Symptom analysis has been completed successfully.",
      })
    }, 2000)
  }

  const handleDownloadReport = () => {
    showToast({
      title: "Report downloaded",
      description: "The prediction report has been downloaded to your device.",
    })
  }

  const handleShareResults = () => {
    showToast({
      title: "Results shared",
      description: "A secure link to the results has been copied to your clipboard.",
    })
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to home</span>
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Image src="/images/lung-logo.png" width={32} height={32} alt="LUMINA logo" className="h-8 w-auto" />
          <h1 className="text-3xl font-bold">Symptom Analysis</h1>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-lumina-50">
          <TabsTrigger value="input" className="data-[state=active]:bg-lumina-600 data-[state=active]:text-white">
            Input Symptoms
          </TabsTrigger>
          <TabsTrigger
            value="results"
            className="data-[state=active]:bg-lumina-600 data-[state=active]:text-white"
            disabled={!predictionComplete}
          >
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="mt-6">
          <Card className="border-lumina-100">
            <CardHeader>
              <CardTitle>Symptom & Demographic Information</CardTitle>
              <CardDescription>
                Enter patient information to predict lung cancer likelihood using our logistic regression model
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SymptomForm onFormDataChange={handleFormDataChange} />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                className="bg-lumina-600 hover:bg-lumina-700 text-white"
                onClick={handleGeneratePrediction}
                disabled={isPredicting}
              >
                {isPredicting ? "Generating..." : "Generate Prediction"}
                <Brain className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="mt-6">
          <Card className="border-lumina-100">
            <CardHeader>
              <CardTitle>Prediction Results</CardTitle>
              <CardDescription>Logistic regression model prediction based on symptom analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <PredictionResults />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                className="border-lumina-600 text-lumina-600 hover:bg-lumina-50"
                onClick={handleDownloadReport}
              >
                Download Report
              </Button>
              <Button className="bg-lumina-600 hover:bg-lumina-700" onClick={handleShareResults}>
                Share Results
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

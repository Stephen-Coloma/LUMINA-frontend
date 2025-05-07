"use client"

import { ArrowLeft, Brain, LoaderCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SymptomForm, SymptomFormData } from "@/components/symptom-form"
import { PredictionResults } from "@/components/prediction-results"
import { useCustomToast } from "@/hooks/useCustomToast"
import { DSData, usePost } from "@/hooks/use-request"
import { API_BASE_URL } from "@/lib/constants"
import ProcessLoader from "@/components/process-loader"

export default function SymptomAnalysisPage() {
  const [activeTab, setActiveTab] = useState("input")
  const [predictionComplete, setPredictionComplete] = useState(false);
  const { showToast } = useCustomToast();
  const {status, statusText, data, error, loading: isPredicting, 
    executePostRequest , 
    clearResponseState 
  } = usePost<DSData>(`${API_BASE_URL}/api/diagnose`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const [formData, setFormData] = useState<SymptomFormData>({
    age: "",
    gender: "",
    smoking: false,
    yellowFingers: false,
    anxiety: false,
    peerPressure: false,
    chronicDisease: false,
    fatigue: false,
    allergy: false,
    wheezing: false,
    alcohol: false,
    coughing: false,
    shortnessOfBreath: false,
    swallowingDifficulty: false,
    chestPain: false,
  })

  const handleFormDataChange = (data: SymptomFormData) => {
    setFormData(data)
  }

  const handleGeneratePrediction = () => {
    // Check if at least some symptoms are selected
    const hasSymptoms = Object.values(formData!).some((value) => value === true);
    const hasAgeAndGender = formData.age !== '' && formData.gender !== '';

    if (!hasSymptoms) {
      showToast({
        title: "No symptoms selected",
        description: "Please select at least one symptom to generate a prediction.",
        variant: "destructive",
      })
      return;
    }else if(!hasAgeAndGender){
      showToast({
        title: "Provide Age and Gender",
        description: "Please input age and genter to generate a prediction.",
        variant: "destructive",
      })
      return;
    }

    // call the API
    executePostRequest(formData);
  }

  // useEffect that listens to backend response
  useEffect(() => {
    if (status === 200 && activeTab !=="results") {
      const timer = setTimeout(() => {
        setActiveTab("results");
        setPredictionComplete(true)
        showToast({
          title: "Prediction complete",
          description: "Symptom analysis has been completed successfully.",
        })
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [isPredicting])

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
          <Image src="/images/lumina-logo.svg" width={32} height={32} alt="LUMINA logo" className="h-8 w-auto" />
          <h1 className="text-3xl font-bold">Symptom Analysis</h1>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-lumina-50">
          <TabsTrigger 
            value="input" 
            className="data-[state=active]:bg-lumina-600 data-[state=active]:text-white"
            disabled={predictionComplete}  
          >
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
              <SymptomForm onFormDataChange={handleFormDataChange} initialFormData={formData} />
            </CardContent>
          </Card>

          {isPredicting ? (
            <ProcessLoader></ProcessLoader>
          ) : (
            <div className="mt-6 flex justify-end">
              <Button
                className="bg-lumina-600 hover:bg-lumina-700 text-white"
                onClick={handleGeneratePrediction}
                disabled={isPredicting}
              >
                Generate Prediction
                <Brain className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
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
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

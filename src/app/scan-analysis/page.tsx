"use client"

import { ArrowLeft, Share2, Printer, LoaderCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScanUploader } from "@/components/scan-uploader"
import { useCustomToast } from "@/hooks/useCustomToast"
import dicomToImage from "@/lib/dicom-parser"
import { API_BASE_URL, MIN_SLICES, ZIP_FILE_NAME, ZIPPED_SERVER_FIELD_NAME } from "@/lib/constants"
import { generateZip } from "@/lib/zip"
import { usePost } from "@/hooks/use-request"

export default function ScanAnalysisPage() {
  const [activeTab, setActiveTab] = useState("upload")
  const [ctFiles, setCtFiles] = useState<File[]>([])
  const [petFiles, setPetFiles] = useState<File[]>([])
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const { showToast } = useCustomToast()
  const {status, statusText, data, error, loading: isAnalyzing,
    executePostRequest,
    clearResponseState,
  } = usePost(`${API_BASE_URL}/api/predict`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  // First, add state variables to track current image indices
  // Add these after the other state declarations (around line 25)
  const [currentCtImageIndex, setCurrentCtImageIndex] = useState(0)
  const [currentPetImageIndex, setCurrentPetImageIndex] = useState(0)
  const [ctImageSrc, setCtImageSrc] = useState("")
  const [petImageSrc, setPetImageSrc] = useState("")

  // useEffect that listens to backend response
  useEffect(() => {
    if (status === 200 && activeTab !=="results") {
      const timer = setTimeout(() => {
        setActiveTab("results");
        setAnalysisComplete(true);
        showToast({
          title: "Analysis complete",
          description: "Scan analysis has been completed successfully.",
        })
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [isAnalyzing])

  // useEffect that loads the images for CT for carousel
  useEffect(() => {
    async function loadImage(dicomFile: File) {
      try {
        const imageSrc = await dicomToImage(dicomFile)
        setCtImageSrc(imageSrc)
      } catch (error) {
        console.error("Error processing DICOM image:", error)
        setCtImageSrc("/placeholder.svg")
      }
    }

    if (ctFiles.length > 0) {
      loadImage(ctFiles[currentCtImageIndex])
    }
  }, [ctFiles, currentCtImageIndex])

  // useEffect that loads the images for PET for carousel
  useEffect(() => {
    async function loadImage(dicomFile: File) {
      try {
        const imageSrc = await dicomToImage(dicomFile)
        setPetImageSrc(imageSrc)
      } catch (error) {
        console.error("Error processing DICOM image:", error)
        setPetImageSrc("/placeholder.svg")
      }
    }

    if (petFiles.length > 0) {
      loadImage(petFiles[currentPetImageIndex])
    }
  }, [petFiles, currentPetImageIndex])

  const handleRunAnalysis = async () => {
    if (ctFiles.length < 32 || petFiles.length < 32) {
      showToast({
        title: "Not enough files",
        description: "Please upload at least 32 CT and PET scan files to continue.",
        variant: "destructive",
      })
      return
    }

    const zipBlob = await generateZip(ctFiles, petFiles);

    const formData = new FormData()
    formData.append(ZIPPED_SERVER_FIELD_NAME, zipBlob, ZIP_FILE_NAME) // 'zippedDicom' is the server field name

    executePostRequest(formData) // calling the api endpoint
  }

  const handlePrintReport = () => {
    showToast({
      title: "Printing report",
      description: "The analysis report has been sent to the printer.",
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
          <h1 className="text-3xl font-bold">Scan Analysis</h1>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-lumina-50">
          <TabsTrigger
            value="upload"
            className="data-[state=active]:bg-lumina-600 data-[state=active]:text-white"
            disabled={analysisComplete}
          >
            Upload
          </TabsTrigger>
          <TabsTrigger
            value="results"
            className="data-[state=active]:bg-lumina-600 data-[state=active]:text-white"
            disabled={!analysisComplete}
          >
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-lumina-100">
              <CardHeader>
                <CardTitle>CT Scan Upload</CardTitle>
                <CardDescription>Upload your CT scan in DICOM format for analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ScanUploader scanType="CT" onFilesChange={setCtFiles} />
              </CardContent>
              <CardFooter className="text-xs text-black/60">Supported format: DICOM</CardFooter>
            </Card>

            <Card className="border-lumina-100">
              <CardHeader>
                <CardTitle>PET Scan Upload</CardTitle>
                <CardDescription>Upload your PET scan in DICOM format for analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ScanUploader scanType="PET" onFilesChange={setPetFiles} />
              </CardContent>
              <CardFooter className="text-xs text-black/60">Supported format: DICOM</CardFooter>
            </Card>
          </div>

          {isAnalyzing ? (
            <Card className="mt-6 border-lumina-100">
              <CardContent className="pt-6">
                <div className="space-y-4 text-center">
                  <h3 className="text-lg font-semibold">Analyzing Scans</h3>
                  <p className="text-sm text-black/60">
                    Please wait while we analyze your scans. This may take a few minutes.
                  </p>
                  <div className="flex justify-center my-6">
                    <LoaderCircle className="animate-spin" color="#00b7f5" size={40}></LoaderCircle>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="mt-6 flex justify-end">
              <Button
                className="bg-lumina-600 hover:bg-lumina-700 text-white"
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
              >
                Run Analysis
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="results" className="mt-6">
          <Card className="border-lumina-100">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>AI-assisted diagnosis to support clinical decision-making</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-lumina-100 p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-black/60">Diagnostic Assessment:</p>
                    <p className="text-3xl font-bold text-lumina-600">{data?.classification}</p>
                    <p className="mt-1 text-sm text-black/60">Non-small cell lung cancer</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/60">Confidence Level:</p>
                    <div className="flex items-end gap-2">
                      <p className="text-3xl font-bold">{data?.confidence}%</p>
                      {data?.confidence! >= 80 ? (
                          <span className="mb-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                            Very High Confidence
                          </span>
                        ) : data?.confidence! >= 60 ? (
                          <span className="mb-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                            High Confidence
                          </span>
                        ) : data?.confidence! >= 40 ? (
                          <span className="mb-1 rounded-full bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800">
                            Moderate Confidence
                          </span>
                        ) : (
                          <span className="mb-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                            Low Confidence
                          </span>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium">Uploaded Scan Images</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {ctFiles.length >= MIN_SLICES && (
                    <div className="rounded-lg border border-lumina-100 overflow-hidden">
                      <div className="p-3 bg-lumina-50 flex justify-between items-center">
                        <h4 className="font-medium">CT Scan</h4>
                        <span className="text-sm text-black/60">
                          Image {currentCtImageIndex + 1} of {ctFiles.length}
                        </span>
                      </div>
                      <div className="aspect-square relative">
                        <img
                          src={ctImageSrc || "/placeholder.svg"}
                          alt={`Uploaded CT scan ${currentCtImageIndex + 1}`}
                          className="object-contain w-full h-full p-2"
                        />

                        {ctFiles.length >= MIN_SLICES && (
                          <>
                            <button
                              onClick={() =>
                                setCurrentCtImageIndex((prev) => (prev > 0 ? prev - 1 : ctFiles.length - 1))
                              }
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                              aria-label="Previous image"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="15 18 9 12 15 6"></polyline>
                              </svg>
                            </button>
                            <button
                              onClick={() =>
                                setCurrentCtImageIndex((prev) => (prev < ctFiles.length - 1 ? prev + 1 : 0))
                              }
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                              aria-label="Next image"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="9 18 15 12 9 6"></polyline>
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {petFiles.length >= MIN_SLICES && (
                    <div className="rounded-lg border border-lumina-100 overflow-hidden">
                      <div className="p-3 bg-lumina-50 flex justify-between items-center">
                        <h4 className="font-medium">PET Scan</h4>
                        <span className="text-sm text-black/60">
                          Image {currentPetImageIndex + 1} of {petFiles.length}
                        </span>
                      </div>
                      <div className="aspect-square relative">
                        <img
                          src={petImageSrc || "/placeholder.svg"}
                          alt={`Uploaded PET scan ${currentPetImageIndex + 1}`}
                          className="object-contain w-full h-full p-2"
                        />

                        {petFiles.length > 1 && (
                          <>
                            <button
                              onClick={() =>
                                setCurrentPetImageIndex((prev) => (prev > 0 ? prev - 1 : petFiles.length - 1))
                              }
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                              aria-label="Previous image"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="15 18 9 12 15 6"></polyline>
                              </svg>
                            </button>
                            <button
                              onClick={() =>
                                setCurrentPetImageIndex((prev) => (prev < petFiles.length - 1 ? prev + 1 : 0))
                              }
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                              aria-label="Next image"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="9 18 15 12 9 6"></polyline>
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {ctFiles.length === 0 && petFiles.length === 0 && (
                    <div className="col-span-2 rounded-lg border border-lumina-100 p-6 text-center text-black/60">
                      No scan images were uploaded for this analysis.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                className="border-lumina-600 text-lumina-600 hover:bg-lumina-50 gap-2"
                onClick={handlePrintReport}
              >
                <Printer className="h-4 w-4" />
                Print Report
              </Button>
              <Button className="bg-lumina-600 hover:bg-lumina-700 gap-2" onClick={handleShareResults}>
                <Share2 className="h-4 w-4" />
                Share Results
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

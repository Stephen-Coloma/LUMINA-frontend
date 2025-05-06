"use client";

import { ArrowLeft, Share2, Printer } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScanUploader } from "@/components/scan-uploader";
import { Progress } from "@/components/ui/progress";
import { useCustomToast } from "@/hooks/useCustomToast";
import { Label } from "@/components/ui/label"; 

export default function ScanAnalysisPage() {
  const [activeTab, setActiveTab] = useState("upload");
  const [ctFiles, setCtFiles] = useState<File[]>([]);
  const [petFiles, setPetFiles] = useState<File[]>([]);
  const [ctImageUrl, setCtImageUrl] = useState("");
  const [petImageUrl, setPetImageUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const {showToast} = useCustomToast();

  // First, add state variables to track current image indices
  // Add these after the other state declarations (around line 25)
  const [currentCtImageIndex, setCurrentCtImageIndex] = useState(0);
  const [currentPetImageIndex, setCurrentPetImageIndex] = useState(0);
  const [ctImageUrls, setCtImageUrls] = useState<string[]>([]);
  const [petImageUrls, setPetImageUrls] = useState<string[]>([]);

  // First effect to handle progress and state updates
  useEffect(() => {
    if (isAnalyzing && processingProgress < 100) {
      const timer = setTimeout(() => {
        setProcessingProgress((prev) => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            setIsAnalyzing(false);
            setAnalysisComplete(true);
            return 100;
          }
          return newProgress;
        });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, processingProgress]);

  // Second effect to handle tab change and toast notification after analysis is complete
  useEffect(() => {
    if (
      analysisComplete &&
      processingProgress === 100 &&
      activeTab !== "results"
    ) {
      // Use setTimeout to ensure this happens after render is complete
      const timer = setTimeout(() => {
        setActiveTab("results");
        showToast({
          title: "Analysis complete",
          description: "Scan analysis has been completed successfully.",
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [analysisComplete, processingProgress, activeTab]);

  const handleRunAnalysis = () => {
    if (
      (ctFiles.length === 0 && petFiles.length === 0) ||
      (!ctImageUrl && !petImageUrl)
    ) {
      showToast({
        title: "No files uploaded",
        description:
          "Please upload at least one CT or PET scan file to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setProcessingProgress(0);
    // Analysis will be completed via the useEffect
  };

  const handlePrintReport = () => {
    showToast({
      title: "Printing report",
      description: "The analysis report has been sent to the printer.",
    });
  };

  const handleShareResults = () => {
    showToast({
      title: "Results shared",
      description:
        "A secure link to the results has been copied to your clipboard.",
    });
  };

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
          <Image
            src="/images/lung-logo.png"
            width={32}
            height={32}
            alt="LUMINA logo"
            className="h-8 w-auto"
          />
          <h1 className="text-3xl font-bold">Scan Analysis</h1>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-lumina-50">
          <TabsTrigger
            value="upload"
            className="data-[state=active]:bg-lumina-600 data-[state=active]:text-white"
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
                <CardDescription>
                  Upload your CT scan DICOM files or images for analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScanUploader
                  scanType="CT"
                  onFilesChange={setCtFiles}
                  onImageUrlChange={(url) => {
                    if (url) {
                      setCtImageUrl(url);
                      setCtImageUrls((prev) => [
                        ...prev.filter((u) => u !== url),
                        url,
                      ]);
                    }
                  }}
                />
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                Supported format: DICOM
              </CardFooter>
            </Card>

            <Card className="border-lumina-100">
              <CardHeader>
                <CardTitle>PET Scan Upload</CardTitle>
                <CardDescription>
                  Upload your PET scan DICOM files or images for analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScanUploader
                  scanType="PET"
                  onFilesChange={setPetFiles}
                  onImageUrlChange={(url) => {
                    if (url) {
                      setPetImageUrl(url);
                      setPetImageUrls((prev) => [
                        ...prev.filter((u) => u !== url),
                        url,
                      ]);
                    }
                  }}
                />
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                Supported format: DICOM
              </CardFooter>
            </Card>
          </div>

          {isAnalyzing ? (
            <Card className="mt-6 border-lumina-100">
              <CardContent className="pt-6">
                <div className="space-y-4 text-center">
                  <h3 className="text-lg font-semibold">Analyzing Scans</h3>
                  <p className="text-sm text-muted-foreground">
                    Please wait while we analyze your scans. This may take a few
                    minutes.
                  </p>
                  <Progress value={processingProgress} className="h-2 w-full" />
                  <p className="mt-2 text-sm">{processingProgress}% complete</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="mt-6 flex justify-end">
              <Button
                className="bg-lumina-600 hover:bg-lumina-700"
                onClick={handleRunAnalysis}
                disabled={(!ctImageUrl && !petImageUrl) || isAnalyzing}
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
              <CardDescription>
                AI-assisted diagnosis to support clinical decision-making
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-lumina-100 p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Diagnostic Assessment:
                    </p>
                    <p className="text-3xl font-bold text-lumina-600">
                      Adenocarcinoma
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Non-small cell lung cancer
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Confidence Level:
                    </p>
                    <div className="flex items-end gap-2">
                      <p className="text-3xl font-bold">87%</p>
                      <span className="mb-1 rounded-full bg-lumina-100 px-2 py-1 text-xs font-medium text-lumina-800">
                        High Confidence
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium">
                  Uploaded Scan Images
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {ctImageUrls.length > 0 && (
                    <div className="rounded-lg border border-lumina-100 overflow-hidden">
                      <div className="p-3 bg-lumina-50 flex justify-between items-center">
                        <h4 className="font-medium">CT Scan</h4>
                        <span className="text-sm text-muted-foreground">
                          Image {currentCtImageIndex + 1} of{" "}
                          {ctImageUrls.length}
                        </span>
                      </div>
                      <div className="aspect-square relative">
                        <img
                          src={
                            ctImageUrls[currentCtImageIndex] ||
                            "/placeholder.svg"
                          }
                          alt={`Uploaded CT scan ${currentCtImageIndex + 1}`}
                          className="object-contain w-full h-full p-2"
                        />

                        {ctImageUrls.length > 1 && (
                          <>
                            <button
                              onClick={() =>
                                setCurrentCtImageIndex((prev) =>
                                  prev > 0 ? prev - 1 : ctImageUrls.length - 1
                                )
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
                                setCurrentCtImageIndex((prev) =>
                                  prev < ctImageUrls.length - 1 ? prev + 1 : 0
                                )
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

                  {petImageUrls.length > 0 && (
                    <div className="rounded-lg border border-lumina-100 overflow-hidden">
                      <div className="p-3 bg-lumina-50 flex justify-between items-center">
                        <h4 className="font-medium">PET Scan</h4>
                        <span className="text-sm text-muted-foreground">
                          Image {currentPetImageIndex + 1} of{" "}
                          {petImageUrls.length}
                        </span>
                      </div>
                      <div className="aspect-square relative">
                        <img
                          src={
                            petImageUrls[currentPetImageIndex] ||
                            "/placeholder.svg"
                          }
                          alt={`Uploaded PET scan ${currentPetImageIndex + 1}`}
                          className="object-contain w-full h-full p-2"
                        />

                        {petImageUrls.length > 1 && (
                          <>
                            <button
                              onClick={() =>
                                setCurrentPetImageIndex((prev) =>
                                  prev > 0 ? prev - 1 : petImageUrls.length - 1
                                )
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
                                setCurrentPetImageIndex((prev) =>
                                  prev < petImageUrls.length - 1 ? prev + 1 : 0
                                )
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

                  {ctImageUrls.length === 0 && petImageUrls.length === 0 && (
                    <div className="col-span-2 rounded-lg border border-lumina-100 p-6 text-center text-muted-foreground">
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
              <Button
                className="bg-lumina-600 hover:bg-lumina-700 gap-2"
                onClick={handleShareResults}
              >
                <Share2 className="h-4 w-4" />
                Share Results
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

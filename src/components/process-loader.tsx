"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";

export default function ProcessLoader() {
  return (
    <Card className="mt-6 border-lumina-100">
      <CardContent className="pt-6 pb-8">
        <div className="space-y-4 text-center">
          <h3 className="text-lg font-semibold">Analyzing Data</h3>
          <p className="text-sm text-black/60">
            Please wait while we process your provided data. This may take a few minutes.
          </p>

          <div className="flex justify-center">
            <LoaderCircle className="animate-spin text-lumina-500" size={30}></LoaderCircle>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

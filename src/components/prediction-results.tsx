import { AlertCircle, CheckCircle, Info } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PredictionResults() {
  // Sample data for feature importance
  const featureImportanceData = [
    { name: "Smoking", value: 0.85 },
    { name: "Shortness of Breath", value: 0.78 },
    { name: "Chest Pain", value: 0.72 },
    { name: "Coughing", value: 0.65 },
    { name: "Yellow Fingers", value: 0.58 },
    { name: "Fatigue", value: 0.52 },
    { name: "Age", value: 0.48 },
    { name: "Wheezing", value: 0.45 },
    { name: "Chronic Disease", value: 0.42 },
    { name: "Swallowing Difficulty", value: 0.38 },
  ].sort((a, b) => b.value - a.value);

  return (
    <div className="space-y-6">
      <Alert variant="default" className="border-lumina-600/50 bg-lumina-50">
        <Info className="h-4 w-4 text-lumina-600" />
        <AlertTitle>Prediction Result</AlertTitle>
        <AlertDescription className="flex items-center gap-2">
          <span className="text-lg font-bold">
            78% probability of lung cancer
          </span>
          <span className="rounded-full bg-lumina-100 px-2 py-1 text-xs font-medium text-lumina-800">
            High Risk
          </span>
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-lumina-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              Most Contributing Symptoms
            </CardTitle>
            <CardDescription>
              Key symptoms associated with lung cancer risk
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-lumina-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lumina-100 text-xs font-medium text-lumina-800">
                    1
                  </span>
                  <span className="font-medium">Smoking</span>
                </div>
                <span className="font-medium text-lumina-600">85%</span>
              </div>

              <div className="flex items-center justify-between border-b border-lumina-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lumina-100 text-xs font-medium text-lumina-800">
                    2
                  </span>
                  <span className="font-medium">Shortness of Breath</span>
                </div>
                <span className="font-medium text-lumina-600">78%</span>
              </div>

              <div className="flex items-center justify-between border-b border-lumina-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lumina-100 text-xs font-medium text-lumina-800">
                    3
                  </span>
                  <span className="font-medium">Chest Pain</span>
                </div>
                <span className="font-medium text-lumina-600">72%</span>
              </div>

              <div className="flex items-center justify-between border-b border-lumina-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lumina-100 text-xs font-medium text-lumina-800">
                    4
                  </span>
                  <span className="font-medium">Coughing</span>
                </div>
                <span className="font-medium text-lumina-600">65%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lumina-100 text-xs font-medium text-lumina-800">
                    5
                  </span>
                  <span className="font-medium">Fatigue</span>
                </div>
                <span className="font-medium text-lumina-600">52%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-lumina-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Key Risk Factors</CardTitle>
            <CardDescription>
              Most significant factors in this prediction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border border-lumina-100 p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 text-lumina-600" />
                  <div>
                    <p className="font-medium">Smoking History</p>
                    <p className="text-sm text-muted-foreground">
                      Smoking is the leading cause of lung cancer, responsible
                      for about 85% of cases.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-lumina-100 p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 text-lumina-600" />
                  <div>
                    <p className="font-medium">Respiratory Symptoms</p>
                    <p className="text-sm text-muted-foreground">
                      Shortness of breath, chest pain, and persistent coughing
                      are common symptoms of lung cancer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-lumina-100 p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 text-lumina-600" />
                  <div>
                    <p className="font-medium">Age Factor</p>
                    <p className="text-sm text-muted-foreground">
                      The risk of lung cancer increases with age, with most
                      cases diagnosed in people aged 65 or older.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-lumina-100 p-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-lumina-600" />
                  <div>
                    <p className="font-medium">Recommended Action</p>
                    <p className="text-sm text-muted-foreground">
                      Based on these risk factors, further diagnostic imaging is
                      recommended. Consider CT or PET scanning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-lumina-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            Important Reminders for Lung Cancer Symptoms
          </CardTitle>
          <CardDescription>
            What to do if you&#39;re experiencing these symptoms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border border-lumina-100 bg-lumina-50 p-4">
              <h3 className="mb-2 font-medium text-lumina-800">
                Seek Medical Attention
              </h3>
              <p className="text-sm text-muted-foreground">
                If you experience persistent coughing, shortness of breath,
                chest pain, or coughing up blood, consult a healthcare provider
                immediately. Early detection significantly improves outcomes.
              </p>
            </div>

            <div className="rounded-lg border border-lumina-100 bg-lumina-50 p-4">
              <h3 className="mb-2 font-medium text-lumina-800">Quit Smoking</h3>
              <p className="text-sm text-muted-foreground">
                If you smoke, quitting is the most important step you can take.
                It&#39;s never too late - quitting at any age can reduce your risk
                and improve your overall health.
              </p>
            </div>

            <div className="rounded-lg border border-lumina-100 bg-lumina-50 p-4">
              <h3 className="mb-2 font-medium text-lumina-800">
                Know Your Risk Factors
              </h3>
              <p className="text-sm text-muted-foreground">
                Family history, exposure to radon, asbestos, or air pollution
                can increase your risk. Discuss these with your doctor to
                determine if you need regular screening.
              </p>
            </div>

            <div className="rounded-lg border border-lumina-100 bg-lumina-50 p-4">
              <h3 className="mb-2 font-medium text-lumina-800">
                Track Your Symptoms
              </h3>
              <p className="text-sm text-muted-foreground">
                Keep a record of when symptoms occur, their severity, and any
                factors that make them better or worse. This information will
                help your healthcare provider make an accurate diagnosis.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

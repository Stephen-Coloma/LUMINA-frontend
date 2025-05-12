import { AlertCircle, CheckCircle, Info } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DSData } from "@/hooks/use-request";

const top10Predictor = [
  'Couging',
  'Chronic Disease',
  'Fatigue',
  'Allergy',
  'Swallowing Difficulty',
  'Smoking',
  'Yellow Fingers',
  'Wheezing',
  'Anxiety',
  'Shortness of Breath',
]

export function PredictionResults({prediction, confidence}: DSData) {
  return (
    <div className="space-y-6">
      <Alert variant="default" className="relative border-lumina-600/50 bg-lumina-50">
        <Info className="absolute h-4 w-4 text-lumina-600" />
        <AlertTitle>Prediction Result</AlertTitle>
        <AlertTitle className="flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="text-center text-lg font-bold leading-none">
            {`${(confidence * 100).toFixed(2)}% chance of ${prediction === 1 ? 'Lung Cancer' : 'No Lung Cancer'}`}
          </span>
          <span
            className={`text-center rounded-full px-2 py-1 text-xs font-medium leading-none ${
              prediction === 1
                ? confidence * 100 >= 80
                  ? 'bg-red-100 text-red-800'
                  : confidence * 100 >= 60
                  ? 'bg-orange-100 text-orange-800'
                  : confidence * 100 >= 40
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-amber-100 text-amber-800'
                : confidence * 100 >= 80
                ? 'bg-green-100 text-green-800'
                : confidence * 100 >= 60
                ? 'bg-teal-100 text-teal-800'
                : confidence * 100 >= 40
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {confidence * 100 >= 80
              ? 'Very High Confidence'
              : confidence * 100 >= 60
              ? 'High Confidence'
              : confidence * 100 >= 40
              ? 'Moderate Confidence'
              : 'Low Confidence'}
          </span>
        </AlertTitle>
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
              {top10Predictor.map((predictor, index) => (
                <div key={index} className="flex items-center justify-between border-b border-lumina-100 pb-2 text-black/70">
                  <span className="font-medium">{predictor}</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lumina-100 text-xs font-medium text-lumina-800">
                    {index+1}
                  </span>
                </div>
              ))}
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
                    <p className="text-sm text-muted-foreground  text-black/70">
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
                    <p className="text-sm text-muted-foreground  text-black/70">
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
                    <p className="text-sm text-muted-foreground text-black/70">
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
                    <p className="text-sm text-muted-foreground text-black/70">
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
              <p className="text-sm text-muted-foreground text-black/70">
                If you experience persistent coughing, shortness of breath,
                chest pain, or coughing up blood, consult a healthcare provider
                immediately. Early detection significantly improves outcomes.
              </p>
            </div>

            <div className="rounded-lg border border-lumina-100 bg-lumina-50 p-4">
              <h3 className="mb-2 font-medium text-lumina-800">Quit Smoking</h3>
              <p className="text-sm text-muted-foreground text-black/70">
                If you smoke, quitting is the most important step you can take.
                It&#39;s never too late - quitting at any age can reduce your risk
                and improve your overall health.
              </p>
            </div>

            <div className="rounded-lg border border-lumina-100 bg-lumina-50 p-4">
              <h3 className="mb-2 font-medium text-lumina-800">
                Know Your Risk Factors
              </h3>
              <p className="text-sm text-muted-foreground text-black/70">
                Family history, exposure to radon, asbestos, or air pollution
                can increase your risk. Discuss these with your doctor to
                determine if you need regular screening.
              </p>
            </div>

            <div className="rounded-lg border border-lumina-100 bg-lumina-50 p-4">
              <h3 className="mb-2 font-medium text-lumina-800">
                Track Your Symptoms
              </h3>
              <p className="text-sm text-muted-foreground text-black/70">
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

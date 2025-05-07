"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon, TreesIcon as Lungs, Brain, Activity, Heart } from "lucide-react"
import { useCustomToast } from "@/hooks/useCustomToast"

interface SymptomFormProps {
  initialFormData: SymptomFormData
  onFormDataChange: (data: SymptomFormData) => void
}

export type SymptomFormData = {
  age: string,
  gender: string,
  smoking: boolean,
  yellowFingers: boolean,
  anxiety: boolean,
  peerPressure: boolean,
  chronicDisease: boolean,
  fatigue: boolean,
  allergy: boolean,
  wheezing: boolean,
  alcohol: boolean,
  coughing: boolean,
  shortnessOfBreath: boolean,
  swallowingDifficulty: boolean,
  chestPain: boolean,
}

export function SymptomForm({ onFormDataChange, initialFormData }: SymptomFormProps) {
  const { showToast } = useCustomToast();
  const [formData, setFormData] = useState<SymptomFormData>(initialFormData)

  const handleChange = (field: string, value: string | boolean) => {
    // additional logic for age
    if(field === 'age'){
      if(Number(value) < 0){
        showToast({
          title: "Invalid Age",
          description: "Age must be above 0 years old.",
          variant: "destructive"
        })
        return;
      }
    }

    // age is good
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSwitchChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked,
    }))
  }

  // useEffect that notifies the parent after change
  useEffect(()=>{
    onFormDataChange(formData);
  }, [formData])

  return (
    <div className="space-y-6">
      {/* Demographics section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-lumina-600" />
          <h3 className="font-medium text-lumina-800">Demographics</h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="age" className="font-medium">
                Age
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-lumina-600 " />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-60">Your age helps determine age-related risk factors.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="age"
              type="number"
              placeholder="Enter age"
              value={formData.age}
              onChange={(e) => handleChange("age", e.target.value)}
              className="border-lumina-200 focus-visible:ring-lumina-500 max-w-32"
              min="0"
              max="120"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="gender" className="font-medium">
                Gender
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-lumina-600  " />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-60">Some health conditions affect different genders differently.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <RadioGroup
              id="gender"
              value={formData.gender}
              onValueChange={(value) => handleChange("gender", value)}
              className="flex space-x-4 flex-grow"
            >
              <div className="flex items-center space-x-2 border border-lumina-200 rounded-lg p-3 flex-1 hover:bg-lumina-50 cursor-pointer">
                <RadioGroupItem value="male" id="male" className="text-lumina-600" />
                <Label htmlFor="male" className="cursor-pointer">
                  Male
                </Label>
              </div>
              <div className="flex items-center space-x-2 border border-lumina-200 rounded-lg p-3 flex-1 hover:bg-lumina-50 cursor-pointer">
                <RadioGroupItem value="female" id="female" className="text-lumina-600" />
                <Label htmlFor="female" className="cursor-pointer">
                  Female
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      <Separator className="bg-lumina-100" />

      {/* Respiratory symptoms */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Lungs className="h-5 w-5 text-lumina-600" />
          <h3 className="font-medium text-lumina-800">Respiratory Symptoms</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3 hover:bg-lumina-50 transition-colors">
            <div className="space-y-0.5">
              <Label htmlFor="coughing" className="cursor-pointer font-medium">
                Coughing
              </Label>
              <p className="text-xs text-gray-500">Persistent or recurring cough</p>
            </div>
            <Switch
              id="coughing"
              checked={formData.coughing}
              onCheckedChange={(checked) => handleSwitchChange("coughing", checked)}
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3 hover:bg-lumina-50 transition-colors">
            <div className="space-y-0.5">
              <Label htmlFor="shortnessOfBreath" className="cursor-pointer font-medium">
                Shortness of Breath
              </Label>
              <p className="text-xs text-gray-500">Difficulty breathing</p>
            </div>
            <Switch
              id="shortnessOfBreath"
              checked={formData.shortnessOfBreath}
              onCheckedChange={(checked) => handleSwitchChange("shortnessOfBreath", checked)}
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3 hover:bg-lumina-50 transition-colors">
            <div className="space-y-0.5">
              <Label htmlFor="wheezing" className="cursor-pointer font-medium">
                Wheezing
              </Label>
              <p className="text-xs text-gray-500">Whistling sound when breathing</p>
            </div>
            <Switch
              id="wheezing"
              checked={formData.wheezing}
              onCheckedChange={(checked) => handleSwitchChange("wheezing", checked)}
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>
        </div>
      </div>

      <Separator className="bg-lumina-100" />

      {/* Digestive symptoms */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-lumina-600" />
          <h3 className="font-medium text-lumina-800">Digestive & Chest Symptoms</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3 hover:bg-lumina-50 transition-colors">
            <div className="space-y-0.5">
              <Label htmlFor="swallowingDifficulty" className="cursor-pointer font-medium">
                Swallowing Difficulty
              </Label>
              <p className="text-xs text-gray-500">Trouble or pain when swallowing</p>
            </div>
            <Switch
              id="swallowingDifficulty"
              checked={formData.swallowingDifficulty}
              onCheckedChange={(checked) => handleSwitchChange("swallowingDifficulty", checked)}
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3 hover:bg-lumina-50 transition-colors">
            <div className="space-y-0.5">
              <Label htmlFor="chestPain" className="cursor-pointer font-medium">
                Chest Pain
              </Label>
              <p className="text-xs text-gray-500">Pain or discomfort in the chest area</p>
            </div>
            <Switch
              id="chestPain"
              checked={formData.chestPain}
              onCheckedChange={(checked) => handleSwitchChange("chestPain", checked)}
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>
        </div>
      </div>

      <Separator className="bg-lumina-100" />

      {/* General symptoms */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-lumina-600" />
          <h3 className="font-medium text-lumina-800">General Symptoms</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3 hover:bg-lumina-50 transition-colors">
            <div className="space-y-0.5">
              <Label htmlFor="fatigue" className="cursor-pointer font-medium">
                Fatigue
              </Label>
              <p className="text-xs text-gray-500">Persistent tiredness or weakness</p>
            </div>
            <Switch
              id="fatigue"
              checked={formData.fatigue}
              onCheckedChange={(checked) => handleSwitchChange("fatigue", checked)}
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3 hover:bg-lumina-50 transition-colors">
            <div className="space-y-0.5">
              <Label htmlFor="anxiety" className="cursor-pointer font-medium">
                Anxiety
              </Label>
              <p className="text-xs text-gray-500">Feelings of worry or unease</p>
            </div>
            <Switch
              id="anxiety"
              checked={formData.anxiety}
              onCheckedChange={(checked) => handleSwitchChange("anxiety", checked)}
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>
        </div>
      </div>

      <Separator className="bg-lumina-100" />

      {/* Risk factors */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <InfoIcon className="h-5 w-5 text-lumina-600" />
          <h3 className="font-medium text-lumina-800">Risk Factors</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3 hover:bg-lumina-50 transition-colors">
            <div className="space-y-0.5">
              <Label htmlFor="smoking" className="cursor-pointer font-medium">
                Smoking
              </Label>
              <p className="text-xs text-gray-500">Current or former tobacco use</p>
            </div>
            <Switch
              id="smoking"
              checked={formData.smoking}
              onCheckedChange={(checked) => handleSwitchChange("smoking", checked)}
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3 hover:bg-lumina-50 transition-colors">
            <div className="space-y-0.5">
              <Label htmlFor="yellowFingers" className="cursor-pointer font-medium">
                Yellow Fingers
              </Label>
              <p className="text-xs text-gray-500">Discoloration from nicotine</p>
            </div>
            <Switch
              id="yellowFingers"
              checked={formData.yellowFingers}
              onCheckedChange={(checked) => handleSwitchChange("yellowFingers", checked)}
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3 hover:bg-lumina-50 transition-colors">
            <div className="space-y-0.5">
              <Label htmlFor="alcohol" className="cursor-pointer font-medium">
                Alcohol Consumption
              </Label>
              <p className="text-xs text-gray-500">Regular alcohol consumption</p>
            </div>
            <Switch
              id="alcohol"
              checked={formData.alcohol}
              onCheckedChange={(checked) => handleSwitchChange("alcohol", checked)}
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3 hover:bg-lumina-50 transition-colors">
            <div className="space-y-0.5">
              <Label htmlFor="peerPressure" className="cursor-pointer font-medium">
                Peer Pressure
              </Label>
              <p className="text-xs text-gray-500">Social influence on behaviors</p>
            </div>
            <Switch
              id="peerPressure"
              checked={formData.peerPressure}
              onCheckedChange={(checked) => handleSwitchChange("peerPressure", checked)}
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3 hover:bg-lumina-50 transition-colors">
            <div className="space-y-0.5">
              <Label htmlFor="chronicDisease" className="cursor-pointer font-medium">
                Chronic Disease
              </Label>
              <p className="text-xs text-gray-500">Long-term health condition</p>
            </div>
            <Switch
              id="chronicDisease"
              checked={formData.chronicDisease}
              onCheckedChange={(checked) => handleSwitchChange("chronicDisease", checked)}
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3 hover:bg-lumina-50 transition-colors">
            <div className="space-y-0.5">
              <Label htmlFor="allergy" className="cursor-pointer font-medium">
                Allergy
              </Label>
              <p className="text-xs text-gray-500">Hypersensitivity to substances</p>
            </div>
            <Switch
              id="allergy"
              checked={formData.allergy}
              onCheckedChange={(checked) => handleSwitchChange("allergy", checked)}
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-lumina-50 border border-lumina-200 rounded-lg p-4 flex gap-3">
        <InfoIcon className="h-5 w-5 text-lumina-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-lumina-700">
            This assessment helps predict lung cancer likelihood. Please consult with a healthcare provider for proper
            diagnosis.
          </p>
        </div>
      </div>
    </div>
  )
}

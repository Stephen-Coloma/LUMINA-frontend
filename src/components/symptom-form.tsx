"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

interface SymptomFormProps {
  onFormDataChange?: (data: any) => void;
}

export function SymptomForm({ onFormDataChange }: SymptomFormProps) {
  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    if (onFormDataChange) {
      onFormDataChange(formData);
    }
  }, [formData, onFormDataChange]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSwitchChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter age"
            value={formData.age}
            onChange={(e) => handleChange("age", e.target.value)}
            className="border-lumina-200 focus-visible:ring-lumina-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <RadioGroup
            id="gender"
            value={formData.gender}
            onValueChange={(value) => handleChange("gender", value)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="male"
                id="male"
                className="text-lumina-600"
              />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="female"
                id="female"
                className="text-lumina-600"
              />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Symptoms & Risk Factors</h3>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3">
            <Label htmlFor="smoking" className="cursor-pointer">
              Smoking
            </Label>
            <Switch
              id="smoking"
              checked={formData.smoking}
              onCheckedChange={(checked) =>
                handleSwitchChange("smoking", checked)
              }
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3">
            <Label htmlFor="yellowFingers" className="cursor-pointer">
              Yellow Fingers
            </Label>
            <Switch
              id="yellowFingers"
              checked={formData.yellowFingers}
              onCheckedChange={(checked) =>
                handleSwitchChange("yellowFingers", checked)
              }
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3">
            <Label htmlFor="anxiety" className="cursor-pointer">
              Anxiety
            </Label>
            <Switch
              id="anxiety"
              checked={formData.anxiety}
              onCheckedChange={(checked) =>
                handleSwitchChange("anxiety", checked)
              }
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3">
            <Label htmlFor="peerPressure" className="cursor-pointer">
              Peer Pressure
            </Label>
            <Switch
              id="peerPressure"
              checked={formData.peerPressure}
              onCheckedChange={(checked) =>
                handleSwitchChange("peerPressure", checked)
              }
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3">
            <Label htmlFor="chronicDisease" className="cursor-pointer">
              Chronic Disease
            </Label>
            <Switch
              id="chronicDisease"
              checked={formData.chronicDisease}
              onCheckedChange={(checked) =>
                handleSwitchChange("chronicDisease", checked)
              }
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3">
            <Label htmlFor="fatigue" className="cursor-pointer">
              Fatigue
            </Label>
            <Switch
              id="fatigue"
              checked={formData.fatigue}
              onCheckedChange={(checked) =>
                handleSwitchChange("fatigue", checked)
              }
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3">
            <Label htmlFor="allergy" className="cursor-pointer">
              Allergy
            </Label>
            <Switch
              id="allergy"
              checked={formData.allergy}
              onCheckedChange={(checked) =>
                handleSwitchChange("allergy", checked)
              }
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3">
            <Label htmlFor="wheezing" className="cursor-pointer">
              Wheezing
            </Label>
            <Switch
              id="wheezing"
              checked={formData.wheezing}
              onCheckedChange={(checked) =>
                handleSwitchChange("wheezing", checked)
              }
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3">
            <Label htmlFor="alcohol" className="cursor-pointer">
              Alcohol Consumption
            </Label>
            <Switch
              id="alcohol"
              checked={formData.alcohol}
              onCheckedChange={(checked) =>
                handleSwitchChange("alcohol", checked)
              }
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3">
            <Label htmlFor="coughing" className="cursor-pointer">
              Coughing
            </Label>
            <Switch
              id="coughing"
              checked={formData.coughing}
              onCheckedChange={(checked) =>
                handleSwitchChange("coughing", checked)
              }
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3">
            <Label htmlFor="shortnessOfBreath" className="cursor-pointer">
              Shortness of Breath
            </Label>
            <Switch
              id="shortnessOfBreath"
              checked={formData.shortnessOfBreath}
              onCheckedChange={(checked) =>
                handleSwitchChange("shortnessOfBreath", checked)
              }
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3">
            <Label htmlFor="swallowingDifficulty" className="cursor-pointer">
              Swallowing Difficulty
            </Label>
            <Switch
              id="swallowingDifficulty"
              checked={formData.swallowingDifficulty}
              onCheckedChange={(checked) =>
                handleSwitchChange("swallowingDifficulty", checked)
              }
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 rounded-lg border border-lumina-100 p-3">
            <Label htmlFor="chestPain" className="cursor-pointer">
              Chest Pain
            </Label>
            <Switch
              id="chestPain"
              checked={formData.chestPain}
              onCheckedChange={(checked) =>
                handleSwitchChange("chestPain", checked)
              }
              className="data-[state=checked]:bg-lumina-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

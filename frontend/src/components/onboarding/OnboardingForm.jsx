// First, we'll integrate the RoleContext with the OnboardingForm component

// OnboardingForm.jsx with role-based form selection
import React, { useState } from "react";
import { X } from "lucide-react";
import { Welcome } from "./FormSteps/Welcome";
import { StepOne } from "./FormSteps/StepOne";
import { StepTwo } from "./FormSteps/StepTwo";
import { StepThree } from "./FormSteps/StepThree";
import { StepFour } from "./FormSteps/StepFour";
import { StepFive } from "./FormSteps/StepFive";
import { Confirmation } from "./FormSteps/Confirmation";
import { FresherStepThree } from "./FormSteps/FresherStepThree";
import { FresherStepFour } from "./FormSteps/FresherStepFour";
import { useRole } from "../../context/RoleContext/RoleContext.jsx";


export const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const { selectedRole, setSelectedRole } = useRole();

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleCancel = () => {
    if (
      confirm(
        "Are you sure you want to cancel? All your progress will be lost.",
      )
    ) {
      setCurrentStep(0);
      setFormData({});
      setSelectedRole(null);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted with data:", formData);
    alert("Form submitted successfully!");
    setCurrentStep(0);
    setFormData({});
    setSelectedRole(null);
  };

  const handleProfileTypeSelection = (profileType) => {
    setSelectedRole(profileType);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Welcome onNext={handleNext} onCancel={handleCancel} />;
      case 1:
        return <StepOne onNext={handleNext} onCancel={handleCancel} />;
      case 2:
        return <StepTwo 
          onNext={handleNext} 
          onCancel={handleBack} 
          onProfileTypeSelect={handleProfileTypeSelection}
        />;
      case 3:
        // Choose between student and fresher form for step 3
        return selectedRole === "fresher" ? (
          <FresherStepThree onNext={handleNext} onBack={handleBack} onCancel={handleCancel} />
        ) : (
          <StepThree onNext={handleNext} onBack={handleBack} onCancel={handleCancel} />
        );
      case 4:
        // Choose between student and fresher form for step 4
        return selectedRole === "fresher" ? (
          <FresherStepFour onNext={handleNext} onBack={handleBack} />
        ) : (
          <StepFour onNext={handleNext} onBack={handleBack} />
        );
      case 5:
        return <StepFive onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <Confirmation onSubmit={handleSubmit} onCancel={handleBack} />;
      default:
        return <Welcome onNext={handleNext} onCancel={handleCancel} />;
    }
  };

  return (
    <div className="bg-white overflow-hidden">
      <div className="bg-[rgba(0,0,0,0.25)] relative flex min-h-[900px] w-full items-start gap-[40px_80px] overflow-hidden justify-center px-16 py-28 max-md:max-w-full max-md:px-5 max-md:py-[100px]">
        {renderStep()}
        <button
          onClick={handleCancel}
          className="aspect-[1] object-contain w-6 absolute z-0 shrink-0 h-6 right-4 top-4 text-white cursor-pointer"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
"use client";

import { useState } from "react";

import AutoMLHeader from "@/components/Header";
import AutoMLOnboardingStepper from "@/components/OnboardingStepper";
import AutoMLFooter from "@/components/Footer";
import AutoMLWizard from "@/components/Wizard";

import styles from "./page.module.css";

export default function Home() {
  const [step, setStep] = useState(0);
  const [stepComplete, setStepComplete] = useState(false);

  return (
    <>
      <header>
        <AutoMLHeader />
      </header>
      <main className={styles.main}>
        <div className={styles.content}>
          <AutoMLOnboardingStepper step={step} />
          <AutoMLWizard
            step={step}
            stepComplete={stepComplete}
            setStepComplete={setStepComplete}
          />
          <AutoMLFooter
            setStep={setStep}
            stepComplete={stepComplete}
            setStepComplete={setStepComplete}
          />
        </div>
      </main>
    </>
  );
}

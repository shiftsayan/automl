import { useState, Dispatch, SetStateAction } from "react";

import AutoMLPreviewWizard from "./PreviewWizard";
import AutoMLSetupWizard from "./SetupWizard";
import AutoMLUploadWizard from "./UploadWizard";
import AutoMLTrainingWizard from "./TrainingWizard";
import AutoMLTestingWizard from "./TestingWizard";

type AutoMLWizardProps = {
  step: number;
  stepComplete: boolean;
  setStepComplete: Dispatch<SetStateAction<boolean>>;
};

export default function AutoMLWizard({
  step,
  stepComplete,
  setStepComplete,
}: AutoMLWizardProps) {
  const [filename, setFilename] = useState<string>("");
  const [inputColumns, setInputColumns] = useState<string[]>([]);
  const [outputColumns, setOutputColumns] = useState<string[]>([]);

  switch (step) {
    case 0:
      return (
        <AutoMLUploadWizard
          setStepComplete={setStepComplete}
          setFilename={setFilename}
        />
      );
    case 1:
      return (
        <AutoMLPreviewWizard
          setStepComplete={setStepComplete}
          filename={filename}
        />
      );
    case 2:
      return (
        <AutoMLSetupWizard
          setStepComplete={setStepComplete}
          inputColumns={inputColumns}
          setInputColumns={setInputColumns}
          outputColumns={outputColumns}
          setOutputColumns={setOutputColumns}
          filename={filename}
        />
      );
    case 3:
      return (
        <AutoMLTrainingWizard
          stepComplete={stepComplete}
          setStepComplete={setStepComplete}
          inputColumns={inputColumns}
          outputColumns={outputColumns}
          filename={filename}
        />
      );
    case 4:
      return (
        <AutoMLTestingWizard
          filename={filename}
          setStepComplete={setStepComplete}
          inputColumns={inputColumns}
          outputColumns={outputColumns}
        />
      );
    default:
      return <></>;
  }
}

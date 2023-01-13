import { Dispatch, SetStateAction, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AutoMLService from "@/services/AutoMLService";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

type AutoMLTrainingWizardProps = {
  setStepComplete: Dispatch<SetStateAction<boolean>>;
  inputColumns: string[];
  outputColumns: string[];
  filename: string;
  stepComplete: boolean;
};

export default function AutoMLTrainingWizard({
  setStepComplete,
  inputColumns,
  outputColumns,
  filename,
  stepComplete,
}: AutoMLTrainingWizardProps) {
  const [loading, setLoading] = useState(false);

  function onTrain() {
    async function fetchData() {
      await AutoMLService.train(filename, inputColumns, outputColumns);
      setStepComplete(true);
      setLoading(false);
    }
    setLoading(true);
    fetchData();
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" mb={1}>
        Train Your Model
      </Typography>
      <Typography maxWidth="60%">
        We will train a simple machine learning model on the data you uploaded.
        We will use the use the following columns as input features:{" "}
        {inputColumns.join(", ")} and the following column as the output:{" "}
        {outputColumns.join(", ")}.
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        {loading ? (
          <LoadingButton
            loading
            loadingPosition="start"
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Training
          </LoadingButton>
        ) : (
          <Button variant="contained" onClick={onTrain}>
            {stepComplete ? "Re-Train" : "Train"}
          </Button>
        )}
      </Box>
    </Box>
  );
}

import { Dispatch, SetStateAction, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AutoMLService from "@/services/AutoMLService";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

type AutoMLTrainingWizardProps = {
  setStepComplete: Dispatch<SetStateAction<boolean>>;
  inputColumns: string[];
  outputColumns: string[];
  filename: string;
};

export default function AutoMLTrainingWizard({
  inputColumns,
  outputColumns,
  filename,
}: AutoMLTrainingWizardProps) {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<Record<string, string>>(
    inputColumns.reduce((acc: Record<string, string>, cur: string) => {
      acc[cur] = "";
      return acc;
    }, {})
  );
  const [result, setResult] = useState<string>("");

  const onTest = async () => {
    setLoading(true);
    const response = await AutoMLService.test(filename, payload, outputColumns);
    const { result } = response.data;
    setResult(result);
    setLoading(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" mb={1}>
        Test Your Model
      </Typography>
      <Typography maxWidth="60%">
        You can test your model by entering values for each input column and
        seeing what the model thinks is the probability of the output column
        being true.
      </Typography>
      <FormControl sx={{ width: 600, marginTop: 2 }}>
        {Object.keys(payload).map((key) => (
          <Box key={key} sx={{ width: "100%", marginBottom: 2 }}>
            <TextField
              label={key}
              value={payload[key]}
              type="number"
              onChange={(e) =>
                setPayload({ ...payload, [key]: e.target.value })
              }
              variant="outlined"
              fullWidth
            />
          </Box>
        ))}
        <Box sx={{ width: "100%", marginBottom: 4 }}>
          {loading ? (
            <LoadingButton
              loading
              loadingPosition="start"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Running
            </LoadingButton>
          ) : (
            <Button variant="contained" onClick={onTest}>
              Submit
            </Button>
          )}
        </Box>
        <Box key="output" sx={{ width: "100%", marginBottom: 2 }}>
          <TextField
            label={outputColumns[0]}
            value={result}
            variant="filled"
            fullWidth
            disabled
          />
        </Box>
      </FormControl>
    </Box>
  );
}

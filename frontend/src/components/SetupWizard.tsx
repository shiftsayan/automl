import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import AutoMLService from "@/services/AutoMLService";

type AutoMLSetupWizardProps = {
  setStepComplete: Dispatch<SetStateAction<boolean>>;
  inputColumns: string[];
  setInputColumns: Dispatch<SetStateAction<string[]>>;
  outputColumns: string[];
  setOutputColumns: Dispatch<SetStateAction<string[]>>;
  filename: string;
};

export default function AutoMLSetupWizard({
  setStepComplete,
  inputColumns,
  setInputColumns,
  outputColumns,
  setOutputColumns,
  filename,
}: AutoMLSetupWizardProps) {
  const [allInputs, setAllInputs] = useState<string[]>([]);
  const [allOutputs, setAllOutputs] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await AutoMLService.setup(filename);
      const { inputs, outputs } = response.data;
      setAllInputs(inputs);
      setAllOutputs(outputs);
    }
    fetchData();
  }, [filename]);

  useEffect(() => {
    if (inputColumns.length && outputColumns.length) {
      setStepComplete(true);
    } else {
      setStepComplete(false);
    }
  }, [inputColumns, outputColumns, setStepComplete]);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" mb={1}>
        Setup Your Model
      </Typography>
      <Typography maxWidth="60%">
        We will train a simple machine learning model on the data you uploaded.
        You can select which column is the output you want the model predict and
        which of the other columns constitute input features for the model.
      </Typography>
      <AutoMLSetupWizardSelector
        values={inputColumns}
        setValues={setInputColumns}
        allValues={allInputs}
        multiple
        field="Input Columns"
      />
      <AutoMLSetupWizardSelector
        values={outputColumns}
        setValues={setOutputColumns}
        allValues={allOutputs}
        field="Output Column"
      />
    </Box>
  );
}

type AutoMLSetupWizardSelectorProps = {
  values: string[];
  setValues: Dispatch<SetStateAction<string[]>>;
  allValues: string[];
  field: string;
  multiple?: boolean;
};

function AutoMLSetupWizardSelector({
  values,
  setValues,
  allValues,
  field,
  multiple,
}: AutoMLSetupWizardSelectorProps) {
  const handleChange = (event: SelectChangeEvent<typeof values>) => {
    const {
      target: { value },
    } = event;
    setValues(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <Typography variant="h6" mt={2} mb={1}>
        Select the {field}
      </Typography>
      <FormControl sx={{ width: 600 }}>
        <InputLabel>{field}</InputLabel>
        <Select
          multiple={multiple}
          value={values}
          onChange={handleChange}
          input={<OutlinedInput label={field} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {allValues.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

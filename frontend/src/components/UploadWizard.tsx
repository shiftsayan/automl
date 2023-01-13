import { Dispatch, SetStateAction, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AutoMLService from "@/services/AutoMLService";

type AutoMLUploadWizardProps = {
  setStepComplete: Dispatch<SetStateAction<boolean>>;
  setFilename: Dispatch<SetStateAction<string>>;
};

export default function AutoMLUploadWizard({
  setStepComplete,
  setFilename,
}: AutoMLUploadWizardProps) {
  const [currentFile, setCurrentFile] = useState<File>();

  const onSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
  };

  const onUpload = async () => {
    if (!currentFile) return;
    await AutoMLService.upload(currentFile, () => {});
    setFilename(currentFile.name);
    setStepComplete(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" mb={1}>
        Upload Your Data
      </Typography>
      <Typography maxWidth="60%">
        You can upload a spreadsheet where each row is an example training
        datapoint for your dataset. Numerical columns will be used as potential
        inputs and boolean columns will be used as potential outputs.
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" component="label">
          Select File
          <input type="file" onChange={onSelect} hidden />
        </Button>
        {currentFile && (
          <Typography display="inline" ml={1}>
            {currentFile.name}
          </Typography>
        )}
      </Box>
      {currentFile && (
        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" onClick={onUpload}>
            Upload
          </Button>
        </Box>
      )}
    </Box>
  );
}

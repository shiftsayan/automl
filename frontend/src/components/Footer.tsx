import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Dispatch, SetStateAction } from "react";

type AutoMLFooterProps = {
  setStep: Dispatch<SetStateAction<number>>;
  stepComplete: boolean;
  setStepComplete: Dispatch<SetStateAction<boolean>>;
};

export default function AutoMLFooter({
  setStep,
  stepComplete,
  setStepComplete,
}: AutoMLFooterProps) {
  return (
    <Box
      sx={{
        marginTop: "1rem",
        width: "100%",
        display: "flex",
        flexDirection: "row-reverse",
      }}
    >
      <Button
        variant="contained"
        disabled={!stepComplete}
        onClick={() => {
          setStep((prev: number) => prev + 1);
          setStepComplete(false);
        }}
      >
        Next
      </Button>
    </Box>
  );
}

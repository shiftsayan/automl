import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AutoMLService from "@/services/AutoMLService";

type AutoMLPreviewWizardProps = {
  setStepComplete: Dispatch<SetStateAction<boolean>>;
  filename: string;
};

export default function AutoMLPreviewWizard({
  setStepComplete,
  filename,
}: AutoMLPreviewWizardProps) {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await AutoMLService.preview(filename);
      const { rows, columns } = response.data;
      setRows(rows);
      setColumns(columns);
      setStepComplete(true);
    }
    fetchData();
  }, [filename]);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" mb={1}>
        Preview Your Data
      </Typography>
      <Box sx={{ height: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </Box>
  );
}

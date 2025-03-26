import React, { useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { ptBR } from "@mui/x-data-grid/locales";

type DataGridComponentProps = {
  rows: any[];
  columns: GridColDef[];
  pageSize?: number;
};

const DataGridComponent = ({
  rows,
  columns,
  pageSize = 10,
}: DataGridComponentProps) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize,
  });

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows || []}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataGridComponent;

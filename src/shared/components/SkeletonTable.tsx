import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

const SkeletonTable = () => {
  const rows = 6;
  const columns = 6;

  return (
    <Stack
      sx={{
        width: "100%",
        margin: "20px 0",
        border: "1px solid #e0e0e0",
        p: 2,
        borderRadius: 1,
      }}
    >
      <Grid container spacing={1}>
        {Array.from({ length: columns }).map((_, index) => (
          <Grid item xs key={`header-${index}`}>
            <Skeleton variant="text" height={20} />
          </Grid>
        ))}
      </Grid>

      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Grid container spacing={1} key={`row-${rowIndex}`}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Grid item xs key={`row-${rowIndex}-col-${colIndex}`}>
              <Skeleton variant="rectangular" height={30} sx={{ mt: 2 }} />
            </Grid>
          ))}
        </Grid>
      ))}
    </Stack>
  );
};

export default SkeletonTable;

import { useState } from "react";
import Button from "@/shared/components/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

interface ToastAlertProps {
  message: string;
  severity: "info" | "warning" | "success" | "error";
}

export default function ToastAlert({ message, severity }: ToastAlertProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Button onClick={handleClick} text="Abrir notificação" />
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

import { ReactNode } from "react";
import { LoadingButton } from "@mui/lab";

interface ButtonProps {
  color?: "primary" | "warning" | "error" | "success";
  variant?: "contained" | "text" | "outlined";
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit";
  icon?: ReactNode;
  fullWidth?: boolean;
}

const Button = ({
  variant = "contained",
  color = "primary",
  text,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  icon = null,
  fullWidth = false,
}: ButtonProps) => {
  return (
    <LoadingButton
      type={type}
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      startIcon={icon}
      fullWidth={fullWidth}
      disableElevation
    >
      {text}
    </LoadingButton>
  );
};

export default Button;

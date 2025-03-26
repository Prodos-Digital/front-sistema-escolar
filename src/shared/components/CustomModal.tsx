import { ReactNode } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

// Custom components
import TextTitle from "@/shared/components/TextTitle";

//Icons
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  actions?: ReactNode;
  size?: "small" | "medium";
}

const CustomModal = ({
  open,
  onClose,
  title,
  children,
  actions,
  size = "small",
}: CustomModalProps) => {
  return (
    <Modal
      open={open}
      // onClose={onClose}
      aria-labelledby="custom-modal-title"
      aria-describedby="custom-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          maxWidth: size === "small" ? "600px" : "900px",
          width: "100%",
          maxHeight: "90%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column", // Facilita o layout do header, content e footer
        }}
      >
        {title && (
          <Box
            sx={{
              p: 2,
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextTitle title={title} />
            </Box>
            <IconButton color="error" onClick={onClose}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
        )}

        <Box
          id="custom-modal-content"
          sx={{
            p: 2,
            overflowY: "auto",
            // flexGrow: 1, // Permite que o conteúdo ocupe o espaço restante
          }}
        >
          {children}
        </Box>

        {actions && (
          <Box
            display="flex"
            justifyContent="flex-end"
            gap={1}
            sx={{
              borderTop: "1px solid #d6d6d6",
              p: 2,
              backgroundColor: "#f7f7f7",
            }}
          >
            {actions}
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default CustomModal;

import { GlobalStyles } from "@mui/material";

export default function MUIGlobalStyles() {
  return (
    <GlobalStyles
      styles={{
        "*": {
          margin: 0,
          padding: 0,
          outline: 0,
          boxSizing: "border-box",
        },
        "html, body, :root": {
          scrollBehavior: "smooth",
          overflowX: "hidden",
        },
        "#root, body": {
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        },
        /* Scrollbar */
        "::-webkit-scrollbar": {
          width: "4px",
          height: "4px",
        },
        "::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#ccc",
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#a8a8a8",
        },
        "::-webkit-scrollbar-thumb:disabled": {
          background: "#ccc",
        },
      }}
    />
  );
}

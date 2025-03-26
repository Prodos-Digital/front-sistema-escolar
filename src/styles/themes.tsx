import { createTheme, ThemeProvider } from "@mui/material/styles";

//Editar codigo para gerar um tema customizado para carregar na aplicação.

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#212121",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f4f4f4",
      paper: "#ffffff",
    },
  },
});

export default customTheme;

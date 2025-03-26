import localFont from "next/font/local";

import LayoutClientComponentWrapper from "./layout-client";
import SessionAuthClientProvider from "@/context/SessionAuthClientProvider";
import TanstackQueryProvider from "@/context/TanstackQueryProvider";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

//Arquivos de fontes
// const montserrat = localFont({
//   src: "../../public/fonts/Montserrat/Montserrat-Regular.ttf",
//   variable: "--font-montserrat-regular",
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* <body className={`${montserrat.variable}`}> */}
      <body>
        <SessionAuthClientProvider>
          <TanstackQueryProvider>
            <LayoutClientComponentWrapper>
              {children}
            </LayoutClientComponentWrapper>
          </TanstackQueryProvider>
        </SessionAuthClientProvider>
      </body>
    </html>
  );
}

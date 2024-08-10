import "../globals.css";
import { ThemeProvider } from "../components/Theme/ThemeContext";
import { Providers } from "./providers";
import { PropsWithChildren } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "React App",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider>
            <div className="wrapper">{children}</div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

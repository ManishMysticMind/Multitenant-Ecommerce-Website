"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import Footer from "../components/ui/Footer/Footer";
import Header from "../components/ui/Header/Header";
import Header2 from "../components/ui/Header/Header2";
import { AuthProvider } from "../hooks/auth/useAuth";
import StyledComponentsRegistry from "../lib/registry";
import { defaultTheme } from "../lib/utils/utils";

const queryClient = new QueryClient();
interface ThemeProps {
  children: ReactNode;
  theme: typeof defaultTheme;
}
type ThomePageContent = {
  component: string;
};
export type TSiteInfo = {
  owner_email: string;
  owner_phone: string;
  logo_url: string;
  description: string;
  store_location: string;
  homepage_content: ThomePageContent[];
};

export default function ClientWrapperProvider({
  children,
  theme,
  siteInfo,
}: {
  children: ReactNode;
  theme: typeof defaultTheme;
  siteInfo: any;
}) {
  // const { logo_url: logoUrl } = siteInfo;

  const headerId =
    siteInfo?.homepage_content
      ?.filter((component: any) =>
        component.component.startsWith("HEADER_TYPE")
      )
      .map((component: any) => {
        const parts = component.component.split("_");
        return Number(parts[parts.length - 1]);
      })[0] ?? 1;
  const footerId =
    siteInfo?.homepage_content
      ?.filter((component: any) =>
        component.component.startsWith("FOOTER_TYPE")
      )
      .map((component: any) => {
        const parts = component.component.split("_");
        return Number(parts[parts.length - 1]);
      })[0] ?? 1;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <StyledComponentsRegistry>
            <ToastContainer />
            <div
              className="d-flex flex-column justify-content-between min-vh-100"
              style={{ overflowX: "hidden" }}
            >
              {headerId === 1 && <Header logoUrl={siteInfo.logo_url} />}
              {headerId === 2 && <Header2 logoUrl={siteInfo.logo_url} />}
              {children}
              {footerId === 1 && <Footer siteInfo={siteInfo} />}
              {footerId === 2 && <Footer siteInfo={siteInfo} />}
            </div>
          </StyledComponentsRegistry>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

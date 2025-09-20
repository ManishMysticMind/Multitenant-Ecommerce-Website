import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import ClientWrapperProvider from "./ClientWrapperProvider";
import "./style.css";
import { getPageData } from "../hooks/api/webPage";
import { defaultTheme } from "../lib/utils/utils";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageData();

  return {
    title: pageData.name,
    description: pageData.description ?? "Grocery all in one place",
    openGraph: {
      title: pageData.name ?? "",
      description: pageData.description ?? "",
      url: pageData.domain ?? "",
      siteName: pageData.name ?? "",
      images: [pageData.logo_url ?? ""],
    },
  };
}
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
async function fetchTheme(proxyHeader: string | null) {
  const activeTenantDomain = (
    process.env.NEXT_PUBLIC_LOCAL_TENANT_URL ?? ""
  ).split("/")[2];

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (activeTenantDomain) {
    headers["Tenant-Header"] = activeTenantDomain;
  } else {
    headers["X-Proxy-Header"] = proxyHeader || "";
    headers["Origin"] = "https://" + (proxyHeader || "");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tenant/detail/`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    }
  );
  if (!res.ok) {
    // throw new Error("Failed to fetch theme data");
    return {};
  }
  return res.json();
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const incomingHeaders = await headers();
  const proxyHeader =
    incomingHeaders.get("x-forwarded-host") || incomingHeaders.get("host");
  const theme = await fetchTheme(proxyHeader);
  return (
    <html lang="en">
      {theme.favicon ? (
        <link rel="icon" href={theme.favicon} type="image/x-icon" />
      ) : (
        <link rel="icon" href="/icons/favicon_default.png" type="image/png" />
      )}
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientWrapperProvider
          theme={{
            ...defaultTheme,
            colors: theme?.theme_color?.colors || defaultTheme.colors,
          }}
          siteInfo={theme}
        >
          {children}
        </ClientWrapperProvider>
      </body>
    </html>
  );
}

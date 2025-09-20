import { headers } from "next/headers";
import { cache } from "react";

const internalFetchApi = async (endpoint: string, options?: RequestInit) => {
  const incomingHeaders = await headers();
  const proxyHeader =
    incomingHeaders.get("x-forwarded-host") || incomingHeaders.get("host");
  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  requestHeaders["X-Proxy-Header"] = proxyHeader || "";
  requestHeaders["Origin"] = "https://" + (proxyHeader || "");

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const activeTenantDomain = (
    process.env.NEXT_PUBLIC_LOCAL_TENANT_URL ?? ""
  ).split("/")[2];
  const tenantHeader = activeTenantDomain;

  if (activeTenantDomain) {
    requestHeaders["Tenant-Header"] = activeTenantDomain;
  } else {
    requestHeaders["X-Proxy-Header"] = proxyHeader || "";
    requestHeaders["Origin"] = "https://" + (proxyHeader || "");
  }

  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      ...options,
      headers: requestHeaders,
    });

    if (!response.ok) {
      // Attempt to parse JSON error response if available, otherwise use status text
      const errorBody = await response.text().catch(() => response.statusText);
      return new Error(
        `Failed to fetch ${endpoint}: ${response.status} ${errorBody}`
      );
    }

    return await response.json();
  } catch (error) {
    // Handle network errors or other exceptions during the fetch call
    if (error instanceof Error) {
      return new Error(
        `Network or unexpected error fetching ${endpoint}: ${error.message}`
      );
    }
    return new Error(`An unknown error occurred while fetching ${endpoint}`);
  }
};

// this is for the policy pages
export const getWebPage = cache(async (page_name: string) => {
  return internalFetchApi(`/api/webcontent/${page_name}/`);
});

// this gives the tenent details
export const getPageData = cache(async () => {
  return internalFetchApi(`/api/tenant/detail`);
});

export const getBlogPage = cache(async (slug: string) => {
  return internalFetchApi(`/api/blog-details/${slug}`);
});

export const getProductPage = cache(async (slug: string) => {
  return internalFetchApi(`/api/product/${slug}`);
});

export const getCategoryPage = cache(async (slug: string) => {
  return internalFetchApi(`/api/category/${slug}`);
});

import axios from "axios";
import { guestLoginCredentials } from "./auth/guestLogin";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const authHeader = (url: string) => {
  const user = localStorage.getItem("active_user");
  const activeTenatDomain = (
    process.env.NEXT_PUBLIC_LOCAL_TENANT_URL ?? ""
  ).split("/")[2];
  const tenantHeader = activeTenatDomain;
  const token = user && JSON.parse(user).access;

  if (tenantHeader) {
    return {
      Authorization: `Bearer ${token}`,
      "Tenant-Header": tenantHeader,
    };
  } else if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  } else {
    return {};
  }
};

const getReq = async (url: string) => {
  const requestOptions = {
    headers: {
      ...authHeader(url),
    },
  };
  try {
    const response = await axios.get(url, requestOptions);
    return response;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log("401 error");
      localStorage.removeItem("active_user");
      await guestLoginCredentials();
      const response = await axios.get(url, requestOptions);
      return response;
    }
    throw error;
  }
};

const postReq = async (url: string, data: any) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(url),
    },
  };
  const response = await axios.post(url, JSON.stringify(data), requestOptions);
  return response;
};

const putReq = async (url: string, data: any) => {
  const requestOptions = {
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(data),
  };
  const response = await axios.put(url, data, requestOptions);
  return response;
};

const patchReq = async (url: string, data: any) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(url),
    },
    body: JSON.stringify(data),
  };
  const response = await axios.patch(url, data, requestOptions);
  return response.data;
};

const deleteReq = async (url: string) => {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(url),
  };
  const response = await axios.delete(url, requestOptions);
  return response;
};
// for form data
const formPost = async (url: string, formData: FormData) => {
  const requestOptions = {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      ...authHeader(url),
    },
    // body: formData,
  };
  const response = await axios.post(url, formData, requestOptions);
  return response;
};
const formPut = async (url: string, formData: FormData) => {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(url) },
    body: formData,
  };
  const response = await axios.putForm(url, requestOptions);
  return response;
};
const formPatch = async (url: string, formData: FormData) => {
  const requestOptions = {
    method: "PATCH",
    headers: { ...authHeader(url) },
    body: formData,
  };
  const response = await axios.patchForm(url, formData, requestOptions);
  return response;
};

const axiosWrapper = {
  get: getReq,
  post: postReq,
  put: putReq,
  delete: deleteReq,
  formPost: formPost,
  patch: patchReq,
  formPut: formPut,
  formPatch: formPatch,
};

export default axiosWrapper;

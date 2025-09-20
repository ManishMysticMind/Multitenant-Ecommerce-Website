"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { useEffect, useState } from "react";
import { showToast } from "../../lib/toast";
import { signOut } from "next-auth/react";

interface IAuthContext {
  isAuthorized: boolean;
  role: string;
  user: TUser;
  checkToken: () => boolean;
  logout: () => void;
  handleGuestAccess: (redirectPath?: string) => void;
}
export interface ILoginResponse {
  refresh: string;
  access: string;
  user: TUser;
}
export interface TUser {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: null;
  image_url?: null;
  role?: string;
  is_superuser?: boolean;
  is_guest?: boolean;
}
const AuthContext = React.createContext<IAuthContext | any>({});
type TUserData = {
  is_authorized: boolean;
  role: string;
  user: TUser;
};
export const AuthProvider = (props: any) => {
  const router = useRouter();
  const [loginInUser, setLoginUser] = useState<TUserData>({
    is_authorized: false,
    role: "",
    user: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone: null,
    },
  });
  const checkToken = () => {
    const data = localStorage.getItem("active_user");
    const userData: ILoginResponse = data && JSON.parse(data);
    const token = userData?.access;
    const role = userData?.user?.is_superuser
      ? "admin"
      : userData?.user?.is_guest
      ? "guest"
      : "";
    const user = userData?.user;
    setLoginUser((prev) => ({ ...prev, is_authorized: Boolean(token) }));
    setLoginUser((prev) => ({ ...prev, role: role }));
    setLoginUser((prev) => ({ ...prev, user: user }));
    if (data) {
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    signOut();
    localStorage.removeItem("active_user");
    setLoginUser((prev) => ({ ...prev, is_authorized: false }));
    setLoginUser((prev) => ({ ...prev, role: "" }));
    router.replace("/");
    showToast("success", "Sign Out Success", {
      theme: "light",
    });
  };

  const handleGuestAccess = (redirectPath: string = "/") => {
    if (loginInUser.role === "guest" || loginInUser.role === null) {
      router.replace(redirectPath);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthorized: loginInUser.is_authorized,
        role: loginInUser.role,
        user: loginInUser.user,
        checkToken,
        logout,
        handleGuestAccess,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext<IAuthContext>(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within the AppProvider");
  }

  return context;
}

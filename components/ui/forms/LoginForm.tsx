"use client";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Input from "../common/Input";
import { styled } from "styled-components";
import Button from "../common/Button";
import {
  LoginFormSchema,
  TLoginFormSchema,
} from "../../../lib/validation/LoginForm/LoginFormSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostLogin } from "../../../hooks/api/auth/login";
import { useRouter, useSearchParams } from "next/navigation";
import { DashboardPageRoutes } from "../../../lib/constants";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import SectionTitle from "../common/SectionTitle";
import { GenericLink } from "../../../lib/constants/styles";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const { mutate, isSuccess } = usePostLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TLoginFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(LoginFormSchema),
  });

  const handleLogin: SubmitHandler<TLoginFormSchema> = (data: any) => {
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      const storedCallbackUrl = localStorage.getItem("callbackUrl") || "/";
      localStorage.removeItem("callbackUrl");
      router.push(storedCallbackUrl);
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (callbackUrl) {
      localStorage.setItem("callbackUrl", callbackUrl);
    }
  }, [callbackUrl]);

  const [showPassword, setShowPassword] = useState(false);

  const handleRemember = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && watch("username")) {
      localStorage.setItem("username", watch("username"));
    }
  };

  return (
    <>
      <LoginFormContainer>
        <SectionTitle label="Login" size="md" className="pb-2" />
        <Form className="form-style" onSubmit={handleSubmit(handleLogin)}>
          <InputField>
            <Input
              label="UserName"
              placeholder="Enter your username"
              varient="primary"
              type="text"
              name="username"
              register={register}
              error={errors?.username?.message}
            />
          </InputField>
          <InputField className="passwordField">
            <Input
              label="Password"
              placeholder="*************"
              varient="primary"
              type={showPassword ? "text" : "password"}
              name="password"
              register={register}
              error={errors?.password?.message}
            />
            <button
              type="button"
              aria-label={
                showPassword ? "Password Visible" : "Password Invisible."
              }
              className="passwordIcon"
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            >
              {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
            </button>
          </InputField>
          <div className="d-flex justify-content-between mb-4">
            <Check>
              <Checkbox
                name="remember"
                type="checkbox"
                className="checkbox"
                onChange={(e: any) => handleRemember(e)}
              />
              <Label htmlFor="remember">Remember Me</Label>
            </Check>
            <GenericLink href={DashboardPageRoutes.FORGET_PASSWORD}>
              Forgot Password
            </GenericLink>
          </div>
          <LoginBtn>
            <Button
              label="Login"
              varient="primary"
              borderradius="5px"
              size="lg"
              type="submit"
              width="100%"
            />
          </LoginBtn>
        </Form>
        <div className="d-flex justify-content-center mt-3">
          <p className="me-1">Don&apos;t have an account?</p>
          <GenericLink href="/signup">Register</GenericLink>
        </div>
        {/* <Div>
          <HR />
          Or login with
          <HR />
        </Div>
        <LoginIcons>
          <Col className="SocialIcon">
            <Image src="/facebook.png" width={24} height={24} alt="facebook" />
          </Col>
          <Col className="SocialIcon">
            <Image src="/google.png" width={24} height={24} alt="google" />
          </Col>
          <Col className="SocialIcon">
            <Image src="/apple.png" width={24} height={24} alt="apple" />
          </Col>
        </LoginIcons> */}
      </LoginFormContainer>
    </>
  );
};

export default LoginForm;

const Label = styled.label`
  font-weight: 600;
  color: ${(props) => props.theme.colors.textPrimary};
`;
const Checkbox = styled(Form.Check)`
  .form-check-input:checked {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
`;
const Check = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  .checkbox {
    width: 15%;
  }
  label {
    width: 8rem;
  }
`;
const HR = styled.hr`
  flex-grow: 1;
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  opacity: 50%;
  margin-bottom: 1rem;
`;
const LoginIcons = styled.div`
  display: flex;
  gap: 2rem;

  .SocialIcon {
    border: 1px solid #fed700;
    text-align: center;
    padding: 1rem;
    border-radius: 4px;
  }
`;
const LoginBtn = styled.div`
  button {
    width: 100%;
  }
`;
const InputField = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
`;
const LoginFormContainer = styled.div`
  .passwordField {
    position: relative;
  }
  .passwordIcon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    border: none;
    background-color: unset;
    svg {
      font-size: 1.5rem;
    }
  }
`;

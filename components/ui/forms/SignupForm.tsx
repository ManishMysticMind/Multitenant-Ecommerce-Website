import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import Input from "../common/Input";
import styled from "styled-components";
import Button from "../common/Button";
import {
  SignupFormSchema,
  TSignupFormSchema,
} from "../../../lib/validation/SignupForm/SignupFormSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRegisterUser } from "../../../hooks/api/auth/signup";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { useAuth } from "../../../hooks/auth/useAuth";
import { GenericLink } from "../../../lib/constants/styles";

const Checkbox = styled(Form.Check)`
  .form-check-input:checked {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
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
`;
const Signup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .passwordField {
    position: relative;
  }
  .passwordIcon {
    position: absolute;
    top: 1.5rem;
    right: 1rem;
    border: none;
    background-color: unset;
    svg {
      font-size: 1.5rem;
    }
  }
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
  width: 48%;
  margin-bottom: 1.5rem;
  @media (max-width: 997px) {
    width: 100%;
  }
`;
const InputFieldFull = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
`;
export const SignupForm = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { mutate, isSuccess } = useRegisterUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<TSignupFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(SignupFormSchema),
  });

  const registerUser: SubmitHandler<TSignupFormSchema> = (data: any) => {
    mutate({ userId: Number(user?.id), data: data });
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess]);

  const [showPassword, setShowPassword] = useState(false);
  return (
    <Col sm={12} md={5} className="d-flex flex-column gap-3">
      <h3>Register</h3>
      <p>Let’s get you all set up so you can access your personal account.</p>
      <Form onSubmit={handleSubmit(registerUser)}>
        <Signup>
          <InputField>
            <Input
              label="First Name"
              placeholder="John"
              varient="primary"
              type="text"
              name="first_name"
              register={register}
            />
            <div className="error-message text-danger">
              {errors.first_name && (
                <p className="m-0">{errors.first_name.message}</p>
              )}
            </div>
          </InputField>
          <InputField>
            <Input
              label="Last Name"
              placeholder="Doe"
              varient="primary"
              type="text"
              name="last_name"
              register={register}
            />
            <div className="error-message text-danger">
              {errors.last_name && (
                <p className="m-0">{errors.last_name.message}</p>
              )}
            </div>
          </InputField>
          <InputField>
            <Input
              label="Email"
              placeholder="john.doe@gmail.com"
              varient="primary"
              type="email"
              name="email"
              register={register}
            />
            <div className="error-message text-danger">
              {errors.email && <p className="m-0">{errors.email.message}</p>}
            </div>
          </InputField>
          <InputField>
            <Input
              label="Phone Number"
              placeholder="0123456789"
              varient="primary"
              type="string"
              name="phone"
              register={register}
            />
            <div className="error-message text-danger">
              {errors.phone && <p className="m-0">{errors.phone.message}</p>}
            </div>
          </InputField>
          <InputFieldFull>
            <Input
              label="Username"
              placeholder="John"
              varient="primary"
              type="text"
              name="username"
              register={register}
            />
            <div className="error-message text-danger">
              {errors.username && (
                <p className="m-0">{errors.username.message}</p>
              )}
            </div>
          </InputFieldFull>
          <InputFieldFull className="passwordField">
            <Input
              label="Password"
              placeholder="*************"
              varient="primary"
              type={showPassword ? "text" : "password"}
              name="password"
              register={register}
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
            <div className="error-message text-danger">
              {errors.password && (
                <p className="m-0">{errors.password.message}</p>
              )}
            </div>
          </InputFieldFull>
          <InputFieldFull className="passwordField">
            <Input
              label="Confirm Password"
              placeholder="*************"
              varient="primary"
              type={showPassword ? "text" : "password"}
              name="confirm_password"
              register={register}
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
            <div className="error-message text-danger">
              {errors.confirm_password && (
                <p className="m-0">{errors.confirm_password.message}</p>
              )}
            </div>
          </InputFieldFull>
        </Signup>
        <div className="d-flex gap-2 mt-1 mb-4">
          <Checkbox
            name="remember"
            type="checkbox"
            className="checkbox"
            required
          />
          <label htmlFor="remember">
            I agree to all the{" "}
            <GenericLink
              onClick={() => router.push("/terms-of-use")}
              className="cursor-pointer"
            >
              Terms of Use
            </GenericLink>{" "}
            and{" "}
            <GenericLink
              onClick={() => router.push("/privacy-policy")}
              className="cursor-pointer"
            >
              Privacy Policy
            </GenericLink>
          </label>
        </div>
        <LoginBtn>
          <Button
            label="Create Account"
            borderradius="5px"
            varient="primary"
            width="100%"
            size="lg"
            type="submit"
          />
        </LoginBtn>
      </Form>
      <div className="d-flex justify-content-center">
        <p className="me-1">Already have an account?</p>
        <GenericLink href="/login">Login</GenericLink>
      </div>
      {/* <Div>
        <HR />
        Or Sign up with
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
    </Col>
  );
};

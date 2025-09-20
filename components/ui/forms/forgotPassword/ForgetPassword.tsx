import React, { useEffect } from "react";
import { styled } from "styled-components";
import Input from "../../common/Input";
import { Form } from "react-bootstrap";
import { useForgetPassword } from "../../../../hooks/api/auth/forgotPassword";
import {
  ForgetPasswordSchema,
  TForgetPassword,
} from "../../../../lib/validation/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../common/Button";
import { useRouter } from "next/navigation";
import { GenericLink } from "../../../../lib/constants/styles";

const ForgetPassword = () => {
  const router = useRouter();
  const { mutate, isSuccess } = useForgetPassword();
  const [email, setEmail] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues,
  } = useForm<TForgetPassword>({
    resolver: zodResolver(ForgetPasswordSchema),
    mode: "onBlur",
  });
  const handleForgetPassword: SubmitHandler<TForgetPassword> = (data: any) => {
    mutate(data);
    setEmail(data.email);
    reset();
  };
  useEffect(() => {
    if (isSuccess) {
      router.push("/verify-otp?email=" + email);
    }
  }, [isSuccess]);
  return (
    <>
      <Form onSubmit={handleSubmit(handleForgetPassword)}>
        <InputFieldFull>
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
        </InputFieldFull>
        <LoginBtn>
          <Button
            label="Continue"
            varient="primary"
            borderradius="5px"
            size="md"
            type="submit"
            width="100%"
          />
        </LoginBtn>
      </Form>
      <div className="d-flex justify-content-center mt-3 mb-5">
        <p className="me-1">Already have an account?</p>
        <GenericLink href="/login">Log in</GenericLink>
      </div>
    </>
  );
};

export default ForgetPassword;
const InputFieldFull = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
  margin-top: 2rem;
`;
const LoginBtn = styled.div`
  button {
    width: 100%;
  }
`;
const Sign = styled.a`
  color: #ff8682;
  text-decoration: none;
  margin-left: 0.3rem;
`;

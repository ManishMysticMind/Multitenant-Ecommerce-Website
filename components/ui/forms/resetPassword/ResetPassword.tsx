import { Form } from "react-bootstrap";
import { styled } from "styled-components";
import Input from "../../common/Input";
import Button from "../../common/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordSchema,
  TResetPassword,
} from "../../../../lib/validation/resetPasswordSchema";
import { useResetPassword } from "../../../../hooks/api/auth/resetPassword";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ResetPassword = () => {
  const router = useRouter();
  const { mutate, isSuccess, isError } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TResetPassword>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onBlur",
  });

  const handleResetPassword: SubmitHandler<TResetPassword> = (data: any) => {
    const code = localStorage.getItem("resetCode");

    const resetData = {
      ...data,
      code,
      new_password1: data.password,
    };

    console.log("resetData", resetData);
    mutate(resetData);
    reset();

    localStorage.removeItem("resetCode");
  };

  useEffect(() => {
    const code = localStorage.getItem("resetCode");
    if (!code) {
      router.push("/forgot-password");
      return;
    }

    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess]);

  return (
    <>
      <Form className="mb-5" onSubmit={handleSubmit(handleResetPassword)}>
        <InputFieldFull>
          <Input
            label="New Password"
            placeholder="Enter New Password"
            varient="primary"
            type="password"
            name="password"
            register={register}
          />
          <div className="error-message text-danger">
            {errors.password && (
              <p className="m-0">{errors.password.message}</p>
            )}
          </div>
        </InputFieldFull>
        <InputFieldFull>
          <Input
            label="Confirm Password"
            placeholder="Confirm Password"
            varient="primary"
            type="password"
            name="confirm_password"
            register={register}
          />
          <div className="error-message text-danger">
            {errors.confirm_password && (
              <p className="m-0">{errors.confirm_password.message}</p>
            )}
          </div>
        </InputFieldFull>
        <FormRule>
          <ul>
            <li>The length of password should be 8 - 20 characters.</li>
            <li>
              Password should contain letters, numbers, and special characters
            </li>
            <li>Password can only include ~.!@#$%^&* symbols</li>
          </ul>
        </FormRule>
        <LoginBtn>
          <Button
            label="Continue"
            varient="primary"
            borderradius="5px"
            size="lg"
            type="submit"
            width="100%"
          />
        </LoginBtn>
      </Form>
    </>
  );
};

export default ResetPassword;

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

const FormRule = styled.div`
  margin-bottom: 1.5rem;
  ul {
    padding-left: 1rem;
  }
  li {
    color: #626262;
    font-size: 12px;
  }
`;

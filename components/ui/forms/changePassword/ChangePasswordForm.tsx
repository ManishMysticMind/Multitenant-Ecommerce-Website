import { Form } from "react-bootstrap";
import { styled } from "styled-components";
import Input from "../../common/Input";
import Button from "../../common/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  TChangePasswordSchema,
  ChangePasswordSchema,
} from "../../../../lib/validation/ChangePasswordForm/ChangePasswordFormSchema";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useChangePassword } from "../../../../hooks/api/auth/changePassword";

const ChangePasswordForm = () => {
  const router = useRouter();
  const { mutate, isSuccess } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm<TChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onBlur",
  });

  const handleResetPassword: SubmitHandler<TChangePasswordSchema> = async (
    data: any
  ) => {
    console.log("submit pwd change", data);
    mutate(data);
    console.log("API mutate called");
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess, router]);

  return (
    <>
      <Form className="mb-5" onSubmit={handleSubmit(handleResetPassword)}>
        <InputFieldFull>
          <Input
            label="Old Password"
            placeholder="Enter New Password"
            varient="primary"
            type="password"
            name="old_password"
            register={register}
          />
          <div className="error-message text-danger">
            {errors.old_password && (
              <p className="m-0">{errors.old_password.message}</p>
            )}
          </div>
        </InputFieldFull>
        <InputFieldFull>
          <Input
            label="New Password"
            placeholder="Enter New Password"
            varient="primary"
            type="password"
            name="new_password1"
            register={register}
          />
          <div className="error-message text-danger">
            {errors.new_password1 && (
              <p className="m-0">{errors.new_password1.message}</p>
            )}
          </div>
        </InputFieldFull>
        <InputFieldFull>
          <Input
            label="Confirm Password"
            placeholder="Confirm Password"
            varient="primary"
            type="password"
            name="new_password2"
            register={register}
          />
          <div className="error-message text-danger">
            {errors.new_password2 && (
              <p className="m-0">{errors.new_password2.message}</p>
            )}
          </div>
        </InputFieldFull>
        <FormRull>
          <ul>
            <li>The length of password should be 8 - 20 characters.</li>
            <li>
              Password should contain letters, numbers, and special characters
            </li>
            <li>Password can only include ~.!@#$%^&* symbols</li>
          </ul>
        </FormRull>
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

export default ChangePasswordForm;

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

const FormRull = styled.div`
  margin-bottom: 1.5rem;
  ul {
    padding-left: 1rem;
  }
  li {
    color: #626262;
    font-size: 12px;
  }
`;

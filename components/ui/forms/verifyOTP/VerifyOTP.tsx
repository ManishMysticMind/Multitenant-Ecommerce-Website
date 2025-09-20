import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Input from "../../common/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TVerifyOTP,
  VerifyOTPSchema,
} from "../../../../lib/validation/verifyOtp";
import styled from "styled-components";
import Button from "../../common/Button";
import { useRouter } from "next/navigation";
import { GenericLink } from "../../../../lib/constants/styles";

const VerifyOTP = ({ email }: { email: string }) => {
  const router = useRouter();
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value.length === 1 && index < 5) {
      const nextInput = document.querySelector<HTMLInputElement>(
        `input[name="num_${index + 2}"]`,
      );
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && index > 0 && !otpValues[index]) {
      const prevInput = document.querySelector<HTMLInputElement>(
        `input[name="num_${index}"]`,
      );
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otpValues.join("");

    localStorage.setItem("resetCode", code);

    router.push("/reset-password");
  };
  const {
    register,
    formState: { errors },
    reset,
  } = useForm<TVerifyOTP>({
    resolver: zodResolver(VerifyOTPSchema),
    mode: "onBlur",
  });
  return (
    <VerifyOTPForm>
      <Form onSubmit={handleSubmit}>
        <div className="d-flex input-form justify-content-between">
          {Array.from({ length: 6 }).map((_, index) => (
            <Input
              key={index}
              label=""
              placeholder=""
              varient="primary"
              type="text"
              name={`num_${index + 1}`}
              value={otpValues[index]}
              register={register}
              maxLength={1}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleOtpKeyDown(e, index)}
            />
          ))}
        </div>
        <div className="mt-3">
          <GenericLink href="/forgot-password">Resend OTP</GenericLink>
        </div>
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
    </VerifyOTPForm>
  );
};

export default VerifyOTP;

const VerifyOTPForm = styled.div`
  input {
    width: 73px;
    height: 72px;
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
    background-color: #f3f3f3;
    border: 1px solid #79747e;
    @media (max-width: 1400px) {
      width: 55px;
      height: 55px;
      font-size: 1.5rem;
    }
    @media (max-width: 470px) {
      width: 40px;
      height: 40px;
      font-size: 1rem;
    }
  }
  label {
    display: none;
  }
  margin-top: 2rem;
  .input-form div {
    width: unset;
  }
`;
const LoginBtn = styled.div`
  button {
    width: 100%;
  }
  margin-top: 2rem;
  margin-bottom: 3rem;
`;
const ChangeMail = styled.a`
  color: #000dfe;
  text-decoration: none;
`;

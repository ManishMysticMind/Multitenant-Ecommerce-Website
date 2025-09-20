import React, { useEffect } from "react";
import { styled } from "styled-components";
import SectionTitle from "../../../../common/SectionTitle";
import { Col, Form } from "react-bootstrap";
import Input from "../../../../common/Input";
import { useForm } from "react-hook-form";
import Button from "../../../../common/Button";
import {
  useGetUserId,
  useGetUserProfile,
} from "../../../../../../hooks/api/user/getProfile";
import { usePatchUserProfile } from "../../../../../../hooks/api/user/patchProfile";
import { usePathname, useRouter } from "next/navigation";
import {
  TUserProfile,
  UserProfileSchema,
} from "../../../../../../lib/validation/userProfileSchema";
import { ZodRecord } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const UserDetailEdit = () => {
  const { data: userData, isLoading } = useGetUserProfile();
  const { data: userId } = useGetUserId();
  console.log(userId);
  const { mutate: editProfile, isSuccess: isPatchSuccess } =
    usePatchUserProfile();
  const router = useRouter();
  const pathname = usePathname();
  const {
    control: control,
    register: register,
    formState: { errors: errors, isValid },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<TUserProfile>({
    mode: "onBlur",
    resolver: zodResolver(UserProfileSchema),
  });

  useEffect(() => {
    if (userData) {
      setValue("email", userData?.email);
      setValue("phone", userData.phone);
      setValue("first_name", userData?.first_name);
      setValue("last_name", userData?.last_name);
    }
  }, [userData, setValue]);

  const onFormSubmit = (profileData: TUserProfile) => {
    const bodyFormData = new FormData();
    bodyFormData.append("email", profileData?.email);
    bodyFormData.append("phone", profileData?.phone);
    bodyFormData.append("first_name", profileData?.first_name);
    bodyFormData.append("last_name", profileData?.last_name);
    editProfile({ data: bodyFormData, userId: userId });
  };

  const handlereset = () => {
    reset();
  };
  useEffect(() => {
    if (isPatchSuccess) {
      if (pathname === "/my-account") {
        window.location.reload();
      } else {
        router.push("/my-account");
      }
    }
  }, [isPatchSuccess, pathname, router]);
  return (
    <>
      <UserDetailForm className="user-detail-form">
        <SectionTitle label="My Account" size="md" className="pt-0 pb-3" />
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          <Col sm={12} md={6} className="d-flex flex-column gap-2">
            <Input
              label="First Name"
              placeholder="Dummy"
              varient="primary"
              type="text"
              name="first_name"
              register={register}
              error={errors.first_name?.message}
            />
            <Input
              label="Last Name"
              placeholder="Dummy"
              varient="primary"
              type="text"
              name="last_name"
              register={register}
              error={errors.last_name?.message}
            />
            <Input
              label="Mobile Number"
              placeholder="(+00) 123456789"
              varient="primary"
              type="number"
              name="phone"
              register={register}
              error={errors.phone?.message}
            />
            <Input
              label="E-mail"
              placeholder="dummy@gmail.com"
              varient="primary"
              type="email"
              name="email"
              register={register}
              error={errors.email?.message}
            />
            <SaveBtn className="text-end my-3">
              <Button
                label="Save"
                varient="primary"
                borderradius="5px"
                size="lg"
                type="submit"
                width="50%"
              />
            </SaveBtn>
          </Col>
        </Form>
      </UserDetailForm>
    </>
  );
};

export default UserDetailEdit;

const UserDetailForm = styled.div``;
const SaveBtn = styled.div``;

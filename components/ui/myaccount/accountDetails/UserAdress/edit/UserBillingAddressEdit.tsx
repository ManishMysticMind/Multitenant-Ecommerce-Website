import React from "react";
import { useForm } from "react-hook-form";
import SectionTitle from "../../../../common/SectionTitle";
import { styled } from "styled-components";
import { Col } from "react-bootstrap";
import Input from "../../../../common/Input";
import Button from "../../../../common/Button";

const UserBillingAddressEdit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
  });
  return (
    <>
      <UserAdressForm className="user-detail-form">
        <SectionTitle label="Address" size="md" className="pt-0 pb-3" />
        <Col sm={12} md={6} className="d-flex flex-column gap-2">
          <Input
            label="Street Address"
            placeholder="Abc, California"
            varient="primary"
            type="text"
            name="street_name"
            register={register}
          />
          <Input
            label="Country"
            placeholder="USA"
            varient="primary"
            type="text"
            name="country"
            register={register}
          />
          <Input
            label="State"
            placeholder="California"
            varient="primary"
            type="text"
            name="state"
            register={register}
          />
          <Input
            label="City"
            placeholder="ABC"
            varient="primary"
            type="text"
            name="city"
            register={register}
          />
          <Input
            label="Landmark"
            placeholder="Near xyz"
            varient="primary"
            type="text"
            name="landmark"
            register={register}
          />
          <SaveBtn className="text-end my-3">
            <Button
              label="Save"
              varient="primary"
              borderradius="5px"
              size="lg"
              type="submit"
              width="60%"
            />
          </SaveBtn>
        </Col>
      </UserAdressForm>
    </>
  );
};

export default UserBillingAddressEdit;
const UserAdressForm = styled.div``;
const SaveBtn = styled.div``;

import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  ShippingFormSchema,
  TShippingFormSchema,
} from "../../lib/validation/ShippingForm/ShippingFormSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/common/Input";
import { FaHome } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import styled from "styled-components";
import Button from "../ui/common/Button";
import { useAuth } from "../../hooks/auth/useAuth";
import { useAddShippingAddress } from "../../hooks/api/shipping/AddShipping";

const ShippingForm = () => {
  const { user } = useAuth();
  const { mutate } = useAddShippingAddress();

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = useForm<TShippingFormSchema>({
    mode: "onBlur",
    defaultValues: {
      address_type: "Home",
    },
    resolver: zodResolver(ShippingFormSchema),
  });

  const handleAdress: SubmitHandler<TShippingFormSchema> = (data: any) => {
    mutate({ data: data, userId: Number(user?.id) });
  };

  const handleLocationClick = (value: "Home" | "Office" | any) => {
    setValue("address_type", value);
  };

  return (
    <Form onSubmit={handleSubmit(handleAdress)}>
      <h4>
        <HeadingNumber>1</HeadingNumber> Recipients Information
      </h4>
      <Row className="d-flex justify-content-between my-4">
        <Col sm={6}>
          <Input
            type="text"
            placeholder="Enter your first and last name"
            label="Full Name"
            name="name"
            register={register}
            error={errors?.name?.message}
          />
        </Col>
        <Col sm={6}>
          <Input
            type="number"
            placeholder="Enter your number"
            label="Phone Number"
            name="phone_number"
            register={register}
            error={errors?.phone?.message}
          />
        </Col>
      </Row>

      <h4>
        <HeadingNumber>2</HeadingNumber> Shipping Information
      </h4>
      <Row className="d-flex justify-content-between my-4">
        <Col sm={6}>
          <Input
            type="text"
            placeholder="Country"
            label="Country"
            name="country"
            register={register}
            error={errors?.country?.message}
          />
        </Col>
        <Col sm={6}>
          <Input
            type="text"
            placeholder="City"
            label="City"
            name="city"
            register={register}
            error={errors?.phone?.message}
          />
        </Col>
        <Col sm={6}>
          <Input
            type="number"
            placeholder="Enter zip Code"
            label={"ZIP Code"}
            name="postal_code"
            register={register}
            error={errors?.postal_code?.message}
          />
        </Col>
        <Col sm={6}>
          <Input
            type="text"
            placeholder="For eg: house#123, street#123, XYZ"
            label="Address"
            name="address"
            register={register}
            error={errors?.address?.message}
          />
        </Col>
      </Row>

      <h4>
        <HeadingNumber>3</HeadingNumber> Select Default
      </h4>
      <div className="d-flex gap-2 mb-2">
        <LocationButton
          onClick={() => handleLocationClick("home")}
          address_type={watch("address_type") === "Home" ? "true" : "false"}
        >
          <div className="d-flex justify-content-center gap-2 align-items-center p-3">
            <FaHome width={18} /> Home
          </div>
        </LocationButton>

        <LocationButton
          onClick={() => handleLocationClick("Office")} // Set value to "office"
          address_type={watch("address_type") === "Office" ? "true" : "false"}
        >
          <div className="d-flex justify-content-center gap-2 align-items-center p-3 ">
            <BsBriefcase width={18} /> Office
          </div>
        </LocationButton>
      </div>
      <Button label="Submit" size="lg" type="submit" />
    </Form>
  );
};

export default ShippingForm;

const HeadingNumber = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 500;
  border: ${(props) => "1px solid" + props.theme.colors.primary};
  padding: 0rem 0.5rem;
  border-radius: 50%;
  margin-right: 0.6rem;
  font-size: 1.4rem;
`;

const LocationButton = styled.label<any>`
  border: ${(props) =>
    props.address_type === "true"
      ? `1px solid ${props.theme.colors.primary}`
      : "1px solid lightgray"};
  background-color: ${(props) =>
    props.address_type === "true" ? props.theme.colors.primary : "transparent"};
  color: ${(props) => (props.address_type === "true" ? "#fff" : "initial")};
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: ${(props) =>
      props.address_type === "true" ? props.theme.colors.primary : "lightgray"};
    border-radius: 6px;
  }
`;

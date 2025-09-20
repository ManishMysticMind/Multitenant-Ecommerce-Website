import { useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsBriefcase } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import styled from "styled-components";
import { useAddShippingAddress } from "../../../hooks/api/shipping/AddShipping";
import { useAuth } from "../../../hooks/auth/useAuth";
import {
  ShippingFormSchema,
  TShippingFormSchema,
} from "../../../lib/validation/ShippingForm/ShippingFormSchema";
import Input from "../common/Input";
import DropDownInput from "../forms/DropDownComponent";
import Loading from "../Loading";
import Button from "../common/Button";
import SectionTitle from "../common/SectionTitle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCities } from "../../../hooks/api/utils/CityList";
import { useGetCountries } from "../../../hooks/api/utils/CountryList";
import { useGetStates } from "../../../hooks/api/utils/StateList";

export const ShippingForm = ({ onSuccess, onCancel }: any) => {
  const { user } = useAuth();

  /** Fetch Countries */
  const { data: countries, isSuccess: isAddressSuccess } = useGetCountries();

  /** Form Handling */
  const {
    formState: { errors, isValid },
    register,
    watch,
    setValue,
    trigger,
    getValues,
    handleSubmit,
  } = useForm<TShippingFormSchema>({
    mode: "onSubmit",
    defaultValues: {
      address_type: "Home",
      country: undefined,
    },
    resolver: zodResolver(ShippingFormSchema),
  });

  /** Fetch States & Cities */
  const {
    data: states,
    isSuccess: isStatesFetched,
    refetch: refetchStates,
  } = useGetStates(watch("country"));
  const { data: cities, refetch: refetchCities } = useGetCities(
    watch("country"),
    watch("state")
  );

  /** Handle Address Type Selection */
  const handleLocationClick = (value: "Home" | "Office") => {
    setValue("address_type", value);
  };

  const {
    mutate: addShippingAddress,
    isSuccess,
    isPending: isLoading,
  } = useAddShippingAddress();

  const handleSubmitShipping: SubmitHandler<TShippingFormSchema> = (data) => {
    const convertedData: any = { ...data };
    convertedData.country = Number(data.country);
    convertedData.city = Number(data.city);
    addShippingAddress({ data: convertedData, userId: Number(user?.id) });
  };

  useEffect(() => {
    if (isAddressSuccess) {
      setValue("country", countries[0]?.id);
    }
  }, [isAddressSuccess]);

  useEffect(() => {
    if (watch("country")) {
      refetchStates();
    }
  }, [watch("country")]);

  useEffect(() => {
    if (isStatesFetched && states.length) {
      setValue("state", states[0]?.id);
    }
  }, [isStatesFetched]);

  useEffect(() => {
    if (watch("state")) {
      refetchCities();
    }
  }, [watch("state")]);

  useEffect(() => {
    if (isSuccess) {
      onSuccess(true);
    }
  }, [isSuccess]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <ShippingInfoContainer>
      <Form onSubmit={handleSubmit(handleSubmitShipping)}>
        <SectionTitle
          label={"Shipping Address"}
          size="md"
          className="mb-0 pb-0 pt-1"
        />
        <Row className="d-flex justify-content-between p-1 mt-1">
          <Col sm={6}>
            <Input
              type="text"
              placeholder="Enter your full name"
              label="Full Name"
              name="name"
              register={register}
              error={errors?.name?.message}
            />
          </Col>
          <Col sm={6}>
            <Input
              type="email"
              placeholder="Enter your email"
              label="Email Address"
              name="email"
              register={register}
              error={errors?.email?.message}
            />
          </Col>
          <Col sm={6}>
            <Input
              type="number"
              placeholder="Enter your number"
              label="Mobile Number"
              name="phone"
              register={register}
              error={errors?.phone?.message}
            />
          </Col>
          <Col sm={6}>
            <DropDownInput
              name="country"
              label="Country"
              options={countries}
              register={register}
              error={errors?.country?.message}
            />
          </Col>
          <Col sm={6}>
            <DropDownInput
              name="state"
              label="State"
              options={states}
              register={register}
              error={errors?.state?.message}
            />
          </Col>
          <Col sm={6}>
            <DropDownInput
              name="city"
              label="City"
              options={cities}
              register={register}
              error={errors?.city?.message}
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
              label="Street Address"
              name="address"
              register={register}
              error={errors?.address?.message}
            />
          </Col>
        </Row>

        <SectionTitle
          label={"Set Address Type"}
          size="sm"
          className="mb-1 pb-0 pt-1"
        />
        <div className="d-flex gap-2 mb-2">
          <LocationButton
            onClick={() => handleLocationClick("Home")}
            address_type={watch("address_type") == "Home" ? "true" : "false"}
          >
            <div className="d-flex justify-content-center gap-2 align-items-center p-3">
              <FaHome width={18} /> Home
            </div>
          </LocationButton>

          <LocationButton
            onClick={() => handleLocationClick("Office")} // Set value to "office"
            address_type={watch("address_type") == "Office" ? "true" : "false"}
          >
            <div className="d-flex justify-content-center gap-2 align-items-center p-3 ">
              <BsBriefcase width={18} /> Office
            </div>
          </LocationButton>
        </div>

        <div className="d-flex justify-content-end w-100 mb-2 mt-2">
          {onCancel && (
            <Button
              type="button"
              varient="primary-outline"
              label={<>Cancel</>}
              borderradius="5px"
              width="205px"
              size="md"
              onClick={onCancel}
              className="me-2"
            />
          )}
          <Button
            type="submit"
            varient="primary"
            label={<>Save Address</>}
            borderradius="5px"
            width="205px"
            size="md"
            disabled={isLoading}
          />
        </div>
      </Form>
    </ShippingInfoContainer>
  );
};

const ShippingInfoContainer = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 0px 12px 2px #0000000a;
  border-radius: 6px;
  padding: 10px 15px; /* Add padding for spacing */
  margin-bottom: 1rem;
`;

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
    props.address_type === "true"
      ? props.theme.colors.primary
      : "transparent"};
  color: ${(props) => (props.address_type === "true" ? "#fff" : "initial")};
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: ${(props) =>
      props.address_type === "true"
        ? props.theme.colors.primary
        : "lightgray"};
    border-radius: 6px;
  }
`;

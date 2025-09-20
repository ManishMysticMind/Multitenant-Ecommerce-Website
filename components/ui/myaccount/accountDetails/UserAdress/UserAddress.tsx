import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../common/Button";
import Input from "../../../common/Input";
import DropDownInput from "../../../forms/DropDownComponent";
import ModalComponent from "../../../Modal";

import { CiWarning } from "react-icons/ci";

import { getUserAddresses } from "../../../../../hooks/api/myaccount/address/getAddress";
import { postNewAddress } from "../../../../../hooks/api/myaccount/address/postNewAddress";
import { deleteUserAddress } from "../../../../../hooks/api/myaccount/address/deleteAddress";
import { updateAddress } from "../../../../../hooks/api/myaccount/address/updateAddress";

import { useGetCountries } from "../../../../../hooks/api/utils/CountryList";
import { useGetCities } from "../../../../../hooks/api/utils/CityList";
import { useGetStates } from "../../../../../hooks/api/utils/StateList";

import { showToast } from "../../../../../lib/toast";
import {
  TAddressFormSchema,
  AddressFormSchema,
} from "../../../../../lib/validation/AddressForm/AddressFormSchema";
import Loading from "../../../Loading";
import { BsFillPinMapFill, BsMarkerTip, BsPlusLg } from "react-icons/bs";
import SectionTitle from "../../../common/SectionTitle";
import { IoChevronForward } from "react-icons/io5";
import { styled } from "styled-components";

type formType = "addAddress" | "userAddress" | "deleteModal" | "editAddress";

const UserAddress = () => {
  const [activeForm, setActiveForm] = useState<formType>("userAddress");
  const [addresses, setAddresses] = useState<any>(null);
  const [addressId, setAddressId] = useState<number>(0);
  const [refetchData, setRefetchData] = useState(false);
  const [editAddress, setEditAddress] = useState<any>(null);

  const {
    formState: { errors },
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
  } = useForm<TAddressFormSchema>({
    mode: "onBlur",
    defaultValues: {
      country: "",
      name: "",
      email: "",
      state: "",
      city: "",
      postal_code: "",
      address: "",
      phone: "",
    },
    resolver: zodResolver(AddressFormSchema),
  });
  //
  // get countries
  const { data: countries, isSuccess: isAddressSuccess } = useGetCountries();

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

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const userAddresses = await getUserAddresses();
        setAddresses(userAddresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, [refetchData]);

  useEffect(() => {
    // This effect sets the default country on initial load if countries are fetched
    // or when returning to userAddress view and countries are already loaded
    if (
      activeForm === "userAddress" &&
      isAddressSuccess &&
      countries &&
      countries.length > 0
    ) {
      // If country is not set (e.g., is "" from defaultValues) set the first one as string ID
      // This is mainly for the Add Address form when it's first shown
      if (!watch("country")) {
        setValue("country", countries[0]?.id?.toString() ?? ""); // Ensure setting string ID
      }
    }
  }, [activeForm, isAddressSuccess, countries, setValue, watch]);

  useEffect(() => {
    // This effect triggers state fetching when the country changes.
    // It should only trigger if countryValue is a non-empty string.
    const countryValue = watch("country");
    if (countryValue) {
      refetchStates();
      // Clear state and city when country changes to avoid stale values, set empty strings.
      // This happens regardless of whether we are adding or editing.
      // When editing, the subsequent state effect might re-populate the state.
      setValue("state", "");
      setValue("city", "");
    } else {
      // If country is unset/empty string, clear state and city lists with empty strings.
      setValue("state", "");
      setValue("city", "");
    }
  }, [watch("country"), refetchStates, setValue]);

  useEffect(() => {
    // This effect triggers city fetching when the state changes.
    // It should only trigger if stateValue is a non-empty string.
    const stateValue = watch("state");
    if (stateValue) {
      refetchCities();
      // Clear city when state changes, set empty string.
      // When editing, the dedicated city effect below will set the correct city later if needed.
      setValue("city", "");
    } else {
      // If state is unset/empty string, clear city list with an empty string.
      setValue("city", "");
    }
  }, [watch("state"), refetchCities, setValue]);

  // Effect to set default state when states are fetched based on selected country,
  // handles both add and edit modes.
  useEffect(() => {
    const currentCountry = watch("country");
    const currentStates = states;
    const currentState = watch("state");

    // Only proceed if a country is selected and states are fetched and not null
    if (currentCountry && isStatesFetched && currentStates) {
      // In edit mode, attempt to set the state from editAddress if it exists in the fetched list
      if (activeForm === "editAddress" && editAddress) {
        const targetStateId = editAddress.state?.id?.toString();
        const targetStateExistsInOptions = currentStates.some(
          (state: any) => state.id?.toString() === targetStateId
        );

        if (
          targetStateId &&
          targetStateExistsInOptions &&
          currentState !== targetStateId
        ) {
          setValue("state", targetStateId);

          return;
        }
      }

      const stateExists = currentStates.some(
        (state: any) => state.id?.toString() === currentState
      );

      if (currentStates.length > 0 && (!currentState || !stateExists)) {
        setValue("state", currentStates[0]?.id?.toString() ?? "");
      } else if (currentStates.length === 0) {
        setValue("state", "");
        setValue("city", "");
      }
    }
  }, [
    watch("country"),
    states,
    isStatesFetched,
    activeForm,
    editAddress,
    setValue,
    watch,
  ]);

  // New dedicated effect to set the city when in edit mode and cities data arrives.
  useEffect(() => {
    if (activeForm === "editAddress" && editAddress && cities) {
      const targetCityId = editAddress.city?.id?.toString();
      const currentFormCity = watch("city"); // Get current form value

      const targetCityExistsInOptions = cities.some(
        (city: any) => city.id?.toString() === targetCityId
      );

      if (
        targetCityId &&
        targetCityExistsInOptions &&
        currentFormCity !== targetCityId
      ) {
        setValue("city", targetCityId);
      }
    }
  }, [cities, editAddress, activeForm, setValue, watch]);

  useEffect(() => {
    const currentState = watch("state");
    const currentCities = cities;
    const currentFormCity = watch("city");

    if (currentState && currentCities) {
      if (currentCities.length > 0) {
        const cityExists = currentCities.some(
          (city: any) => city.id?.toString() === currentFormCity
        );

        if (!currentFormCity || !cityExists) {
          setValue("city", currentCities[0]?.id?.toString() ?? "");
        }
      } else {
        setValue("city", "");
      }
    }
  }, [watch("state"), cities, setValue, watch]);

  const reloadAddress = async function () {
    setAddresses(null);
    setRefetchData((prev) => !prev);
    setActiveForm("userAddress");
    reset();
    setEditAddress(null);
  };

  const handleAddNewAddress = handleSubmit(async (data) => {
    if (Object.keys(errors).length > 0) {
      console.error("Form has errors:", errors);
      showToast("error", "Please fix the errors in the form.");
      return;
    } else {
      try {
        await postNewAddress(data);
        showToast("success", "Successfully added address");
      } catch (error: any) {
        console.error("Error adding address:", error);
        const errorMessage =
          error.response?.data?.detail || "Failed to add address";
        showToast("error", errorMessage);
      }
    }
    await reloadAddress();
  });

  const handleDeleteAddress = async function () {
    try {
      await deleteUserAddress(addressId);
      showToast("success", "Deleted address");
    } catch (error: any) {
      console.error("Error deleting address: ", error);
      const errorMessage =
        error.response?.data?.detail || "Failed to delete address";
      showToast("error", errorMessage);
    }
  };

  const handleUpdateAddress = handleSubmit(async (data) => {
    if (Object.keys(errors).length > 0) {
      console.error("Form has errors:", errors);
      showToast("error", "Please fix the errors in the form.");
      return;
    } else {
      try {
        if (!editAddress?.id) {
          console.error("Error: No address ID found for update.");
          showToast("error", "Failed to update address: Address ID missing.");
          return;
        }
        await updateAddress(data, editAddress.id);
        showToast("success", "Successfully updated address");
      } catch (error: any) {
        console.error("Error updating address:", error);
        if (error.response?.data && typeof error.response.data === "object") {
          const messages = Object.values(error.response.data).flat().join(", ");
          showToast("error", `Failed to update address: ${messages}`);
        } else {
          showToast("error", "Failed to update address");
        }
      }
    }
    await reloadAddress();
  });

  return (
    <AddressContainer>
      {activeForm === "deleteModal" && (
        <ModalComponent
          show={true}
          onModalClose={() => {
            setActiveForm("userAddress");
          }}
          onSubmitHandler={async () => {
            await handleDeleteAddress();
            await reloadAddress();
          }}
        >
          <div className="d-flex flex-column w-100 justify-content-center align-items-center mb-2">
            <div style={{ color: "red", fontSize: "5rem", height: "6rem" }}>
              <CiWarning />
            </div>
            <div style={{ fontSize: "1.75rem" }}>Are you sure?</div>
          </div>
          <div className="d-flex justify-content-center">
            <span>
              Are you sure you want to delete this address:{" "}
              {(addresses &&
                addresses.results &&
                addresses?.results?.find(
                  (address: any) => address.id === addressId
                )?.name) ??
                "Are you sure you want to delete this address?"}
            </span>
          </div>
        </ModalComponent>
      )}
      {activeForm === "editAddress" &&
        editAddress && ( // Render edit form only when editAddress is set
          <div>
            <h2 className="mb-3">Edit Address</h2>
            <div className="container mt-4">
              {/* Use handleSubmit with the update handler */}
              <form onSubmit={handleUpdateAddress}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <Input
                      label="Name"
                      type="string"
                      register={register}
                      name="name"
                      placeholder=""
                      error={errors.name?.message}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Input
                      label="Email"
                      type="email"
                      register={register}
                      placeholder=""
                      name="email"
                      error={errors.email?.message}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <DropDownInput
                      name="country"
                      label="Country"
                      options={countries} // options are objects with { id, name }
                      register={register}
                      error={errors.country?.message}
                      // The value from register will be a string ID if set correctly by reset/setValue
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <DropDownInput
                      name="state"
                      label="State / province"
                      options={states} // options are objects with { id, name }
                      register={register}
                      error={errors.state?.message}
                      // The value from register will be a string ID if set correctly by reset/setValue
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <Input
                      label="Zip"
                      name="postal_code"
                      type="number" // Note: Input type is "number", but react-hook-form/Zod handle it as string usually
                      placeholder=""
                      register={register}
                      error={errors.postal_code?.message}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <DropDownInput
                      name="city"
                      label="City"
                      options={cities} // options are objects with { id, name }
                      register={register}
                      error={errors.city?.message}
                      // The value from register will be a string ID if set correctly by reset/setValue
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <Input
                      label="Address"
                      type="string"
                      register={register}
                      placeholder=""
                      name="address"
                      error={errors.address?.message}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Input
                      label="Phone Number"
                      type="number" // Note: Input type is "number", but react-hook-form/Zod handle it as string usually
                      register={register}
                      placeholder=""
                      name="phone"
                      error={errors.phone?.message}
                    />
                  </div>
                </div>
                <Button
                  varient="primary"
                  label="Save"
                  type="submit"
                  borderradius="5px"
                  size="md"
                  width="10rem"
                />
                <span className="mx-2"> </span>
                <Button
                  label="Back"
                  borderradius="5px"
                  varient="primary-outline"
                  onClick={() => {
                    reloadAddress(); // This also resets the form to defaultValues
                  }}
                  width="10rem"
                />
              </form>
            </div>
          </div>
        )}
      {activeForm === "addAddress" && (
        <div>
          <h2 className="mb-3">Add new address</h2>
          <div className="container mt-4">
            {/* Use handleSubmit with the add new handler */}
            <form onSubmit={handleAddNewAddress}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <Input
                    label="Name"
                    type="string"
                    placeholder=""
                    register={register}
                    name="name"
                    error={errors.name?.message}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <Input
                    label="Email"
                    type="email"
                    placeholder=""
                    register={register}
                    name="email"
                    error={errors.email?.message}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <DropDownInput
                    name="country"
                    label="Country"
                    options={countries}
                    register={register}
                    error={errors.country?.message}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <DropDownInput
                    name="state"
                    label="State / province"
                    options={states}
                    register={register}
                    error={errors.state?.message}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <Input
                    label="Zip"
                    name="postal_code"
                    type="number"
                    placeholder=""
                    register={register}
                    error={errors.postal_code?.message}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <DropDownInput
                    name="city"
                    label="City"
                    options={cities}
                    register={register}
                    error={errors.city?.message}
                  />
                </div>
              </div>
              <div className="row">
                {/* Wrap address and phone in a row for consistency */}
                <div className="col-md-6 mb-3">
                  <Input
                    label="Address"
                    type="string"
                    placeholder=""
                    register={register}
                    name="address"
                    error={errors.address?.message}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <Input
                    label="Phone Number"
                    type="number"
                    register={register}
                    placeholder=""
                    name="phone"
                    error={errors.phone?.message}
                  />
                </div>
              </div>
              <Button
                varient="primary"
                label="Save"
                type="submit"
                borderradius="5px"
                size="md"
                width="10rem"
              />
              <span className="mx-2"> </span>
              <Button
                label="Back"
                borderradius="5px"
                varient="primary-outline"
                onClick={() => {
                  reloadAddress(); // This also resets the form to defaultValues (empty strings)
                }}
                width="10rem"
              />
            </form>
          </div>
        </div>
      )}
      {activeForm === "userAddress" && (
        <>
          <div className="bg-white rounded overflow-hidden">
            {!addresses && <Loading />}
            {addresses?.results?.length === 0 && (
              <>
                <div className="d-flex justify-content-between align-items-center">
                  <SectionTitle
                    label="Address Book"
                    size="md"
                    className="pt-0 pb-3"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <div className="tabContents mb-5">
                    <BsFillPinMapFill className="orderIcon" />
                    <p className="mb-0 text-center">
                      No address added yet. Add now to get started!
                    </p>
                    <Button
                      varient="primary-outline"
                      label={
                        <span>
                          Add Address <IoChevronForward />
                        </span>
                      }
                      width="17rem"
                      onClick={() => {
                        setActiveForm("addAddress");
                      }}
                    />
                  </div>
                </div>
              </>
            )}
            {addresses && addresses?.results?.length > 0 && (
              <>
                <div className="d-flex justify-content-between">
                  <SectionTitle
                    label="Address Book"
                    size="md"
                    className="pt-0 pb-3"
                  />
                  <Button
                    varient="primary-outline"
                    label="Add new"
                    size="md"
                    borderradius="5px"
                    onClick={() => {
                      reset(); // Reset form state to defaultValues when switching to add form
                      setActiveForm("addAddress");
                    }}
                    icon={<BsPlusLg className="me-1" />}
                    className="mb-3"
                  />
                </div>
                <table className="table table-striped">
                  <thead
                    className="bg-light border-bottom border-top"
                    style={{ fontSize: "1.1rem" }}
                  >
                    <tr>
                      <th className="py-3" scope="col">
                        Name
                      </th>
                      <th className="py-3" scope="col">
                        Address
                      </th>
                      <th scope="col">
                        <span className="visually-hidden">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {addresses?.results?.map((address: any) => (
                      <tr key={address.id}>
                        <td className="py-3">
                          <div
                            className="fw-medium"
                            style={{ fontSize: "1.2rem" }}
                          >
                            {address.name}
                          </div>
                          <div className="">{address.email}</div>
                          <div className="py-1">
                            {/* <span className="fw-medium">Phone number: </span> */}
                            {address.phone ? address.phone : "none"}
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="py-1">{address.address}</div>
                          <div className="py-1">
                            {address.city?.name}, {address.state?.name}{" "}
                            {address.postal_code}
                          </div>
                          <div className="py-1">{address.country?.name}</div>
                        </td>
                        <td className="text-end py-3" style={{ width: "20%" }}>
                          <div className="d-flex flex-column gap-2">
                            <Button
                              varient="primary"
                              label="Edit"
                              size="md"
                              borderradius="5px"
                              onClick={() => {
                                const addressToEdit = address;
                                setEditAddress(addressToEdit); // Keep for the update call

                                // Prepare data for resetting the form, ensuring string types for IDs
                                // This fixes the "expected string, received number/undefined" errors
                                // by explicitly setting string values according to the Zod schema expectation.
                                // State and City might be set initially here, but will be corrected by effects
                                // once their respective dropdown options (states, cities) are fully loaded.
                                const formValuesToSet = {
                                  name: addressToEdit.name ?? "",
                                  email: addressToEdit.email ?? "",
                                  country:
                                    addressToEdit.country?.id?.toString() ?? "", // Convert number ID to string
                                  state:
                                    addressToEdit.state?.id?.toString() ?? "", // Convert number ID to string
                                  city:
                                    addressToEdit.city?.id?.toString() ?? "", // Convert number ID to string
                                  postal_code: String(
                                    addressToEdit.postal_code ?? ""
                                  ), // Ensure postal_code is a string
                                  address: addressToEdit.address ?? "",
                                  phone: String(addressToEdit.phone ?? ""), // Ensure phone is a string
                                };

                                // Use reset to populate the form with the address data.
                                reset(formValuesToSet);

                                // Switch to the edit form view
                                setActiveForm("editAddress");
                              }}
                            />
                            <Button
                              varient="primary-outline"
                              label="Delete"
                              size="md"
                              borderradius="5px"
                              onClick={() => {
                                setAddressId(address.id);
                                setActiveForm("deleteModal");
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </>
      )}
    </AddressContainer>
  );
};

const AddressContainer = styled.div`
  .tabContents {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  .orderIcon {
    color: ${(props) => props.theme.colors.primary};
    font-size: 4rem;
    background-color: #faf6f4;
    border-radius: 50%;
    padding: 1rem;
    overflow: visible;
  }
`;

export default UserAddress;

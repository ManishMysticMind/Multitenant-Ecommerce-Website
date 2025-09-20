import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import Button from "../common/Button";
import ApplyPromoCode from "./ApplyPromoCode";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../../hooks/auth/useAuth";
import { formatCurrency } from "../../../lib/utils/utils";
import { useGetShippingRate } from "../../../hooks/api/order/postShippingRate";
import { useGetUserProfile } from "../../../hooks/api/user/getProfile";
import { CiDiscount1 } from "react-icons/ci";
import { showToast } from "../../../lib/toast";
import { useGetCartDetails } from "../../../hooks/api/cart/GetCartDetails";

const CartSummary = ({
  cart_data,
  label,
  showCoupon = true,
  handleClick,
  redirectPath,
  selectedShipping,
  showShippingFee = true,
  showGrandTotal = true,
}: {
  cart_data: any;
  handleClick: () => void;
  showCoupon?: boolean;
  label?: string;
  redirectPath?: string | null;
  selectedShipping?: any;
  showShippingFee?: boolean;
  showGrandTotal?: boolean;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderIdFromUrl = searchParams.get("orderId");
  const { role } = useAuth();
  const { data: user } = useGetUserProfile();
  const [couponApplied, setCouponApplied] = useState(false);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(
    null
  );

  const { data: cart_details } = useGetCartDetails();

  const { mutate: getShippingRate, data: shippingRateData } =
    useGetShippingRate();

  const applyCoupon = (couponCode: string) => {
    if (!selectedShipping) {
      alert("Shipping address is missing");
      return;
    }

    const shippingPayload = {
      coupon_code: couponCode,
      shipping_address: {
        name: selectedShipping.name,
        email: selectedShipping.email,
        phone: selectedShipping.phone,
        country: selectedShipping.country.id,
        state: selectedShipping.state.id,
        city: selectedShipping.city.id,
        postal_code: selectedShipping.postal_code,
        address: selectedShipping.address,
      },
    };

    getShippingRate(shippingPayload, {
      onSuccess: (_, variables) => {
        setCouponApplied(true);
        setAppliedCouponCode(couponCode);
        showToast("success", "Code Applied Successfully", { theme: "light" });
      },
      onError: (error: any) => {
        let message = "Failed to apply promo code";
        if (Array.isArray(error)) message = error[0];
        else if (typeof error === "string") message = error;
        else if (error?.message) message = error.message;
        else if (error?.detail) message = error.detail;
        showToast("error", message, { theme: "light" });
      },
    });
  };

  const removeCoupon = () => {
    if (!selectedShipping) return;

    const shippingPayload = {
      shipping_address: {
        name: selectedShipping.name,
        email: selectedShipping.email,
        phone: selectedShipping.phone,
        country: selectedShipping.country.id,
        state: selectedShipping.state.id,
        city: selectedShipping.city.id,
        postal_code: selectedShipping.postal_code,
        address: selectedShipping.address,
      },
    };

    getShippingRate(shippingPayload, {
      onSuccess: () => {
        setCouponApplied(false);
        setAppliedCouponCode(null);
        showToast("success", "Promo code removed", { theme: "light" });
      },
      onError: () => {
        showToast("error", "Failed to remove promo code", { theme: "light" });
      },
    });
  };

  const handleButtonClick = () => {
    if (role === "guest") {
      if (redirectPath) {
        router.push(`/login?callbackUrl=${encodeURIComponent(redirectPath)}`);
      }
    } else {
      handleClick();
    }
  };

  useEffect(() => {
    // Don't fetch shipping rate for existing orders, only for new cart orders
    if (
      cart_data &&
      selectedShipping &&
      selectedShipping.email != undefined &&
      !orderIdFromUrl
    ) {
      const shippingPayload = {
        shipping_address: {
          name: selectedShipping.name,
          email: selectedShipping.email,
          phone: selectedShipping.phone,
          country: selectedShipping.country.id,
          state: selectedShipping.state.id,
          city: selectedShipping.city.id,
          postal_code: selectedShipping.postal_code,
          address: selectedShipping.address,
        },
      };
      getShippingRate(shippingPayload);
    }
  }, [cart_data, selectedShipping, orderIdFromUrl]);

  // For existing orders, use the order data directly
  const isExistingOrder = Boolean(orderIdFromUrl);

  const subtotal = isExistingOrder
    ? cart_data?.sub_total || 0
    : shippingRateData?.sub_total || 0;

  const shippingRate = isExistingOrder
    ? 0 // Assuming shipping is already included in order total
    : shippingRateData?.shipping_cost || 0;

  const totalPrice = isExistingOrder
    ? cart_data?.sub_total || 0
    : shippingRateData?.total_amount || 0;

  const discount = isExistingOrder
    ? 0 // No discount for existing orders
    : shippingRateData?.discount_amount || 0;

  const oldsub_total = cart_details?.sub_total;

  return (
    <SummaryCard>
      <h5 className="mb-3 mt-0">Order Summary</h5>

      <div className="d-flex justify-content-between">
        <span>Sub-Total</span>
        <span>
          {subtotal > 0 && (
            <>
              <div>
                {pathname === "/cart"
                  ? formatCurrency(oldsub_total, cart_details?.currency)
                  : formatCurrency(
                      subtotal,
                      cart_data?.currency || cart_details?.currency
                    )}
              </div>
            </>
          )}
          {!subtotal &&
            formatCurrency(
              cart_data?.sub_total,
              cart_data?.currency || cart_details?.currency
            )}
        </span>
      </div>

      {discount > 0 && (
        <div className="d-flex justify-content-between">
          <span>Discount</span>
          <span>
            {formatCurrency(
              discount,
              cart_data?.currency || cart_details?.currency
            )}
          </span>
        </div>
      )}

      {showShippingFee && !isExistingOrder && (
        <div className="d-flex justify-content-between">
          <span>Shipping Fee</span>
          <span>
            {shippingRateData
              ? formatCurrency(
                  shippingRate,
                  cart_data?.currency || cart_details?.currency
                )
              : formatCurrency(
                  0.0,
                  cart_data?.currency || cart_details?.currency
                )}
          </span>
        </div>
      )}

      {showCoupon &&
        !isExistingOrder &&
        !shippingRateData?.coupon_code &&
        !appliedCouponCode && (
          <ApplyPromoCode userId={user?.id} applyCoupon={applyCoupon} />
        )}

      {showCoupon &&
        !isExistingOrder &&
        (shippingRateData?.coupon_code || appliedCouponCode) && (
          <Voucher className="d-flex align-items-center gap-2 justify-content-between mt-3">
            <div className="d-flex align-items_cneter gap-2">
              <CiDiscount1 />
              <div>{shippingRateData?.coupon_code} voucher applied</div>
            </div>
            <Button
              varient="primary-outline"
              label="Remove"
              className="removeBtn p-0"
              onClick={removeCoupon}
            />
          </Voucher>
        )}
      {showGrandTotal && (
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0">Grand Total</p>
          <TotalAmount>
            {totalPrice > 0 && (
              <>
                {formatCurrency(
                  totalPrice,
                  cart_data?.currency || cart_details?.currency
                )}
              </>
            )}
            {!totalPrice &&
              formatCurrency(
                cart_data?.sub_total,
                cart_data?.currency || cart_details?.currency
              )}
          </TotalAmount>
        </div>
      )}
      <Button
        varient="primary"
        label={label}
        borderradius="5px"
        width="100%"
        className="cursor-pointer mt-2"
        onClick={handleButtonClick}
      />
    </SummaryCard>
  );
};

export default CartSummary;

const SummaryCard = styled(Card)`
  padding: 15px;
  margin: 0px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 12px 2px #0000000a;

  @media (max-width: 600px) {
    margin-top: 20px;
    padding: 10px;
  }

  .code_name {
    text-transform: uppercase;
  }
  .removeBtn {
    border: none;
    color: red;
  }
  .removeBtn:hover {
    border: none;
    background-color: unset;
    color: red;
    box-shadow: none;
  }
`;

const TotalAmount = styled.p`
  color: #000;
  font-size: 1.37rem;
  font-weight: 600;
  line-height: 4rem;
  margin-bottom: 0rem;
`;

const Voucher = styled.div`
  background-color: #edfffa;
  border: 1px solid #11af85;
  padding: 0.9rem;
  border-radius: 5px;
  svg {
    color: #11af85;
    font-size: 1.5rem;
  }
`;

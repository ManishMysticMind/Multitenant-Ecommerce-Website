import { useForm } from "react-hook-form";
import Input from "../ui/common/Input";
import Button from "../ui/common/Button";
import {
  ContactUsFormSchema,
  TContactUsFormSchema,
} from "../../lib/validation/ContactUsForm/ContactUsFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendContactUs } from "../../hooks/api/contact/sendContactUs";
import { showToast } from "../../lib/toast";

export default function ContactUsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TContactUsFormSchema>({
    mode: "onBlur",
    resolver: zodResolver(ContactUsFormSchema),
  });

  const onSubmit = async (data: TContactUsFormSchema) => {
    const res = await sendContactUs(data);
    if (res.success) {
      console.log("contact us sent successfully");
      showToast("success", "Thank you! Your message has been sent.");
      reset();
    } else {
      console.log("error", res);
    }
  };

  return (
    <div className="justify-content-center form-table">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input
            type="text"
            label="Name"
            name="name"
            placeholder=""
            register={register}
            error={errors.name?.message}
          />
        </div>
        <div className="mb-4">
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder=""
            register={register}
            error={errors.email?.message}
          />
        </div>
        <div className="mb-4 ">
          <Input
            type="tel"
            name="phone_number"
            label="Phone Number"
            placeholder=""
            register={register}
            error={errors.phone_number?.message}
          />
        </div>
        <div className="mb-4">
          <Input
            type="textarea"
            name="message"
            label="Message"
            placeholder=""
            register={register}
            error={errors.message?.message}
          />
        </div>
        <Button
          type="submit"
          borderradius="5px"
          className="btn btn-warning"
          label="Submit"
        ></Button>
      </form>
    </div>
  );
}

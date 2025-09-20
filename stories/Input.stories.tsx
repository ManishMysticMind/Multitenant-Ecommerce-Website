import { Meta, StoryFn } from "@storybook/react/*";
import Input from "../components/ui/common/Input";

export default {
    title: "Components/Input",
    component: Input,
    argTypes: {
        varient: {
            control: { type: "select" },
            options: ["primary", "secondary", "default"],
        },
        size: {
            control: { type: "select" },
            options: ["sm", "md", "lg"],
        },
        label: { control: "text" },
        placeholder: { control: "text" },
        type: { control: "text" },
    },
} as Meta<typeof Input>;

const InputTemplate: StoryFn<typeof Input> = (args: any) => <Input {...args} />;

export const Text = InputTemplate.bind({});
Text.args = {
    label: "Full name",
    varient: "primary",
    placeholder: "Enter text here",
    type: "text"
};

export const Email = InputTemplate.bind({});

Email.args = {
    label: "Email",
    varient: "primary",
    placeholder: "Enter text here",
    type: "email"
};

export const Password = InputTemplate.bind({});

Password.args = {
    label: "Password",
    varient: "primary",
    placeholder: "Enter password here",
    type: "password"
};


export const Button = InputTemplate.bind({});

Button.args = {
    type: "button"
};


export const File = InputTemplate.bind({});

File.args = {
    type: "file"
};

export const Checkbox = InputTemplate.bind({});

Checkbox.args = {
    type: "checkbox"
};


export const Search = InputTemplate.bind({});

Search.args = {
    type: "search"
};


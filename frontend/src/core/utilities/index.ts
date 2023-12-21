import { IInputField, IProductField } from "../interface";

export const cacheUserSession = (token: string, expiry: string) => {
  localStorage.setItem("u_token", token);
  localStorage.setItem("u_expiry", expiry);
};

export const getUserSession = () => {
  try {
    var token = localStorage.getItem("u_token");
    if (token === "" || token === null) return undefined;
    return token;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const clearUserSession = () => {
  localStorage.removeItem("u_token");
  window.location.reload();
};

export const inputClassName: string =
  "mt-6 p-2 tablet:w-80 rounded-md spin-button-none outline-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-black block w-full p-2.5 dark:border-gray-600";

export const loginInputFields: IInputField[] = [
  {
    type: "text",
    name: "email",
    placeholder: "Email",
    className: inputClassName,
    id: 2,
  },
  {
    type: "password",
    name: "password",
    placeholder: "Password",
    className: inputClassName,
    id: 1,
  },
];

export const signupInputFields: IInputField[] = [
  {
    type: "text",
    name: "fullName",
    placeholder: "Full Name",
    className: inputClassName,
    id: 2,
  },
  {
    type: "email",
    name: "email",
    placeholder: "Email",
    className: inputClassName,
    id: 1,
  },
  {
    type: "text",
    name: "companyName",
    placeholder: "Company Name",
    className: inputClassName,
    id: 4,
  },
  {
    type: "password",
    name: "password",
    placeholder: "Password",
    className: inputClassName,
    id: 3,
  },
];

export const productFields: IInputField[] = [
  {
    type: "text",
    name: "name",
    placeholder: "Product Name",
    className: inputClassName,
    id: 4,
  },
  {
    type: "text",
    name: "code",
    placeholder: "Product Code",
    className: inputClassName,
    id: 2,
  },
  {
    type: "text",
    name: "quantity",
    placeholder: "Product Quantity",
    className: inputClassName,
    id: 1,
  },
  {
    type: "text",
    name: "unitPrice",
    placeholder: "Unit Price",
    className: inputClassName,
    id: 3,
  },
  {
    type: "text",
    name: "description",
    placeholder: "Product Description",
    className: inputClassName,
    id: 5,
  },
];

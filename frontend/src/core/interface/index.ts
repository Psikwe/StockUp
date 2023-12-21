export type IInputField = {
  type: string;
  name: string;
  className?: string;
  placeholder?: string;
  id: number;
};

export type IProductField = {
  name: string;
  code: string;
  quantity?: string;
  unitPrice?: number;
  description: string;
};

export type ILogin = {
  email: string;
  password: string;
};

export type ISignup = {
  fullName: string;
  email: string;
  companyName: string;
  password: string;
};

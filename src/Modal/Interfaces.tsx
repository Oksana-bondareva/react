export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: string | ArrayBuffer | null;
  country: string;
}

export interface FormState {
  uncontrolledFormData: FormData;
  hookFormData: FormData;
  countries: string[];
}

export interface ValidationErrors {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  terms?: string;
  picture?: string;
  country?: string;
}

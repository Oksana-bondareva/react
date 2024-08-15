export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: File | null;
  country: string;
}

export interface FormState {
  uncontrolledFormData: FormData;
  hookFormData: FormData;
  countries: string[];
}

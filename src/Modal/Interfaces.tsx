export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: string;
  country: string;
}

export interface FormState {
  countries: string[];
  usersData: FormData[];
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

export interface CardData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  picture: string;
  country: string;
}

export interface PasswordStrengthProps {
  password: string;
}

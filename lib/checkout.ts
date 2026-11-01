export type CheckoutValues = {
  name: string;
  email: string;
  cep: string;
  street: string;
  number: string;
  city: string;
  state: string;
};

export type CheckoutErrors = Partial<Record<keyof CheckoutValues, string>>;

export const emptyCheckout: CheckoutValues = {
  name: "",
  email: "",
  cep: "",
  street: "",
  number: "",
  city: "",
  state: "",
};

export function formatCep(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

export function validateCheckout(values: CheckoutValues): CheckoutErrors {
  const errors: CheckoutErrors = {};

  if (values.name.trim().split(/\s+/).filter(Boolean).length < 2) {
    errors.name = "Digite nome e sobrenome.";
  }
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = "Digite um e-mail válido.";
  }
  if (!/^\d{5}-\d{3}$/.test(values.cep)) {
    errors.cep = "Digite um CEP válido (00000-000).";
  }
  if (values.street.trim().length < 3) {
    errors.street = "Digite o endereço.";
  }
  if (!values.number.trim()) {
    errors.number = "Digite o número.";
  }
  if (values.city.trim().length < 2) {
    errors.city = "Digite a cidade.";
  }
  if (!/^[A-Za-z]{2}$/.test(values.state.trim())) {
    errors.state = "Use a sigla do estado (ex.: RJ).";
  }

  return errors;
}
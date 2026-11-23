export interface ContactValues {
  name: string;
  email: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (name.length < 2) errors.name = "Please enter your name (at least 2 characters).";
  else if (name.length > 100) errors.name = "Name is too long.";

  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  else if (email.length > 254) errors.email = "Email is too long.";

  if (message.length < 10) errors.message = "Message should be at least 10 characters.";
  else if (message.length > 2000) errors.message = "Message must be under 2000 characters.";

  return errors;
}

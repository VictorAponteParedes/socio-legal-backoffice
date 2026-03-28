export interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  isDark?: any;
}

export interface SelectInputProps {
  name: string;
  label: string;
  options: any;
  placeholder?: string;
  isDark?: any;
}

export interface PasswordInputProps {
  name: string;
  label: string;
  placeholder?: string;
  showEyes?: boolean;
}

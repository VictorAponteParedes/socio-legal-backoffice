// src/components/form/TextInput.tsx
import { useFormContext } from "react-hook-form";
import type { TextInputProps } from "@/types/inputs";
import type { LucideIcon } from "lucide-react";

interface Props extends TextInputProps {
  icon?: LucideIcon;
}

export const TextInput = ({
  name,
  label,
  placeholder,
  type = "text",
  icon: Icon,
  ...rest
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className={`absolute left-3 top-1/2 -translate-y-1/2 text-blue-600`}
            size={18}
          />
        )}
        <input
          type={type}
          placeholder={placeholder}
          {...register(name)}
          {...rest}
          className={`w-full ${
            Icon ? "pl-10" : "pl-3"
          } pr-3 py-2.5 border rounded-lg text-sm transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${
              errors[name]
                ? "border-red-500"
                : "border-gray-300 bg-white text-gray-900"
            }`}
        />
      </div>
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">
          {(errors[name] as any).message || "Campo requerido"}
        </p>
      )}
    </div>
  );
};

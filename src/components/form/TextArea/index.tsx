// src/components/form/TextArea.tsx
import { useFormContext } from "react-hook-form";
import { useTheme } from "../../../context/ThemeContext";

interface TextAreaProps {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
}

export function TextArea({
  name,
  label,
  placeholder,
  rows = 3,
}: TextAreaProps) {
  const { isDark } = useTheme();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <label
        className={`block text-sm font-medium ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {label}
      </label>
      <textarea
        {...register(name)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none
          ${
            errors[name]
              ? "border-red-500"
              : isDark
              ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
              : "border-gray-300 bg-white text-gray-900"
          }`}
      />
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">
          {(errors[name] as any).message || "Campo requerido"}
        </p>
      )}
    </div>
  );
}

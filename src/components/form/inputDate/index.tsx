// src/components/form/DateInput.tsx
import { useFormContext } from "react-hook-form";

interface DateInputProps {
  name: string;
  label?: string;
  defaultValue?: string;
  className?: string;
}

export const DateInput = ({
  name,
  label,
  defaultValue,
  className = "",
}: DateInputProps) => {
  const { register } = useFormContext();

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        type="date"
        id={name}
        defaultValue={defaultValue}
        {...register(name)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
      />
    </div>
  );
};

// src/components/form/ToggleSwitch.tsx
import { useFormContext } from "react-hook-form";

interface ToggleSwitchProps {
  name: string;
  label: string;
  yesLabel?: string;
  noLabel?: string;
}

export function ToggleSwitch({
  name,
  label,
  yesLabel = "Sí",
  noLabel = "No",
}: ToggleSwitchProps) {
  const { register, watch } = useFormContext();
  const value = watch(name);

  return (
    <div className="space-y-2">
      <p className="font-medium text-gray-700">{label}</p>
      <div className="flex items-center gap-4">
        <span
          className={`text-sm ${
            !value ? "font-bold text-sud-blue" : "text-gray-500"
          }`}
        >
          {noLabel}
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" {...register(name)} className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sud-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sud-blue"></div>
        </label>
        <span
          className={`text-sm ${
            value ? "font-bold text-sud-blue" : "text-gray-500"
          }`}
        >
          {yesLabel}
        </span>
      </div>
    </div>
  );
}

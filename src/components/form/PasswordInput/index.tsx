import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { PasswordInputProps } from "../../types/inputs";
import { Eye, EyeOff } from "lucide-react";

export const PasswordInput = ({
    name,
    label,
    placeholder,
    showEyes = false,
}: PasswordInputProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="mb-4">
            <label className="block mb-1 font-medium">{label}</label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    {...register(name)}
                    className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {showEyes && (
                    <button
                        type="button"
                        onClick={toggleVisibility}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
            {errors[name] && (
                <span className="text-red-500 text-sm">
                    {(errors[name] as any).message}
                </span>
            )}
        </div>
    );
};
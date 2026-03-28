import { useFormContext } from "react-hook-form";
import { Camera } from "lucide-react";
import { useState } from "react";

interface Props {
    name: string;
    label: string;
    // control: any;  REMOVIDO
}

export const ImageInput = ({ name, label }: Props) => {
    const { setValue, watch } = useFormContext();
    const [preview, setPreview] = useState<string | null>(null);
    const file = watch(name);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue(name, file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-200 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                    {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <Camera className="text-blue-500" size={48} />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition flex items-center justify-center">
                        <Camera className="text-white opacity-0 hover:opacity-100" size={28} />
                    </div>
                </div>
                <label className="mt-3 cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-md transition">
                    <Camera size={16} /> Subir Foto
                    <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </label>
            </div>
        </div>
    );
};
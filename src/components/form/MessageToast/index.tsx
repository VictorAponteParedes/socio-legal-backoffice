import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

interface MessageToastProps {
    type: "success" | "error";
    title: string;
    description: string;
    onClose: () => void;
}

export const MessageToast = ({
    type,
    title,
    description,
    onClose,
}: MessageToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const isSuccess = type === "success";
    const Icon = isSuccess ? CheckCircle : XCircle;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 p-4 rounded-lg shadow-lg flex items-start gap-3 ${isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
        >
            <Icon className="w-6 h-6 mt-1" />
            <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm">{description}</p>
            </div>
        </motion.div>
    );
};
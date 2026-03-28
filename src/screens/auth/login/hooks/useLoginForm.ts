// src/screens/auth/login/hooks/useLoginForm.ts
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/store/authStore";
import { translate } from "@/lang";
import { RoutesView } from "@/navigation/routes";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginMessage {
  type: "success" | "error";
  title: string;
  description: string;
}

export const useLoginForm = () => {
  const methods = useForm<LoginFormData>({
    defaultValues: { email: "", password: "" },
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<LoginMessage | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const success = await login(data.email, data.password);
      if (success) {
        setMessage({
          type: "success",
          title: translate("Login.messageSuccess.title"),
          description: translate("Login.messageSuccess.subtitle"),
        });
        setTimeout(() => navigate(RoutesView.DASHBOARD, { replace: true }), 2000);
      } else {
        setMessage({
          type: "error",
          title: translate("Login.messageError.title"),
          description: translate("Login.messageError.subtitle"),
        });
      }
    } catch (_err) {
      setMessage({
        type: "error",
        title: translate("Login.errorGeneric"),
        description: translate("Login.errorGeneric"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { methods, isLoading, message, setMessage, onSubmit };
};

// src/screens/auth/login/components/LoginFormPanel.tsx
import { FormProvider } from "react-hook-form";
import { motion } from "framer-motion";
import { TextInput } from "@/components/form/TextInput";
import { PasswordInput } from "@/components/form/PasswordInput";
import { translate } from "@/lang";
import { sudLogo } from "@/assets/index";
import type { UseFormReturn } from "react-hook-form";
import type { LoginFormData } from "@/screens/auth/login/hooks/useLoginForm";

interface Props {
  methods: UseFormReturn<LoginFormData>;
  isLoading: boolean;
  onSubmit: (data: LoginFormData) => Promise<void>;
}

export const LoginFormPanel = ({ methods, isLoading, onSubmit }: Props) => {
  return (
    <div className="flex-1 p-10 lg:p-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800">
            {translate("Login.title")}
          </h2>
          <p className="text-gray-600 mt-2">{translate("Login.subtitle")}</p>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <TextInput
              name="email"
              label={translate("Login.emailLabel")}
              type="email"
              placeholder={translate("Login.emailPlaceholder")}
            />
            <PasswordInput
              name="password"
              label={translate("Login.passwordLabel")}
              placeholder={translate("Login.passwordPlaceholder")}
              showEyes
            />

            <div className="flex justify-end">
              <a
                href="/forgot-password"
                className="text-sm text-slate-800 hover:text-slate-600 hover:underline font-medium transition-colors"
              >
                {translate("Login.forgotPassword")}
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-4 rounded-full font-bold text-lg shadow-xl hover:bg-slate-800 transition disabled:opacity-60"
            >
              {isLoading
                ? translate("Login.loading")
                : translate("Login.buttonSubmit")}
            </motion.button>
          </form>
        </FormProvider>

        {/* Logo móvil */}
        <div className="md:hidden mt-10 text-center">
          <img
            src={sudLogo}
            alt="Logo"
            className="w-36 mx-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

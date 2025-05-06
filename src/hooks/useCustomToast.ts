// hooks/useCustomToast.ts
import { toast } from "sonner";

type ToastVariant = "default" | "success" | "destructive" | "info";

interface ShowToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

export const useCustomToast = () => {
  const showToast = ({ title, description, variant = "default" }: ShowToastOptions) => {
    switch (variant) {
      case "success":
        toast.success(title, { description });
        break;
      case "destructive":
        toast.error(title, {
          description,
          className: "bg-red-600 text-white", // customize styling if needed
        });
        break;
      case "info":
        toast(title, { description });
        break;
      case "default":
      default:
        toast(title, { description });
        break;
    }
  };

  return { showToast };
};

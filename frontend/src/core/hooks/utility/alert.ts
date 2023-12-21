import { toast } from "react-toastify";

export const showToast = (message: string, success: boolean) => {
  if (success === true) {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  } else if (success === false) {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  }
};

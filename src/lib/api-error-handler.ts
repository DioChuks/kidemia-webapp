import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export function handleRequestError(error: unknown, toastId: string) {
  toast.remove(toastId);

  if (error instanceof AxiosError) {
    console.error("Axios error:", error);
    toast.error(error.response?.data.message || "An error occurred");
  } else if (error instanceof Error) {
    console.error("Generic error:", error);
    toast.error(error.message);
  } else {
    console.error("Unknown error:", error);
    toast.error("Something went wrong!");
  }
}

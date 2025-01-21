import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { env } from './api';

export function handleRequestError(error: unknown, toastId: string) {
  toast.remove(toastId);

  if (error instanceof AxiosError) {
    console.error("Axios error:", error);
    toast.error(error.response?.data.message || "An error occurred");
    // if the error has status code of 401, clear sessionStorage and redirect to login
    if (error.response?.status === 401) {
      sessionStorage.removeItem("userData");
      window.location.replace(env.clientUrl + '/auth/login');
    }
  } else if (error instanceof Error) {
    console.error("Generic error:", error);
    toast.error(error.message);
  } else {
    console.error("Unknown error:", error);
    toast.error("Something went wrong!");
  }
}

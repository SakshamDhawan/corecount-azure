import type { BaseToastProps } from "react-native-toast-message";
import Toast, { ErrorToast, InfoToast, SuccessToast } from "react-native-toast-message";

const toastConfig = {
  success: (props: BaseToastProps) => <SuccessToast {...props} text2NumberOfLines={0} />,
  info: (props: BaseToastProps) => <InfoToast {...props} text2NumberOfLines={0} />,
  error: (props: BaseToastProps) => <ErrorToast {...props} text2NumberOfLines={0} />,
};

const Toaster = () => {
  return <Toast config={toastConfig} />;
};

export default Toaster;

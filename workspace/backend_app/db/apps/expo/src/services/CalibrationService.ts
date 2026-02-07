import * as SecureStore from "expo-secure-store";

export const MIN_KEY = "min";
export const BACK_KEY = "cali_back";
export const ABNOMIAL_KEY = "cali_abdo";
export const CALIBRATED_KEY = "cali_calibrated";

export const setCalibratedData = (key: string, data: number[]) => {
  console.log("Storing data:", key, data);
  SecureStore.setItem(key, JSON.stringify(data));
};

export const getCalibratedData = (key: string): number[] => {
  const data = SecureStore.getItem(key);
  return data ? JSON.parse(data) : null;
};

import { Loading, Notify } from "quasar";

export const safeMethod = async (fn: any, ...args: any): Promise<any> => {
  try {
    Loading.show({
      message: "You can go read a book..."
    });
    return await fn(...args);
  } catch (err: any) {
    Notify.create({
      message: err.message,
      type: "negative"
    });
  } finally {
    Loading.hide();
  }
};

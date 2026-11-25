import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    error(error) {
      console.log("Service worker registration falied:", error);
    },
  });
}

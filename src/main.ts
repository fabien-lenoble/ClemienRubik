import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/main.scss";

const app = createApp(App);

app.use(router);

app.mount("#app");

// create an async function to request a wake lock
async function requestWakeLock() {
  try {
    if ("wakeLock" in navigator) {
      await navigator.wakeLock.request("screen");
    }
  } catch (err: any) {
    console.error(`${err.name}, ${err.message}`);
  }
}

// call the function
requestWakeLock();

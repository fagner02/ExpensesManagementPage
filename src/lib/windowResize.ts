import { setHeightCallbacks } from "./store/store";

document.addEventListener("resize", () => {
    console.log("resize");
    setHeightCallbacks.forEach((item) => item.cb());
});

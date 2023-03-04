import initializeAxios from "./axios";

const initializeGlobalProps = () => {
  window.globalProps = JSON.parse(document.body?.dataset?.props || "{}")
}

export default function initializeApplication() {
  initializeGlobalProps();
  initializeAxios();
}

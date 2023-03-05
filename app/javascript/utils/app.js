import initializeAxios from "./axios";

let globalProps = {};

const isLoggedIn = () => !!globalProps.user?.email;

export { globalProps, isLoggedIn };

const initializeGlobalProps = () => {
  window.globalProps = JSON.parse(document.body?.dataset?.props || "{}")
}

export default function initializeApplication() {
  initializeGlobalProps();
  globalProps = window.globalProps;

  initializeAxios();
}

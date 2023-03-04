import axios from "axios";

const HEADERS = {
  xAuthEmail: "X-Auth-Email",
  xAuthToken: "X-Auth-Token",
  xCsrfToken: "X-CSRF-TOKEN",
  contentType: "Content-Type",
  accept: "Accept",
};

const getCSRFToken = () =>
  document.querySelector('[name="csrf-token"]')?.getAttribute("content");

const setAuthHeaders = () => {
  axios.defaults.headers = {
    [HEADERS.accept]: "application/json",
    [HEADERS.contentType]: "application/json",
    [HEADERS.xCsrfToken]: getCSRFToken(),
  };

  const token = globalProps.user?.authenticationToken;
  const email = globalProps.user?.email;
  if (token && email) {
    axios.defaults.headers[HEADERS.xAuthEmail] = email;
    axios.defaults.headers[HEADERS.xAuthToken] = token;
  }
};


export default function initializeAxios() {
  axios.defaults.baseURL = "/";

  setAuthHeaders();
}

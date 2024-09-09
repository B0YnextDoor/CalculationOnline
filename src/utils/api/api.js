import axios from "axios";

export const $api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("mptok")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest &&
      !originalRequest._isRetry &&
      error.response.status === 401
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}auth/jwt/refresh/`,
          { refresh: getCookie("mptok") }
        );
        localStorage.setItem("mptok", response.data.access);
        return $api.request(originalRequest);
      } catch (error) {
        if (error.response.status === 401) {
        }
        // window.location.href = '/login'
      }
    } else {
      // localStorage.clear()
      // window.location.href = '/';
    }

    throw error;
  }
);

export default function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      // eslint-disable-next-line no-useless-escape
      "(?:^|; )" +
        // eslint-disable-next-line no-useless-escape
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

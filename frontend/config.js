export const environment = process.env.NEXT_PUBLIC_UI_ENV
  ? process.env.NEXT_PUBLIC_UI_ENV.toLocaleLowerCase()
  : "development";

export const apiEndpoints = {
  section: {
    auth: {
      login: "/user/login",
    },
  },
};

const AR_API = () => {
  switch (environment) {
    case "development":
      return "http://localhost:5000";
    case "production":
      return "http://localhost:5000";
    default:
      return "http://localhost:5000";
  }
};

export const apiHost = {
  default: AR_API(),
};

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
      return "https://ponyo-review.herokuapp.com";
    case "production":
      return "https://ponyo-review.herokuapp.com";
    default:
      return "https://ponyo-review.herokuapp.com";
  }
};

export const apiHost = {
  default: AR_API(),
};

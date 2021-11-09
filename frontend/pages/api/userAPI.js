import http from "./http-common";

class userAPI {
  login = (data) => {
    return http.post("/user/login", data);
  };

  test = (data) => {
    console.log("data ", data);
    return http.post("/user", data);
  };
}

export default new userAPI();

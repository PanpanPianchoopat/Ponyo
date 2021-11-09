import http from "./http-common";

class userAPI {
  login = (data) => {
    return http.post("/user/login", data);
  };

  register = (data)  => {
    return http.post("/user/register", data);
  }

  test = (data) => {
    console.log("data ", data);
    return http.post("/user", data);
  };
}

export default new userAPI();

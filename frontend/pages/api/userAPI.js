import http from "./http-common";

class userAPI {
  login = (data) => {
    return http.post("/user/login", data);
  };

  register = (data) => {
    return http.post("/user/register", data);
  };

  addRestaurantToList = (key, user_id, res_id) => {
    return http.post(`/user/add/${key}/${user_id}/${res_id}`);
  };
  removeResFromList = (key, user_id, res_id) => {
    return http.post(`/user/delete/${key}/${user_id}/${res_id}`);
  };
}

export default new userAPI();

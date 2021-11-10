import http from "./http-common";

class RestaurantAPI {
  addRestaurant = (data) => {
    return http.post("/restaurant", data);
  };

  getRestaurantDetail = () => {
    const id = "617d07fb8f7c593a9e729a56";
    return http.get(`/restaurant/detail/${id}`);
  };

  getRestaurantStatus = () => {
    const res_id = "617d07fb8f7c593a9e729a56";
    return http.get(`/restaurant/status/${res_id}`);
  };

  test = () => {
    return http.get("/restaurant");
  };
}

export default new RestaurantAPI();

import http from "./http-common";

class RestaurantAPI {
  addRestaurant = (data) => {
    return http.post("/restaurant", data);
  };

  getRestaurantDetail = () => {
    const id = "617aeb9ca6287c38c323f851";
    return http.get(`/restaurant/detail/${id}`);
  };

  test = () => {
    return http.get("/restaurant");
  };
}

export default new RestaurantAPI();

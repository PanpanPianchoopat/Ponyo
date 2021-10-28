import http from "./http-common";

class ReataurantAPI {

  addRestaurant = (data) => {
    console.log("data", data);
    return http.post("/restaurant", data);
  };

  test = () => {
    return http.get("/restaurant");
  }

}

export default new ReataurantAPI();

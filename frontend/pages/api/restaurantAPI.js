import http from "./http-common";

class RestaurantAPI {
  addRestaurant = (data) => {
    return http.post("/restaurant", data);
  };

  getRestaurantDetail = (res_id) => {
    return http.get(`/restaurant/detail/${res_id}`);
  };

  getRestaurantStatus = (res_id) => {
    return http.get(`/restaurant/status/${res_id}`);
  };

  getLikedBookmarked = (key, user_id, res_id) => {
    return http.get(`/restaurant/checkList/${key}/${user_id}/${res_id}`);
  };

  getAllRestaurants = () => {
    return http.get(`/restaurant/`);
  };

  // getRestaurant = (filter,search,priceRange,type, resStatus) => {
  //   console.log("filter",filter);
  //   console.log("search",search);
  //   console.log("priceRange",priceRange);
  //   console.log("type",type);
  //   console.log("resStatus",resStatus);
  //   return http.get(`/restaurant/search/${filter}/${search}/${priceRange}${type}/${resStatus}`);
  // };
}

export default new RestaurantAPI();

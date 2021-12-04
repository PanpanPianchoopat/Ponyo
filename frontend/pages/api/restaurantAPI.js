/*******************************************************************************
 * This file is the path that connect to restaurants's collection in the database
 *******************************************************************************
 */
import http from "./http-common";

class RestaurantAPI {
  addRestaurant = (data) => {
    return http.post("/restaurant", data);
  };

  getRestaurantDetail = (resID) => {
    return http.get(`/restaurant/detail/${resID}`);
  };

  getRestaurantStatus = (resID) => {
    return http.get(`/restaurant/status/${resID}`);
  };

  getLikedBookmarked = (key, userID, resID) => {
    return http.get(`/restaurant/checkList/${key}/${userID}/${resID}`);
  };

  getAllRestaurants = () => {
    return http.get(`/restaurant/`);
  };

  getRestaurant = (filter, search, priceRange, type, resStatus) => {
    return http.get(
      `/restaurant/search/${filter}/${search}/${priceRange}/${type}/${resStatus}`
    );
  };

  getTrending = (type) => {
    return http.get(`/restaurant/trending/${type}`);
  };

  getBestTrending = () => {
    return http.get(`/restaurant/bestTrending`);
  };

  getRestaurantByType = (type) => {
    return http.get(`/restaurant/type/${type}`);
  };
}

export default new RestaurantAPI();

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

  calReviewRate = (res_id) => {
    return http.get(`/review/rate/${res_id}`);
  };

  getReviewAmount = (res_id, typeReview, star) => {
    return http.get(`/review/amount/${res_id}/${typeReview}/${star}`);
  };

  getLikedBookmarked = (key, user_id, res_id) => {
    return http.get(`/restaurant/checkList/${key}/${user_id}/${res_id}`);
  };

  addReview = (reviewer, res_id, data) => {
    return http.post(`/review/add/${res_id}/${reviewer}`, data);
  };
}

export default new RestaurantAPI();

import http from "./http-common";

class ReviewAPI {
  addReview = (user_id, res_id, data) => {
    console.log("user ", user_id);
    console.log("res ", res_id);
    console.log("data", data);
    return http.post(`/review/add/${res_id}/${user_id}`, data);
  };

  calReviewRate = (res_id) => {
    return http.get(`/review/rate/${res_id}`);
  };

  getReviewAmount = (res_id, typeReview, star) => {
    return http.get(`/review/amount/${res_id}/${typeReview}/${star}`);
  };

  getStarAmount = (res_id, typeReview, star) => {
    return http.get(`/review/amount/${res_id}/${typeReview}/${star}`);
  };

  getAllReview = (res_id, user_id) => {
    return http.get(`/review/all/${res_id}/${user_id}`);
  };

  getReviewByFilter = (filter, res_id, user_id, data) => {
    return http.get(`/filter/${filter}/${res_id}/${user_id}`, data);
  };
}

export default new ReviewAPI();

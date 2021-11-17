import http from "./http-common";

class ReviewAPI {
  addReview = (user_id, res_id, data) => {
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

  getReviewByFilter = (filter, res_id, user_id, star) => {
    return http.get(`/review/filter/${filter}/${res_id}/${user_id}/${star}`);
  };

  addLikeReview = (review_id, user_id, like) => {
    return http.patch(`/review/like/${review_id}/${user_id}/${like}`);
  };

  editReview = (review_id, data) => {
    return http.patch(`/review/edit/${review_id}`,data);
  };

  deleteReview = (review_id) => {
    return http.delete(`/review/delete/${review_id}`);
  };

}

export default new ReviewAPI();

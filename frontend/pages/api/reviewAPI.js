/*******************************************************************************
 * This file is the path that connect to reviews's collection in the database
 ******************************************************************************/
import http from "./http-common";

class ReviewAPI {
  addReview = (userID, resID, data) => {
    return http.post(`/review/add/${resID}/${userID}`, data);
  };

  calReviewRate = (resID) => {
    return http.get(`/review/rate/${resID}`);
  };

  getReviewAmount = (resID, typeReview, star) => {
    return http.get(`/review/amount/${resID}/${typeReview}/${star}`);
  };

  getStarAmount = (resID, typeReview, star) => {
    return http.get(`/review/amount/${resID}/${typeReview}/${star}`);
  };

  getAllReview = (resID, userID) => {
    return http.get(`/review/all/${resID}/${userID}`);
  };

  getReviewByFilter = (filter, resID, userID, star) => {
    return http.get(`/review/filter/${filter}/${resID}/${userID}/${star}`);
  };

  addLikeReview = (reviewID, userID, like) => {
    return http.patch(`/review/like/${reviewID}/${userID}/${like}`);
  };

  editReview = (reviewID, data) => {
    return http.patch(`/review/edit/${reviewID}`, data);
  };

  deleteReview = (reviewID) => {
    return http.delete(`/review/delete/${reviewID}`);
  };
}

export default new ReviewAPI();

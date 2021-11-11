import http from "./http-common";

class ReviewAPI {
  getAllReview = (res_id, username) => {
    return http.get(`/review/all/${res_id}/${username}`);
  };
}

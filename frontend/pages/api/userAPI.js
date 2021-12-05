/*******************************************************************************
 * This file is the path that connect to users's collection in the database
 ******************************************************************************/
import http from "./http-common";

class userAPI {
  login = (data) => {
    return http.post("/user/login", data);
  };

  register = (data) => {
    return http.post("/user/register", data);
  };

  checkUsername = (username) => {
    return http.get(`/user/checkUsername/${username}`);
  };

  checkEmail = (email) => {
    return http.get(`/user/checkEmail/${email}`);
  };

  editProfile = (userID, data) => {
    return http.patch(`/user/editProfile/${userID}`, data);
  };

  addRestaurantToList = (key, userID, resID) => {
    return http.post(`/user/add/${key}/${userID}/${resID}`);
  };

  removeResFromList = (key, userID, resID) => {
    return http.post(`/user/delete/${key}/${userID}/${resID}`);
  };

  getMyRestaurantList = (key, userID) => {
    return http.get(`/user/list/${key}/${userID}`);
  };

  editMyFavList = (userID, myFavRestaurants) => {
    return http.patch(`/user/editfav/${userID}`, myFavRestaurants);
  };
}

export default new userAPI();

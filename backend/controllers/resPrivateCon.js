/*******************************************************************************
 * This file includes the functions that is the private function and use
 * in the restaurantCon.js
 ******************************************************************************/
import Restaurant from "../models/restaurantModel.js";
import { DAYS, WEEK_DAY_STATUS, CLOSE } from "../constant/restaurant.js";

/*******************************************************************************
 * This function is used to convert week to get the close day of
 * restaurant.
 * 'week' is the array of open and close day
 *        1 : OPEN
 *        0 : CLOSE
 * Returns the close day of the restaurant.
 ******************************************************************************/
export const convertDay = (week) => {
  var i = 0;
  var j = 0;
  const closeDay = [];

  for (i = 0; i <= 6; i++) {
    if (week[i].dayStatus == 0) {
      if (j != 0 && i != 6) {
        closeDay[j] = ", ";
        j++;
      }
      closeDay[j] = week[i].weekDay;
      j++;
    }
  }

  return closeDay;
};

/*******************************************************************************
 * This function is used to convert time in the unit of minutes.
 * 'hour' is the time in unit of hour
 * 'min' is the time in unit of minutes
 * Returns time in the unit of minutes
 ******************************************************************************/
export const convertToMin = (hour, min) => {
  return hour * 60 + min;
};

/*******************************************************************************
 * This function is used to convert open hours of restaurant
 * in unit of minutes to the form of hours and minutes.
 * 'minTime' open hours in unit of minutes
 * Returns array time that include hours and minutes
 ******************************************************************************/
export const convertOpenHours = (minTime) => {
  const time = [0, 0];
  time[1] = minTime % 60;
  time[0] = (minTime - time[1]) / 60;
  return time;
};

/*******************************************************************************
 * This function is used to set restaurant status which day
 * is closed or opened.
 * 'closingDay' is the array of the day that closed
 * Returns the array of restaurant status
 ******************************************************************************/
export const dayStatus = (closingDay) => {
  let i = 0;
  if (closingDay.length != 0) {
    while (i < closingDay.length) {
      const day = closingDay[i];
      WEEK_DAY_STATUS[day] = CLOSE;
      i++;
    }
  }
  return WEEK_DAY_STATUS;
};

/*******************************************************************************
 * This function is used to define the range of each price level.
 * Returns the array of min and max price of that level.
 ******************************************************************************/
export const findPriceRange = (priceRange) => {
  const range = [0, 0];
  if (priceRange == 1) {
    range[0] = 0;
    range[1] = 500;
  } else if (priceRange == 2) {
    range[0] = 500;
    range[1] = 1000;
  } else if (priceRange == 3) {
    range[0] = 1000;
    range[1] = 5000;
  } else if (priceRange == 4) {
    range[0] = 5000;
    range[1] = 10000;
  }
  return range;
};

/*******************************************************************************
 * This function is used tag open or close of each restaurant.
 * Returns
 * - true if restaurant is open.
 * - false if restaurant is close.
 ******************************************************************************/
export const getTag = async (resID) => {
  const now = new Date(),
    weekDay = DAYS[now.getDay()],
    hour = now.getHours(),
    minutes = now.getMinutes();
  const currentMin = convertToMin(hour, minutes);

  try {
    const resOpen = await Restaurant.find({
      _id: resID,
      openDays: { weekDay: weekDay, dayStatus: 1 },
      $and: [
        { "openHours.openTime": { $lte: currentMin } },
        { "openHours.closeTime": { $gte: currentMin } },
      ],
    });
    if (resOpen.length == 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log("error get tag");
  }
};

/*******************************************************************************
 * This function is used to search all restaurant by filter.
 * 'key' is the name of filter that user want to search (name or address).
 * 'search' is the keyword that user input in search box (depend on selected key).
 * 'range' is array of min and max price that user want to search.
 * 'type' is cuisine that user want to search.
 * Returns the array object of all restaurant that match the filter.
 ******************************************************************************/
export const searchRestaurant = async (key, search, range, type) => {
  // NO Search Type & Price
  if (!type && range[0] == 0 && range[1] == 0) {
    try {
      const Restaurants = await noSearchPriceAndType(
        "ALL",
        key,
        search,
        "",
        ""
      );
      return Restaurants;
    } catch (error) {
      console.log("error search ALL (no price and type)");
    }
  }
  // NO Search Type
  else if (!type) {
    try {
      const Restaurants = await noSearchType("ALL", key, search, range, "", "");
      return Restaurants;
    } catch (error) {
      console.log("error search ALL (no type)");
    }
  }
  // NO Search Price Range
  else if (range[0] == 0 && range[1] == 0) {
    try {
      const Restaurants = await noSearchPrice("ALL", key, search, type, "", "");
      return Restaurants;
    } catch (error) {
      console.log("error search ALL (no price)");
    }
  }
  // Search with Everything
  else {
    try {
      const Restaurants = await noSearchPrice(
        "ALL",
        key,
        search,
        type,
        range,
        "",
        ""
      );
      return Restaurants;
    } catch (error) {
      console.log("error search ALL");
    }
  }
};

/*******************************************************************************
 * This function is used to search restaurant by filter and status.
 * 'resStatus' is the status of restaurant that user want to search (OPEN or CLOSE).
 * 'key' is the name of filter that user want to search (name or address).
 * 'search' is the keyword that user input in search box (depend on selected key).
 * 'range' is array of min and max price that user want to search.
 * 'type' is cuisine that user want to search.
 * Returns the array object of all restaurant that match the filter and status.
 ******************************************************************************/
export const searchWithStatus = async (resStatus, key, search, range, type) => {
  const now = new Date(),
    weekDay = DAYS[now.getDay()],
    hour = now.getHours(),
    minutes = now.getMinutes();
  const currentMin = convertToMin(hour, minutes);

  //Search Open Restaurants
  if (resStatus == "OPEN") {
    //No Search Type and No Search Price (Open)
    if (!type && range[0] == 0 && range[1] == 0) {
      try {
        const resOpen = await noSearchPriceAndType(
          "OPEN",
          key,
          search,
          weekDay,
          currentMin
        );
        return resOpen;
      } catch (error) {
        console.log("error search OPEN (no price and type)");
      }
    }
    //No Search Type (Open)
    else if (!type) {
      try {
        const resOpen = await noSearchType(
          "OPEN",
          key,
          search,
          range,
          weekDay,
          currentMin
        );
        return resOpen;
      } catch (error) {
        console.log("error search OPEN (no type)");
      }
    }
    //No Search Price (Open)
    else if (range[0] == 0 && range[1] == 0) {
      try {
        const resOpen = await noSearchPrice(
          "OPEN",
          key,
          search,
          type,
          weekDay,
          currentMin
        );
        return resOpen;
      } catch (error) {
        console.log("error search OPEN (no price)");
      }
    }
    // Search with Everything
    else {
      try {
        const resOpen = await searchAllFilter(
          "OPEN",
          key,
          search,
          type,
          range,
          weekDay,
          currentMin
        );
        return resOpen;
      } catch (error) {
        console.log("error search OPEN");
      }
    }
  }
  //Search Close Restaurants
  else {
    //no type and no price (close)
    if (!type && range[0] == 0 && range[1] == 0) {
      try {
        const resClose = await noSearchPriceAndType(
          "CLOSE",
          key,
          search,
          weekDay,
          currentMin
        );
        return resClose;
      } catch (error) {
        console.log("error search CLOSE (no price and type)");
      }
    }
    //no search type (close)
    else if (!type) {
      try {
        const resClose = await noSearchType(
          "CLOSE",
          key,
          search,
          range,
          weekDay,
          currentMin
        );
        return resClose;
      } catch (error) {
        console.log("error search CLOSE (no type)");
      }
    }
    //no search price (close)
    else if (range[0] == 0 && range[1] == 0) {
      try {
        const resClose = await noSearchPrice(
          "CLOSE",
          key,
          search,
          type,
          weekDay,
          currentMin
        );
        return resClose;
      } catch (error) {
        console.log("error search CLOSE (no price)");
      }
    }
    // Search with Everything
    else {
      try {
        const resClose = await searchAllFilter(
          "CLOSE",
          key,
          search,
          type,
          range,
          weekDay,
          currentMin
        );
        return resClose;
      } catch (error) {
        console.log("error search CLOSE");
      }
    }
  }
};

/*******************************************************************************
 * This function is used to get restaurant by name or address (without type
 * and price range).
 * 'resStatus' is the status of restaurant that user want to search (OPEN or CLOSE).
 * 'key' is the name of filter that user want to search (name or address).
 * 'search' is the keyword that user input in search box (depend on selected key).
 * 'weekDay' is current day.
 * 'currentMin' is current time in unit of minutes.
 * Returns the array object of all restaurant that match the filter and status.
 ******************************************************************************/
export const noSearchPriceAndType = async (
  resStatus,
  key,
  search,
  weekDay,
  currentMin
) => {
  if (resStatus == "OPEN") {
    try {
      const resOpen = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        openDays: { weekDay: weekDay, dayStatus: 1 },
        $and: [
          { "openHours.openTime": { $lte: currentMin } },
          { "openHours.closeTime": { $gte: currentMin } },
        ],
      });
      return resOpen;
    } catch (error) {
      console.log(error);
    }
  } else if (resStatus == "CLOSE") {
    try {
      const resClose = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        $or: [
          { openDays: { weekDay: weekDay, dayStatus: 0 } },
          {
            $or: [
              { "openHours.openTime": { $gte: currentMin } },
              { "openHours.closeTime": { $lte: currentMin } },
            ],
          },
        ],
      });
      return resClose;
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const Restaurants = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
      });

      return Restaurants;
    } catch (error) {
      console.log(error);
    }
  }
};

/*******************************************************************************
 * This function is used to get restaurant by name or address (without type).
 * 'resStatus' is the status of restaurant that user want to search (OPEN or CLOSE).
 * 'key' is the name of filter that user want to search (name or address).
 * 'search' is the keyword that user input in search box (depend on selected key).
 * 'range' is array of min and max price that user want to search.
 * 'weekDay' is current day.
 * 'currentMin' is current time in unit of minutes.
 * Returns the array object of all restaurant that match the filter and status.
 ******************************************************************************/
export const noSearchType = async (
  resStatus,
  key,
  search,
  range,
  weekDay,
  currentMin
) => {
  if (resStatus == "OPEN") {
    try {
      const resOpen = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        $or: [
          {
            $and: [
              { "priceRange.min": { $gte: range[0] } },
              { "priceRange.min": { $lte: range[1] } },
            ],
          },
          {
            $and: [
              { "priceRange.max": { $gte: range[0] } },
              { "priceRange.max": { $lte: range[1] } },
            ],
          },
        ],
        openDays: { weekDay: weekDay, dayStatus: 1 },
        $and: [
          { "openHours.openTime": { $lte: currentMin } },
          { "openHours.closeTime": { $gte: currentMin } },
        ],
      });
      return resOpen;
    } catch (error) {
      console.log(error);
    }
  } else if (resStatus == "CLOSE") {
    const resClose = await Restaurant.find({
      [key]: { $regex: search, $options: "i" },
      $and: [
        {
          $or: [
            { openDays: { weekDay: weekDay, dayStatus: 0 } },
            {
              $or: [
                { "openHours.openTime": { $gte: currentMin } },
                { "openHours.closeTime": { $lte: currentMin } },
              ],
            },
          ],
        },
        {
          $or: [
            {
              $and: [
                { "priceRange.min": { $gte: range[0] } },
                { "priceRange.min": { $lte: range[1] } },
              ],
            },
            {
              $and: [
                { "priceRange.max": { $gte: range[0] } },
                { "priceRange.max": { $lte: range[1] } },
              ],
            },
          ],
        },
      ],
    });
    return resClose;
  } else {
    try {
      const Restaurants = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        $or: [
          {
            $and: [
              { "priceRange.min": { $gte: range[0] } },
              { "priceRange.min": { $lte: range[1] } },
            ],
          },
          {
            $and: [
              { "priceRange.max": { $gte: range[0] } },
              { "priceRange.max": { $lte: range[1] } },
            ],
          },
        ],
      });
      return Restaurants;
    } catch (error) {
      console.log(error);
    }
  }
};

/*******************************************************************************
 * This function is used to get restaurant by name or address (without price).
 * 'resStatus' is the status of restaurant that user want to search (OPEN or CLOSE).
 * 'key' is the name of filter that user want to search (name or address).
 * 'search' is the keyword that user input in search box (depend on selected key).
 * 'type' is cuisine that user want to search.
 * 'weekDay' is current day.
 * 'currentMin' is current time in unit of minutes.
 * Returns the array object of all restaurant that match the filter and status.
 ******************************************************************************/
export const noSearchPrice = async (
  resStatus,
  key,
  search,
  type,
  weekDay,
  currentMin
) => {
  if (resStatus == "OPEN") {
    try {
      const resOpen = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        type: type,
        openDays: { weekDay: weekDay, dayStatus: 1 },
        $and: [
          { "openHours.openTime": { $lte: currentMin } },
          { "openHours.closeTime": { $gte: currentMin } },
        ],
      });
      return resOpen;
    } catch (error) {
      console.log("error search OPEN (no price)");
    }
  } else if (resStatus == "CLOSE") {
    const resClose = await Restaurant.find({
      [key]: { $regex: search, $options: "i" },
      type: type,
      $or: [
        { openDays: { weekDay: weekDay, dayStatus: 0 } },
        {
          $or: [
            { "openHours.openTime": { $gte: currentMin } },
            { "openHours.closeTime": { $lte: currentMin } },
          ],
        },
      ],
    });
    return resClose;
  } else {
    try {
      const Restaurants = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        type: type,
      });
      return Restaurants;
    } catch (error) {
      console.log(error);
    }
  }
};

/*******************************************************************************
 * This function is used to get restaurant by name or address.
 * 'resStatus' is the status of restaurant that user want to search (OPEN or CLOSE).
 * 'key' is the name of filter that user want to search (name or address).
 * 'search' is the keyword that user input in search box (depend on selected key).
 * 'range' is array of min and max price that user want to search.
 * 'type' is cuisine that user want to search.
 * 'weekDay' is current day.
 * 'currentMin' is current time in unit of minutes.
 * Returns the array object of all restaurant that match the filter and status.
 ******************************************************************************/
export const searchAllFilter = async (
  resStatus,
  key,
  search,
  type,
  range,
  weekDay,
  currentMin
) => {
  if (resStatus == "OPEN") {
    const resOpen = await Restaurant.find({
      [key]: { $regex: search, $options: "i" },
      $or: [
        {
          $and: [
            { "priceRange.min": { $gte: range[0] } },
            { "priceRange.min": { $lte: range[1] } },
          ],
        },
        {
          $and: [
            { "priceRange.max": { $gte: range[0] } },
            { "priceRange.max": { $lte: range[1] } },
          ],
        },
      ],
      type: type,
      openDays: { weekDay: weekDay, dayStatus: 1 },
      $and: [
        { "openHours.openTime": { $lte: currentMin } },
        { "openHours.closeTime": { $gte: currentMin } },
      ],
    });
    return resOpen;
  } else if (resStatus == "CLOSE") {
    const resClose = await Restaurant.find({
      [key]: { $regex: search, $options: "i" },
      type: type,
      $and: [
        {
          $or: [
            { openDays: { weekDay: weekDay, dayStatus: 0 } },
            {
              $or: [
                { "openHours.openTime": { $gte: currentMin } },
                { "openHours.closeTime": { $lte: currentMin } },
              ],
            },
          ],
        },
        {
          $or: [
            {
              $and: [
                { "priceRange.min": { $gte: range[0] } },
                { "priceRange.min": { $lte: range[1] } },
              ],
            },
            {
              $and: [
                { "priceRange.max": { $gte: range[0] } },
                { "priceRange.max": { $lte: range[1] } },
              ],
            },
          ],
        },
      ],
    });
    return resClose;
  } else {
    try {
      const Restaurants = await Restaurant.find({
        [key]: { $regex: search, $options: "i" },
        $or: [
          {
            $and: [
              { "priceRange.min": { $gte: range[0] } },
              { "priceRange.min": { $lte: range[1] } },
            ],
          },
          {
            $and: [
              { "priceRange.max": { $gte: range[0] } },
              { "priceRange.max": { $lte: range[1] } },
            ],
          },
        ],
        type: type,
      });
      return Restaurants;
    } catch (error) {
      console.log(error);
    }
  }
};

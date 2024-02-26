import React from "react";
import axios from "axios";
import { API_ROUTES } from "../routes";
//https://burmese.dvb.no/wp-json/wp/v2/posts?page=1&_fields=id,title,date,_links,excerpt,categories&_embed=wp:featuredmedia
function wpScan({ wpUrl, api_base_path = "/?rest_route=/" }) {
  // const baseUrl = `${wpUrl}/?rest_route=/`;
  const isWpJson = "/wp-json/" == api_base_path;
  const baseUrl = isWpJson
    ? `${wpUrl}${api_base_path}`
    : `${wpUrl}/?rest_route=/`;

  const getCategory = async () => {
    return await axios
      .get(`${baseUrl}wp/v2/categories`, {
        withCredentials: false,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw new Error("Error fetching Category");
      });
  };
  const getInfo = async () => {
    const infoKeyList = [
      "site_icon_url",
      "name",
      "description",
      "url",
      "home",
      "site_logo",
    ];
    return await axios
      .get(`${baseUrl}`, {
        withCredentials: false,
        params: { _fields: `${infoKeyList.join(",")}` },
      })
      .then(function (response) {
        return { ...response.data, api_base_path:isWpJson?'/wp-json/':'/?rest_route=/', error_code: null };
      })
      .catch(async function (error) {
        if (isWpJson) {
          api_base_path = "/?rest_route=/";
        } else {
          api_base_path = "/wp-json/";
        }
        try {
          const response = await axios.get(`${wpUrl}${api_base_path}`, {
            params: { _fields: `${infoKeyList.join(",")}` },
          });
          return { ...response.data, api_base_path, error_code: null };
        } catch (error_1) {
          errorReport({ error, wpUrl });
          if (error_1?.code == "ERR_NETWORK") {
            throw new Error(`${wpUrl} is not a wordpress`);
          } else {
            throw new Error(error_1);
          }
        }
      });
  };
  const getPost = async (param) => {
    const infoKeyList = [
      "id",
      "title",
      "date",
      "_links",
      "excerpt",
      "categories",
    ];
    return await axios
      .get(`${baseUrl}wp/v2/posts`, {
        withCredentials: false,
        params: {
          page: 1,
          _fields: `${infoKeyList.join(",")}`,
          _embed: "wp:featuredmedia",
          ...param,
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        errorReport({ error, wpUrl });
        throw new Error("Error fetching Posts");
      });
  };

  // const getSearch = async (param) => {
  //   const infoKeyList = [
  //     "id",
  //     "title",
  //     "date",
  //     "_links",
  //     "excerpt",
  //     "categories",
  //   ];
  //   return await axios
  //     .get(`${baseUrl}wp/v2/search`, {
  //       params: {
  //         page: 1,
  //         _fields: `${infoKeyList.join(",")}`,
  //         _embed: "wp:featuredmedia",
  //         ...param,
  //       },
  //     })
  //     .then(function (response) {
  //       return response.data;
  //     })
  //     .catch(function (error) {
  //       errorReport({ error, wpUrl });
  //       throw new Error("Error fetching Posts");
  //     });
  // };

  const getPostDetail = async (id) => {
    const infoKeyList = [
      "id",
      "title",
      "date",
      "_links",
      "excerpt",
      "categories",
      "content",
    ];
    return await axios
      .get(`${baseUrl}wp/v2/posts/${id}`, {
        withCredentials: false,
        params: {
          page: 1,
          _fields: `${infoKeyList.join(",")}`,
          _embed: "wp:featuredmedia",
        },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        errorReport({ error, wpUrl });
        throw new Error("Error fetching Posts");
      });
  };
  return { getCategory, getInfo, getPost, getPostDetail };
}

export default wpScan;

function errorReport({ error, wpUrl }) {
  const status = error?.response?.status;
  const code = error.code; //"ERR_NETWORK"

  if (code == "ERR_NETWORK") {
    const error_code = error.code || "ERR_UNKNOWN";
    // if (status == 400);

    var option = {
      url: API_ROUTES.ERROR_REPORT,
      method: "POST",
      data: { error_code, url: wpUrl },
      headers: {
        "Content-type": "application/x-www-form-urlencoded", // Set content type to JSON
      },
      withCredentials: true,
    };

    axios(option)
      .then(function (response) {})
      .catch((err) => {});
  }
}

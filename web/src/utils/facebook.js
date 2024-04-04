import React from "react";
import axios from "axios";
import { API_ROUTES } from "../routes";
//https://burmese.dvb.no/wp-json/wp/v2/posts?page=1&_fields=id,title,date,_links,excerpt,categories&_embed=wp:featuredmedia
export default function facebook(accessToken) {
  const baseUrl = `https://graph.facebook.com/v19.0/`;
  const appScopedUserId = 941293284059681;
  const YOUR_APP_ID = 944786880494669;
  const YOUR_APP_SECRET = "dk60baYZ7U3o7-zMWlMuj3gcCPs";
  const routes = {
    userPages: `${appScopedUserId}/accounts?access_token=${accessToken}`,
    feed: "me/feed",
  };

  const defaultHeader = {
    Accept: "*/*",
  };
  const getUserPages = async () =>
    await axios.get(baseUrl + routes.userPages, {
      ...defaultHeader,
    });
  const getFeed = async () =>
    await axios.get(baseUrl + routes.feed, {
      ...defaultHeader,
      params: {
        fields: "full_picture,message",
        access_token: accessToken,
      },
    });
  const postFeed = async (data) => {
    await axios({
      url: baseUrl + routes.feed,
      method: "POST",
      data: data,
      headers: defaultHeader,
    });
  };

  // axios
  //   .get("https://graph.facebook.com/v19.0/oauth/access_token", {
  //     params: {
  //       client_id: YOUR_APP_ID,
  //       client_secret: YOUR_APP_SECRET,
  //       redirect_uri: "https://3001.heinsoe.com/webhook",
  //       code: "hellotoken",
  //     },
  //   })
  //   .then((response) => {
  //     const accessToken = response.data.access_token;
  //     console.log("User access token:", accessToken);
  //   })
  //   .catch((error) => {
  //     console.error(
  //       "Error exchanging authorization code for access token:",
  //       error
  //     );
  //   });
  return {
    getUserPages,
    getFeed,
    postFeed,
  };
}

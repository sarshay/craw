import * as WebBrowser from "expo-web-browser";

export const _myBrowser = async (url) => {
  let result = await WebBrowser.openBrowserAsync(url);
  console.log({ result, url });
};

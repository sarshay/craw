import conf from "@config";

const myLink = {
  home: () => "/",
  website: (slug: string | number) => `/${slug}`,
  signin: () => "/signin",
  admin: () => "/admin",
  privacyPolicy: () => "/privacy-policy",
  project: (slug?: string | number) => `/project${slug ? `/${slug}` : ""}`,
  repo: (slug?: string | number) => `/github${slug ? `/${slug}` : ""}`,
  image: (file: string, size?: "s" | "m" | "l" | "xl", isFullUrl?: boolean) => {
    const route = isFullUrl
      ? file
      : `${process.env.NEXT_PUBLIC_IMAGE_URL_PATH}/${file}`;
    if (size) {
      switch (size) {
        case "s":
          return `/_next/image?url=${route}&w=64&q=75`;
          break;
        case "m":
          return `/_next/image?url=${route}&w=256&q=75`;
          break;
        case "l":
          return `/_next/image?url=${route}&w=640&q=75`;
          break;
        case "xl":
          return `/_next/image?url=${route}&w=1080&q=75`;
          break;
      }
    } else {
      return route;
    }
  },
};
export default myLink;

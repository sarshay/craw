import {
  Avatar,
  Button,
  Drawer,
  Flex,
  FloatButton,
  Image,
  Modal,
  Space,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { APP_ROUTES } from "../routes";
import wpScan from "../utils/wpScan";
import { useLayout, useMyList } from "../providers/context";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeftOutlined,
  InfoCircleFilled,
  ShareAltOutlined,
} from "@ant-design/icons";
import { TheHtml } from "../utils/html";
import { MyShare } from "../components/utli";
import { ago } from "../utils/time";
import { useScrollDirection } from "../utils/function";
import { useCookies } from "react-cookie";
import Is18PlusCover from "../components/18PlusCover";

function PostPage(props) {
  const [cookies, setCookie] = useCookies(["isUser18Plus"]);

  const { website } = useMyList();
  let { channelId, postId } = useParams();
  const { messageAPi } = useLayout();
  const theWp = website.find((w) => w.id == channelId);
  const isUser18Plus = cookies?.isUser18Plus == "yes";

  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState(false);

  const wp = wpScan({ wpUrl: theWp?.url, api_base_path: theWp.api_base_path });

  const [searchParams, setSearchParams] = useSearchParams();
  let _category = searchParams.get("c") ? `&c=${searchParams.get("c")}` : ``;
  let _search = searchParams.get("search")
    ? `&search=${searchParams.get("search")}`
    : ``;

  let currentQuery = _category || _search ? `?_=${_category + _search}` : "";
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      wp.getPostDetail(postId)
        .then((data) => {
          setPostData(data);
        })
        .catch((error) => {
          messageAPi.error(error?.message);
          // setWpError(error?.message)
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (theWp.is18Plus == "yes") {
      if (isUser18Plus) {
        if (postId) {
          fetchData();
        }
      }
    } else {
      if (postId) {
        fetchData();
      }
    }
  }, [postId, theWp, isUser18Plus]);
  const p = postData;
  var img =
    p._embedded && p._embedded["wp:featuredmedia"]
      ? p._embedded["wp:featuredmedia"][0].media_details &&
        p._embedded["wp:featuredmedia"][0].media_details.sizes
        ? p._embedded["wp:featuredmedia"][0].media_details.sizes.large
          ? p._embedded["wp:featuredmedia"][0].media_details.sizes.large
              .source_url
          : p._embedded["wp:featuredmedia"][0].media_details.sizes.full
          ? p._embedded["wp:featuredmedia"][0].media_details.sizes.full
              .source_url
          : false
        : false
      : false;
  var imgFull =
    p._embedded && p._embedded["wp:featuredmedia"]
      ? p._embedded["wp:featuredmedia"][0].media_details &&
        p._embedded["wp:featuredmedia"][0].media_details.sizes
        ? p._embedded["wp:featuredmedia"][0].media_details.sizes.full
          ? p._embedded["wp:featuredmedia"][0].media_details.sizes.full
              .source_url
          : p._embedded["wp:featuredmedia"][0].media_details.sizes.large
          ? p._embedded["wp:featuredmedia"][0].media_details.sizes.large
              .source_url
          : false
        : false
      : false;

  img = img && (img.startsWith("http") ? img : `${theWp?.url}${img}`);
  imgFull =
    imgFull &&
    (imgFull.startsWith("http") ? imgFull : `${theWp?.url}${imgFull}`);

  return (
    <div className="px-4">
      <Is18PlusCover is18Plus={theWp.is18Plus && theWp.is18Plus == "yes"} />
      <Flex justify={"space-between"} align={"center"} className="sticky top-0">
        <Space align="center" className="py-2">
          <ArrowLeftOutlined
            onClick={() =>
              // navigate(APP_ROUTES.CHANNEL_ID(channelId) + currentQuery)
              navigate(-1)
            }
          />
          {/* {theWp.site_icon_url ? (
            <Avatar src={<img src={theWp.site_icon_url} />} />
          ) : (
            <Avatar>{theWp.name[0]}</Avatar>
          )} */}
          {theWp.name}
        </Space>
        <InfoCircleFilled
          onClick={() => {
            Modal.confirm({
              title: "Content Attribution",
              content: `Original source credited with link: ${theWp.url}?p=${postId}`,
              footer: (_, { OkBtn, CancelBtn }) => (
                <>
                  <Button target="_blank" href={`${theWp.url}?p=${postId}`}>
                    Go Original Content
                  </Button>
                  <OkBtn />
                </>
              ),
            });
          }}
        />
      </Flex>

      <div className="read max-w-xl mx-auto">
        {loading && (
          <center>
            <Spin />
          </center>
        )}
        {postData && (
          <div className="mb-8">
            <Typography.Title level={3}>
              {TheHtml(postData?.title?.rendered)}
            </Typography.Title>
            {ago(postData?.date)}
            {img && (
              <Image
                src={img}
                preview={{
                  src: imgFull,
                }}
                width={"100%"}
              />
            )}
            {TheHtml(postData?.content?.rendered)}
          </div>
        )}

        <MyShare
          title={TheHtml(postData?.title?.rendered)}
          text={TheHtml(postData?.excerpt?.rendered)}
          url={`${APP_ROUTES.POST_DETAIL(channelId, postId)}`}
        >
          <FloatButton type="primary" icon={<ShareAltOutlined />} />
        </MyShare>
      </div>
    </div>
  );
}

export default PostPage;

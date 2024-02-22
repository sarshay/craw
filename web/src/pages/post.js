import { Avatar, Drawer, Flex, Space, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { APP_ROUTES } from "../routes";
import wpScan from "../utils/wpScan";
import { useLayout, useMyList } from "../providers/context";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { TheHtml } from "../utils/html";
import { MyShare } from "../components/utli";
import { ago } from "../utils/time";
import { useScrollDirection } from "../utils/function";

function PostPage(props) {
  const { website } = useMyList();
  let { channelId, postId } = useParams();
  const { messageAPi } = useLayout();
  const theWp = website.find((w) => w.id == channelId);

  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState(false);

  const wp = wpScan({ wpUrl: theWp?.url });
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
    if (postId) {
      fetchData();
    }
  }, [postId, theWp]);
  const { direction } = useScrollDirection();
  return (
    <div>
      <Flex
        justify={"space-between"}
        align={"center"}
        className="sticky top-0"
      >
        <Space align="center">
          <ArrowLeftOutlined
            onClick={() => navigate(APP_ROUTES.CHANNEL_ID(channelId))}
          />
          <Avatar src={<img src={theWp.site_icon_url} />} />
          {theWp.name}
        </Space>
        <MyShare
          title={postData?.title?.rendered}
          text={postData?.excerpt?.rendered}
          url={`${APP_ROUTES.POST_DETAIL(channelId, postId)}`}
        />
      </Flex>
      {loading && <Spin />}
      {postData && (
        <div className="read">
          <Typography.Title level={3}>
            {postData?.title?.rendered}
          </Typography.Title>
          {ago(postData?.date)}
          {TheHtml(postData?.content?.rendered)}
        </div>
      )}
    </div>
  );
}

export default PostPage;

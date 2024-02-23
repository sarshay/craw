import {
  Avatar,
  Button,
  Drawer,
  Flex,
  FloatButton,
  Modal,
  Space,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { APP_ROUTES } from "../routes";
import wpScan from "../utils/wpScan";
import { useLayout, useMyList } from "../providers/context";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftOutlined,
  InfoCircleFilled,
  ShareAltOutlined,
} from "@ant-design/icons";
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
    <div className="px-4">
      <Flex justify={"space-between"} align={"center"} className="sticky top-0">
        <Space align="center" className="py-2">
          <ArrowLeftOutlined
            onClick={() => navigate(APP_ROUTES.CHANNEL_ID(channelId))}
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
                  <Button target="_blank"  href={`${theWp.url}?p=${postId}`}>
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
        {loading && <Spin />}
        {postData && (
          <>
            <Typography.Title level={3}>
              {postData?.title?.rendered}
            </Typography.Title>
            {ago(postData?.date)}
            {TheHtml(postData?.content?.rendered)}
          </>
        )}

        <MyShare
          title={postData?.title?.rendered}
          text={postData?.excerpt?.rendered}
          url={`${APP_ROUTES.POST_DETAIL(channelId, postId)}`}
        >
          <FloatButton type="primary" icon={<ShareAltOutlined />} />
        </MyShare>
      </div>
    </div>
  );
}

export default PostPage;

import { ShareAltOutlined } from "@ant-design/icons";
import { Button } from "antd";

export function MyShare(props) {
  const handleOnClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: props.title,
          text: props.text,
          url: props.url,
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong sharing the blog", error);
        });
    }
  };
  return (
    <span onClick={handleOnClick}>
      {props.children || <Button type="link" icon={<ShareAltOutlined />} />}
    </span>
  );
}

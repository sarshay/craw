import { useEffect, useState } from "react";
import { BackHandler, Modal, Text } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

// const images = [
//   {
//     // Simplest usage.
//     url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",

//     // width: number
//     // height: number
//     // Optional, if you know the image size, you can set the optimization performance

//     // You can pass props to <Image />.
//     props: {
//       // headers: ...
//     },
//   },
//   {
//     url: "",
//     props: {
//       // Or you can set source directory.
//       source: require("../background.png"),
//     },
//   },
// ];

export default function TheImageViewer({
  images,
  openImage = null,
  setOpenImage,
}) {
  const [open, setOpen] = useState(null);
  useEffect(() => {
    if (openImage !== null) {
      setOpen(images.findIndex((i) => i.url == openImage));
    }
  }, [openImage]);
  useEffect(() => {
    if (!open) {
      setOpenImage(null);
    }
  }, [open]);
  useEffect(() => {
    const handleBackPress = () => {
      if (open !== null) {
        setOpen(null);
        return true; // Event handled
      }
      return false; // Event not handled
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [open]);
  return (
    <Modal visible={open !== null} transparent={true}>
      <ImageViewer
        // saveToLocalByLongPress
        loadingRender={() => <Text>Loading...</Text>}
        enableImageZoom
        imageUrls={images}
        index={open}
        onSwipeDown={() => setOpen(null)}
        enableSwipeDown
        enablePreload
        onCancel={() => setOpen(null)}
      />
    </Modal>
  );
}

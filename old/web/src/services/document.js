import { useEffect, useLayoutEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};


function ScrollToTop({ history }) {
  useEffect(() => {
    // const unlisten = history.listen(() => {
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    // });
    // return () => {
    //   unlisten();
    // }
  }, []);
  return (null);
}

export default withRouter(ScrollToTop);

export function headTagMaker(p) {
  document.querySelector('title').innerHTML = p.title;
  p.color && document.querySelector('meta[name="theme-color"]').setAttribute("content", p.color);
  document.querySelector('meta[name="description"]').setAttribute("content", p.description);
  // document.querySelector('link[rel="canonical"]').setAttribute("href", p.url);
}
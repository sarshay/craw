import { Spin } from "antd";
import React, { useEffect, useRef } from "react";

function InfiniteScroll({ hasMore, loading, loadMore }) {
  const observerTarget = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          !loading && loadMore();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, loading, hasMore]);
  return (
    <div className="text-center p-4">
      {hasMore && (
        <div ref={observerTarget}>
          {loading && (
            <>
              <Spin /> loading more
            </>
          )}
        </div>
      )}
      {!hasMore && <div>no more</div>}
    </div>
  );
}
export default InfiniteScroll;

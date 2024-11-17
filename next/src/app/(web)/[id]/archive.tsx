"use client";
import wpScan from "@/service/wp/wpScan";
import { Website } from "@interface";
import React, { useEffect, useState } from "react";
import { JSONTree } from "react-json-tree";

function Archive({ website }: { website: Website }) {
  const [data, setData] = useState<WPPost[]>([]);
  const loadPost = async () =>
    await wpScan({
      wpUrl: website?.baseUrl,
      api_base_path: "/wp-json/",
    })
      .getPost({})
      .then((res) => setData(res))
      .catch((err) => {});

  useEffect(() => {
    loadPost();
  }, []);
  return (
    <div>
      {website?.baseUrl}
      <JSONTree data={{ website, data }} />
      {data.map((item) => (
        <div key={item.id}>
          <h1>{item.title.rendered}</h1>
          <div dangerouslySetInnerHTML={{ __html: item.content.rendered }} />
        </div>
      ))}
    </div>
  );
}

export default Archive;

"use client";
import AdultCover from "@/components/AdultCover";
import { WebsiteCard } from "@/components/Website";
import { useRepo } from "@/context/repo";
import useQ from "@/hook/useQ";
import { getCategory, getWebsite } from "@/service";
import { Category, Website } from "@interface";
import { Button, message } from "antd";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { JSONTree } from "react-json-tree";
export default () => {
  const { repo } = useRepo();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Category[]>([]);
  const loadWebsite = useCallback(async () => {
    setLoading(true);
    await getCategory({
      include: {
        CategoryOnWebsite: {
          include: {
            Website: true,
          },
        },
      },
    })
      .then(({ data }) => setData(data))
      .catch((err) => message.error(err.message))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    loadWebsite();
  }, []);
  return (
    <div>
      {/* <AdultCover className="z-20"/> */}
      {loading && <div>Loading...</div>}
      <Button onClick={loadWebsite}>Reload</Button>
      {/* <JSONTree data={data} /> */}
      {data?.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <div className="grid grid-cols-4 gap-6">
            {item.CategoryOnWebsite?.map(({ Website }) => (
              <WebsiteCard key={Website?.id} Website={Website!} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

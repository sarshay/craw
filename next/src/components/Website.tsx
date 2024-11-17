import { Website } from "@interface";
import { Button, Card } from "antd";
import Link from "next/link";
import React from "react";
import AdultCover from "./AdultCover";

export function WebsiteCard({ Website }: { Website: Website }) {
  const isAdultUser = false;
  const locked = Website.isAdultOnly && !isAdultUser;
  const TheCard = () => {
    return (
      <Card className="relative overflow-hidden">
        {locked && <AdultCover className=" z-10 -m-6" />}
        <div className="h-20">
          <img
            src={Website?.logo}
            alt={Website?.title}
            className=" float-right h-20"
          />
          <h2 className="my-0">{Website?.title}</h2>
          <div className="opacity-50">
            <div>{Website?.except}</div>
            <div>{Website?.baseUrl}</div>
          </div>
        </div>
      </Card>
    );
  };
  return locked ? (
    <TheCard />
  ) : (
    <Link href={`/${Website.id}`}>
      <TheCard />
    </Link>
  );
}

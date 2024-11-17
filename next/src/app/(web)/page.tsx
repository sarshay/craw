import { WebsiteCard } from "@/components/Website";
import { getCategory, getWebsite } from "@/service";
import { Category, Website } from "@interface";
import React, { useCallback, useEffect, useState } from "react";
export default async () => {
  const { data }: { data: Category[] } = await getCategory({
    include: {
      CategoryOnWebsite: {
        include: {
          Website: true,
        },
      },
    },
  });
  return (
    <div>
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

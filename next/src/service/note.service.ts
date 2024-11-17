"use server";
import { revalidatePath } from "next/cache";
import prisma from "./db";
import { Prisma } from "@prisma/client";
import myLink from "@/link";

export const getWebsite = async (props?: Prisma.WebsiteFindManyArgs) => {
  props = props || {};
  props.where = props.where || {};
  props.where.isDeleted = false;
  const query: Prisma.WebsiteFindManyArgs = {
    orderBy: {
      id: "desc",
    },
    include:{
      Tag: true,
      Category: true,
    },
    ...props,
  };
  try {
    // Perform both queries concurrently using Promise.all
    const [data, count] = await prisma.$transaction([
      prisma.website.findMany(query),
      prisma.website.count({ where: query.where }),
    ]);
    return {
      pagination: {
        total: count,
      },
      data: data,
    };
  } catch (e) {
    throw e;
  } finally {
    await prisma.$disconnect();
  }
};
export const createWebsite = async (props: Prisma.WebsiteCreateInput) => {
  return await prisma.website
    .create({ data: props })
    .then((res) => {
      revalidatePath("/");
      return getWebsite({
        where: {
          id: res.id,
        },
      });
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
export const updateWebsite = async (props: Prisma.WebsiteUpdateArgs) => {
  return await prisma.website
    .update(props)
    .then((res) => {
      revalidatePath(myLink.website(res.id));
      revalidatePath("/");
      return getWebsite({
        where: {
          id: res.id,
        },
      });
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

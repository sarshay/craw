"use server";
import { revalidatePath } from "next/cache";
import prisma from "./db";
import { Prisma } from "@prisma/client";

export const getCategory = async (props?: Prisma.CategoryFindManyArgs) => {
  props = props || {};
  props.where = props.where || {};
  const query: Prisma.CategoryFindManyArgs = {
    orderBy: {
      id: "desc",
    },
    include: {
      image: true,
    },
    ...props,
  };
  try {
    // Perform both queries concurrently using Promise.all
    const [data, count] = await prisma.$transaction([
      prisma.category.findMany(query),
      prisma.category.count({ where: query.where }),
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
export const createCategory = async (props: Prisma.CategoryCreateInput) => {
  return await prisma.category
    .create({ data: props })
    .then((res) => {
      revalidatePath("/", "layout");
      return getCategory({
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
export const updateCategory = async (props: Prisma.CategoryUpdateArgs) => {
  return await prisma.category
    .update(props)
    .then((res) => {
      revalidatePath("/", "layout");
      return getCategory({
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

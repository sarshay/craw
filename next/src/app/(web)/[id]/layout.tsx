import { Loading } from "@/components/Loading";
import myLink from "@/link";
import { getWebsite } from "@/service";
import { seo } from "@/utility/seo";
import conf from "@config";
import { Website } from "@interface";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BiArrowBack } from "react-icons/bi";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  if (isNaN(parseInt(params.id))) {
    return notFound();
  } else {
    // fetch data
    const { data } = await getWebsite({
      where: {
        id: parseInt(params.id),
      },
    });
    const resMetadata: Website = data[0];
    if (resMetadata) {
      return seo({
        title: resMetadata.title,
        description: resMetadata.except,
        images: resMetadata?.logo ? [{ url: resMetadata?.logo }] : [],
        url: myLink.website(params.id),
      });
    } else {
      notFound();
    }
  }
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}

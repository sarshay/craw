import { Loading } from "@/components/Loading";
import { Suspense } from "react";

import conf from "@config";
import { seo } from "@/utility/seo";
import { Metadata } from "next";

export const metadata: Metadata = seo({
  title: conf.title,
  description: conf.description,
  url: conf.baseUrl || "/",
  images: [{ url: `${conf.baseUrl}/${conf.logo.main}` }],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading className="h-screen" />}>
      {children}
    </Suspense>
  );
}

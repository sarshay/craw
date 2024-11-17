import ContentMenus from "@/components/contentMenu";
import { Flex, Image } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { notFound } from "next/navigation";
import { MarkDownView } from "@/app/(admin)/_components/Inputs";
import ActionBar from "@/components/ActionBar";
import { noHtml, noMarkdown } from "@hheinsoee/utility";
import myLink from "@/link";
import conf from "@config";
import { getWebsite } from "@/service";
import { Website } from "@interface";
import Archive from "./archive";

export default async function NoteDetails({ params }: { params: { id: any } }) {
  if (isNaN(params.id)) {
    return notFound();
  }
  return await getWebsite({
    where: {
      id: parseInt(params.id),
    },
  })
    .then(({ data }) => {
      return <NoteDetailsView note={data[0]} />;
    })
    .catch((error) => {
      notFound();
    });
}

function NoteDetailsView({ note }: { note: Website }) {
  return (
    <div className="p-4">
      {note.logo && (
        <Image
          src={note.logo}
          alt={note.title}
          title={note.title}
          preview={false}
        />
      )}
      {note.title && <h1>{note.title}</h1>}
      <Archive website={note}/>
    </div>
  );
}

import { Accordion, AccordionItem, AccordionItemProps } from "@heroui/react";
import Link from "next/link";
import React from "react";

type Props = {
  itemClasses: AccordionItemProps;
  subLinkStyle: string;
  mainLinkStyle: string;
};

export default function PsychologistSidebar({
  itemClasses,
  subLinkStyle,
  mainLinkStyle,
}: Props) {
  return (
    <div>
      <div className={mainLinkStyle}>
        <Link href="/schedules">Xếp lịch làm việc</Link>
      </div>
      <div className={mainLinkStyle}>
        <Link href="/appointments">Danh sách lịch hẹn</Link>
      </div>
      <div className={mainLinkStyle}>
        <Link href="/video-chat">Video call</Link>
      </div>
    </div>
  );
}

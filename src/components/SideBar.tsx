"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./sidebar/AdminSidebar";
import PsychologistSidebar from "./sidebar/PsychologistSidebar";
import SchoolManagerSidebar from "./sidebar/SchoolManagerSidebar";
import { redirect } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  if (isLoginPage) return;

  const isLoggedIn = localStorage.getItem("userInfo");

  if (!isLoggedIn) {
    redirect("/login");
  }

  const role = JSON.parse(localStorage.getItem("userInfo") || "{}").role;

  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-sm px-2 data-[open=true]:text-primary-blue",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-gray-100 rounded-lg h-14 flex items-center data-[open=true]:bg-gray-100",
    indicator: "text-medium",
    content: "text-small px-3",
  };

  const mainLinkStyle =
    "text-sm hover:bg-gray-100 rounded-lg h-14 flex items-center mx-2 px-4";

  const subLinkStyle =
    "hover:bg-default-100 hover:text-primary-blue px-3 py-2 rounded-lg flex items-center";

  let choosenSideBar = null;

  if (role === "Admin") {
    choosenSideBar = (
      <AdminSidebar
        itemClasses={itemClasses}
        subLinkStyle={subLinkStyle}
        mainLinkStyle={mainLinkStyle}
      />
    );
  } else if (role === "Psychologist") {
    choosenSideBar = (
      <PsychologistSidebar
        itemClasses={itemClasses}
        subLinkStyle={subLinkStyle}
        mainLinkStyle={mainLinkStyle}
      />
    );
  } else {
    choosenSideBar = (
      <SchoolManagerSidebar
        itemClasses={itemClasses}
        subLinkStyle={subLinkStyle}
        mainLinkStyle={mainLinkStyle}
      />
    );
  }

  return (
    <div className="sticky top-0 flex flex-col">
      <div className="flex items-center justify-center h-16 border-b-1 mx-5">
        <p className="text-xl bg-primary-blue font-semibold text-white px-6 py-2 rounded-full">
          MindSpace
        </p>
      </div>

      <div className="py-4">{choosenSideBar}</div>
    </div>
  );
}

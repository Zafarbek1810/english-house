import { useRouter } from "next/router";
import React from "react";
import MyLink from "../../Common/MyLink";
import UsersSvg from "../../Common/Svgs/UserSvg";
import { SidebarWrapper } from "./Sidebar.style";

const NavListMenu = [
  {
    title: "O'qituvchilar",
    path: "/dashboard/teachers",
    src: "/icons/teacher.png",
    role: ["ADMIN"],
  },
  {
    title: "Guruhlar",
    path: "/dashboard/groups",
    src: "/icons/users.png",
    role: ["ADMIN"],
  },
  {
    title: "Talaba",
    path: "/dashboard/students",
    src: "/icons/student.png",
    role: ["ADMIN"],
  },
  {
    title: "Shopping",
    path: "/dashboard/shopping",
    src: "/icons/shopping.png",
    role: ["ADMIN"],
  },
  {
    title: "Dars yaratish",
    path: "/dashboard/dash",
    src: "/icons/lesson.png",
    role: ["ADMIN"],
  },
  {
    title: "Kurs yaratish",
    path: "/dashboard/courses",
    src: "/icons/lesson.png",
    role: ["ADMIN"],
  },
  {
    title: "Imtihon yaratish",
    path: "/dashboard/dash",
    src: "/icons/test.png",
    role: ["ADMIN"],
  },
];

const Sidebar = () => {
  const router = useRouter();
  const pathname=router.pathname
  return (
    <SidebarWrapper>
      <MyLink to={`${pathname}`} className="logo">
        <img src="/images/logo1.png" alt="" />
      </MyLink>
      <div className="sidebar-menu">
        {NavListMenu.map(({ title, src, path }, idx) => {
          return (
            <MyLink
              className={router.pathname === path ? "activelink" : "link"}
              to={path}
              key={idx}
            >
              <img src={src} alt="" />
              {title}
            </MyLink>
          );
        })}
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;

import { ReactNode, useState } from "react";
import SidebarDashboard from "./SidebarDashboard";
import PageHead from "@/components/commons/PageHead";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constant";
import { Navbar, NavbarMenuToggle } from "@heroui/react";

interface PropTypes {
  title?: string;
  desc?: string;
  children: ReactNode;
  type?: string;
}

const DashboardLayout = (props: PropTypes) => {
  const { title, desc, children, type = "admin" } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHead title={title} />

      <div className="flex min-h-screen max-w-screen-3xl 3xl:container">
        <SidebarDashboard
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
          isOpen={open}
        />

        <div className="w-full h-screen p-8 overflow-y-auto">
          <Navbar
            className="flex justify-between px-0 bg-transparant"
            classNames={{ wrapper: "p-0" }}
            isBlurred={false}
            position="static"
          >
            <h1 className="text-3xl font-bold ">{title}</h1>
            <NavbarMenuToggle
              aria-label={open ? "Close Menu" : "Open Menu"}
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            />
          </Navbar>
          <p className="mb-4 text-small">{desc}</p>
          {children}
        </div>
      </div>
    </>
  );
};
export default DashboardLayout;

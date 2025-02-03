import { JSX } from "react";
import Image from "next/image";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/router";
import { cn } from "@/utils/cn";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}
interface PropTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
}

const SidebarDashboard = (props: PropTypes) => {
  const { sidebarItems, isOpen } = props;
  const router = useRouter();

  return (
    <div
      className={cn(
        "lg:relative fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full lg:translate-x-0 flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-6 transition-all",
        { "translate-x-0": isOpen },
      )}
    >
      <div>
        <div className="flex justify-center">
          <Image
            src={"img/general/logo.svg"}
            alt="logo"
            width={180}
            height={60}
            className="w-32 mb-6 cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>

        <Listbox
          items={sidebarItems}
          variant="solid"
          aria-label="Dashboard Menu"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              className={cn("my-1 h-12 text-2xl", {
                "bg-primary-500 text-white": item.href === router.pathname,
              })}
              startContent={item.icon}
              textValue={item.label}
              aria-labelledby={item.label}
              aria-describedby={item.label}
            >
              <p className="text-small">{item.label}</p>
            </ListboxItem>
          )}
        </Listbox>
      </div>

      <div className="flex items-center p-1">
        <Button
          color="danger"
          fullWidth
          variant="light"
          className="flex items-center justify-start px-2 py-1.5"
          size="lg"
          onClick={() => signOut()}
        >
          <CiLogout />
          Logout
        </Button>
      </div>
    </div>
  );
};
export default SidebarDashboard;

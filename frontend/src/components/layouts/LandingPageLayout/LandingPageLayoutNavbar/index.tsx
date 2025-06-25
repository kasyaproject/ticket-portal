import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import {
  Avatar,
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { cn } from "@/utils/cn";
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constants";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";

const LandingPageLayoutNavbar = () => {
  const router = useRouter();
  const session = useSession();
  const { dataProfile } = useLandingPageLayoutNavbar();

  return (
    <Navbar maxWidth="full" isBordered isBlurred={false} shouldHideOnScroll>
      <div className="flex items-center gap-8">
        {/* Logo */}
        <NavbarBrand as={Link} href="/">
          <Image
            src="/img/general/logo.svg"
            alt="Logo"
            width={100}
            height={50}
            className="cursor-pointer"
          />
        </NavbarBrand>

        {/*  */}
        <NavbarContent className="hidden lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavbarItem
              key={`nav-${item.label}`}
              as={Link}
              href={item.href}
              className={cn("font-medium text-default-700 hover:text-primary", {
                "font-bold text-danger-500": router.pathname === item.href,
              })}
            >
              {item.label}
            </NavbarItem>
          ))}
        </NavbarContent>
      </div>

      <NavbarContent justify="end">
        <NavbarMenuToggle className="block lg:hidden" />

        <NavbarItem className="hidden lg:flex lg:relative">
          <Input
            isClearable
            className="w-[300px]"
            placeholder="Search event..."
            startContent={<CiSearch />}
            onClear={() => {}}
            onChange={() => {}}
          />
        </NavbarItem>

        {/* Desktop Navbar */}
        {session.status === "authenticated" ? (
          <NavbarItem className="hidden lg:block">
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  src={dataProfile?.profilePicture}
                  className="cursor-pointer"
                  showFallback
                />
              </DropdownTrigger>

              <DropdownMenu>
                <DropdownItem
                  key="admin"
                  href="/admin/dashboard"
                  className={cn({
                    hidden: dataProfile?.role === "admin",
                  })}
                >
                  Dashboard
                </DropdownItem>

                <DropdownItem key="profile" href="/member/profile">
                  Profile
                </DropdownItem>

                <DropdownItem key="signout" onPress={() => signOut()}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <div className="hidden lg:gap-4 lg:flex">
            {BUTTON_ITEMS.map((item) => (
              <NavbarItem key={`button${item.label}`}>
                <Button
                  as={Link}
                  href={item.href}
                  color="primary"
                  variant={item.variant as ButtonProps["variant"]}
                >
                  {item.label}
                </Button>
              </NavbarItem>
            ))}
          </div>
        )}

        {/* Mobile Navbar */}
        <NavbarMenu className="gap-4 ">
          {NAV_ITEMS.map((item) => (
            <NavbarMenuItem
              key={`nav-${item.label}`}
              className={cn("font-medium text-default-700 hover:text-primary", {
                "font-bold text-danger": router.pathname === item.href,
              })}
            >
              <Link href={item.href}>{item.label}</Link>
            </NavbarMenuItem>
          ))}
          {session.status === "authenticated" ? (
            <Fragment>
              <NavbarMenuItem
                className={cn(
                  "font-medium text-default-700 hover:text-primary",
                  {
                    hidden: dataProfile?.role !== "admin",
                  },
                )}
              >
                <Link href="/admin/dashboard">Dashboard</Link>
              </NavbarMenuItem>

              <NavbarMenuItem className="font-medium text-default-700 hover:text-primary">
                <Link href="/member/profile">Profile</Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Button
                  color="primary"
                  onPress={() => signOut()}
                  className="w-full mt-2"
                  variant="bordered"
                  size="md"
                >
                  logout
                </Button>
              </NavbarMenuItem>
            </Fragment>
          ) : (
            <Fragment>
              {BUTTON_ITEMS.map((item) => (
                <NavbarMenuItem key={`button-${item.label}`}>
                  <Button
                    as={Link}
                    color="primary"
                    href={item.href}
                    fullWidth
                    variant={item.variant as ButtonProps["variant"]}
                    size="md"
                  >
                    {item.label}
                  </Button>
                </NavbarMenuItem>
              ))}
            </Fragment>
          )}
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
};

export default LandingPageLayoutNavbar;

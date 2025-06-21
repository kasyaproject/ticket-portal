import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/event" },
];

const BUTTON_ITEMS = [
  { label: "Register", href: "/auth/register", variant: "bordered" },
  { label: "Login", href: "/auth/login", variant: "solid" },
];

const SOSIAL_ITEMS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: <FaFacebookF />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: <FaInstagram />,
  },
  {
    label: "Tik Tok",
    href: "https://www.tiktok.com/",
    icon: <FaTiktok />,
  },
  {
    label: "Twitter",
    href: "https://www.twitter.com/",
    icon: <FaTwitter />,
  },
];

export { NAV_ITEMS, BUTTON_ITEMS, SOSIAL_ITEMS };

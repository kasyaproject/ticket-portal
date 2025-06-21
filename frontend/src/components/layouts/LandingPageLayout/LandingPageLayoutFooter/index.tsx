import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS, SOSIAL_ITEMS } from "../LandingPageLayout.constants";

const LandingPageLayoutFooter = () => {
  return (
    <div className="flex flex-col items-center justify-between px-6 py-10 text-center text-white lg:flex-row lg:text-left xl:p-20 bg-slate-900">
      {/* Logo */}
      <Image
        src={"/img/general/logo.svg"}
        alt="logo"
        className="w-40 mb-4 lg:mb-0 lg:w-60"
        width={200}
        height={100}
      />

      {/* CS */}
      <div className="flex flex-col gap-4 mb-4 lg:mb-0">
        <div>
          <h4 className="text-xl">Customer Services</h4>
          <p className="text-gray-600">
            <Link href="mailto:cs@ticket.id">cs@ticket.id</Link> | {""}
            <Link href="tel:+6285156253173">+62 8515 6253 173</Link>
          </p>
        </div>

        <div>
          <h4 className="text-xl">Office</h4>
          <p className="text-gray-600">
            Jl Senen Raya Proy Senen Bl IV P-4/11, Dki Jakarta
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2 mb-10 lg:mb-0">
        <h2 className="text-xl lg:mb-2">Menu</h2>
        {NAV_ITEMS.map((item) => (
          <Link
            key={`footer-nav-${item.label}`}
            href={item.href}
            className="text-gray-600 cursor-pointer hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Social */}
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center justify-between gap-8 text-gray-600">
          {SOSIAL_ITEMS.map((item) => (
            <Link
              target="_blank"
              href={item.href}
              className="text-3xl hover:text-white"
              key={`footer-social-${item.label}`}
            >
              {item.icon}
            </Link>
          ))}
        </div>

        <p className="w-full text-center text-gray-600">
          Copyright © 2025 Ticket Portal. All right reserved
        </p>
      </div>
    </div>
  );
};

export default LandingPageLayoutFooter;

import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";
import LandingPageLayoutFooter from "./LandingPageLayoutFooter";

interface PropTypes {
  title: string;
  children: ReactNode;
}

const LandingPageLayout = (props: PropTypes) => {
  const { title, children } = props;

  return (
    <Fragment>
      <PageHead title={title} />

      <LandingPageLayoutNavbar />

      <div className="w-full py-10 md:p-6">
        <div className="w-full mx-auto max-w-7xl">{children}</div>
      </div>

      <LandingPageLayoutFooter />
    </Fragment>
  );
};

export default LandingPageLayout;

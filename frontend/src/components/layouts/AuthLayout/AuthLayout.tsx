import { Fragment, ReactNode } from "react";
import PageHead from "@/components/commons/PageHead";

interface PropTypes {
  children: ReactNode;
  title?: string;
}

const AuthLayout = (props: PropTypes) => {
  const { children, title } = props;

  return (
    <Fragment>
      <PageHead title={title} />

      <section className="min-h-screen p-6 max-w-screen-3xl 3xl:container">
        {children}
      </section>
    </Fragment>
  );
};

export default AuthLayout;

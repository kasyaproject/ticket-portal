import { ReactNode } from "react";
import PageHead from "@/components/commons/PageHead";

interface PropTypes {
  title?: string;
  children: ReactNode;
}

const AuthLayout = (props: PropTypes) => {
  const { title, children } = props;

  return (
    <>
      <PageHead title={title} />

      <section className="flex p-6 max-w-screen-3xl 3xl:container">
        {children}
      </section>
    </>
  );
};

export default AuthLayout;

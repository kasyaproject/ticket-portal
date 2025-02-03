import { ReactNode } from "react";
import PageHead from "@/components/commons/PageHead";

interface PropTypes {
  title?: string;
  children: ReactNode;
}

const AuthLayout = (props: PropTypes) => {
  const { title, children } = props;

  return (
    <div className="flex flex-col items-center justify-center min-w-full min-h-screen gap-10 py-10 lg:py-0">
      <PageHead title={title} />

      <section className="flex p-6 max-w-screen-3xl 3xl:container">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;

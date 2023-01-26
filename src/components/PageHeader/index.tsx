import Head from "next/head";

interface PageHeaderProps {
  title?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <Head>
      <title>{title || "Insonmia Test"} </title>
      <meta name="description" content="Insonmia" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default PageHeader;

import Head from "next/head";

export function HeadTag({ title }) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}

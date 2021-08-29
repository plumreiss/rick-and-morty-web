import { Layout } from "@/components/Layout";
import { GlobalStyles } from "@/styles/GlobalStyles";
import "styles/GlobalFonts.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <GlobalStyles />
      <Component {...pageProps} />
    </Layout>
  );
}

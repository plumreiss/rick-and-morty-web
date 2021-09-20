import { NavBar } from "@/components/Menu/NavBar";
import { Footer } from "@/components/Footer/Footer";
import { Main } from "./Main/Main";
import { HeadTag } from "./HeadTag/HeadTag";

export function Layout({ children }) {
  return (
    <>
      <HeadTag />
      <NavBar />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

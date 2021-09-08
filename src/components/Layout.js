import { NavBar } from "@/components/Menu/NavBar";
import { Footer } from "@/components/Footer/Footer";
import { Main } from "./Main/Main";

export function Layout({ children }) {
  return (
    <>
      <NavBar />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

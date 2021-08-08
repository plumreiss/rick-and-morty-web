import { NavBar } from "./Menu/NavBar";
import { Footer } from "./Footer/Footer";

export function Layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}

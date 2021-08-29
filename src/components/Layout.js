import { NavBar } from "@/components/Menu/NavBar";
import { Footer } from "@/components/Footer/Footer";

export function Layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}

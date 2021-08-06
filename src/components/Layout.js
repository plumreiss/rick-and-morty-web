import { NavBar } from "./Menu/NavBar";

export function Layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

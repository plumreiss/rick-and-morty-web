import { NavBar } from "./NavBar";

export function Layout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

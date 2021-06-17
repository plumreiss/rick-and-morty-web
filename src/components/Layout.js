import { NavBar } from "./Menu/NavBar";

export function Layout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

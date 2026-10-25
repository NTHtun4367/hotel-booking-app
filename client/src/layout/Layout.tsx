import Header from "@/components/common/Header";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import MobileHeader from "./MobileHeader";
import BottomNav from "./BottomNav";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <main className="pb-20 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import MobileHeader from "./MobileHeader";
import BottomNav from "./BottomNav";
import BrandLogo from "./BrandLogo";

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
      <footer className="border-t border-violet-100 bg-white py-6">
        <div className="flex justify-center px-4 sm:px-6">
          <BrandLogo
            size={28}
            textClass="font-display text-sm font-semibold text-slate-500"
          />
        </div>
      </footer>
      <BottomNav />
    </div>
  );
}
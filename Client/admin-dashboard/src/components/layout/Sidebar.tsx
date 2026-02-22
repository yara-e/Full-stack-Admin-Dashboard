import { Link, useLocation } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import type { RootState } from "@/app/store";

import { LayoutDashboard, Users, Box, BarChart3  , LogOut} from "lucide-react";
import { logout } from "@/features/auth/authSlice";

interface SidebarProps {
  closeSidebar?: () => void;
}

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  const location = useLocation();
  const role = useSelector((state: RootState) => state.auth.user?.role);

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, roles: ["ADMIN","MANAGER"] },
    { name: "Users", path: "/users", icon: Users, roles: ["ADMIN"] },
    { name: "Products", path: "/products", icon: Box, roles: ["ADMIN","MANAGER"] },
    { name: "Orders", path: "/orders", icon: Box, roles: ["ADMIN","MANAGER"] },
    { name: "Analysis", path: "/analysis", icon: BarChart3, roles: ["ADMIN","MANAGER","user"] }
  ];
const dispatch = useDispatch();
  return (
    <div className="h-full w-64   text-white flex flex-col  ">

      <div className="p-4 text-xl  text-stone-900 font-bold border-b border-stone-200">
        Admin Panel
      </div>

      <nav className="flex flex-col gap-1 p-2">

        {links
          .filter(link => role && link.roles.includes(role))
          .map(link => {
            const Icon = link.icon;

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3 p-3 rounded-lg transition
                  ${location.pathname === link.path
                    ? "z-50 px-3 py-2 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border border-stone-900 text-stone-50 hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none duration-300 ease-in align-middle select-none font-sans text-center antialiased"
                    : "px-3 py-2 text-stone-700 hover:bg-stone-100 transition-colors duration-200 border border-transparent"}
                `}
              >
                <Icon size={18} />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="flex gap-3 p-3 border-t border-stone-200"> 
 <LogOut  className="text-stone-800" size={18} />
          <button
                    onClick={() => dispatch(logout())}
                    className="text-left text-stone-800"
                  >
                    Logout
                  </button>
                  </div>
      </nav>

    </div>
  );
};

export default Sidebar;

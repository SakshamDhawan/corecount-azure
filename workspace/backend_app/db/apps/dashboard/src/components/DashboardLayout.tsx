import { Bars4Icon, ClockIcon, HomeIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { Link, Outlet, useLocation } from "react-router-dom";

import useAuth from "../context/useAuth";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  { name: "Users", href: "/users", icon: Bars4Icon, current: false },
  { name: "Workouts", href: "/workouts", icon: ClockIcon, current: false },
  { name: "Articles", href: "/articles", icon: ClockIcon, current: false },
];

export function DashboardLayout() {
  const { user, logout } = useAuth();

  const path = useLocation();

  return (
    <>
      <div className="min-h-full">
        <div className="fixed inset-y-0 flex w-64 flex-col border-r border-dark-50 pb-4 pt-5">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-1">
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full items-center justify-between space-x-3">
                <div className="flex w-full flex-1 flex-col items-center">
                  <div className="truncate text-sm font-medium">{user?.email}</div>
                  <div className={"w-full"}>
                    <button
                      onClick={() => {
                        logout();
                      }}
                      className={clsx("btn group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium")}
                    >
                      <XCircleIcon aria-hidden="true" className={clsx("mr-3 h-6 w-6 flex-shrink-0")} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="mt-6 px-3">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={path.pathname === item.href ? "page" : undefined}
                    className={clsx(
                      path.pathname === item.href
                        ? "bg-green text-dark-80"
                        : "text-light-30 hover:bg-dark-40 hover:text-light-30",
                      "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className={clsx(
                        item.current ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 h-6 w-6 flex-shrink-0",
                      )}
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
        {/* Main column */}
        <div className="flex flex-col lg:pl-64">
          <main className="flex-1">
            {/* Pinned projects */}
            <div className="mt-6 px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import ApiService from "@/service/ApiService";
import {Truck} from "lucide-react";
import {
  GridIcon,
  ChevronDownIcon,
  ListIcon,
  HorizontaLDots,
  PlusIcon,
  UserCircleIcon,
} from "../icons/index";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

  // This would typically come from your auth context or API
  useEffect(() => {
    // Replace this with your actual admin check logic
    const checkAdminStatus = async () => {
      // const userRole =  ApiService.isAdmin(); // Fetch user role from your API or context
      setIsAdmin(ApiService.isAdmin());
    };
    
    checkAdminStatus();
  }, []);

  const navItems: NavItem[] = [
    {
      icon: <GridIcon />,
      name: "Statistics",
      subItems: [
        { name: "Branch Statistics", path: "/", pro: false },
        { name: "Company Statistics", path: "/company", pro: true }
      ],
    },
    {
      name: "Consignments",
      icon: <ListIcon />,
      subItems: [
        { name: "Add Consignment", path: "/addConsignment", pro: false },
        { name: "Tracking", path: "/tracking", pro: false },
      ],
    },
    {
      name: "Trucks",
      icon: <ListIcon />,
      subItems: [
        { name: "Dispatch", path: "/basic-tables", pro: false },
        { name: "Truck List", path: "/truckList", pro: false },
      ],
    },
    {
      name: "Register",
      icon: <PlusIcon />,
      subItems: [
        { name: "Branch", path: "/addBranch", pro: false },
        { name: "Truck", path: "/addTruck", pro: false },
      ],
    },
    {
      icon: <UserCircleIcon />,
      name: "User Profile",
      path: "/profile",
    },
  ];

  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    navItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu(index);
            submenuMatched = true;
          }
        });
      }
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (prevOpenSubmenu === index) {
        return null;
      }
      return index;
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
            <div className="flex items-center gap-2">
             <Truck className="w-6 h-6 text-blue-500 mr-2" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">Logitech Transport</span>
            </div>
              {/* <Truck className="w-6 h-6 text-blue-500 mr-2" />
              Logitech Transport */}
              {/* <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              /> */}
            </>
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              <ul className="flex flex-col gap-4">
                {navItems.map((nav, index) => (
                  <li key={nav.name}>
                    {nav.subItems ? (
                      <button
                        onClick={() => handleSubmenuToggle(index)}
                        className={`menu-item group  ${
                          openSubmenu === index
                            ? "menu-item-active"
                            : "menu-item-inactive"
                        } cursor-pointer ${
                          !isExpanded && !isHovered
                            ? "lg:justify-center"
                            : "lg:justify-start"
                        }`}
                      >
                        <span
                          className={` ${
                            openSubmenu === index
                              ? "menu-item-icon-active"
                              : "menu-item-icon-inactive"
                          }`}
                        >
                          {nav.icon}
                        </span>
                        {(isExpanded || isHovered || isMobileOpen) && (
                          <span className={`menu-item-text`}>{nav.name}</span>
                        )}
                        {(isExpanded || isHovered || isMobileOpen) && (
                          <ChevronDownIcon
                            className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                              openSubmenu === index
                                ? "rotate-180 text-brand-500"
                                : ""
                            }`}
                          />
                        )}
                      </button>
                    ) : (
                      nav.path && (
                        <Link
                          href={nav.path}
                          className={`menu-item group ${
                            isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                          }`}
                        >
                          <span
                            className={`${
                              isActive(nav.path)
                                ? "menu-item-icon-active"
                                : "menu-item-icon-inactive"
                            }`}
                          >
                            {nav.icon}
                          </span>
                          {(isExpanded || isHovered || isMobileOpen) && (
                            <span className={`menu-item-text`}>{nav.name}</span>
                          )}
                        </Link>
                      )
                    )}
                    {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                      <div
                        ref={(el) => {
                          subMenuRefs.current[`${index}`] = el;
                        }}
                        className="overflow-hidden transition-all duration-300"
                        style={{
                          height:
                            openSubmenu === index
                              ? `${subMenuHeight[`${index}`]}px`
                              : "0px",
                        }}
                      >
                        <ul className="mt-2 space-y-1 ml-9">
                          {/* Filter out pro items if not an admin */}
                          {nav.subItems
                            .filter(subItem => !subItem.pro || (subItem.pro && isAdmin))
                            .map((subItem) => (
                              <li key={subItem.name}>
                                <Link
                                  href={subItem.path}
                                  className={`menu-dropdown-item ${
                                    isActive(subItem.path)
                                      ? "menu-dropdown-item-active"
                                      : "menu-dropdown-item-inactive"
                                  }`}
                                >
                                  {subItem.name}
                                  <span className="flex items-center gap-1 ml-auto">
                                    {subItem.new && (
                                      <span
                                        className={`ml-auto ${
                                          isActive(subItem.path)
                                            ? "menu-dropdown-badge-active"
                                            : "menu-dropdown-badge-inactive"
                                        } menu-dropdown-badge `}
                                      >
                                        new
                                      </span>
                                    )}
                                    {subItem.pro && isAdmin && (
                                      <span
                                        className={`ml-auto ${
                                          isActive(subItem.path)
                                            ? "menu-dropdown-badge-active"
                                            : "menu-dropdown-badge-inactive"
                                        } menu-dropdown-badge `}
                                      >
                                        pro
                                      </span>
                                    )}
                                  </span>
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
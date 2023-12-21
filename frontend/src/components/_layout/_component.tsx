import { Link, Outlet } from "react-router-dom";
import classNames from "classnames";
import React, { useState } from "react";
import { menus } from "../../data";
import { Icons } from "../../assets/Assets";
import { clearUserSession } from "../../core/utilities";
import { Button } from "../button/_component";
import { Modal } from "../modal/_component";

export const PageLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [activeLink, setActiveLink] = useState("");
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] =
    React.useState<boolean>(false);
  const onMenuClick = (
    e: any,
    selected: number,
    url: string,
    submenu: any[]
  ) => {
    console.log(url, submenu);
    e.preventDefault();
    setSelectedMenu(selected);
  };

  const openDeactivationModal = () => {
    setIsDeactivateModalOpen(true);
  };

  const closeDeactivationModal = () => {
    setIsDeactivateModalOpen(false);
  };

  const groupMenus = (entries: any[]): { group: string; items: any[] }[] => {
    return Object.values(
      entries.reduce((result: any[], item) => {
        const key = item.group;
        if (!result[key]) {
          result[key] = { group: key, items: [] };
        }
        result[key].items.push(item);
        return result;
      }, {})
    );
  };

  const logout = () => {
    clearUserSession();
  };

  return (
    <>
      <div className="flex w-full h-screen">
        {/* <div className=" w-20 border-r-[1px] border-slate-100 h-screen shadow-sm">
          <Link to="/">
            <div className="flex m-1 bg-yellow-400 rounded-lg shadow-lg align-center">
              <Icons.CiMenuBurger className="w-28" />
            </div>
          </Link>
          <ul className="main-nav">
            {menus.map((menu: any, key: any) => (
              <li
                key={key}
                title={menu.title}
                className={classNames("px-auto w-full items-center", {
                  active: selectedMenu == key,
                })}
              >
                <a
                  onClick={(e) => onMenuClick(e, key, menu.url, menu?.submenu)}
                  className="flex items-center w-full text-center"
                >
                  <menu.icon className="w-8 mx-auto text-gray-600" />
                </a>
              </li>
            ))}
            <div className="absolute bottom-2 left-3" title="Logout">
              <div className="cursor-pointer" onClick={openDeactivationModal}>
                <Icons.CiMenuBurger className="w-10 mx-auto -mt-8 text-gray-600 cursor-pointer" />
              </div>
            </div>
          </ul>
        </div> */}
        <div className="w-64 px-3 border-r-[1px] border-slate-100 h-screen pt-14">
          <ul className="sub-nav">
            {(
              groupMenus(
                menus.find((_: any, k: any) => k == selectedMenu)!.submenu
              ) ?? []
            ).map(({ group, items }, k) => (
              <React.Fragment key={k}>
                <li className="group-title">{group}</li>
                {items.map((menu, j) => (
                  <li key={j}>
                    <Link
                      to={menu.url}
                      className="flex items-center text-red-800"
                    >
                      <span className="w-10 text-green-800">{menu.icon}</span>
                      <div
                        onClick={() => setActiveLink(menu.url)}
                        className={
                          activeLink === menu.url ? "text-red-500" : ""
                        }
                      >
                        {menu.title}
                      </div>
                    </Link>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
          <div className="absolute bottom-2 left-3" title="Logout">
            <div className="cursor-pointer" onClick={openDeactivationModal}>
              <Icons.Logout
                size={30}
                className="w-10 mx-auto -mt-8 text-red-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="w-full bg-[#f5f9fe] overflow-auto">
          <div className="px-10">
            <Outlet />
          </div>
        </div>
      </div>
      <Modal
        open={isDeactivateModalOpen}
        close={closeDeactivationModal}
        closeOnOverlay
      >
        <div className="p-10 bg-white">
          <div className="flex w-20 m-auto">
            <Icons.Warning size={100} color="red" />
          </div>
          <div>
            <h3 className="mt-3 text-black">
              Are you sure you want to logout?
            </h3>
            <div className="flex mx-2 mt-6">
              <Button
                className="w-full mr-3 text-white bg-black form-wizard-submit disabled:bg-gray-200 disabled:shadow-none lg:px-20"
                type={"submit"}
                label={"No"}
                onClick={closeDeactivationModal}
              />
              <Button
                className="w-full text-white bg-red-500 form-wizard-submit disabled:bg-gray-200 disabled:shadow-none lg:px-20"
                type={"submit"}
                label={"Yes"}
                onClick={logout}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

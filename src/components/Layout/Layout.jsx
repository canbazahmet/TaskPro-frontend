import { Suspense, useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Loader from "../Loader/Loader";

import { setIsSidebarOpen, setTheme } from "../../redux/auth/authSlice";
import {
  selectIsSidebarOpen,
  selectTheme,
} from "../../redux/auth/authSelectors";

import s from "./Layout.module.css";

export const Layout = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const theme = useSelector(selectTheme);

  const handleClickOutside = useCallback(
    (event) => {
      const sidebarRef = document.getElementById("sidebar");
      if (sidebarRef && !sidebarRef.contains(event.target)) {
        dispatch(setIsSidebarOpen(false));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(setTheme());
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const onBurgerClick = () => dispatch(setIsSidebarOpen(!isSidebarOpen));

  return (
    <div className={s.page}>
      <div className={s.wrapper}>
        <Sidebar isOpen={isSidebarOpen} onClose={onBurgerClick} />
        <main className={s.main}>
          <Header onBurgerClick={onBurgerClick} />
          <div className={s.outlet}>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
      {isSidebarOpen && <div className={s.blur} onClick={onBurgerClick}></div>}
    </div>
  );
};

export default Layout;

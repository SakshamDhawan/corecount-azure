import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <meta charSet="utf-8" />
      <Outlet />
    </>
  );
}

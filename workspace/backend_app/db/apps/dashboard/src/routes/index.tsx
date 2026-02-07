import { createBrowserRouter } from "react-router-dom";

import { Articles, EditArticle, NewArticle } from "../components/Articles.tsx";
import { Dashboard } from "../components/Dashboard.tsx";
import { DashboardLayout } from "../components/DashboardLayout.tsx";
import DefaultErrorComponent from "../components/ErrorComponent.tsx";
import MediaManager from "../components/MediaManager.tsx";
import { EditUser, Users } from "../components/Users.tsx";
import { EditWorkout, NewWorkout, Workouts } from "../components/Workouts.tsx";
import { TRPCProvider } from "../utils/api";
import LoginLayout from "./login.tsx";
import Root from "./root.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <TRPCProvider>
        <Root />
      </TRPCProvider>
    ),
    errorElement: <DefaultErrorComponent />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/media", element: <MediaManager /> },
          {
            path: "/users",
            children: [
              { path: "", element: <Users /> },
              { path: ":id", element: <EditUser /> },
            ],
          },
          {
            path: "/workouts",
            children: [
              { path: "", element: <Workouts /> },
              { path: "create", element: <NewWorkout /> },
              { path: ":id", element: <EditWorkout /> },
            ],
          },
          {
            path: "/articles",
            children: [
              { path: "", element: <Articles /> },
              { path: "create", element: <NewArticle /> },
              { path: ":id", element: <EditArticle /> },
            ],
          },
        ],
      },
      {
        path: "login",
        element: <LoginLayout />,
      },
    ],
  },
]);

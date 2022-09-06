import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { Notes } from "./components/Notes";

// const notesBreadcrumbs = [
//   {
//     title: "Note Management",
//     path: "/apps/notes",
//     isSeparator: false,
//     isActive: false,
//   },
//   {
//     title: "",
//     path: "",
//     isSeparator: true,
//     isActive: false,
//   },
// ];

const NotesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="/"
          element={
            <>
              <Notes />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/apps/notes" />} />
    </Routes>
  );
};

export default NotesPage;

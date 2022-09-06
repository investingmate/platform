import { Route, Routes, Outlet, Navigate } from "react-router-dom";
// import { CompaniesHeader } from "./CompaniesHeader";
import { Companies } from "./components/Companies";

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

const CompaniesPage = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            {/* <CompaniesHeader /> */}
            <Outlet />
          </>
        }
      >
        <Route
          path="overview"
          element={
            <>
              <Companies />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/companies/overview" />} />
    </Routes>
  );
};

export default CompaniesPage;

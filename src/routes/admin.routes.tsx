import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";
import AdminDashboard from "../pages/admin/AdminDashboard";
import { NavLink } from "react-router-dom";
type TRoute = {
  path:string,
  element:React.ReactNode
}
type TSidebarItem = {
  key:string,
  label: React.ReactNode,
  children?: TSidebarItem[]
}

const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    Children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];
//*: Programmatic way

export const adminRoutes = adminPaths.reduce((acc:TRoute[], item)=>{

  if(item.path && item.element){
      acc.push({
          path: item.path,
          element: item.element
      });

  }
  if(item.Children){
      item.Children.forEach(child =>{
          acc.push({
              path: child.path,
              element: child.element
          });
      })
  }

  return acc;

}, [])

//!Sidebar 
export const adminSidebarItems = adminPaths.reduce((acc:TSidebarItem[], item)=>{

  if(item.path && item.element){
      acc.push({
          key: item.name,
          label: <NavLink to={`/admin/${item.path}`}> {item.name}</NavLink>
      });

  }
  if(item.Children){
      acc.push({
          key: item.name,
          label: item.name,
          children: item.Children.map(child=> ({
              key:child.name,
              label: <NavLink to={`/admin/${child.path}`}> {child.name}</NavLink>
          }))
      });
  }

  return acc;

}, [])

//!normal way
// export const adminPaths = [
//   {
//     index: true,
//     element: <AdminDashboard />,
//   },
//   {
//     path: "dashboard",
//     element: <AdminDashboard />,
//   },
//   {
//     path: "create-student",
//     element: <CreateStudent />,
//   },
//   {
//     path: "create-faculty",
//     element: <CreateFaculty />,
//   },
//   {
//     path: "create-admin",
//     element: <CreateAdmin />,
//   },
// ];

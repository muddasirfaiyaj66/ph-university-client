const adminPaths2 = [
    {
      name: "Dashboard",
      path: "dashboard",
      element:  "AdminDashboard" ,
    },
    {
      name: "User Management",
      Children: [
        {
          name: "Create Admin",
          path: "create-admin",
          element: "CreateAdmin" ,
        },
        {
          name: "Create Faculty",
          path: "create-faculty",
          element: "CreateFaculty ",
        },
        {
          name: "Create Student",
          path: "create-student",
          element:" CreateStudent" ,
        },
      ],
    },
  ];

  const adminRoutes = adminPaths2.reduce((acc, item)=>{

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

  console.log(adminRoutes);
  
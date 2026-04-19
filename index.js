import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/header";
import Content from "./src/components/content";
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";
import About from "./src/components/about";
import Contact from "./src/components/contact";
import Error from "./src/components/error";
import RestaurantMenu from "./src/components/menu"
const App=()=>
{
    return(
       <div>
         <Header/>
         <Outlet/>
       </div>
     )
}
const Approuter=createBrowserRouter(
    [
        {
             path:"/",
            element:<App/>,
            children:[
                {
                     path:"/",
                     element:<Content/>,
                },
                {
                    path:"/about",
                    element:<About/>,
                },
                 {
                            path:"/contact",
                            element:<Contact/>,
                 },
                 {
                       path:"/restaurants/:resId",
                       element:<RestaurantMenu />,
                 },

            ],

            errorElement:<Error/>,
        },
        
    ]);
const root=ReactDOM.createRoot(document.getElementById("box"));
root.render(<RouterProvider router={Approuter}/>)
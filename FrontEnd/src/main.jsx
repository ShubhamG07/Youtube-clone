import { StrictMode,lazy,Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Videolist from './Components/Videolist.jsx';



const VideoPlayer = lazy(() => import("./Components/Videoplayer.jsx"));
const Signup= lazy(()=> import("./Components/Signup.jsx"));
const Login= lazy(()=> import("./Components/Login.jsx"));

const appRouter= createBrowserRouter([

  {
    path:'/',
    element:<App />,
    children:[
      {
        path:"/",
        element:<Videolist />
      },
      {
        path:"/search/:query",
        element:<Videolist />
      },
      {
        path:"/video/:id",
        element:(
          <Suspense
            fallback={
              <div>
                <h1>Please wait while we are Lazy Loading this...</h1>
              </div>
            }
          >
            <VideoPlayer />
          </Suspense>
        )
      },

      {
        path:"/register",
        element:(
          <Suspense
            fallback={
              <div>
                <h1>Please wait while we are Lazy Loading this...</h1>
              </div>
            }
          >
            <Signup />
          </Suspense>
        )
      },
      {
        path:"/login",
        element:(
          <Suspense
            fallback={
              <div>
                <h1>Please wait while we are Lazy Loading this...</h1>
              </div>
            }
          >
            <Login />
          </Suspense>
        )
      }
    ]
  }



]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)

import { StrictMode,lazy,Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Videolist from './Components/Videolist.jsx';



const VideoPlayer = lazy(() => import("./Components/Videoplayer.jsx"));

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
      }
    ]
  }



]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)

import { createBrowserRouter } from 'react-router'
import MainLayout from './layout/MainLayout.jsx'
import Compare from './pages/Compare.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import ShapeDetails from './pages/ShapeDetails.jsx'
import Shapes from './pages/Shapes.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'formas', element: <Shapes /> },
      { path: 'formas/:shapeId', element: <ShapeDetails /> },
      { path: 'comparar', element: <Compare /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

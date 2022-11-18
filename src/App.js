import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { Home, User } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home />} />
      <Route path=':username' element={<User />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

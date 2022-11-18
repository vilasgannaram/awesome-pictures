import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { Home, User, UserPhotos, UserLikes, UserCollections } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home />} />
      <Route path=':username' element={<User />}>
        <Route index element={<UserPhotos />} />
        <Route path='likes' element={<UserLikes />} />
        <Route path='collections' element={<UserCollections />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

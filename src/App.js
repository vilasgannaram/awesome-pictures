import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { Home, User, Photos, Likes, Collections } from './features';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home />} />
      <Route path=':username' element={<User />}>
        <Route index element={<Photos />} />
        <Route path='likes' element={<Likes />} />
        <Route path='collections' element={<Collections />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

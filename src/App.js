import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import router from './Routes/Routes/Routes';

function App() {
  return (
    <div className="App max-w-[1440px] mx-auto">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
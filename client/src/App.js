import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing, Error, Register, ProtectedRoute } from "./pages/index";
import {
  AllJobs,
  AddJob,
  Profile,
  Stats,
  SharedLayout,
} from "./pages/dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/all-jobs" element={<AllJobs />} />
          <Route path="/add-job" element={<AddJob />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

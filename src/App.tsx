import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import HomeDashboard from "./sections/dashboard/Home";
import Profile from "./sections/dashboard/Profile";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Landing from "./sections/Landing";
import ForgotPassword from "./routes/ForgotPassword";
import ChangePassword from "./routes/ChangePassword";
import PickSubject from "./sections/dashboard/pick/PickSubject";
import PickTopic from "./sections/dashboard/pick/PickTopic";
import ReadyScreen from "./sections/dashboard/ReadyScreen";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route
            path="/user-profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <HomeDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/pick/:type/subject"
            element={
              <PrivateRoute>
                <PickSubject />
              </PrivateRoute>
            }
          />
          <Route
            path="/pick/:subjectId/topic/:type"
            element={
              <PrivateRoute>
                <PickTopic />
              </PrivateRoute>
            }
          />
          <Route
            path="/getting/:subjectId/ready/:type/for/:asId"
            element={
              <PrivateRoute>
                <ReadyScreen />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

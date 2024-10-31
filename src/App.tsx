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
import PrivateRoute from "./contexts/PrivateRoute";
import Landing from "./sections/Landing";
import ForgotPassword from "./routes/ForgotPassword";
import ChangePassword from "./routes/ChangePassword";
import PickSubject from "./sections/dashboard/pick/PickSubject";
import PickTopic from "./sections/dashboard/pick/PickTopic";
import ReadyScreen from "./sections/dashboard/ReadyScreen";
import AdminLoginPage from "./routes/admin/Login";
import AdminLayout from "./sections/admin/Layout";
import Report from "./sections/admin/category/Report";
import SubjectSelection from "./sections/admin/category/SubjectSelection";
import NewQuestion from "./sections/admin/category/NewQuestion";
import ErrorPage from "./routes/Error";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
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
          <Route
            path="/admin/dashboard"
            element={<PrivateRoute><AdminLayout/></PrivateRoute>}
          >
            <Route index element={<Report/>} />
            <Route path="report" element={<Report/>} />
            <Route path="subjects" element={<h1>Subjects</h1>}/>
            <Route path="add-question" element={<SubjectSelection/>}/>
            <Route path="new-question/:subjectId" element={<NewQuestion/>}/>
          </Route>
          <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
          <Route path="/dashboard/*" element={<Navigate to="/login" replace />} />
          <Route path="/error" element={<ErrorPage/>}/>
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

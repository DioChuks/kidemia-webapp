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
import AssessmentScreen from "./sections/dashboard/AssessmentScreen";
import AdminLoginPage from "./routes/admin/Login";
import AdminLayout from "./sections/admin/Layout";
import Report from "./sections/admin/category/Report";
import SubjectSelection from "./sections/admin/category/SubjectSelection";
import NewQuestion from "./sections/admin/category/NewQuestion";
import ErrorPage from "./routes/Error";
import UploadSubjects from "./sections/admin/category/ImportSubjects";
import Subjects from "./sections/admin/category/Subjects";
import ShowSubject from "./sections/admin/category/Subject";
import AdminPrivateRoute from "./contexts/AdminPrivateRoute";
import Topics from "./sections/admin/category/NewTopic";
import UploadTopics from "./sections/admin/category/ImportTopics";
import UploadQuestions from "./sections/admin/category/ImportQuestions";
import AdminRegisterPage from "./routes/admin/Register";
import GuardianLayout from "./sections/guardian/Layout";
import WardsLayout from "./sections/guardian/wards/Layout";
import WardReport from "./sections/guardian/wards/Report";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/register" element={<AdminRegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/user-profile" element={<PrivateRoute><Profile /></PrivateRoute>}/>
          <Route path="/dashboard" element={<PrivateRoute><HomeDashboard /></PrivateRoute>}/>
          <Route path="/pick/:type/subject" element={<PrivateRoute><PickSubject /></PrivateRoute>}/>
          <Route path="/pick/:subjectId/topic/:type" element={<PrivateRoute><PickTopic /></PrivateRoute>}/>
          <Route path="/assessment/:subjectId/ready/:type/for/:asId" element={<PrivateRoute><AssessmentScreen /></PrivateRoute>}/>
          <Route
            path="/admin/dashboard"
            element={<AdminPrivateRoute><AdminLayout/></AdminPrivateRoute>}
          >
            <Route index element={<Report/>} />
            <Route path="report" element={<Report/>} />
            <Route path="subjects" element={<Subjects/>}/>
            <Route path="subject/:subjectId" element={<ShowSubject/>}/>
            <Route path="add-question" element={<SubjectSelection/>}/>
            <Route path="new-question/:subjectId" element={<NewQuestion/>}/>
            <Route path="upload-subjects" element={<UploadSubjects/>}/>
            <Route path="upload-topics" element={<UploadTopics/>}/>
            <Route path="upload-questions" element={<UploadQuestions/>}/>
            <Route path="new-topic" element={<Topics/>}/>
          </Route>
          <Route
            path="/admin/guardian"
            element={<AdminPrivateRoute><GuardianLayout/></AdminPrivateRoute>}
          >
            <Route index element={<WardsLayout/>} />
            <Route path="ward-report" element={<WardReport/>} />
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

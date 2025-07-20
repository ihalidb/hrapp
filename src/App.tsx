import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { DashboardLayout } from './components/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Personnel } from './pages/Personnel';
import { Payroll } from './pages/Payroll';
import { Organization } from './pages/Organization';
import { UserManagement } from './pages/UserManagement';
import { Settings } from './pages/Settings';
import { Reports } from './pages/Reports';
import { LeaveRequest } from './pages/LeaveRequest';
import { ExpenseRequest } from './pages/ExpenseRequest';
import { ApprovalPanel } from './components/ApprovalPanel';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="personnel" element={<Personnel />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="organization" element={<Organization />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<Reports />} />
            <Route path="leave-request" element={<LeaveRequest />} />
            <Route path="expense-request" element={<ExpenseRequest />} />
            <Route path="approvals/leave" element={<ApprovalPanel type="leave" />} />
            <Route path="approvals/expense" element={<ApprovalPanel type="expense" />} />
          </Route>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

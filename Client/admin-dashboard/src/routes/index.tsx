import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
 
import DashboardLayout from "../components/layout/DashboardLayout";
 
import ProductsPage from "../features/products/productPage";
import OrdersPage from "../features/orders/orderPage";
 import DashboardPage from "../features/analytics/dashboardPage";
 import AnalysisPage from "@/features/analytics/AnalysisPage";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import type { JSX } from "react";
import LoginPage from "@/features/auth/LoginPage";
import UsersPage  from "@/features/users/UsersPage";
import UsersOrdersPage from "@/features/users/UsersOrderPage"
 
import OrderDetails from "./../features/orders/orderDetails";
 

const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element; allowedRoles: string[] }) => {
   const { user, token } = useSelector(
    (state: RootState) => state.auth
  );

  if (!token) return <Navigate to="/login" />;

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={
          <ProtectedRoute allowedRoles={["ADMIN","Manager","USER"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }>

          {/* <Route index element={<AnalysisPage />} /> */}
          <Route path="users" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}><UsersPage /></ProtectedRoute>
          } />

          <Route path="/users/:id/orders" element={ <ProtectedRoute allowedRoles={["ADMIN"]}><UsersOrdersPage /></ProtectedRoute>} />

          <Route path="products" element={
            <ProtectedRoute allowedRoles={["ADMIN","MANAGER"]}><ProductsPage /></ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={["ADMIN","MANAGER"]}><DashboardPage /></ProtectedRoute>
          } />
          <Route path="orders" element={
            <ProtectedRoute allowedRoles={["ADMIN","MANAGER"]}><OrdersPage /></ProtectedRoute>
          } />
           <Route path="orders/:id" element={
            <ProtectedRoute allowedRoles={["ADMIN","MANAGER"]}><OrderDetails /></ProtectedRoute>
          } />
          <Route path="analysis" element={
            <ProtectedRoute allowedRoles={["ADMIN","manager","user"]}><AnalysisPage /></ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

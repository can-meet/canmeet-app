import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
	const { currentUser } = useSelector((state: RootState) => state.user);
	return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Profile } from "./pages/Profile";
import { SignUp } from "./pages/SignUp";
import DetailProduct from "./pages/product/DetailProduct";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="login" element={<Login />} />
						<Route path="signup" element={<SignUp />} />
						<Route path="product/:pid" element={<DetailProduct />} />
						<Route element={<ProtectedRoute />}>
							<Route path="/profile" element={<Profile />} />
						</Route>
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;

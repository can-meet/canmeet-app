
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
import CreateProduct from './pages/product/CreateProduct'
import { Rooms } from "./pages/Rooms";
import { ChatLayout } from "./pages/ChatLayout";
import { Chat } from "./pages/Chat";
import { Notifications } from "./pages/Notifications";
import EditProduct from "./pages/product/EditProduct";
import About from "./pages/sidemenu/About";
import TermsOfService from "./pages/sidemenu/TermsOfService";
import Contact from "./pages/sidemenu/Contact";
import Tutorial from "./pages/sidemenu/Tutorial";


function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="login" element={<Login />} />
						<Route path="signup" element={<SignUp />} />
						<Route path="products/:pid" element={<DetailProduct />} />
						<Route path="/tutorial" element={<Tutorial />} />
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/terms-of-service" element={<TermsOfService />} />
						<Route element={<ProtectedRoute />}>
							<Route path="/profile" element={<Profile />} />
							<Route path="product/create" element={<CreateProduct />} />
							<Route path="product/edit/:pid" element={<EditProduct />} />
							<Route path="/rooms" element={<Rooms />} />
							<Route path="/notifications" element={<Notifications />} />
						</Route>
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route path="/rooms/:rid" element={<ChatLayout />}>
							<Route path="" element={<Chat />} />
						</Route>
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;

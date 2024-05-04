<<<<<<< HEAD
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
import { Rooms } from "./pages/Rooms";
import { ChatLayout } from "./pages/ChatLayout";
import { Chat } from "./pages/Chat";

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
						<Route element={<ProtectedRoute />}>
							<Route path="/profile" element={<Profile />} />
							<Route path="/rooms" element={<Rooms />} />
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
=======
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './pages/Layout'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { NotFound } from './pages/NotFound'
import DetailProduct from './pages/product/DetailProduct'
import CreateProduct from './pages/product/CreateProduct'
import { Profile } from './pages/Profile'
import { ProtectedRoute } from './components/ProtectedRoute'

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
							<Route path="profile" element={<Profile />} />
              <Route path="product/create" element={<CreateProduct />} />
						</Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
>>>>>>> 1d25bf54b4c94147e803743e52ad96f12a9fd6e3
}

export default App;

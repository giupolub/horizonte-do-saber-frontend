import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Post from "../pages/Post";
import CreatePost from "../pages/CreatePost";
import Login from "../pages/Login";
import PrivateRoute from "../routes/PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/posts/:id" element={<Post />} />
      <Route path="/nova-postagem" element={<PrivateRoute><CreatePost/></PrivateRoute>}/>
      <Route path="/editar-postagem/:id" element={<PrivateRoute><CreatePost /></PrivateRoute>}/>
    </Routes>
  );
};

export default AppRoutes;
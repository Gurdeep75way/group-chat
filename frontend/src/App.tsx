import { Route, Routes } from "react-router-dom";
import AuthanticatedLayout from "./layouts/Authanticated";
import BasicLayout from "./layouts/Basic";
import Home from "./pages/homepage";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import ContactUs from "./pages/contact";
import PrivacyPolicy from "./pages/policy";
import NotFound from "./pages/notfound";
// import Users from "./pages/Users.tsx";
import GroupsCreated from "./pages/GroupsCreated.tsx";
import GroupsJoined from "./pages/GroupsJoined.tsx";
import Invitations from "./pages/Invitations.tsx";
import GroupChatApp from "./pages/GroupChat.tsx";
function App() {
  return (
    <Routes>
      <Route element={<AuthanticatedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/users" element={<Users />} /> */}

        <Route path="/my-groups" element={<GroupsCreated />} />
        <Route path="/groups" element={<GroupChatApp />} />
        <Route path="/groups-joined" element={<GroupsJoined />} />
        <Route path="/invitations" element={<Invitations />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
      </Route>
      <Route element={<BasicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

import { Route, Routes } from "react-router-native";

import AppBar from "./AppBar";
import SignIn from "./SignIn";
import RepositoryList from "./RepositoryList";

const Main = () => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default Main;
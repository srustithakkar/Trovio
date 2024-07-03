import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Carbons from "./components/Carbons";
import Login from "./components/Login";
import ProjectDetails from "./components/ProjectDetails";
import Dashboard from "./components/Dashboard";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogin(true);
      setUser(localStorage.getItem("username") || "");
    }
  }, []);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              login ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login setLogin={setLogin} />
              )
            }
          />
          <Route
            path="/dashboard/*"
            element={
              login ? (
                <Dashboard setLogin={setLogin} username={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route
              index
              element={<Carbons setLogin={setLogin} username={user} />}
            />
            <Route path="project/:id" element={<ProjectDetails />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

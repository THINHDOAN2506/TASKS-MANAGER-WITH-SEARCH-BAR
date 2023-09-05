import "./App.css";
import "antd/dist/reset.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AllTasks from "./pages/AllTasks";
import { ROUTES } from "./constants/router";
import NewTask from "./pages/NewTask";
import DoingTasks from "./pages/DoingTasks";
import DoneTasks from "./pages/DoneTasks";
import AddNewTask from "./pages/AddNewTask";
import UpdateTask from "./pages/UpdateTask";
import MainLayout from "./layouts";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<AllTasks />} />
            {/* Add them router edit task */}
            <Route path={ROUTES.ALL_TASK} element={<AllTasks />} />
            <Route path={ROUTES.UPDATE_TASK} element={<UpdateTask />} />
            <Route path={ROUTES.NEW_TASK} element={<NewTask />} />
            <Route path={ROUTES.DOING_TASK} element={<DoingTasks />} />
            <Route path={ROUTES.DONE_TASK} element={<DoneTasks />} />
            <Route path={ROUTES.ADD_NEW} element={<AddNewTask />} />
          </Route>
          <Route path={"/"} element={<Navigate to={ROUTES.ALL_TASK} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

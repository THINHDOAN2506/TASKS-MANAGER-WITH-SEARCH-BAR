import React from "react";
import { Button, Input } from "antd";
import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/router";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAllTask,
  setNewPage,
  setSearchKey,
} from "../../redux/features/tasks/taskSlice";
import { TASK_STATUS } from "../../constants/task.constant";

const HeaderComponents = () => {
  //Minh se xu ly Search o day
  //Khi search minh cung phai kiem tra dang o trang nao, de search ra dung status o trang do
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const searchKey = useSelector((state) => state.task.searchKey);

  const pagination = useSelector((state) => state.task.pagination);

  //su dung useLocation de kiem tra minh o trang nao => import tu react router dom

  const location = useLocation();

  const handleRedirectAddTask = () => {
    navigate(ROUTES.ADD_NEW);
  };

  const computedCurrentStatusSearch = (pathName) => {
    switch (pathName) {
      case "/all-task":
        return "";
      case "/new-task":
        return TASK_STATUS.NEW;
      case "/doing-task":
        return TASK_STATUS.DOING;
      case "/done-task":
        return TASK_STATUS.DONE;
      default:
        return "";
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    //Khi Search task thi minh se update page = 1 va bo sung params Search
    //O trang main(AllTask) minh co UseEffect khi page thay doi thi effect chay lai => cho nay minh can sua UseEffect
    //De Search full text minh su dung search query cua json-server

    const statusSearch = computedCurrentStatusSearch(location.pathname);

    dispatch(
      actFetchAllTask({
        //Khi change page thi minh goi api
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
        ...(!!statusSearch ? { status: statusSearch } : {}),
        //Neu status = "" thi minh khong can param search theo status
      })
    );
    //set page ve bang 1
    dispatch(setNewPage(1));
  };
  //set page ve bang 1
  const handleChangeInputSearch = (event) => {
    const value = event.target.value;
    //Khi co value thi minh se dispatch update searchKey len store
    //setSearchKey import tu reducer cua taskSlice
    dispatch(setSearchKey(value));
  };

  return (
    <div className="header-container">
      <Button onClick={handleRedirectAddTask}>Create New Task</Button>
      <form className="header-container__search-input" onSubmit={handleSearch}>
        {/* value cua input minh co the lay tu searchKey tren store */}
        <Input
          placeholder="Please input search..."
          value={searchKey}
          onChange={handleChangeInputSearch}
        />
        <Button style={{ backgroundColor: "white" }} htmlType="submit">
          Search
        </Button>
      </form>
    </div>
  );
};

export default HeaderComponents;

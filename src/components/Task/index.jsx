import React from "react";
import "./style.scss";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/router";
import { TASK_STATUS } from "../../constants/task.constant";

const Task = (props) => {
  //Get task tu props va hien thi ra man hinh
  //Them chuc nang chuyen huong man hinh sang edit khi nhan vao title
  const navigate = useNavigate();

  const handleRedirectToDetaiPage = () => {
    const taskId = props.task.id;

    //generatePath se tao ra 1 path + thay the param /:[key] dua vao key minh truyen vao. O day la id
    navigate(generatePath(ROUTES.UPDATE_TASK, { id: taskId }));
  };

  const computedStatusColor = (status) => {
    switch (status) {
      case TASK_STATUS.NEW:
        return "blue";
      case TASK_STATUS.DOING:
        return "yellow";
      case TASK_STATUS.DONE:
        return "green";
      default:
        return "green";
    }
  };

  return (
    <div>
      <div className="task-container">
        <div
          className="task-container__title"
          onClick={handleRedirectToDetaiPage}
        >
          Title: {props.task.title}
        </div>
        <div className="task-container__author">
          Creator: {props.task.creator}
        </div>
        <div
          className="task-container__status"
          style={{ color: computedStatusColor(props.task.status) }}
        >
          Status: {props.task.status}
        </div>
        <div className="task-container__divider"></div>
        <div className="task-container__description">
          <div className="task-container__des-title">Description</div>
          <div className="task-container__des-content">
            {props.task.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAllTask,
  setNewPage,
} from "../../redux/features/tasks/taskSlice";
import { TASK_STATUS } from "../../constants/task.constant";
import { Pagination, Spin } from "antd";
import MainContentTask from "../../components/MainContentTask";

const DoneTasks = () => {
  //Tuong tu nhung trang nay giong hoan toan allTask, minh chi sua them param search theo trang thai
  //Them key params status cho nhung page nay
  const dispatch = useDispatch();

  //Lay them bien pagination
  //Khi vao trang lan dau cung nhu chuyen trang cung can giu trang thai Search
  //nen minh se lay SearchKey r alan dau de goi luon
  const { isLoading, tasks, pagination, searchKey } = useSelector(
    (state) => state.task
  );
  useEffect(() => {
    //Truyen them params pagination vao
    dispatch(
      actFetchAllTask({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
        status: TASK_STATUS.DONE,
      })
    );

    return () => {
      dispatch(setNewPage(1));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //Them depenencies de bo depencies dam bao no chay lai 1 lan duy nhat

  const handleChangePage = (newPage) => {
    dispatch(setNewPage(newPage));
    dispatch(
      actFetchAllTask({
        //Khi change page thi minh goi api
        _page: newPage,
        _limit: pagination.limitPerPage,
        q: searchKey,
        status: TASK_STATUS.DONE,
      })
    );
  };

  if (isLoading) {
    return (
      <Spin
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      />
    );
  }
  return (
    <div>
      {tasks.length === 0 ? (
        <div>No task</div>
      ) : (
        <>
          <MainContentTask tasks={tasks} />
          <strong>
            <Pagination
              style={{
                padding: 20,
                display: "flex",
                justifyContent: "center",
                WebkitTextFillColor: "blue",
              }}
              defaultPageSize={pagination.limitPerPage}
              current={pagination.currentPage}
              total={pagination.total}
              onChange={handleChangePage}
            />
          </strong>
        </>
      )}
    </div>
  );
};

export default DoneTasks;

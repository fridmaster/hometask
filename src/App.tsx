import { useCallback, useEffect, useState } from "react";
import {
  getFullTaskList,
  prepareTaskList,
  calculateTotalPages,
  getCurrentPageRange,
  isAllChecked,
  isAllUnChecked,
  getCompletedTasksCount,
} from "./utils/taskList";
import "./App.scss";
import { Button, Loader, ControlBar, TaskItem, Header } from "./components";
import {Task, Item } from "./types";
const SIZE_OF_PAGE = 5;

function useTaskList() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    setIsLoading(true);
    //TODO:  add abort controller or move to react-query
    //TODO: add error handling
    getFullTaskList().then((taskList: Item[]) => {
      setTaskList(prepareTaskList(taskList));
      setIsLoading(false);
    });
  }, []);

  return { taskList, setTaskList, isLoading };
}

function usePage(totalPages: number) {
  const [currentPage, _setCurrentPage] = useState<number>(1);
  const setCurrentPage = useCallback((page: number) => {
    if(page < 1) {
      _setCurrentPage(1);
    } else if(page > totalPages) {
      _setCurrentPage(totalPages);
    } else {
      _setCurrentPage(page);
    }
  }, [totalPages]);
  return { currentPage, setCurrentPage };
}

function App() {
  const { taskList, setTaskList, isLoading } = useTaskList();
  const { currentPage, setCurrentPage } = usePage(calculateTotalPages(taskList, SIZE_OF_PAGE));

  const onChange = (taskId: number) => {
    const newTaskList = taskList.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTaskList(newTaskList);
    checkIfNeedNavigate(newTaskList);
  };

  const resetAllTasks = () => {
    const newTaskList = taskList.map((task) => ({ ...task, isCompleted: false }));
    setCurrentPage(1);
    setTaskList(newTaskList);
  }

  const forwardPage = () => setCurrentPage(currentPage + 1);
  const backwardPage = () => setCurrentPage(currentPage - 1);

  const checkIfNeedNavigate = (taskList: Task[]) => {
    const currentPageRange = getCurrentPageRange(
      currentPage,
      SIZE_OF_PAGE,
      taskList.length
    );
    const currentPageTasks = taskList.slice(
      currentPageRange.start,
      currentPageRange.end
    );
    if (isAllChecked(currentPageTasks)) {
      forwardPage();
    } else if (isAllUnChecked(currentPageTasks)) {
      backwardPage();
    }
  };

  const getTaskListForView = () => {
    const currentPageRange = getCurrentPageRange(
      currentPage,
      SIZE_OF_PAGE,
      taskList.length
    );

    return taskList.slice(currentPageRange.start, currentPageRange.end);
  };

  return (
    <div className="toDoWrapper">
      <Header
        completedTasks={getCompletedTasksCount(taskList)}
        totalTasks={taskList.length}
      />
      {isLoading && <Loader />}
      {!isLoading && (
        <div>
          {getTaskListForView().map((task) => (
            <TaskItem
              key={task.id}
              {...task}
              taskHandler={() => onChange(task.id)}
            />
          ))}
        </div>
      )}
      <ControlBar>
        <Button onClick={resetAllTasks} label="Reset" disabled={isLoading} />
        <Button onClick={backwardPage} label="Prev" disabled={isLoading} />
        <Button onClick={forwardPage} label="Next" disabled={isLoading} />
      </ControlBar>
    </div>
  );
}

export default App;

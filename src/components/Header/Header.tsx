import { ProgressBar } from "../ProgressBar/ProgressBar";
import "./Header.scss";
interface HeaderProps {
  totalTasks: number;
  completedTasks: number;
}

function Header({ totalTasks, completedTasks }: HeaderProps) {
  return (
    <div className="headerWrapper">
      <div className="title">
        <div className="main">Let’s set up your site</div>
        <div className="counter">
          {completedTasks} of {totalTasks} completed
        </div>
      </div>
      <ProgressBar completedTasks={completedTasks} totalTasks={totalTasks} />
    </div>
  );
}

export { Header };

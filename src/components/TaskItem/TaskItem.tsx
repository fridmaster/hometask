import "./TaskItem.scss";

interface TaskItemProps {
  id: number;
  label: string;
  taskHandler: () => void;
  isCompleted: boolean;
}

function TaskItem({ id, label, taskHandler, isCompleted }: TaskItemProps) {
  return (
    <div className="itemWrapper">
      <input
        id={id.toString()}
        type="checkbox"
        checked={isCompleted}
        onChange={taskHandler}
      />
      <label htmlFor={id.toString()}>{label}</label>
    </div>
  );
}

export { TaskItem };

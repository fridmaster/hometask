interface ProgressBarProps {
  completedTasks: number;
  totalTasks: number;
}

const gradientStyle = (completedPercentage: number) => ({
  background: `linear-gradient(90deg, #F0ABFC ${completedPercentage}%, #F7D5FE ${completedPercentage}%)`,
  width: "100%",
  height: "8px",
});

function ProgressBar({ totalTasks, completedTasks }: ProgressBarProps) {
  const completedPercentage = (completedTasks / totalTasks) * 100;
  return (
    <div
      title={`progress bar: ${completedPercentage}`}
      style={gradientStyle(completedPercentage)}
    />
  );
}

export { ProgressBar }

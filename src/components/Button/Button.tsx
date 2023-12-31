import "./Button.scss";

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled: boolean;
}

function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <button
      className="btn"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export { Button };

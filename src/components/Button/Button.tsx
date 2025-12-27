import "./Button.css";

export default function Button({
  label,
  onClick,
  double = false,
  triple = false,
  operation = false,
}: {
  label: string;
  onClick: (value: string) => void;
  double?: boolean;
  triple?: boolean;
  operation?: boolean;
}) {
  return (
    <button
      onClick={() => onClick(label)}
      className={`button
        ${double ? "double" : ""}
        ${triple ? "triple" : ""}
        ${operation ? "operation" : ""}
    `}
    >
      {label}
    </button>
  );
}

import "./Display.css";

export default function Display({ value }: { value: string }) {
  return <div className="display">{value}</div>;
}

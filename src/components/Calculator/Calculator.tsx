import { useState } from "react";
import Button from "../Button/Button";
import Display from "../Display/Display";
import "./Calculator.css";

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState<string>("");
  const [clearDisplay, setClearDisplay] = useState<boolean>(false);
  const [operation, setOperation] = useState<string | null>(null);
  const [values, setValues] = useState<Array<number>>([0, 0]);
  const [current, setCurrent] = useState<number>(0);

  const clearMemory = () => {
    setCurrent(0);
    setValues([0, 0]);
    setClearDisplay(false);
    setDisplayValue("0");
  };

  const addDigit = (value: string) => {
    if (value == "." && String(displayValue).includes(".")) return;

    const shouldClearDisplay = displayValue == "0" || clearDisplay;
    const currentValue = shouldClearDisplay ? "" : displayValue;
    const newDisplayValue = currentValue + value;
    setDisplayValue(newDisplayValue);
    setClearDisplay(false);

    if (value != ".") {
      const newValue = Number(newDisplayValue);
      const updatedValues = [...values];
      updatedValues[current] = newValue;
      setValues(updatedValues);
      console.log(updatedValues);
    }
  };

  const changeOperation = (value: string) => {
    if (current == 0) {
      setOperation(value);
      setCurrent(1);
      setClearDisplay(true);
      return;
    }

    const equals = value == "=";
    const currentOperation = operation;
    const newValues = values;
    try {
      newValues[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
    } catch (error) {
      newValues[0] = values[0];
    }
    newValues[1] = 0;

    setDisplayValue(String(newValues[0]));
    setValues(newValues);
    setOperation(equals ? null : value);
    setCurrent(0);
    setClearDisplay(!equals);
  };

  return (
    <div className="calcultor">
      <Display value={displayValue} />
      <Button onClick={clearMemory} label="AC" triple />
      <Button onClick={changeOperation} label="/" operation />
      <Button onClick={addDigit} label="7" />
      <Button onClick={addDigit} label="8" />
      <Button onClick={addDigit} label="9" />
      <Button onClick={addDigit} label="*" operation />
      <Button onClick={addDigit} label="4" />
      <Button onClick={addDigit} label="5" />
      <Button onClick={addDigit} label="6" />
      <Button onClick={changeOperation} label="-" operation />
      <Button onClick={addDigit} label="1" />
      <Button onClick={addDigit} label="2" />
      <Button onClick={addDigit} label="3" />
      <Button onClick={changeOperation} label="+" operation />
      <Button onClick={addDigit} label="0" double />
      <Button onClick={addDigit} label="." />
      <Button onClick={changeOperation} label="=" operation />
    </div>
  );
}

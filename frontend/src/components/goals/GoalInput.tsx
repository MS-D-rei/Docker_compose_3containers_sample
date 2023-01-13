import Card from "@/components/UI/Card";
import { ChangeEvent, FormEvent, useState } from "react";

interface GoalInputProps {
  onAddGoal: (text: string) => void;
}

export default function GoalInput({ onAddGoal }: GoalInputProps) {
  const [goalTextInput, setGoalTextInput] = useState("");

  const goalTextChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setGoalTextInput(event.target.value);
  };

  const goalSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (goalTextInput.trim().length === 0) {
      alert("Invalid text - at least one character required");
      return;
    }

    onAddGoal(goalTextInput);
    setGoalTextInput('');
  };

  return (
    <section id="goal-input">
      <Card>
        <form onSubmit={goalSubmitHandler}>
          <label htmlFor="text">New Goal</label>
          <input
            type="text"
            id="text"
            value={goalTextInput}
            onChange={goalTextChangeHandler}
          />
          <button>Add Goal</button>
        </form>
      </Card>
    </section>
  );
}

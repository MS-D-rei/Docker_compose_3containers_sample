import { Goal } from "@/types/goal"
import { useEffect, useState } from "react";
import CourseGoals from "./components/goals/CourseGoals";
import GoalInput from "./components/goals/GoalInput";
import ErrorAlert from "./components/UI/ErrorAlert";

export default function App() {
  const [loadedGoals, setLoadingGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost/goals');
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Fetching the goals failed');
        }
        setLoadingGoals(data.goals);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Fetching goals failed');
        }
      }
      setIsLoading(false);
    }
    fetchData();
  }, [])

  const addGoalHandler = async (goalText: string) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: goalText})
      })
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Adding the goal failed');
      }
      setLoadingGoals((prevGoals) => {
        const updatedGoals = [
          {id: data.goal.id, text: goalText}, ...prevGoals
        ];
        return updatedGoals;
      })
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Adding a goal failed');
      }
    }
    setIsLoading(false);
  }

  const deleteGoalHandler = async (goalId: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost/goals/${goalId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Deleting the goal failed');
      }
      setLoadingGoals((prevGoals) => {
        const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId)
        return updatedGoals;
      })
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Deleting the goal failed');
      } 
    }
    setIsLoading(false);
  }

  return (
    <div>
      {error && <ErrorAlert errorText={error} />}
      <GoalInput onAddGoal={addGoalHandler} />
      {!isLoading && (
        <CourseGoals goals={loadedGoals} onDeleteGoal={deleteGoalHandler} />
      )}
    </div>
  )
}
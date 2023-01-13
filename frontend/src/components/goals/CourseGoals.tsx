import Card from "@/components/UI/Card";
import { Goal } from "@/types/goal";
import GoalItem from "@/components/goals/GoalItem";

interface CourseGoalsProps {
  goals: Goal[];
  onDeleteGoal: (goalId: string) => void;
}

export default function CourseGoals({ goals, onDeleteGoal }: CourseGoalsProps) {
  const hasNoGoals = !goals || goals.length === 0;

  return (
    <section id="course-goals">
      <Card>
        <h2>Your Goals</h2>
        {hasNoGoals && <h2>No goals found. Start adding new one</h2>}
        <ul>
          {goals.map((goal) => (
            <GoalItem
              key={goal.id}
              id={goal.id}
              text={goal.text}
              onDelete={onDeleteGoal}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

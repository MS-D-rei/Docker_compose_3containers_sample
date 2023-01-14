import "@/components/goals/GoalItem.css";

interface GoalItemProps {
  id: string;
  text: string;
  onDelete: (goalId: string) => void;
}

export default function GoalItem({ id, text, onDelete }: GoalItemProps) {
  return (
    <li className="goal-item" onClick={onDelete.bind(null, id)}>
      {text}
    </li>
  );
}

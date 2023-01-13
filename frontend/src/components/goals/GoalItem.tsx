import "@/components/goals/GoalItem.css";

interface GoalItemProps {
  id: string;
  text: string;
  onDelete: (goalId: string) => void;
}

export default function GoalItem({ id, text, onDelete }: GoalItemProps) {
  const deleteHandler = () => {
    onDelete.bind(null, id);
  };

  return (
    <li className="goal-item" onClick={deleteHandler}>
      {text}
    </li>
  );
}

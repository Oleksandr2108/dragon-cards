import { useDraggable, useDroppable, useDndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Card from "./Card";

const DraggableCard = ({
  card,
  isSelected,
  onSelect,
}: {
  card: { id: number; color: string };
  isSelected: boolean;
  onSelect: (id: number) => void;
}) => {
  const { active, over } = useDndContext();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: card.id,
    });
  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
    id: card.id,
  });

  const isDropTarget = isOver && over?.id === card.id && active?.id !== card.id;

  const setCombinedNodeRef = (node: HTMLDivElement | null) => {
    setNodeRef(node);
    setDroppableNodeRef(node);
  };

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const cardStateClasses = [
    "transition-all duration-150",
    isSelected ? "scale-105" : "scale-100",
    isDropTarget ? "ring-4 ring-amber-400 ring-offset-2" : "ring-0",
    isDragging ? "z-10" : "z-0",
  ].join(" ");

  return (
    <div
      ref={setCombinedNodeRef}
      style={style}
      className={cardStateClasses}
      onClick={() => onSelect(card.id)}
      {...listeners}
      {...attributes}
    >
      <Card color={card.color} />
    </div>
  );
};

export default DraggableCard;

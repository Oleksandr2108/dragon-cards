"use client";

import { useState } from "react";
import { type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";

import type { Card } from "../types/Card";

interface UseDragAndDropReturn {
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
}

export const useDragAndDrop = (
  lowCards: Card[],
  moveCard: (from: number, to: number) => void,
): UseDragAndDropReturn => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setSelectedId(Number(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const oldIndex = lowCards.findIndex((card) => card.id === active.id);
    const newIndex = lowCards.findIndex((card) => card.id === over.id);
    if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return;
    moveCard(oldIndex, newIndex);
  };

  return {
    selectedId,
    setSelectedId,
    handleDragStart,
    handleDragEnd,
  };
};

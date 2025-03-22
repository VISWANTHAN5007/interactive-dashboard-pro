
declare module 'react-beautiful-dnd' {
  import * as React from 'react';

  export interface DragDropContextProps {
    onDragEnd: (result: DropResult) => void;
    children: React.ReactNode;
  }

  export interface DroppableProps {
    droppableId: string;
    children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => React.ReactNode;
  }

  export interface DraggableProps {
    draggableId: string;
    index: number;
    children: (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => React.ReactNode;
  }

  export interface DroppableProvided {
    innerRef: React.RefCallback<HTMLElement>;
    droppableProps: {
      'data-rbd-droppable-id': string;
      'data-rbd-droppable-context-id': string;
    };
    placeholder?: React.ReactNode;
  }

  export interface DraggableProvided {
    innerRef: React.RefCallback<HTMLElement>;
    draggableProps: {
      'data-rbd-draggable-context-id': string;
      'data-rbd-draggable-id': string;
    };
    dragHandleProps: {
      role: string;
      'data-rbd-drag-handle-draggable-id': string;
      'data-rbd-drag-handle-context-id': string;
      'aria-labelledby': string;
      tabIndex: number;
      draggable: boolean;
      onDragStart: (event: React.DragEvent<HTMLElement>) => void;
    } | null;
  }

  export interface DraggableStateSnapshot {
    isDragging: boolean;
    isDropAnimating: boolean;
    draggingOver: string | null;
    dropAnimation: {
      duration: number;
      curve: string;
      moveTo: {
        x: number;
        y: number;
      };
    } | null;
  }

  export interface DroppableStateSnapshot {
    isDraggingOver: boolean;
    draggingOverWith: string | null;
  }

  export interface DropResult {
    draggableId: string;
    type: string;
    source: {
      droppableId: string;
      index: number;
    };
    destination?: {
      droppableId: string;
      index: number;
    } | null;
    reason: 'DROP' | 'CANCEL';
  }

  export const DragDropContext: React.ComponentType<DragDropContextProps>;
  export const Droppable: React.ComponentType<DroppableProps>;
  export const Draggable: React.ComponentType<DraggableProps>;
}

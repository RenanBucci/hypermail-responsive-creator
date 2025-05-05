
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { useEmailBuilderStore } from "@/store/emailBuilderStore";
import { Trash2, Copy, Move } from "lucide-react";

interface DraggableComponentProps {
  id: string;
  type: string;
  children: React.ReactNode;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ id, type, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const { 
    selectedComponentId, 
    selectComponent, 
    removeComponent, 
    duplicateComponent 
  } = useEmailBuilderStore();
  
  const isSelected = selectedComponentId === id;
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectComponent(id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeComponent(id);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateComponent(id);
  };

  // Não permitir arrastar ou excluir header e footer
  const isFixed = type === 'header' || type === 'footer';

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleSelect}
      className={`relative group mb-2 ${
        isSelected ? "ring-2 ring-blue-500" : ""
      } ${isFixed ? '' : 'cursor-move'}`}
      {...(isFixed ? {} : { ...attributes, ...listeners })}
    >
      {!isDragging && (
        <div 
          className={`absolute top-0 left-0 w-full h-full flex items-center justify-center 
                     bg-blue-100 bg-opacity-0 group-hover:bg-opacity-10 transition-all 
                     ${isSelected ? 'border-2 border-blue-500' : ''}`}
        >
          {!isFixed && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Move className="h-6 w-6 text-blue-600" />
            </div>
          )}
        </div>
      )}

      {isSelected && (
        <div className="absolute top-2 right-2 flex gap-2 bg-white/80 p-1 rounded shadow z-10">
          {!isFixed && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDuplicate}
                className="h-8 w-8"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="h-8 w-8 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      )}
      
      <div className={`${isSelected ? "bg-blue-50" : "bg-white"} border rounded overflow-hidden`}>
        {children}
      </div>
    </div>
  );
};

export default DraggableComponent;

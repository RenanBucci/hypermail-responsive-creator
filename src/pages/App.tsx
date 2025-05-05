
import { useState } from "react";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEmailBuilderStore, ComponentType } from "@/store/emailBuilderStore";
import DraggableComponent from "@/components/DraggableComponent";
import ComponentRenderer from "@/components/ComponentRenderer";
import PropertyEditor from "@/components/PropertyEditor";
import EmailPreview from "@/components/EmailPreview";
import SavedEmailsPopover from "@/components/SavedEmailsPopover";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Component types que podem ser arrastados
const DRAG_COMPONENTS = [
  { id: "text", label: "Texto", icon: "📝" },
  { id: "image", label: "Imagem", icon: "🖼️" },
  { id: "button", label: "Botão", icon: "🔳" },
  { id: "divider", label: "Divisor", icon: "➖" },
  { id: "spacer", label: "Espaçador", icon: "↕️" },
  { id: "columns", label: "Colunas", icon: "▣" },
];

const AppPage = () => {
  const [userName] = useState("Usuário");
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const { 
    components,
    selectedComponentId,
    selectComponent,
    addComponent,
    reorderComponents,
    saveEmail,
    exportHTML
  } = useEmailBuilderStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (!over) return;
    
    // Se estiver arrastando do painel para o canvas
    if (typeof active.id === 'string' && DRAG_COMPONENTS.some(item => item.id === active.id)) {
      // Adicione um novo componente
      addComponent(active.id as ComponentType);
      toast.success(`Componente ${active.id} adicionado!`);
      return;
    }
    
    // Se estiver reordenando dentro do canvas
    if (active.id !== over.id) {
      reorderComponents(active.id as string, over.id as string);
    }
    
    setActiveId(null);
  }

  const handleComponentClick = (type: ComponentType) => {
    addComponent(type);
    toast.success(`Componente ${type} adicionado!`);
  };

  const handleSaveEmail = () => {
    saveEmail();
    toast.success("Email salvo com sucesso!");
  };

  const handleExportHTML = () => {
    const html = exportHTML();
    
    // Cria um blob e faz download do arquivo HTML
    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'email-template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast.success("HTML exportado com sucesso!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">HyperMail</h1>
          
          <div className="flex items-center gap-4">
            <Button onClick={handleSaveEmail} variant="outline" size="sm">
              Salvar
            </Button>
            <Button onClick={handleExportHTML} variant="outline" size="sm">
              Exportar HTML
            </Button>
            <div className="text-sm">Olá, {userName}</div>
            <SavedEmailsPopover />
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt={userName} />
              <AvatarFallback>{userName[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 flex overflow-hidden">
          {/* Left Column - Components Panel */}
          <div className="w-64 bg-white border-r overflow-y-auto">
            <div className="p-4">
              <h2 className="font-medium text-lg mb-4">Componentes</h2>
              <div className="grid grid-cols-2 gap-2">
                {DRAG_COMPONENTS.map((component) => (
                  <div 
                    key={component.id}
                    id={component.id}
                    className="flex flex-col items-center p-3 border rounded-md hover:bg-blue-50 cursor-pointer"
                    onClick={() => handleComponentClick(component.id as ComponentType)}
                  >
                    <div className="text-2xl mb-1">{component.icon}</div>
                    <div className="text-xs text-center">{component.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Canvas */}
          <div 
            className="flex-1 overflow-y-auto p-4 bg-gray-100" 
            onClick={() => selectComponent(null)}
          >
            <div className="bg-white min-h-[600px] max-w-[600px] mx-auto p-4 shadow-md rounded">
              <SortableContext
                items={components.map(c => c.id)}
                strategy={verticalListSortingStrategy}
              >
                {components.length > 0 ? (
                  <div className="canvas-area">
                    {components.map((component) => (
                      <DraggableComponent 
                        key={component.id} 
                        id={component.id} 
                        type={component.type}
                      >
                        <ComponentRenderer component={component} />
                      </DraggableComponent>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-full border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center text-gray-500">
                      <p className="mb-2">Arraste componentes aqui para começar</p>
                      <p className="text-sm">Clique em um componente para editar</p>
                    </div>
                  </div>
                )}
              </SortableContext>
            </div>
          </div>

          {/* Right Column - Preview/Properties */}
          <div className="w-80 bg-white border-l overflow-y-auto">
            {selectedComponentId ? <PropertyEditor /> : <EmailPreview />}
          </div>
        </div>
      </DndContext>
    </div>
  );
};

export default AppPage;

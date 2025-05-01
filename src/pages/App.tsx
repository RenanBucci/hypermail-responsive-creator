
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Componentes que serão arrastáveis
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
  const [isPreviewMobile, setIsPreviewMobile] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">HyperMail</h1>
          
          <div className="flex items-center gap-4">
            <div className="text-sm">Olá, {userName}</div>
            <Button size="sm" variant="outline">Salvar</Button>
            <Button size="sm">Exportar HTML</Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt={userName} />
              <AvatarFallback>{userName[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column - Components Panel */}
        <div className="w-64 bg-white border-r overflow-y-auto">
          <div className="p-4">
            <h2 className="font-medium text-lg mb-4">Componentes</h2>
            <div className="grid grid-cols-2 gap-2">
              {DRAG_COMPONENTS.map((component) => (
                <div 
                  key={component.id}
                  className="flex flex-col items-center p-3 border rounded-md hover:bg-blue-50 cursor-grab"
                >
                  <div className="text-2xl mb-1">{component.icon}</div>
                  <div className="text-xs text-center">{component.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Canvas */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div className="bg-white min-h-[600px] max-w-[600px] mx-auto p-4 shadow-md rounded">
            <div className="flex justify-center items-center h-full border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center text-gray-500">
                <p className="mb-2">Arraste componentes aqui para começar</p>
                <p className="text-sm">Clique em um componente para editar</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Preview/Properties */}
        <div className="w-80 bg-white border-l overflow-y-auto">
          {!selectedComponent ? (
            // Preview
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium text-lg">Preview</h2>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant={!isPreviewMobile ? "secondary" : "outline"}
                    onClick={() => setIsPreviewMobile(false)}
                  >
                    Desktop
                  </Button>
                  <Button 
                    size="sm"
                    variant={isPreviewMobile ? "secondary" : "outline"}
                    onClick={() => setIsPreviewMobile(true)}
                  >
                    Mobile
                  </Button>
                </div>
              </div>
              
              <div 
                className={`border rounded mx-auto transition-all ${
                  isPreviewMobile ? "w-[320px]" : "w-full"
                }`}
              >
                <div className="p-2 bg-gray-100 border-b text-center text-xs text-gray-500">
                  {isPreviewMobile ? "Mobile View (320px)" : "Desktop View"}
                </div>
                <div className="h-[500px] flex items-center justify-center text-gray-400 text-sm">
                  <p>Preview do email aparecerá aqui</p>
                </div>
              </div>
            </div>
          ) : (
            // Properties Panel
            <div className="p-4">
              <h2 className="font-medium text-lg mb-4">Propriedades</h2>
              <p className="text-sm text-gray-500">
                Selecione um componente no canvas para editar suas propriedades.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppPage;


import React, { useState } from "react";
import { useEmailBuilderStore } from "@/store/emailBuilderStore";
import ComponentRenderer from "./ComponentRenderer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Smartphone, Monitor } from "lucide-react";

const EmailPreview: React.FC = () => {
  const { 
    components, 
    isPreviewMobile, 
    togglePreviewMode, 
    emailTitle,
    setEmailTitle 
  } = useEmailBuilderStore();
  
  const [showRulers, setShowRulers] = useState(false);

  return (
    <div className="p-4">
      <div className="mb-4">
        <Label htmlFor="emailTitle">Título do Email</Label>
        <Input
          id="emailTitle"
          value={emailTitle}
          onChange={(e) => setEmailTitle(e.target.value)}
          placeholder="Digite o título do email"
          className="mb-4"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-lg">Preview</h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowRulers(!showRulers)}
            title={showRulers ? "Ocultar réguas" : "Mostrar réguas"}
          >
            {showRulers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button
            variant={!isPreviewMobile ? "default" : "outline"}
            size="sm"
            onClick={() => togglePreviewMode()}
          >
            <Monitor className="h-4 w-4 mr-1" /> Desktop
          </Button>
          <Button
            variant={isPreviewMobile ? "default" : "outline"}
            size="sm"
            onClick={() => togglePreviewMode()}
          >
            <Smartphone className="h-4 w-4 mr-1" /> Mobile
          </Button>
        </div>
      </div>

      <div
        className={`border rounded mx-auto transition-all bg-white overflow-auto ${
          isPreviewMobile ? "w-[320px]" : "w-full"
        }`}
      >
        <div className="p-2 bg-gray-100 border-b text-center text-xs text-gray-500">
          {isPreviewMobile ? "Mobile View (320px)" : "Desktop View"}
          <div className="text-center font-medium">{emailTitle}</div>
        </div>

        <div className={`max-h-[600px] overflow-auto relative`}>
          {showRulers && (
            <>
              <div className="absolute top-0 left-0 w-full z-10 pointer-events-none opacity-70">
                <div className="h-6 bg-gray-100 flex">
                  {Array.from({ length: isPreviewMobile ? 30 : 50 }).map((_, i) => (
                    <div key={i} className="flex-1 border-r text-[8px] text-gray-400 flex items-end justify-center">
                      {i * 10}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute top-0 left-0 h-full z-10 pointer-events-none opacity-70">
                <div className="w-6 bg-gray-100 h-full flex flex-col">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div key={i} className="h-6 border-b text-[8px] text-gray-400 flex items-center justify-end pr-1">
                      {i * 10}
                    </div>
                  ))}
                </div>
              </div>
              <div className="ml-6 mt-6">
                {components.length > 0 ? (
                  <div className="email-preview">
                    {components.map((component) => (
                      <div key={component.id} className="relative">
                        <div className="text-[8px] text-gray-500 absolute top-0 left-0 bg-blue-100 px-1">
                          {component.type}
                        </div>
                        <ComponentRenderer
                          component={component}
                          isPreview={true}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-gray-400 text-sm">
                    <p>Adicione componentes para visualizar o preview do email</p>
                  </div>
                )}
              </div>
            </>
          )}

          {!showRulers && (
            <>
              {components.length > 0 ? (
                <div className="email-preview">
                  {components.map((component) => (
                    <ComponentRenderer
                      key={component.id}
                      component={component}
                      isPreview={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-400 text-sm">
                  <p>Adicione componentes para visualizar o preview do email</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;

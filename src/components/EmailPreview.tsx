
import React from "react";
import { useEmailBuilderStore } from "@/store/emailBuilderStore";
import ComponentRenderer from "./ComponentRenderer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EmailPreview: React.FC = () => {
  const { 
    components, 
    isPreviewMobile, 
    togglePreviewMode, 
    emailTitle,
    setEmailTitle 
  } = useEmailBuilderStore();

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
            variant={!isPreviewMobile ? "default" : "outline"}
            size="sm"
            onClick={() => togglePreviewMode()}
          >
            Desktop
          </Button>
          <Button
            variant={isPreviewMobile ? "default" : "outline"}
            size="sm"
            onClick={() => togglePreviewMode()}
          >
            Mobile
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

        <div className={`max-h-[600px] overflow-auto`}>
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
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;


import React from "react";
import { useEmailBuilderStore } from "@/store/emailBuilderStore";
import ComponentRenderer from "./ComponentRenderer";

const EmailPreview: React.FC = () => {
  const { components, isPreviewMobile, togglePreviewMode, emailTitle } = useEmailBuilderStore();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-lg">Preview</h2>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 text-sm rounded ${
              !isPreviewMobile
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => togglePreviewMode()}
          >
            Desktop
          </button>
          <button
            className={`px-3 py-1 text-sm rounded ${
              isPreviewMobile
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => togglePreviewMode()}
          >
            Mobile
          </button>
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

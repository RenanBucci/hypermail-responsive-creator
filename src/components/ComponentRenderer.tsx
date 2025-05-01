
import React from "react";
import { EmailComponent } from "@/store/emailBuilderStore";
import { LOGO_URL } from "../App";
import { Instagram, Facebook } from "lucide-react";

interface ComponentRendererProps {
  component: EmailComponent;
  isPreview?: boolean;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  isPreview = false,
}) => {
  const { type, props } = component;

  switch (type) {
    case "header":
      return (
        <div 
          style={{
            backgroundColor: props.backgroundColor || "#ffffff",
            padding: props.padding || "20px",
            textAlign: props.alignment || "center" as any
          }}
        >
          <img
            src={props.logo || LOGO_URL}
            alt={props.companyName || "Company Logo"}
            className="mx-auto h-16 object-contain"
          />
          <h1 className="text-2xl font-bold mt-2 text-gray-800">
            {props.companyName || "qvaestvm"}
          </h1>
          <p className="text-gray-600">{props.tagline || "tecnologia e inovação"}</p>
        </div>
      );

    case "footer":
      return (
        <div
          style={{
            backgroundColor: props.backgroundColor || "#f5f5f5",
            color: props.textColor || "#555555",
            padding: props.padding || "20px"
          }}
          className="text-center"
        >
          <div className="flex justify-center space-x-4 mb-3">
            {(props.socialLinks || []).map((social: any, idx: number) => (
              <a 
                key={idx}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                {social.platform === "instagram" ? (
                  <Instagram className="h-5 w-5" />
                ) : social.platform === "facebook" ? (
                  <Facebook className="h-5 w-5" />
                ) : (
                  social.platform
                )}
              </a>
            ))}
          </div>
          <p className="text-sm">{props.companyAddress || "Seu endereço aqui"}</p>
          <p className="text-sm mt-1">
            {props.copyrightText || `© ${new Date().getFullYear()} qvaestvm. Todos os direitos reservados.`}
          </p>
        </div>
      );

    case "text":
      return (
        <div
          style={{
            backgroundColor: props.backgroundColor || "transparent",
            padding: props.padding || "20px",
            color: props.textColor || "#333333",
            fontSize: `${props.fontSize || 16}px`,
            textAlign: props.alignment || "left" as any
          }}
          dangerouslySetInnerHTML={{ __html: props.content || "Coloque seu texto aqui" }}
        />
      );

    case "image":
      return (
        <div
          style={{
            backgroundColor: props.backgroundColor || "transparent",
            padding: props.padding || "20px",
            textAlign: props.alignment || "center" as any
          }}
        >
          <img
            src={props.src || "https://via.placeholder.com/600x300"}
            alt={props.alt || "Image"}
            className="max-w-full h-auto mx-auto"
            style={{
              width: props.width ? `${props.width}%` : "100%"
            }}
          />
        </div>
      );

    case "button":
      return (
        <div
          style={{
            backgroundColor: props.backgroundColor || "transparent",
            padding: props.padding || "20px",
            textAlign: props.alignment || "center" as any
          }}
        >
          <a
            href={isPreview ? "#" : (props.url || "#")}
            style={{
              backgroundColor: props.buttonColor || "#4A6DA7",
              color: props.textColor || "#ffffff",
              borderRadius: `${props.borderRadius || 4}px`,
              display: "inline-block",
              padding: "12px 24px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            {props.text || "Clique aqui"}
          </a>
        </div>
      );

    case "divider":
      return (
        <div
          style={{
            backgroundColor: props.backgroundColor || "transparent",
            padding: props.padding || "10px 20px"
          }}
        >
          <hr
            style={{
              borderTop: `${props.thickness || "1px"} ${props.style || "solid"} ${
                props.color || "#dddddd"
              }`,
              margin: "0"
            }}
          />
        </div>
      );

    case "spacer":
      return (
        <div
          style={{
            backgroundColor: props.backgroundColor || "transparent",
            height: `${props.height || "20"}px`
          }}
        />
      );

    default:
      return <div>Componente não reconhecido</div>;
  }
};

export default ComponentRenderer;

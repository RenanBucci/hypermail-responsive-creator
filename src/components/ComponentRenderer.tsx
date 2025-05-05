
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

  // Função para gerar estilos comuns
  const generateCommonStyles = () => {
    let paddingValue = props.padding || "20px";
    
    // Se temos valores individuais de padding, usá-los
    if (props.paddingTop || props.paddingBottom || props.paddingLeft || props.paddingRight) {
      paddingValue = `${props.paddingTop || '20px'} ${props.paddingRight || '20px'} ${props.paddingBottom || '20px'} ${props.paddingLeft || '20px'}`;
    }
    
    let styles: React.CSSProperties = {
      backgroundColor: props.backgroundColor || "transparent",
      padding: paddingValue,
    };
    
    // Adicionar borda se habilitada
    if (props.hasBorder) {
      styles.border = `${props.borderWidth || '1px'} ${props.borderStyle || 'solid'} ${props.borderColor || '#cccccc'}`;
      styles.borderRadius = props.borderRadius || "0px";
    }
    
    // Adicionar sombra se habilitada
    if (props.hasShadow) {
      const intensity = props.shadowIntensity || 5;
      styles.boxShadow = `0 ${intensity / 2}px ${intensity}px ${props.shadowColor || 'rgba(0,0,0,0.2)'}`;
    }
    
    // Aplicar estilos personalizados inline
    if (props.customStyle) {
      try {
        // Converter string de estilo para objeto
        const customStyleString = props.customStyle.replace(/\s+/g, '');
        const customStylePairs = customStyleString.split(';').filter(Boolean);
        
        for (const pair of customStylePairs) {
          const [property, value] = pair.split(':');
          if (property && value) {
            // @ts-ignore - Propriedades dinâmicas
            styles[property.trim()] = value.trim();
          }
        }
      } catch (error) {
        console.error('Erro ao processar estilo personalizado:', error);
      }
    }
    
    return styles;
  };

  // Função para gerar classes CSS
  const generateClasses = () => {
    let classes = "";
    
    if (props.customClasses) {
      classes += ` ${props.customClasses}`;
    }
    
    return classes.trim();
  };

  switch (type) {
    case "header":
      return (
        <div 
          style={generateCommonStyles()}
          className={generateClasses()}
          id={props.customId || undefined}
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
            ...generateCommonStyles(),
            color: props.textColor || "#555555",
          }}
          className={`text-center ${generateClasses()}`}
          id={props.customId || undefined}
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
            ...generateCommonStyles(),
            color: props.textColor || "#333333",
            fontSize: `${props.fontSize || 16}px`,
            textAlign: props.alignment || "left" as any
          }}
          className={generateClasses()}
          id={props.customId || undefined}
          dangerouslySetInnerHTML={{ __html: props.content || "Coloque seu texto aqui" }}
        />
      );

    case "image":
      return (
        <div
          style={{
            ...generateCommonStyles(),
            textAlign: props.alignment || "center" as any
          }}
          className={generateClasses()}
          id={props.customId || undefined}
        >
          <img
            src={props.src || "https://via.placeholder.com/600x300"}
            alt={props.alt || "Image"}
            className="max-w-full h-auto mx-auto"
            style={{
              width: props.width ? `${props.width}%` : "100%",
              borderRadius: props.imageBorderRadius || undefined
            }}
          />
        </div>
      );

    case "button":
      return (
        <div
          style={{
            ...generateCommonStyles(),
            textAlign: props.alignment || "center" as any
          }}
          className={generateClasses()}
          id={props.customId || undefined}
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
            className={props.buttonCustomClass || ""}
          >
            {props.text || "Clique aqui"}
          </a>
        </div>
      );

    case "divider":
      return (
        <div
          style={generateCommonStyles()}
          className={generateClasses()}
          id={props.customId || undefined}
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
            ...generateCommonStyles(),
            height: `${props.height || "20"}px`,
            padding: "0"
          }}
          className={generateClasses()}
          id={props.customId || undefined}
        />
      );

    default:
      return <div>Componente não reconhecido</div>;
  }
};

export default ComponentRenderer;

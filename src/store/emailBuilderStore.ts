
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export type ComponentType = 
  | "text" 
  | "image" 
  | "button" 
  | "divider" 
  | "spacer" 
  | "columns"
  | "header"
  | "footer";

export interface ComponentProps {
  [key: string]: any;
}

export interface EmailComponent {
  id: string;
  type: ComponentType;
  props: ComponentProps;
  children?: EmailComponent[];
}

interface EmailBuilderState {
  components: EmailComponent[];
  selectedComponentId: string | null;
  emailTitle: string;
  isPreviewMobile: boolean;

  // Actions
  addComponent: (type: ComponentType, props?: ComponentProps) => void;
  removeComponent: (id: string) => void;
  selectComponent: (id: string | null) => void;
  updateComponentProps: (id: string, props: ComponentProps) => void;
  reorderComponents: (activeId: string, overId: string) => void;
  setEmailTitle: (title: string) => void;
  togglePreviewMode: () => void;
  saveEmail: () => void;
  loadEmail: (id: string) => void;
  exportHTML: () => string;
  duplicateComponent: (id: string) => void;
}

// Default components for new emails
const defaultHeader: EmailComponent = {
  id: uuidv4(),
  type: "header",
  props: {
    logo: "/lovable-uploads/e310737e-a3e5-4922-869d-209714dbc556.png",
    backgroundColor: "#ffffff",
    padding: "20px",
    alignment: "center",
    companyName: "qvaestvm",
    tagline: "tecnologia e inovação"
  }
};

const defaultFooter: EmailComponent = {
  id: uuidv4(),
  type: "footer",
  props: {
    backgroundColor: "#f5f5f5",
    textColor: "#555555",
    padding: "20px",
    socialLinks: [
      { platform: "instagram", url: "https://instagram.com/", icon: "instagram" },
      { platform: "facebook", url: "https://facebook.com/", icon: "facebook" }
    ],
    companyAddress: "Seu endereço aqui",
    copyrightText: `© ${new Date().getFullYear()} qvaestvm. Todos os direitos reservados.`
  }
};

// Create the store
export const useEmailBuilderStore = create<EmailBuilderState>((set, get) => ({
  components: [defaultHeader, defaultFooter],
  selectedComponentId: null,
  emailTitle: "Novo Email",
  isPreviewMobile: false,

  addComponent: (type, props = {}) => {
    const newComponent: EmailComponent = {
      id: uuidv4(),
      type,
      props,
    };

    set((state) => {
      // Insert component before footer if it exists
      const components = [...state.components];
      const footerIndex = components.findIndex(c => c.type === "footer");
      
      if (footerIndex !== -1) {
        components.splice(footerIndex, 0, newComponent);
        return { components };
      } else {
        return { components: [...components, newComponent] };
      }
    });
  },

  removeComponent: (id) => {
    set((state) => ({
      components: state.components.filter((c) => c.id !== id),
      selectedComponentId: state.selectedComponentId === id ? null : state.selectedComponentId,
    }));
  },

  selectComponent: (id) => {
    set({ selectedComponentId: id });
  },

  updateComponentProps: (id, props) => {
    set((state) => ({
      components: state.components.map((component) =>
        component.id === id
          ? { ...component, props: { ...component.props, ...props } }
          : component
      ),
    }));
  },

  reorderComponents: (activeId, overId) => {
    set((state) => {
      const components = [...state.components];
      const activeIndex = components.findIndex(c => c.id === activeId);
      const overIndex = components.findIndex(c => c.id === overId);
      
      if (activeIndex !== -1 && overIndex !== -1) {
        const [removed] = components.splice(activeIndex, 1);
        components.splice(overIndex, 0, removed);
      }
      
      return { components };
    });
  },

  setEmailTitle: (title) => {
    set({ emailTitle: title });
  },

  togglePreviewMode: () => {
    set((state) => ({ isPreviewMobile: !state.isPreviewMobile }));
  },

  saveEmail: () => {
    const state = get();
    const emailData = {
      title: state.emailTitle,
      components: state.components,
      createdAt: new Date().toISOString()
    };
    
    // Simple local storage save
    try {
      const savedEmails = JSON.parse(localStorage.getItem('savedEmails') || '[]');
      const emailId = uuidv4();
      savedEmails.push({id: emailId, ...emailData});
      localStorage.setItem('savedEmails', JSON.stringify(savedEmails));
      
      // Show a success message via console for now
      console.log('Email saved successfully');
    } catch (error) {
      console.error('Failed to save email:', error);
    }
  },

  loadEmail: (id) => {
    try {
      const savedEmails = JSON.parse(localStorage.getItem('savedEmails') || '[]');
      const email = savedEmails.find((e: any) => e.id === id);
      
      if (email) {
        set({
          emailTitle: email.title,
          components: email.components
        });
      }
    } catch (error) {
      console.error('Failed to load email:', error);
    }
  },

  exportHTML: () => {
    // Basic HTML template generation - in a real app we would use a more sophisticated HTML generator
    const { components } = get();
    
    let html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${get().emailTitle}</title>
  <style>
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
    table { border-collapse: collapse; width: 100%; }
    td { padding: 0; }
    img { border: 0; display: block; }
  </style>
</head>
<body>
  <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
    <tr>
      <td align="center" style="padding:0;">
        <table role="presentation" style="width:600px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
`;

    // Generate HTML for each component
    components.forEach(component => {
      switch (component.type) {
        case 'header':
          html += `
          <tr>
            <td style="padding:${component.props.padding};background-color:${component.props.backgroundColor};text-align:${component.props.alignment};">
              <img src="${component.props.logo}" alt="${component.props.companyName}" width="200" style="height:auto;display:block;margin:0 auto;">
              <h1 style="font-size:24px;margin:10px 0 0 0;color:#333333;">${component.props.companyName}</h1>
              <p style="margin:5px 0 0 0;color:#555555;font-size:16px;">${component.props.tagline}</p>
            </td>
          </tr>
          `;
          break;
        
        case 'text':
          html += `
          <tr>
            <td style="padding:${component.props.padding || '20px'};background-color:${component.props.backgroundColor || '#ffffff'};color:${component.props.textColor || '#333333'};font-size:${component.props.fontSize || '16px'}px;text-align:${component.props.alignment || 'left'};">
              ${component.props.content || 'Texto do email aqui'}
            </td>
          </tr>
          `;
          break;
          
        case 'image':
          html += `
          <tr>
            <td style="padding:${component.props.padding || '20px'};background-color:${component.props.backgroundColor || '#ffffff'};text-align:${component.props.alignment || 'center'};">
              <img src="${component.props.src || 'https://via.placeholder.com/600x300'}" alt="${component.props.alt || 'Image'}" width="${component.props.width || '100%'}" style="height:auto;display:block;margin:0 auto;">
            </td>
          </tr>
          `;
          break;
          
        case 'button':
          html += `
          <tr>
            <td style="padding:${component.props.padding || '20px'};background-color:${component.props.backgroundColor || '#ffffff'};text-align:${component.props.alignment || 'center'};">
              <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;margin:0 auto;">
                <tr>
                  <td style="border-radius:${component.props.borderRadius || '4px'};background-color:${component.props.buttonColor || '#4A6DA7'};text-align:center;padding:0 30px;">
                    <a href="${component.props.url || '#'}" style="color:${component.props.textColor || '#ffffff'};text-decoration:none;font-weight:bold;display:inline-block;padding:12px 0;font-size:16px;">${component.props.text || 'Clique aqui'}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          `;
          break;
          
        case 'divider':
          html += `
          <tr>
            <td style="padding:${component.props.padding || '10px 20px'};background-color:${component.props.backgroundColor || '#ffffff'};">
              <hr style="border:none;border-top:${component.props.thickness || '1px'} ${component.props.style || 'solid'} ${component.props.color || '#dddddd'};margin:0;">
            </td>
          </tr>
          `;
          break;
          
        case 'spacer':
          html += `
          <tr>
            <td style="padding:0;background-color:${component.props.backgroundColor || '#ffffff'};height:${component.props.height || '20'}px;"></td>
          </tr>
          `;
          break;
          
        case 'footer':
          let socialIcons = '';
          (component.props.socialLinks || []).forEach((social: any) => {
            socialIcons += `<a href="${social.url}" style="text-decoration:none;margin:0 10px;color:#4A6DA7;">${social.platform}</a>`;
          });
          
          html += `
          <tr>
            <td style="padding:${component.props.padding};background-color:${component.props.backgroundColor};color:${component.props.textColor};text-align:center;font-size:14px;">
              <div style="margin-bottom:10px;">${socialIcons}</div>
              <p style="margin:5px 0;">${component.props.companyAddress}</p>
              <p style="margin:5px 0;">${component.props.copyrightText}</p>
            </td>
          </tr>
          `;
          break;
      }
    });

    // Close the HTML
    html += `
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
    
    return html;
  },

  duplicateComponent: (id) => {
    set((state) => {
      const component = state.components.find(c => c.id === id);
      if (!component) return state;
      
      const duplicatedComponent = {
        ...component,
        id: uuidv4()
      };
      
      const components = [...state.components];
      const index = components.findIndex(c => c.id === id);
      components.splice(index + 1, 0, duplicatedComponent);
      
      return { components };
    });
  }
}));

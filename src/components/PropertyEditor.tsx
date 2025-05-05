
import React from "react";
import { useEmailBuilderStore, EmailComponent } from "@/store/emailBuilderStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Instagram, Facebook, Square, Bold, Italic, Underline } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const PropertyEditor: React.FC = () => {
  const { components, selectedComponentId, updateComponentProps } = useEmailBuilderStore();
  
  const selectedComponent = selectedComponentId
    ? components.find((c) => c.id === selectedComponentId)
    : null;

  if (!selectedComponent) {
    return (
      <div className="p-4">
        <p className="text-sm text-gray-500">
          Selecione um componente no canvas para editar suas propriedades.
        </p>
      </div>
    );
  }

  const updateProps = (props: any) => {
    updateComponentProps(selectedComponent.id, props);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">Propriedades</h2>
      
      <Tabs defaultValue="content">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="style">Estilo</TabsTrigger>
          <TabsTrigger value="advanced">Avançado</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-4">
          {renderContentEditor(selectedComponent, updateProps)}
        </TabsContent>
        
        <TabsContent value="style" className="space-y-4">
          {renderStyleEditor(selectedComponent, updateProps)}
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          {renderAdvancedEditor(selectedComponent, updateProps)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const renderContentEditor = (component: EmailComponent, updateProps: (props: any) => void) => {
  const { type, props } = component;

  switch (type) {
    case "header":
      return (
        <>
          <div className="space-y-2 mb-4">
            <Label>Logo URL</Label>
            <Input
              value={props.logo || ""}
              onChange={(e) => updateProps({ logo: e.target.value })}
              placeholder="URL da imagem do logo"
            />
          </div>
          <div className="space-y-2 mb-4">
            <Label>Nome da empresa</Label>
            <Input
              value={props.companyName || ""}
              onChange={(e) => updateProps({ companyName: e.target.value })}
              placeholder="Nome da empresa"
            />
          </div>
          <div className="space-y-2 mb-4">
            <Label>Slogan</Label>
            <Input
              value={props.tagline || ""}
              onChange={(e) => updateProps({ tagline: e.target.value })}
              placeholder="Slogan ou tagline"
            />
          </div>
        </>
      );

    case "footer":
      return (
        <>
          <div className="space-y-2 mb-4">
            <Label>Endereço da empresa</Label>
            <Input
              value={props.companyAddress || ""}
              onChange={(e) => updateProps({ companyAddress: e.target.value })}
              placeholder="Endereço da empresa"
            />
          </div>
          
          <div className="space-y-2 mb-4">
            <Label>Texto de copyright</Label>
            <Input
              value={props.copyrightText || ""}
              onChange={(e) => updateProps({ copyrightText: e.target.value })}
              placeholder={`© ${new Date().getFullYear()} Empresa. Todos os direitos reservados.`}
            />
          </div>
          
          <div className="space-y-2 mb-4">
            <Label className="block mb-2">Links sociais</Label>
            
            {(props.socialLinks || []).map((social: any, index: number) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded">
                  {social.platform === 'instagram' ? (
                    <Instagram className="h-5 w-5" />
                  ) : social.platform === 'facebook' ? (
                    <Facebook className="h-5 w-5" />
                  ) : (
                    social.platform
                  )}
                </div>
                <Input
                  value={social.url || ""}
                  onChange={(e) => {
                    const newLinks = [...(props.socialLinks || [])];
                    newLinks[index] = { ...social, url: e.target.value };
                    updateProps({ socialLinks: newLinks });
                  }}
                  placeholder="URL da rede social"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newLinks = (props.socialLinks || []).filter((_: any, i: number) => i !== index);
                    updateProps({ socialLinks: newLinks });
                  }}
                >
                  ×
                </Button>
              </div>
            ))}
            
            <div className="mt-2">
              <Button
                variant="outline"
                onClick={() => {
                  const newLinks = [...(props.socialLinks || []), { platform: 'instagram', url: 'https://instagram.com/', icon: 'instagram' }];
                  updateProps({ socialLinks: newLinks });
                }}
                className="mr-2"
              >
                Adicionar Instagram
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const newLinks = [...(props.socialLinks || []), { platform: 'facebook', url: 'https://facebook.com/', icon: 'facebook' }];
                  updateProps({ socialLinks: newLinks });
                }}
              >
                Adicionar Facebook
              </Button>
            </div>
          </div>
        </>
      );

    case "text":
      return (
        <>
          <div className="space-y-2 mb-4">
            <Label>Conteúdo</Label>
            <div className="mb-2 flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  const newContent = props.content || '';
                  updateProps({ content: `<strong>${newContent}</strong>` });
                }}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const newContent = props.content || '';
                  updateProps({ content: `<em>${newContent}</em>` });
                }}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const newContent = props.content || '';
                  updateProps({ content: `<u>${newContent}</u>` });
                }}
              >
                <Underline className="h-4 w-4" />
              </Button>
            </div>
            <textarea
              value={props.content || ""}
              onChange={(e) => updateProps({ content: e.target.value })}
              placeholder="Digite o texto aqui"
              className="w-full min-h-[150px] p-2 border rounded"
            />
          </div>
        </>
      );

    case "image":
      return (
        <>
          <div className="space-y-2 mb-4">
            <Label>URL da imagem</Label>
            <Input
              value={props.src || ""}
              onChange={(e) => updateProps({ src: e.target.value })}
              placeholder="https://exemplo.com/imagem.jpg"
            />
            {props.src && (
              <div className="mt-2 border p-2 rounded">
                <img 
                  src={props.src} 
                  alt={props.alt || "Preview"} 
                  className="max-w-full h-auto" 
                  style={{ maxHeight: "150px", objectFit: "contain" }}
                />
              </div>
            )}
          </div>
          <div className="space-y-2 mb-4">
            <Label>Texto alternativo</Label>
            <Input
              value={props.alt || ""}
              onChange={(e) => updateProps({ alt: e.target.value })}
              placeholder="Descrição da imagem"
            />
          </div>
        </>
      );

    case "button":
      return (
        <>
          <div className="space-y-2 mb-4">
            <Label>Texto do botão</Label>
            <Input
              value={props.text || ""}
              onChange={(e) => updateProps({ text: e.target.value })}
              placeholder="Clique aqui"
            />
          </div>
          <div className="space-y-2 mb-4">
            <Label>URL</Label>
            <Input
              value={props.url || ""}
              onChange={(e) => updateProps({ url: e.target.value })}
              placeholder="https://exemplo.com"
            />
          </div>
        </>
      );

    case "divider":
      return (
        <>
          <div className="space-y-2 mb-4">
            <Label>Estilo</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={props.style === "solid" ? "default" : "outline"}
                onClick={() => updateProps({ style: "solid" })}
                className="flex-1"
              >
                Sólido
              </Button>
              <Button
                type="button"
                variant={props.style === "dashed" ? "default" : "outline"}
                onClick={() => updateProps({ style: "dashed" })}
                className="flex-1"
              >
                Tracejado
              </Button>
              <Button
                type="button"
                variant={props.style === "dotted" ? "default" : "outline"}
                onClick={() => updateProps({ style: "dotted" })}
                className="flex-1"
              >
                Pontilhado
              </Button>
            </div>
          </div>
        </>
      );

    case "spacer":
      return (
        <>
          <div className="space-y-2 mb-4">
            <Label>Altura (px)</Label>
            <div className="flex items-center gap-2">
              <Slider
                value={[props.height || 20]}
                min={5}
                max={100}
                step={5}
                onValueChange={(values) => updateProps({ height: values[0] })}
                className="flex-1"
              />
              <span className="w-12 text-center">{props.height || 20}px</span>
            </div>
          </div>
        </>
      );

    default:
      return <p>Nenhuma propriedade disponível para este componente.</p>;
  }
};

const renderStyleEditor = (component: EmailComponent, updateProps: (props: any) => void) => {
  const { type, props } = component;

  // Compartilhados por todos os componentes
  return (
    <>
      <div className="space-y-2 mb-4">
        <Label>Cor de fundo</Label>
        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={props.backgroundColor || "#ffffff"}
            onChange={(e) => updateProps({ backgroundColor: e.target.value })}
            className="w-12 h-10 p-1"
          />
          <Input
            value={props.backgroundColor || "#ffffff"}
            onChange={(e) => updateProps({ backgroundColor: e.target.value })}
            placeholder="#ffffff"
          />
        </div>
      </div>

      {type !== "spacer" && (
        <div className="space-y-2 mb-4">
          <Label>Espaçamento (padding)</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Superior (px)</Label>
              <Input
                type="number"
                value={parseInt(props.paddingTop) || 20}
                onChange={(e) => updateProps({ paddingTop: parseInt(e.target.value) + "px" })}
                min={0}
                max={100}
              />
            </div>
            <div>
              <Label className="text-xs">Inferior (px)</Label>
              <Input
                type="number"
                value={parseInt(props.paddingBottom) || 20}
                onChange={(e) => updateProps({ paddingBottom: parseInt(e.target.value) + "px" })}
                min={0}
                max={100}
              />
            </div>
            <div>
              <Label className="text-xs">Esquerda (px)</Label>
              <Input
                type="number"
                value={parseInt(props.paddingLeft) || 20}
                onChange={(e) => updateProps({ paddingLeft: parseInt(e.target.value) + "px" })}
                min={0}
                max={100}
              />
            </div>
            <div>
              <Label className="text-xs">Direita (px)</Label>
              <Input
                type="number"
                value={parseInt(props.paddingRight) || 20}
                onChange={(e) => updateProps({ paddingRight: parseInt(e.target.value) + "px" })}
                min={0}
                max={100}
              />
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => {
              const padding = parseInt(props.paddingTop) || 20;
              updateProps({
                padding: `${padding}px`,
                paddingTop: `${padding}px`,
                paddingBottom: `${padding}px`,
                paddingLeft: `${padding}px`,
                paddingRight: `${padding}px`,
              });
            }}
          >
            Igualar todos
          </Button>
        </div>
      )}

      {type !== "divider" && type !== "spacer" && (
        <div className="space-y-2 mb-4">
          <Label>Borda</Label>
          <div className="flex items-center gap-2 mb-2">
            <Switch
              checked={props.hasBorder === true}
              onCheckedChange={(checked) => updateProps({ hasBorder: checked })}
            />
            <span className="text-sm">Mostrar borda</span>
          </div>
          
          {props.hasBorder && (
            <>
              <div className="flex items-center gap-2 mt-2">
                <Label className="text-xs w-20">Espessura</Label>
                <Slider
                  value={[parseInt(props.borderWidth) || 1]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(values) => updateProps({ borderWidth: values[0] + "px" })}
                  className="flex-1"
                />
                <span className="w-8 text-center">{parseInt(props.borderWidth) || 1}px</span>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <Label className="text-xs w-20">Cor</Label>
                <Input
                  type="color"
                  value={props.borderColor || "#cccccc"}
                  onChange={(e) => updateProps({ borderColor: e.target.value })}
                  className="w-10 h-8 p-1"
                />
                <Input
                  value={props.borderColor || "#cccccc"}
                  onChange={(e) => updateProps({ borderColor: e.target.value })}
                  placeholder="#cccccc"
                  className="flex-1"
                />
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <Label className="text-xs w-20">Estilo</Label>
                <Select 
                  value={props.borderStyle || "solid"}
                  onValueChange={(value) => updateProps({ borderStyle: value })}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solid">Sólido</SelectItem>
                    <SelectItem value="dashed">Tracejado</SelectItem>
                    <SelectItem value="dotted">Pontilhado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <Label className="text-xs w-20">Raio (px)</Label>
                <Slider
                  value={[parseInt(props.borderRadius) || 0]}
                  min={0}
                  max={20}
                  step={1}
                  onValueChange={(values) => updateProps({ borderRadius: values[0] + "px" })}
                  className="flex-1"
                />
                <span className="w-8 text-center">{parseInt(props.borderRadius) || 0}px</span>
              </div>
            </>
          )}
        </div>
      )}
      
      {(type === "text" || type === "button") && (
        <div className="space-y-2 mb-4">
          <Label>Cor do texto</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={props.textColor || "#333333"}
              onChange={(e) => updateProps({ textColor: e.target.value })}
              className="w-12 h-10 p-1"
            />
            <Input
              value={props.textColor || "#333333"}
              onChange={(e) => updateProps({ textColor: e.target.value })}
              placeholder="#333333"
            />
          </div>
        </div>
      )}

      {type === "button" && (
        <div className="space-y-2 mb-4">
          <Label>Cor do botão</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={props.buttonColor || "#4A6DA7"}
              onChange={(e) => updateProps({ buttonColor: e.target.value })}
              className="w-12 h-10 p-1"
            />
            <Input
              value={props.buttonColor || "#4A6DA7"}
              onChange={(e) => updateProps({ buttonColor: e.target.value })}
              placeholder="#4A6DA7"
            />
          </div>
        </div>
      )}

      {type === "text" && (
        <div className="space-y-2 mb-4">
          <Label>Tamanho da fonte (px)</Label>
          <div className="flex items-center gap-2">
            <Slider
              value={[props.fontSize || 16]}
              min={8}
              max={36}
              step={1}
              onValueChange={(values) => updateProps({ fontSize: values[0] })}
              className="flex-1"
            />
            <span className="w-8 text-center">{props.fontSize || 16}</span>
          </div>
        </div>
      )}

      {(type === "text" || type === "image" || type === "button") && (
        <div className="space-y-2 mb-4">
          <Label>Alinhamento</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={props.alignment === "left" ? "default" : "outline"}
              onClick={() => updateProps({ alignment: "left" })}
              className="flex-1"
            >
              Esquerda
            </Button>
            <Button
              type="button"
              variant={props.alignment === "center" ? "default" : "outline"}
              onClick={() => updateProps({ alignment: "center" })}
              className="flex-1"
            >
              Centro
            </Button>
            <Button
              type="button"
              variant={props.alignment === "right" ? "default" : "outline"}
              onClick={() => updateProps({ alignment: "right" })}
              className="flex-1"
            >
              Direita
            </Button>
          </div>
        </div>
      )}

      {type === "image" && (
        <div className="space-y-2 mb-4">
          <Label>Largura (%)</Label>
          <div className="flex items-center gap-2">
            <Slider
              value={[props.width || 100]}
              min={10}
              max={100}
              step={5}
              onValueChange={(values) => updateProps({ width: values[0] })}
              className="flex-1"
            />
            <span className="w-12 text-center">{props.width || 100}%</span>
          </div>
        </div>
      )}

      {type === "divider" && (
        <>
          <div className="space-y-2 mb-4">
            <Label>Cor</Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={props.color || "#dddddd"}
                onChange={(e) => updateProps({ color: e.target.value })}
                className="w-12 h-10 p-1"
              />
              <Input
                value={props.color || "#dddddd"}
                onChange={(e) => updateProps({ color: e.target.value })}
                placeholder="#dddddd"
              />
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <Label>Espessura (px)</Label>
            <div className="flex items-center gap-2">
              <Slider
                value={[parseInt(props.thickness) || 1]}
                min={1}
                max={10}
                step={1}
                onValueChange={(values) => updateProps({ thickness: values[0] + "px" })}
                className="flex-1"
              />
              <span className="w-8 text-center">{parseInt(props.thickness) || 1}</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const renderAdvancedEditor = (component: EmailComponent, updateProps: (props: any) => void) => {
  const { type, props } = component;

  // Configurações avançadas compartilhadas
  return (
    <>
      <div className="space-y-2 mb-4">
        <Label>Sombra</Label>
        <div className="flex items-center gap-2 mb-2">
          <Switch
            checked={props.hasShadow === true}
            onCheckedChange={(checked) => updateProps({ hasShadow: checked })}
          />
          <span className="text-sm">Aplicar sombra</span>
        </div>
        
        {props.hasShadow && (
          <>
            <div className="flex items-center gap-2 mt-2">
              <Label className="text-xs w-20">Intensidade</Label>
              <Slider
                value={[props.shadowIntensity || 5]}
                min={1}
                max={20}
                step={1}
                onValueChange={(values) => updateProps({ shadowIntensity: values[0] })}
                className="flex-1"
              />
              <span className="w-8 text-center">{props.shadowIntensity || 5}</span>
            </div>
            
            <div className="flex items-center gap-2 mt-2">
              <Label className="text-xs w-20">Cor</Label>
              <Input
                type="color"
                value={props.shadowColor || "#00000033"}
                onChange={(e) => updateProps({ shadowColor: e.target.value })}
                className="w-10 h-8 p-1"
              />
              <Input
                value={props.shadowColor || "#00000033"}
                onChange={(e) => updateProps({ shadowColor: e.target.value })}
                placeholder="#00000033"
                className="flex-1"
              />
            </div>
          </>
        )}
      </div>

      {type !== "spacer" && (
        <div className="space-y-2 mb-4">
          <Label>ID personalizado</Label>
          <Input
            value={props.customId || ""}
            onChange={(e) => updateProps({ customId: e.target.value })}
            placeholder="ex: meu-componente"
          />
          <p className="text-xs text-gray-500 mt-1">
            ID para referência em CSS ou JavaScript
          </p>
        </div>
      )}

      {type !== "spacer" && (
        <div className="space-y-2 mb-4">
          <Label>Classes CSS personalizadas</Label>
          <Input
            value={props.customClasses || ""}
            onChange={(e) => updateProps({ customClasses: e.target.value })}
            placeholder="ex: minha-classe outra-classe"
          />
          <p className="text-xs text-gray-500 mt-1">
            Classes CSS separadas por espaço
          </p>
        </div>
      )}

      <div className="space-y-2 mb-4">
        <Label>CSS inline personalizado</Label>
        <textarea
          value={props.customStyle || ""}
          onChange={(e) => updateProps({ customStyle: e.target.value })}
          placeholder="color: red; font-weight: bold;"
          className="w-full min-h-[100px] p-2 border rounded"
        />
        <p className="text-xs text-gray-500 mt-1">
          Estilos CSS inline no formato propriedade: valor;
        </p>
      </div>
    </>
  );
};

export default PropertyEditor;

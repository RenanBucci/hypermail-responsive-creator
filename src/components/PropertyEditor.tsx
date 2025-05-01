
import React from "react";
import { useEmailBuilderStore, EmailComponent } from "@/store/emailBuilderStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Instagram, Facebook } from "lucide-react";

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
      
      <div className="space-y-4">
        {renderEditorByType(selectedComponent, updateProps)}
      </div>
    </div>
  );
};

const renderEditorByType = (component: EmailComponent, updateProps: (props: any) => void) => {
  const { type, props } = component;

  const commonStyleProps = (
    <>
      <div className="space-y-2 mb-4">
        <Label>Padding</Label>
        <Input
          value={props.padding || "20px"}
          onChange={(e) => updateProps({ padding: e.target.value })}
          placeholder="ex: 20px ou 10px 20px"
        />
      </div>

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
    </>
  );

  switch (type) {
    case "header":
      return (
        <>
          {commonStyleProps}
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
        </>
      );

    case "footer":
      return (
        <>
          {commonStyleProps}
          <div className="space-y-2 mb-4">
            <Label>Cor do texto</Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={props.textColor || "#555555"}
                onChange={(e) => updateProps({ textColor: e.target.value })}
                className="w-12 h-10 p-1"
              />
              <Input
                value={props.textColor || "#555555"}
                onChange={(e) => updateProps({ textColor: e.target.value })}
                placeholder="#555555"
              />
            </div>
          </div>
          
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
          {commonStyleProps}
          <div className="space-y-2 mb-4">
            <Label>Conteúdo</Label>
            <textarea
              value={props.content || ""}
              onChange={(e) => updateProps({ content: e.target.value })}
              placeholder="Digite o texto aqui"
              className="w-full min-h-[100px] p-2 border rounded"
            />
          </div>
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
        </>
      );

    case "image":
      return (
        <>
          {commonStyleProps}
          <div className="space-y-2 mb-4">
            <Label>URL da imagem</Label>
            <Input
              value={props.src || ""}
              onChange={(e) => updateProps({ src: e.target.value })}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>
          <div className="space-y-2 mb-4">
            <Label>Texto alternativo</Label>
            <Input
              value={props.alt || ""}
              onChange={(e) => updateProps({ alt: e.target.value })}
              placeholder="Descrição da imagem"
            />
          </div>
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
        </>
      );

    case "button":
      return (
        <>
          {commonStyleProps}
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
          <div className="space-y-2 mb-4">
            <Label>Cor do texto</Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={props.textColor || "#ffffff"}
                onChange={(e) => updateProps({ textColor: e.target.value })}
                className="w-12 h-10 p-1"
              />
              <Input
                value={props.textColor || "#ffffff"}
                onChange={(e) => updateProps({ textColor: e.target.value })}
                placeholder="#ffffff"
              />
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <Label>Raio da borda (px)</Label>
            <div className="flex items-center gap-2">
              <Slider
                value={[props.borderRadius || 4]}
                min={0}
                max={20}
                step={1}
                onValueChange={(values) => updateProps({ borderRadius: values[0] })}
                className="flex-1"
              />
              <span className="w-8 text-center">{props.borderRadius || 4}</span>
            </div>
          </div>
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
        </>
      );

    case "divider":
      return (
        <>
          {commonStyleProps}
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
          {commonStyleProps}
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

export default PropertyEditor;

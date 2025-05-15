
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  ArrowRight, 
  LayoutTemplate, 
  FileText,
  Settings, 
  MousePointer, 
  MoveHorizontal,
  Pencil
} from "lucide-react";
import { APP_NAME, LOGO_URL } from "@/App";

const tutorialItems = [
  {
    id: "email-editor",
    title: "Editor de Email",
    icon: <LayoutTemplate className="h-5 w-5 mr-2" />,
    description: "Aprenda a criar emails HTML responsivos com nosso editor visual",
    steps: [
      {
        title: "Acesse o Editor",
        content: "Clique em 'Editor de Email' no menu de navegação principal.",
        image: "/placeholder.svg"
      },
      {
        title: "Arraste Componentes",
        content: "Selecione componentes do painel esquerdo e arraste-os para a área de edição.",
        image: "/placeholder.svg"
      },
      {
        title: "Personalize Elementos",
        content: "Clique em qualquer elemento para editar suas propriedades no painel direito.",
        image: "/placeholder.svg"
      },
      {
        title: "Visualize e Exporte",
        content: "Use o botão 'Visualizar' para ver como ficará seu email e 'Exportar' para obter o HTML.",
        image: "/placeholder.svg"
      }
    ]
  },
  {
    id: "proposal-creator",
    title: "Criador de Propostas",
    icon: <FileText className="h-5 w-5 mr-2" />,
    description: "Gere propostas comerciais profissionais com assistência de IA",
    steps: [
      {
        title: "Inicie uma Nova Proposta",
        content: "Acesse a seção 'Propostas' e clique em 'Nova Proposta'.",
        image: "/placeholder.svg"
      },
      {
        title: "Defina as Informações Básicas",
        content: "Preencha o nome da empresa cliente e o título da proposta.",
        image: "/placeholder.svg"
      },
      {
        title: "Converse com a IA",
        content: "Descreva o que precisa na proposta através do chat com nossa IA.",
        image: "/placeholder.svg"
      },
      {
        title: "Revise e Exporte",
        content: "Verifique a proposta gerada, faça ajustes conforme necessário e exporte o documento final.",
        image: "/placeholder.svg"
      }
    ]
  },
  {
    id: "settings",
    title: "Configurações",
    icon: <Settings className="h-5 w-5 mr-2" />,
    description: "Personalize a aplicação de acordo com suas preferências",
    steps: [
      {
        title: "Acesse Configurações",
        content: "Clique no ícone de engrenagem no menu superior ou acesse através do menu de usuário.",
        image: "/placeholder.svg"
      },
      {
        title: "Personalize Cores",
        content: "Na seção 'Aparência', use os controles RGB para ajustar as cores dos elementos de interface.",
        image: "/placeholder.svg"
      },
      {
        title: "Gerencie Permissões",
        content: "Como administrador, defina quais usuários têm acesso a quais funcionalidades.",
        image: "/placeholder.svg"
      },
      {
        title: "Configure sua Conta",
        content: "Atualize sua foto de perfil e informações pessoais na seção de perfil.",
        image: "/placeholder.svg"
      }
    ]
  }
];

const TutorialPage = () => {
  const [currentTool, setCurrentTool] = useState(tutorialItems[0].id);
  const [currentStep, setCurrentStep] = useState(0);
  
  const selectedTool = tutorialItems.find(item => item.id === currentTool);
  const maxSteps = selectedTool?.steps.length || 0;
  
  const nextStep = () => {
    if (currentStep < maxSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-10 text-center">
        <img src={LOGO_URL} alt={APP_NAME} className="h-16 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Bem-vindo ao {APP_NAME}</h1>
        <p className="text-muted-foreground max-w-2xl">
          Este tutorial irá ajudá-lo a entender como utilizar as principais ferramentas disponíveis na plataforma.
          Siga as instruções passo a passo para aproveitar ao máximo cada funcionalidade.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-lg border shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-4">Ferramentas</h2>
            <div className="space-y-2">
              {tutorialItems.map((tool) => (
                <Button
                  key={tool.id}
                  variant={currentTool === tool.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => {
                    setCurrentTool(tool.id);
                    setCurrentStep(0);
                  }}
                >
                  {tool.icon}
                  {tool.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-9">
          {selectedTool && (
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="p-6">
                <h2 className="text-2xl font-bold flex items-center">
                  {selectedTool.icon}
                  <span className="ml-2">{selectedTool.title}</span>
                </h2>
                <p className="text-muted-foreground mt-2 mb-6">{selectedTool.description}</p>
                
                {/* Tutorial step content */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">
                      Passo {currentStep + 1}: {selectedTool.steps[currentStep].title}
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      {currentStep + 1} de {maxSteps}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="order-2 lg:order-1">
                      <p className="text-muted-foreground mb-4">
                        {selectedTool.steps[currentStep].content}
                      </p>
                      <div className="mt-4 space-y-4">
                        <h4 className="font-medium">Dicas:</h4>
                        <div className="flex items-start space-x-3 bg-muted p-3 rounded-md">
                          <MousePointer className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm">
                              {currentTool === "email-editor" && "Clique em qualquer elemento para editá-lo."}
                              {currentTool === "proposal-creator" && "Seja específico ao descrever sua proposta para a IA."}
                              {currentTool === "settings" && "O tema escuro pode ser ativado no canto superior direito."}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 bg-muted p-3 rounded-md">
                          <MoveHorizontal className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm">
                              {currentTool === "email-editor" && "Arraste elementos para reordenar a estrutura do email."}
                              {currentTool === "proposal-creator" && "Navegue entre as seções para revisar toda a proposta."}
                              {currentTool === "settings" && "Deslize os controles RGB para ajustar as cores da interface."}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 bg-muted p-3 rounded-md">
                          <Pencil className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm">
                              {currentTool === "email-editor" && "Edite textos diretamente ou altere as propriedades no painel lateral."}
                              {currentTool === "proposal-creator" && "Você pode editar a proposta gerada a qualquer momento."}
                              {currentTool === "settings" && "Preencha suas informações de perfil para personalizar sua conta."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="order-1 lg:order-2">
                      <AspectRatio ratio={16/9} className="bg-muted rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center">
                          <img 
                            src={selectedTool.steps[currentStep].image} 
                            alt={selectedTool.steps[currentStep].title} 
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      </AspectRatio>
                    </div>
                  </div>
                  
                  {/* Navigation buttons */}
                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 0}
                    >
                      Anterior
                    </Button>
                    <Button
                      onClick={nextStep}
                      disabled={currentStep === maxSteps - 1}
                      className={currentStep === maxSteps - 1 ? "opacity-50" : ""}
                    >
                      Próximo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* FAQ Section */}
          <div className="mt-8 bg-card rounded-lg border shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4">Perguntas Frequentes</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="faq-1">
                <AccordionTrigger>Como salvar meu trabalho?</AccordionTrigger>
                <AccordionContent>
                  <p>Seus trabalhos são salvos automaticamente enquanto você edita. 
                  Para o editor de email e criador de propostas, você também encontrará um 
                  botão "Salvar" no canto superior direito para garantir que suas alterações sejam armazenadas.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>Posso exportar meu conteúdo?</AccordionTrigger>
                <AccordionContent>
                  <p>Sim! Para emails, você pode exportar como HTML ou visualizar como será exibido.
                  Para propostas, você pode exportar como PDF, enviar por email ou compartilhar um link.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>Como compartilhar meu trabalho com colegas?</AccordionTrigger>
                <AccordionContent>
                  <p>Vá até as configurações do documento e clique na opção "Compartilhar".
                  Você poderá adicionar colaboradores por email ou gerar um link de compartilhamento.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <Button size="lg" asChild>
          <a href="/app">
            Começar a usar o {APP_NAME}
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default TutorialPage;

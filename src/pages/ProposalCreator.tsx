
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FileText, MessageSquare, Send, Settings, Webhook } from "lucide-react";
import { debounce } from "@/utils/performance";
import { useProposalStore } from "@/store/proposalStore";
import ProposalPreview from "@/components/proposal/ProposalPreview";
import ChatMessage from "@/components/proposal/ChatMessage";

const ProposalCreator = () => {
  const [message, setMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookSettingsOpen, setWebhookSettingsOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { messages, addMessage, title, setTitle, company, setCompany } = useProposalStore();

  // Auto scroll para o final do chat quando chegam novas mensagens
  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error("Por favor, digite uma mensagem");
      return;
    }

    // Adiciona mensagem do usuário ao estado
    addMessage({
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: new Date().toISOString()
    });

    setIsGenerating(true);
    
    try {
      // Aqui seria a conexão com um serviço de IA real
      // Por enquanto, vamos simular uma resposta
      setTimeout(() => {
        addMessage({
          id: (Date.now() + 1).toString(),
          content: `Aqui está um rascunho de proposta para ${company || "sua empresa"} baseado no seu pedido: "${message}".\n\nEstruturei com uma introdução, escopo de trabalho, cronograma, preços e condições. Você pode ver a prévia no painel à direita.`,
          role: "assistant",
          timestamp: new Date().toISOString()
        });
        
        // Se a URL do webhook estiver definida, ativa-o
        if (webhookUrl) {
          triggerWebhook();
        }
        
        setIsGenerating(false);
        setMessage("");
      }, 1500);
    } catch (error) {
      console.error("Erro ao gerar proposta:", error);
      toast.error("Falha ao gerar proposta");
      setIsGenerating(false);
    }
  };

  const triggerWebhook = async () => {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors", // Lidar com problemas de CORS
        body: JSON.stringify({
          title: title,
          company: company,
          messageCount: messages.length,
          timestamp: new Date().toISOString()
        })
      });
      
      toast.success("Webhook acionado com sucesso");
    } catch (error) {
      console.error("Erro ao acionar webhook:", error);
      toast.error("Falha ao acionar webhook");
    }
  };

  const handleExportPDF = () => {
    // Em uma implementação real, isso geraria e baixaria o PDF
    toast.success("Exportando PDF...");
    toast.info("Esta funcionalidade geraria e baixaria o arquivo PDF real");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-white border-b shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" /> 
            <h1 className="text-2xl font-bold text-blue-600">Criador de Propostas</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setWebhookSettingsOpen(!webhookSettingsOpen)}
            >
              <Webhook className="h-4 w-4" />
              Webhook
            </Button>
            <Button onClick={handleExportPDF} className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> 
              Exportar PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Configurações de Webhook */}
      <Collapsible
        open={webhookSettingsOpen}
        onOpenChange={setWebhookSettingsOpen}
        className="container mx-auto mt-4 bg-white p-4 rounded-md shadow-sm"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-medium">Configurações de Webhook</h2>
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="webhook-url">URL do Webhook n8n</Label>
            <Input
              id="webhook-url"
              placeholder="https://seu-servidor-n8n.com/webhook/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Insira a URL do seu webhook n8n para acionar fluxos de trabalho quando as propostas forem geradas.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Conteúdo Principal */}
      <div className="flex-1 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-4 mt-4">
        {/* Painel de Chat */}
        <div className="flex flex-col bg-white rounded-lg shadow-sm h-[calc(100vh-200px)] overflow-hidden">
          <div className="p-4 border-b">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="proposal-title">Título da Proposta</Label>
                <Input
                  id="proposal-title"
                  placeholder="Proposta de Projeto para Cliente X"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company-name">Nome da Empresa</Label>
                <Input
                  id="company-name"
                  placeholder="Nome da Sua Empresa"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
                <p className="text-center">
                  Inicie uma conversa para gerar sua proposta.<br />
                  Descreva o que você precisa e nossa IA irá ajudá-lo a criá-la.
                </p>
              </div>
            ) : (
              messages.map(msg => (
                <ChatMessage key={msg.id} message={msg} />
              ))
            )}
            {isGenerating && (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="animate-pulse flex space-x-1">
                  <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                  <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                  <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                </div>
                <span>Gerando proposta...</span>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                placeholder="Descreva a proposta que você precisa..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 min-h-[80px] resize-none"
              />
              <Button 
                type="submit" 
                disabled={isGenerating || !message.trim()} 
                className="self-end"
              >
                {isGenerating ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </div>
        
        {/* Painel de Prévia */}
        <div className="bg-white rounded-lg shadow-sm h-[calc(100vh-200px)] overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Pré-visualização da Proposta
            </h2>
          </div>
          
          <div className="h-[calc(100%-56px)] overflow-y-auto">
            <ProposalPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalCreator;

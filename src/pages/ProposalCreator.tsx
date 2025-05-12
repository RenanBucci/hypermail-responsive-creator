import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FileText, MessageSquare, Send, Settings, Webhook } from "lucide-react"; // Changed FilePdf to FileText
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

  // Auto scroll to bottom of chat when new messages arrive
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
      toast.error("Please enter a message");
      return;
    }

    // Add user message to state
    addMessage({
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: new Date().toISOString()
    });

    setIsGenerating(true);
    
    try {
      // This is where you'd connect to an actual AI service
      // For now, we'll simulate a response
      setTimeout(() => {
        addMessage({
          id: (Date.now() + 1).toString(),
          content: `Here's a proposal draft for ${company || "your company"} based on your request: "${message}".\n\nI've structured it with an introduction, scope of work, timeline, pricing, and terms. You can see the preview on the right panel.`,
          role: "assistant",
          timestamp: new Date().toISOString()
        });
        
        // If webhook URL is set, trigger it
        if (webhookUrl) {
          triggerWebhook();
        }
        
        setIsGenerating(false);
        setMessage("");
      }, 1500);
    } catch (error) {
      console.error("Error generating proposal:", error);
      toast.error("Failed to generate proposal");
      setIsGenerating(false);
    }
  };

  const triggerWebhook = async () => {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors", // Handle CORS issues
        body: JSON.stringify({
          title: title,
          company: company,
          messageCount: messages.length,
          timestamp: new Date().toISOString()
        })
      });
      
      toast.success("Webhook triggered successfully");
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast.error("Failed to trigger webhook");
    }
  };

  const handleExportPDF = () => {
    // In a real implementation, this would generate and download the PDF
    toast.success("Exporting PDF...");
    toast.info("This functionality would generate and download the actual PDF file");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" /> 
            <h1 className="text-2xl font-bold text-blue-600">Proposal Creator</h1>
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
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Webhook Settings */}
      <Collapsible
        open={webhookSettingsOpen}
        onOpenChange={setWebhookSettingsOpen}
        className="container mx-auto mt-4 bg-white p-4 rounded-md shadow-sm"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-medium">Webhook Settings</h2>
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="webhook-url">n8n Webhook URL</Label>
            <Input
              id="webhook-url"
              placeholder="https://your-n8n-instance.com/webhook/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Enter your n8n webhook URL to trigger workflows when proposals are generated.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Main Content */}
      <div className="flex-1 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-4 mt-4">
        {/* Chat Panel */}
        <div className="flex flex-col bg-white rounded-lg shadow-sm h-[calc(100vh-200px)] overflow-hidden">
          <div className="p-4 border-b">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="proposal-title">Proposal Title</Label>
                <Input
                  id="proposal-title"
                  placeholder="Project Proposal for Client X"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  placeholder="Your Company Name"
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
                  Start a conversation to generate your proposal.<br />
                  Describe what you need and our AI will help you create it.
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
                <span>Generating proposal...</span>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                placeholder="Describe the proposal you need..."
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
        
        {/* Preview Panel */}
        <div className="bg-white rounded-lg shadow-sm h-[calc(100vh-200px)] overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Proposal Preview
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

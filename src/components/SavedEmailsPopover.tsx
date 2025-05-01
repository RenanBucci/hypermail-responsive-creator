
import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEmailBuilderStore } from "@/store/emailBuilderStore";
import { toast } from "sonner";

interface SavedEmail {
  id: string;
  title: string;
  createdAt: string;
}

const SavedEmailsPopover: React.FC = () => {
  const [savedEmails, setSavedEmails] = useState<SavedEmail[]>([]);
  const [open, setOpen] = useState(false);
  
  const { loadEmail, emailTitle, setEmailTitle, saveEmail, exportHTML } = useEmailBuilderStore();
  
  // Load saved emails from localStorage
  useEffect(() => {
    if (open) {
      try {
        const emailsFromStorage = JSON.parse(localStorage.getItem("savedEmails") || "[]");
        setSavedEmails(emailsFromStorage);
      } catch (error) {
        console.error("Failed to load saved emails:", error);
        setSavedEmails([]);
      }
    }
  }, [open]);
  
  const handleSave = () => {
    saveEmail();
    toast.success("Email salvo com sucesso!");
    setOpen(false);
  };
  
  const handleLoad = (id: string) => {
    loadEmail(id);
    setOpen(false);
    toast.success("Email carregado!");
  };
  
  const handleExport = () => {
    const html = exportHTML();
    
    // Create a blob and download link
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${emailTitle.replace(/\s+/g, "-")}.html`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("HTML exportado com sucesso!");
  };
  
  // Copy HTML to clipboard
  const handleCopyHTML = () => {
    const html = exportHTML();
    navigator.clipboard.writeText(html)
      .then(() => toast.success("HTML copiado para a área de transferência!"))
      .catch(() => toast.error("Erro ao copiar HTML"));
  };

  return (
    <div className="flex items-center gap-3">
      <Input
        value={emailTitle}
        onChange={(e) => setEmailTitle(e.target.value)}
        placeholder="Nome do email"
        className="w-48"
      />
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">Salvar / Carregar</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Salvar Email</h3>
              <p className="text-sm text-gray-500">
                Salve seu email atual para editar mais tarde.
              </p>
              <Button 
                onClick={handleSave} 
                className="w-full mt-2"
              >
                Salvar Email Atual
              </Button>
            </div>
            
            <div>
              <h3 className="font-medium">Emails Salvos</h3>
              {savedEmails.length > 0 ? (
                <div className="max-h-60 overflow-auto mt-2">
                  {savedEmails.map((email) => (
                    <div
                      key={email.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    >
                      <div>
                        <p className="font-medium">{email.title}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(email.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLoad(email.id)}
                      >
                        Carregar
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-2">
                  Nenhum email salvo ainda.
                </p>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button>Exportar</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Exportar Email</h3>
              <p className="text-sm text-gray-500">
                Baixe ou copie o HTML do seu email.
              </p>
              <div className="flex gap-2 mt-2">
                <Button 
                  onClick={handleExport}
                  className="flex-1"
                >
                  Baixar HTML
                </Button>
                <Button 
                  onClick={handleCopyHTML}
                  variant="secondary"
                  className="flex-1"
                >
                  Copiar HTML
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SavedEmailsPopover;

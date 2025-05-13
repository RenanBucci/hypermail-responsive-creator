
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowLeft, Moon, Sun, Palette, Users, Shield, Bell, FileText, Mail, Globe, HelpCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useThemeStore } from "@/store/themeStore";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useUserPermissionStore } from "@/store/userPermissionStore";

const Settings = () => {
  const { toast } = useToast();
  const { theme, setTheme, primaryColor, setPrimaryColor } = useThemeStore();
  const { emailAccess, proposalAccess, setEmailAccess, setProposalAccess } = useUserPermissionStore();
  const [notifications, setNotifications] = useState(true);

  const colorOptions = [
    { name: "Azul", value: "blue", className: "bg-blue-500" },
    { name: "Verde", value: "green", className: "bg-green-500" },
    { name: "Roxo", value: "purple", className: "bg-purple-500" },
    { name: "Laranja", value: "orange", className: "bg-orange-500" },
    { name: "Rosa", value: "pink", className: "bg-pink-500" },
    { name: "Vermelho", value: "red", className: "bg-red-500" },
  ];

  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    toast({
      title: `Modo ${theme === "light" ? "noturno" : "claro"} ativado`,
      description: "O tema foi alterado com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Configurações</h1>
        </div>

        <Tabs defaultValue="aparencia">
          <TabsList className="mb-6 grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="aparencia" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden md:inline">Aparência</span>
            </TabsTrigger>
            <TabsTrigger value="acesso" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Acesso</span>
            </TabsTrigger>
            <TabsTrigger value="seguranca" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden md:inline">Segurança</span>
            </TabsTrigger>
            <TabsTrigger value="notificacoes" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Notificações</span>
            </TabsTrigger>
            <TabsTrigger value="ajuda" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden md:inline">Ajuda</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="aparencia" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalização Visual</CardTitle>
                <CardDescription>
                  Ajuste a aparência do sistema de acordo com suas preferências.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Modo Noturno</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Alterne entre tema claro e escuro
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className="h-5 w-5" />
                      <Switch 
                        checked={theme === "dark"}
                        onCheckedChange={toggleTheme} 
                      />
                      <Moon className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Cor Principal</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Escolha a cor predominante do sistema
                    </p>
                    
                    <RadioGroup 
                      value={primaryColor} 
                      onValueChange={setPrimaryColor}
                      className="grid grid-cols-3 md:grid-cols-6 gap-4 pt-2"
                    >
                      {colorOptions.map((color) => (
                        <div key={color.value} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={color.value}
                            id={color.value}
                            className="sr-only"
                          />
                          <Label
                            htmlFor={color.value}
                            className={`w-12 h-12 rounded-full cursor-pointer flex items-center justify-center border-2 transition-all ${
                              primaryColor === color.value
                                ? "border-black dark:border-white scale-110"
                                : "border-transparent hover:scale-105"
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-full ${color.className}`}></div>
                          </Label>
                          <span className="text-sm">{color.name}</span>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="acesso" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Permissões de Acesso</CardTitle>
                <CardDescription>
                  Configure quais usuários podem acessar cada funcionalidade do sistema.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-blue-500" />
                        <h3 className="text-base font-medium">Construtor de Emails</h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Permissões para uso do construtor de emails HTML
                      </p>
                    </div>
                    <div>
                      <RadioGroup 
                        value={emailAccess} 
                        onValueChange={setEmailAccess}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="email-all" />
                          <Label htmlFor="email-all">Todos</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="marketing" id="email-marketing" />
                          <Label htmlFor="email-marketing">Marketing</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="admin" id="email-admin" />
                          <Label htmlFor="email-admin">Admins</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <h3 className="text-base font-medium">Gerador de Propostas</h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Permissões para uso do gerador de propostas
                      </p>
                    </div>
                    <div>
                      <RadioGroup 
                        value={proposalAccess} 
                        onValueChange={setProposalAccess}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="proposal-all" />
                          <Label htmlFor="proposal-all">Todos</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sales" id="proposal-sales" />
                          <Label htmlFor="proposal-sales">Vendas</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="admin" id="proposal-admin" />
                          <Label htmlFor="proposal-admin">Admins</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seguranca" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>
                  Gerencie as configurações de segurança da sua conta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="text-base font-medium">Autenticação de dois fatores</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Adicione uma camada extra de segurança à sua conta
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="text-base font-medium">Registros de atividades</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Monitore acessos e atividades na sua conta
                    </p>
                  </div>
                  <Switch id="activity-logs" defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="text-base font-medium">Configurações de webhook</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Configure integrações automatizadas com outros sistemas
                    </p>
                  </div>
                  <Switch id="webhooks" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notificacoes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificações</CardTitle>
                <CardDescription>
                  Gerencie como e quando você recebe notificações do sistema.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="text-base font-medium">Notificações por email</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receba alertas por email quando houver atividades importantes
                    </p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={notifications} 
                    onCheckedChange={setNotifications} 
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="text-base font-medium">Notificações no navegador</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receba alertas no navegador quando estiver usando o sistema
                    </p>
                  </div>
                  <Switch id="browser-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="text-base font-medium">Resumo semanal</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receba um resumo semanal das atividades do sistema
                    </p>
                  </div>
                  <Switch id="weekly-digest" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ajuda" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ajuda e Tutoriais</CardTitle>
                <CardDescription>
                  Recursos para te ajudar a usar o sistema da melhor forma.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="hover-lift">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Mail className="h-5 w-5 text-blue-500" />
                        Construtor de Email
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">
                        Aprenda a criar emails HTML responsivos e profissionais para suas campanhas.
                      </p>
                      <ul className="text-sm space-y-2 list-disc pl-5">
                        <li>Crie templates personalizados</li>
                        <li>Adicione elementos arrastando e soltando</li>
                        <li>Visualize em diferentes dispositivos</li>
                        <li>Exporte código HTML pronto para usar</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="hover-lift">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        Gerador de Propostas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">
                        Aprenda a criar propostas comerciais profissionais em poucos minutos.
                      </p>
                      <ul className="text-sm space-y-2 list-disc pl-5">
                        <li>Crie propostas a partir de modelos</li>
                        <li>Personalize com dados do cliente</li>
                        <li>Adicione tabelas de preços e serviços</li>
                        <li>Exporte em PDF de alta qualidade</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="hover-lift">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-500" />
                        Gerenciamento de Acesso
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">
                        Aprenda a configurar permissões para diferentes equipes e usuários.
                      </p>
                      <ul className="text-sm space-y-2 list-disc pl-5">
                        <li>Configure níveis de acesso por departamento</li>
                        <li>Atribua permissões específicas por ferramenta</li>
                        <li>Monitore a atividade dos usuários</li>
                        <li>Revogue acessos quando necessário</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="hover-lift">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Globe className="h-5 w-5 text-blue-500" />
                        Integrações
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">
                        Aprenda a conectar o sistema com outras ferramentas da empresa.
                      </p>
                      <ul className="text-sm space-y-2 list-disc pl-5">
                        <li>Configure webhooks para eventos específicos</li>
                        <li>Integre com CRMs e ferramentas de marketing</li>
                        <li>Automatize fluxos de trabalho entre sistemas</li>
                        <li>Exporte e importe dados facilmente</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave}>Salvar Configurações</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

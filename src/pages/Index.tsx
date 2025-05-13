
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { APP_NAME, LOGO_URL } from "../App";
import { FileText, LayoutTemplate, ArrowRight, Shield, Settings, CircleCheck, User, Book, CircleUser, Camera } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Index = () => {
  const { theme } = useThemeStore();
  const [userName, setUserName] = useState("Admin");
  const [profileImage, setProfileImage] = useState("");
  
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors flex flex-col">
      <header className="bg-white shadow-sm p-4 dark:bg-gray-800 dark:border-b dark:border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt={APP_NAME} className="h-8 w-auto" />
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{APP_NAME}</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-8 px-4">
        {/* Cabeçalho de boas-vindas */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-600'} text-white rounded-lg p-6 mb-8 shadow-md`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Bem-vindo ao sistema interno</h2>
              <p className="text-blue-100">
                Utilize nossas ferramentas para criar emails HTML e propostas profissionais.
              </p>
            </div>
          </div>
        </motion.div>

        {/* User Profile Board */}
        <motion.div variants={itemAnimation} initial="hidden" animate="show" className="mb-8">
          <Card className="bg-white hover:shadow-lg transition-all dark:bg-gray-800 dark:border-gray-700 group hover:-translate-y-1 duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                Perfil do Usuário
              </CardTitle>
              <CardDescription>Gerencie suas informações pessoais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                <div className="relative group">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileImage} />
                    <AvatarFallback className="text-2xl">{userName ? userName[0] : "U"}</AvatarFallback>
                  </Avatar>
                  <label 
                    htmlFor="profile-image" 
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                  >
                    <Camera className="h-6 w-6 text-white" />
                    <input 
                      id="profile-image" 
                      type="file" 
                      className="sr-only" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <Label htmlFor="username">Nome de Usuário</Label>
                    <Input 
                      id="username" 
                      value={userName} 
                      onChange={(e) => setUserName(e.target.value)} 
                      className="max-w-xs"
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Administrador do Sistema
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Atalhos rápidos */}
        <motion.div 
          variants={containerAnimation}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <motion.div variants={itemAnimation}>
            <Card className="bg-white hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden group">
              <CardHeader className="pb-2 bg-gray-50 dark:bg-gray-800/80">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Shield className="h-5 w-5 text-blue-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ferramentas de acesso rápido</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  Acesso rápido
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Acesse seus aplicativos mais usados diretamente
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" asChild className="justify-start hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300">
                          <Link to="/app" className="flex items-center gap-2">
                            <LayoutTemplate className="h-4 w-4" />
                            Email
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Construa emails HTML responsivos</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" asChild className="justify-start hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300">
                          <Link to="/proposal" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Propostas
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Gere propostas profissionais</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" asChild className="justify-start hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300">
                          <Link to="/settings" className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            Configurações
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Personalize sua experiência</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" asChild className="justify-start hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300">
                          <Link to="/settings?tab=tutorial" className="flex items-center gap-2">
                            <Book className="h-4 w-4" />
                            Tutoriais
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Aprenda a usar o sistema</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemAnimation}>
            <Card className="bg-white hover:shadow-lg transition-all dark:bg-gray-800 dark:border-gray-700 group hover:-translate-y-1 duration-300 h-full">
              <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <LayoutTemplate className="h-5 w-5 text-blue-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Crie templates de email profissionais</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  Editor de Email
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Crie emails HTML responsivos e profissionais com nosso editor visual
                </p>
                <Button asChild className="w-full mt-auto group-hover:bg-blue-600">
                  <Link to="/app" className="flex items-center gap-2">
                    Acessar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemAnimation}>
            <Card className="bg-white hover:shadow-lg transition-all dark:bg-gray-800 dark:border-gray-700 group hover:-translate-y-1 duration-300 h-full">
              <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <FileText className="h-5 w-5 text-blue-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Crie propostas em PDF facilmente</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  Criador de Propostas
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Crie propostas profissionais em PDF com a ajuda da nossa IA
                </p>
                <Button asChild className="w-full mt-auto group-hover:bg-blue-600">
                  <Link to="/proposal" className="flex items-center gap-2">
                    Acessar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* Estatísticas e status */}
        <motion.div 
          variants={containerAnimation}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div variants={itemAnimation}>
            <TooltipProvider>
              <Card className="bg-white hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-1 duration-300">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-500" />
                        Atividade Recente
                      </CardTitle>
                      <CardDescription>Suas últimas ações no sistema</CardDescription>
                    </CardHeader>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Histórico de atividades realizadas no sistema</p>
                  </TooltipContent>
                </Tooltip>
                <CardContent>
                  <ul className="space-y-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <li className="p-3 border-b dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded">
                                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="font-medium">Proposta criada</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Hoje, 10:30</p>
                              </div>
                            </div>
                          </li>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Proposta para cliente XYZ criada e armazenada</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <li className="p-3 border-b dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded">
                                <LayoutTemplate className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="font-medium">Email enviado</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Ontem, 15:45</p>
                              </div>
                            </div>
                          </li>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Email de marketing enviado para 150 destinatários</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <li className="p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded">
                                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="font-medium">Proposta exportada</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Ontem, 09:15</p>
                              </div>
                            </div>
                          </li>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Proposta comercial exportada em formato PDF</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full hover:bg-blue-50 dark:hover:bg-blue-900/20">Ver todas as atividades</Button>
                </CardFooter>
              </Card>
            </TooltipProvider>
          </motion.div>
          
          <motion.div variants={itemAnimation}>
            <TooltipProvider>
              <Card className="bg-white hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-1 duration-300">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-blue-500" />
                        Sistema
                      </CardTitle>
                      <CardDescription>Status e informações</CardDescription>
                    </CardHeader>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Informações sobre o estado atual do sistema</p>
                  </TooltipContent>
                </Tooltip>
                <CardContent>
                  <div className="space-y-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                            <span>Versão do sistema</span>
                            <span className="font-medium">2.1.0</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Versão atual do software com todas as funcionalidades</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                            <span>API</span>
                            <span className="font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
                              <CircleCheck className="h-4 w-4" /> Online
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>A API está funcionando normalmente</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                            <span>Último backup</span>
                            <span className="font-medium">Hoje às 03:00</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Momento em que foi realizado o último backup do sistema</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                            <span>Usuários ativos</span>
                            <span className="font-medium flex items-center gap-1">
                              <CircleUser className="h-4 w-4 text-blue-500" /> 23
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Número de usuários conectados ao sistema neste momento</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full hover:bg-blue-50 dark:hover:bg-blue-900/20">Status do sistema</Button>
                </CardFooter>
              </Card>
            </TooltipProvider>
          </motion.div>
        </motion.div>
      </main>
      
      <footer className="bg-white p-6 border-t dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto flex justify-center">
          <img src={LOGO_URL} alt={APP_NAME} className="h-6 w-auto" />
        </div>
      </footer>
    </div>
  );
};

export default Index;

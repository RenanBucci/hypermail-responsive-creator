
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { APP_NAME, LOGO_URL } from "../App";
import { FileText, LayoutTemplate, ArrowRight, Shield, Settings, CircleCheck, CircleX, CircleInfo, User, Book, CircleUser } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";

const Index = () => {
  const { theme } = useThemeStore();

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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors flex flex-col">
      <header className="bg-white shadow-sm p-4 dark:bg-gray-800 dark:border-b dark:border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt={APP_NAME} className="h-8 w-auto" />
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{APP_NAME}</h1>
          </div>
          <div className="space-x-4">
            <Button variant="outline" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Registrar</Link>
            </Button>
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
            <div className="hidden md:block">
              <img 
                src={LOGO_URL} 
                alt={APP_NAME} 
                className="h-16 w-auto opacity-60" 
              />
            </div>
          </div>
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
                  <Shield className="h-5 w-5 text-blue-500" />
                  Acesso rápido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Acesse seus aplicativos mais usados diretamente
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" asChild className="justify-start hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300">
                    <Link to="/app" className="flex items-center gap-2">
                      <LayoutTemplate className="h-4 w-4" />
                      Email
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="justify-start hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300">
                    <Link to="/proposal" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Propostas
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="justify-start hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300">
                    <Link to="/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Configurações
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="justify-start hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300">
                    <Link to="/settings?tab=ajuda" className="flex items-center gap-2">
                      <Book className="h-4 w-4" />
                      Tutoriais
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemAnimation}>
            <Card className="bg-white hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700 group hover:-translate-y-1 duration-300">
              <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40">
                <CardTitle className="text-lg flex items-center gap-2">
                  <LayoutTemplate className="h-5 w-5 text-blue-500" />
                  Construtor de Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Crie emails HTML responsivos e profissionais com nosso editor visual
                </p>
                <Button asChild className="w-full group-hover:bg-blue-600">
                  <Link to="/app" className="flex items-center gap-2">
                    Acessar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemAnimation}>
            <Card className="bg-white hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700 group hover:-translate-y-1 duration-300">
              <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Gerador de Propostas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Crie propostas profissionais em PDF com a ajuda da nossa IA
                </p>
                <Button asChild className="w-full group-hover:bg-blue-600">
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
            <Card className="bg-white hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Suas últimas ações no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="p-2 border-b dark:border-gray-700">
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
                  <li className="p-2 border-b dark:border-gray-700">
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
                  <li className="p-2">
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
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">Ver todas as atividades</Button>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div variants={itemAnimation}>
            <Card className="bg-white hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Sistema</CardTitle>
                <CardDescription>Status e informações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/30 rounded">
                    <span>Versão do sistema</span>
                    <span className="font-medium">2.1.0</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/30 rounded">
                    <span>API</span>
                    <span className="font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
                      <CircleCheck className="h-4 w-4" /> Online
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/30 rounded">
                    <span>Último backup</span>
                    <span className="font-medium">Hoje às 03:00</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/30 rounded">
                    <span>Usuários ativos</span>
                    <span className="font-medium flex items-center gap-1">
                      <CircleUser className="h-4 w-4 text-blue-500" /> 23
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">Status do sistema</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </main>
      
      <footer className="bg-white p-6 border-t dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img src={LOGO_URL} alt={APP_NAME} className="h-6 w-auto" />
              <h3 className="font-bold text-blue-600 dark:text-blue-400">{APP_NAME}</h3>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>&copy; {new Date().getFullYear()} {APP_NAME} - Sistema Interno v2.1.0</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

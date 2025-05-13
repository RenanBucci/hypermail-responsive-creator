
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LOGO_URL } from "../App";
import { FileText, LayoutTemplate, ArrowRight, Shield, Settings, Clipboard } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="HyperMail" className="h-8 w-auto" />
            <h1 className="text-2xl font-bold text-blue-600">HyperMail</h1>
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
        <div className="bg-blue-600 text-white rounded-lg p-6 mb-8 shadow-md">
          <h2 className="text-2xl font-bold mb-2">Bem-vindo ao sistema interno</h2>
          <p className="text-blue-100">
            Utilize nossas ferramentas para criar emails HTML e propostas profissionais.
          </p>
        </div>

        {/* Atalhos rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                Acesso rápido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Acesse seus aplicativos mais usados diretamente
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" asChild className="justify-start">
                  <Link to="/app" className="flex items-center gap-2">
                    <LayoutTemplate className="h-4 w-4" />
                    Email
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="justify-start">
                  <Link to="/proposal" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Propostas
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="justify-start">
                  <Link to="/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Configurações
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="justify-start">
                  <Link to="/help" className="flex items-center gap-2">
                    <Clipboard className="h-4 w-4" />
                    Tutoriais
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <LayoutTemplate className="h-5 w-5 text-blue-500" />
                Construtor de Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Crie emails HTML responsivos e profissionais com nosso editor visual
              </p>
              <Button asChild className="w-full">
                <Link to="/app" className="flex items-center gap-2">
                  Acessar <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Gerador de Propostas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Crie propostas profissionais em PDF com a ajuda da nossa IA
              </p>
              <Button asChild className="w-full">
                <Link to="/proposal" className="flex items-center gap-2">
                  Acessar <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Estatísticas e status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>Suas últimas ações no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="p-2 border-b">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Proposta criada</p>
                      <p className="text-sm text-gray-500">Hoje, 10:30</p>
                    </div>
                  </div>
                </li>
                <li className="p-2 border-b">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded">
                      <LayoutTemplate className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Email enviado</p>
                      <p className="text-sm text-gray-500">Ontem, 15:45</p>
                    </div>
                  </div>
                </li>
                <li className="p-2">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Proposta exportada</p>
                      <p className="text-sm text-gray-500">Ontem, 09:15</p>
                    </div>
                  </div>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">Ver todas as atividades</Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Sistema</CardTitle>
              <CardDescription>Status e informações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Versão do sistema</span>
                  <span className="font-medium">2.1.0</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>API</span>
                  <span className="font-medium text-green-600">Online</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Último backup</span>
                  <span className="font-medium">Hoje às 03:00</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>Usuários ativos</span>
                  <span className="font-medium">23</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">Status do sistema</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <footer className="bg-white p-6 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img src={LOGO_URL} alt="HyperMail" className="h-6 w-auto" />
              <h3 className="font-bold text-blue-600">HyperMail</h3>
            </div>
            <div className="text-sm text-gray-500">
              <p>&copy; {new Date().getFullYear()} HyperMail - Sistema Interno v2.1.0</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

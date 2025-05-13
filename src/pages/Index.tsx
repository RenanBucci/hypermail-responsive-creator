
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LOGO_URL } from "../App";
import { FileText, LayoutTemplate, ArrowRight, Star, CheckCircle } from "lucide-react"; // Added more icons

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
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
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Crie conteúdo profissional com facilidade
                </h2>
                <p className="text-blue-100 text-lg mb-8">
                  Ferramentas intuitivas para criar emails HTML responsivos e propostas em PDF que impressionam seus clientes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50" asChild>
                    <Link to="/register">Comece grátis <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700" asChild>
                    <Link to="/login">Faça login</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/20 transform rotate-3">
                  <img 
                    src="/placeholder.svg" 
                    alt="HyperMail Preview" 
                    className="rounded-lg shadow-lg"
                    width="500"
                    height="300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
              Nossas soluções
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* HyperMail Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100 duration-300">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-full bg-blue-100">
                      <LayoutTemplate className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">HyperMail</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Crie emails HTML responsivos sem código. Arraste, solte e personalize componentes para emails profissionais.
                  </p>
                  
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Editor visual drag-and-drop</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Templates personalizáveis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Compatível com todos os clientes de email</span>
                    </div>
                  </div>
                  
                  <Button size="lg" className="w-full" asChild>
                    <Link to="/app">Iniciar HyperMail</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-4 border-t">
                  <div className="text-sm text-gray-500 text-center">
                    Editor de email HTML drag-and-drop
                  </div>
                </div>
              </div>
              
              {/* PDF Proposal Creator Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100 duration-300">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-full bg-blue-100">
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Propostas PDF</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Gere propostas profissionais em PDF com a ajuda de IA. Crie documentos personalizados em minutos.
                  </p>
                  
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Assistente de IA integrado</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Preview em tempo real</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Exportação em PDF de alta qualidade</span>
                    </div>
                  </div>
                  
                  <Button size="lg" className="w-full" asChild>
                    <Link to="/proposal">Criar Proposta</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-4 border-t">
                  <div className="text-sm text-gray-500 text-center">
                    Gerador de propostas com IA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
              O que nossos clientes dizem
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">
                    "Esta ferramenta revolucionou nossa maneira de trabalhar. Agora conseguimos criar propostas profissionais e emails em questão de minutos."
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold mr-3">
                      {String.fromCharCode(64 + i)}
                    </div>
                    <div>
                      <p className="font-medium">Cliente {i}</p>
                      <p className="text-gray-500 text-sm">Empresa {i}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white p-6 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={LOGO_URL} alt="HyperMail" className="h-6 w-auto" />
                <h3 className="font-bold text-blue-600">HyperMail</h3>
              </div>
              <p className="text-gray-500 text-sm">
                Soluções inteligentes para comunicação profissional e propostas comerciais.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produtos</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/app" className="hover:text-blue-600">HyperMail</Link></li>
                <li><Link to="/proposal" className="hover:text-blue-600">Propostas PDF</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Documentação</a></li>
                <li><a href="#" className="hover:text-blue-600">Tutoriais</a></li>
                <li><a href="#" className="hover:text-blue-600">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Sobre nós</a></li>
                <li><a href="#" className="hover:text-blue-600">Contato</a></li>
                <li><a href="#" className="hover:text-blue-600">Termos</a></li>
                <li><a href="#" className="hover:text-blue-600">Privacidade</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} HyperMail - Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

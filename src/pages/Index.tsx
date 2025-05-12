
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LOGO_URL } from "../App";
import { FileText, LayoutTemplate } from "lucide-react"; // Changed from FilePdf to FileText

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
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
          Escolha um aplicativo
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* HyperMail Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <LayoutTemplate className="h-8 w-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-800">HyperMail</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Crie emails HTML responsivos sem código. Arraste, solte e personalize componentes para emails profissionais.
              </p>
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
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-8 w-8 text-blue-600" /> 
                <h3 className="text-2xl font-bold text-gray-800">Propostas PDF</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Gere propostas profissionais em PDF com a ajuda de IA. Crie documentos personalizados em minutos.
              </p>
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
      </main>
      
      <footer className="bg-white p-6 border-t">
        <div className="container mx-auto text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} HyperMail - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

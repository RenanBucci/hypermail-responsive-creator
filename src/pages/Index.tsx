
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">HyperMail</h1>
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
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-4xl font-bold mb-4">Crie emails HTML responsivos sem código</h2>
          <p className="text-xl text-gray-600 mb-8">
            Arraste, solte e personalize componentes para criar emails profissionais
            que funcionam em todos os clientes de email.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/register">Comece Gratuitamente</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Já tenho uma conta</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl w-full">
          <img 
            src="/lovable-uploads/301ea117-dbd5-4e28-962a-a5814004058a.png" 
            alt="HyperMail Preview" 
            className="w-full h-auto"
          />
        </div>
      </main>
      
      <footer className="bg-white p-6 border-t">
        <div className="container mx-auto text-center text-gray-600">
          <p>&copy; 2025 HyperMail - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

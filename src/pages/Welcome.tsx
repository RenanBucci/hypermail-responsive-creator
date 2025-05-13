
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LOGO_URL } from "../App";

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block"
            >
              <img src={LOGO_URL} alt="ProDigital Studio" className="h-16 w-auto mx-auto" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-4 text-3xl font-bold text-gray-900 dark:text-white"
            >
              ProDigital Studio
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-2 text-gray-600 dark:text-gray-300"
            >
              Plataforma integrada para criação de conteúdo digital profissional
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Card className="shadow-lg border-0 overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button asChild className="w-full" size="lg">
                    <Link to="/login">Entrar</Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full" size="lg">
                    <Link to="/register">Criar conta</Link>
                  </Button>
                  
                  <div className="text-center mt-6">
                    <Button asChild variant="ghost" className="text-sm">
                      <Link to="/forgot-password">Esqueceu sua senha?</Link>
                    </Button>
                  </div>
                  
                  <div className="pt-4 text-center">
                    <Button asChild variant="link">
                      <Link to="/" className="text-sm">
                        Continuar para o dashboard
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;

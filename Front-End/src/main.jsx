/**
 * Arquivo principal do Frontend
 * Este arquivo é o ponto de entrada da aplicação React, responsável por:
 * - Configurar o provedor de autenticação
 * - Configurar o roteamento da aplicação
 * - Renderizar o componente principal
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./routes/Router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);

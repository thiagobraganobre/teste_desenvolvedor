// components/Menu.tsx
import React from 'react';

const Menu = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/clientes" className="nav-link" target="_self" rel="noopener noreferrer">
            Listar Clientes
          </a>
        </li>
        <li className="nav-item">
          <a href="/clientecadastro" className="nav-link" target="_self" rel="noopener noreferrer">
            Novo Cliente
          </a>
        </li>
        <li className="nav-item">
          <a href="/rotas" className="nav-link" target="_self" rel="noopener noreferrer">
            Rota
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;

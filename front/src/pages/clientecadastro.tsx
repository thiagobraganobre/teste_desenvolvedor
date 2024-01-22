import React, { useState, ChangeEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from '../components/Menu';

const ClientesCadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const MAX_CARACTERES_NOME = 100;
  const MAX_CARACTERES_EMAIL = 100;

  const handleNomeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const novoNome = e.target.value.slice(0, MAX_CARACTERES_NOME);
    setNome(novoNome);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const novoEmail = e.target.value.slice(0, MAX_CARACTERES_EMAIL);
    setEmail(novoEmail);
  };

  const handleTelefoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Formatar o telefone ao digitar
    const telefoneFormatado = formatarTelefone(e.target.value);
    setTelefone(telefoneFormatado);
  };

  const formatarTelefone = (telefone: string) => {
    const numerosTelefone = telefone.replace(/\D/g, '');
    const formatoTelefone = `(${numerosTelefone.slice(0, 2)}) ${numerosTelefone.slice(2, 6)}-${numerosTelefone.slice(6, 10)}`;
    return formatoTelefone;
  };

  const validarEmail = (email: string) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };

  const handleSubmit = async () => {
    // Validar email antes de enviar
    if (!validarEmail(email)) {
      toast.error('Por favor, insira um email válido.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/cadastrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, telefone }),
      });

      if (response.ok) {
        toast.success('Cliente cadastrado com sucesso!');
      } else {
        toast.error('Erro ao cadastrar cliente');
      }
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      toast.error('Erro ao cadastrar cliente');
    }

  };




  return (
    <div>
      <Menu />
      <ToastContainer />

      <div className="container mt-5">
        <h3>Cadastro de Cliente</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">
              Nome:
            </label>
            <input
              type="text"
              className="form-control"
              id="nome"
              value={nome}
              onChange={handleNomeChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="telefone" className="form-label">
              Telefone:
            </label>
            <input
              type="text"
              className="form-control"
              id="telefone"
              value={telefone}
              onChange={handleTelefoneChange}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Cadastrar Cliente
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientesCadastro;

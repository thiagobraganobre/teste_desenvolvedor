import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Pagination } from 'react-bootstrap';
import Menu from '../components/Menu';

interface Cliente {
  nome: string;
  email: string;
  telefone: string;
  distancia: number;
}

const RotasPage = () => {
  const [rotaOtimizada, setRotaOtimizada] = useState<Cliente[]>([]);
  const [modalAberta, setModalAberta] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;

  const calcularRotaOtimizada = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/calcular-rota`);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setRotaOtimizada(data);
        abrirModal();
      } else {
        console.error('Resposta inválida ou vazia:', data);
      }
    } catch (error) {
      console.error('Erro ao obter rota otimizada:', error);
    }
  };

  const abrirModal = () => {
    setModalAberta(true);
  };

  const fecharModal = () => {
    setModalAberta(false);
  };

  const handleClick = (selected: number) => {
    setPageNumber(selected);
  };
  
  useEffect(() => {
    // Se precisar carregar a rota otimizada ao abrir a tela, descomente a linha abaixo
    // calcularRotaOtimizada();
  }, []);

  const offset = pageNumber * itemsPerPage;
  const currentPageData = rotaOtimizada.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <Menu />

      <div className="container mt-5">

        <h3>Rotas Otimizadas</h3>
        <Button variant="primary" onClick={calcularRotaOtimizada}>
          Calcular Rota Otimizada
        </Button>

        <Modal show={modalAberta} onHide={fecharModal} dialogClassName="modal-grande">
          <Modal.Header closeButton>
            <Modal.Title>Ordem de Visitação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Distância em metro(s)</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((cliente: Cliente, index) => (
                  <tr key={index}>
                    <td>{cliente?.nome}</td>
                    <td>{cliente?.email}</td>
                    <td>{cliente?.telefone}</td>
                    <td>{cliente?.distancia?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination>
              <Pagination.Prev
                onClick={() => handleClick(pageNumber - 1)}
                disabled={pageNumber === 0}
              />
              {[...Array(Math.ceil(rotaOtimizada.length / itemsPerPage))].map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index === pageNumber}
                  onClick={() => handleClick(index)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handleClick(pageNumber + 1)}
                disabled={pageNumber === Math.ceil(rotaOtimizada.length / itemsPerPage) - 1}
              />
            </Pagination>
          </Modal.Body>
        </Modal>

      </div>
    </div>
  );
};

export default RotasPage;

import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import ReactPaginate from 'react-paginate';
import { Table, Pagination, Form } from 'react-bootstrap';

interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

const ClientesPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/listar`);
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefone.includes(searchTerm)
  );

  const pageCount = Math.ceil(filteredClientes.length / itemsPerPage);

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentClientes = filteredClientes.slice(offset, offset + itemsPerPage);

  const renderClientes = () => {
    return currentClientes.map((cliente) => (
      <tr key={cliente.id}>
        <td>{cliente.id}</td>
        <td>{cliente.nome}</td>
        <td>{cliente.email}</td>
        <td>{cliente.telefone}</td>
      </tr>
    ));
  };

  return (
    <div>
      <Menu />

      <div className="container mt-5">
        <h3 className="mb-4">Lista de Clientes</h3>

        <Form.Group controlId="formSearch">
          <Form.Control
            type="text"
            placeholder="Pesquisar por nome, email ou telefone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>{renderClientes()}</tbody>
        </Table>

        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageClick({ selected: currentPage - 1 })}
            disabled={currentPage === 0}
          />
          {[...Array(pageCount)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index === currentPage}
              onClick={() => handlePageClick({ selected: index })}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageClick({ selected: currentPage + 1 })}
            disabled={currentPage === pageCount - 1}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default ClientesPage;
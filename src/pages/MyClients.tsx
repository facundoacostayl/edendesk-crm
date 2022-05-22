//HOOKS
import { useAuth } from "../authContext/AuthProvider";
import { useClient } from "../clientsContext/ClientProvider";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

//COMPONENTS
import { SectionBanner } from "../components";
import { Sidebar } from "../components/Sidebar";
import { PageContent } from "../ui/pageContent";
import { TextField } from "../ui/form/textField";
import { SearchField } from "../ui/form/searchField";
import { ClientList } from "../ui/clientList";
import { ClientLi } from "../ui/clientLi";
import { Button } from "../ui/controls/button";

//TYPES
import { Status } from "../types";

export const MyClients = () => {
  const { userData } = useAuth();
  const {
    clientList,
    getClientList,
    searchClient,
    orderClients,
    status,
    setStatus,
  } = useClient();
  const [searchField, setSearchField] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const firstRun = useRef(true);

  useEffect(() => {
    getClientList();
    setStatus(Status.success);
  }, []);

  useEffect(() => {
    if(!firstRun.current) {
    clientList.length > 0 ? searchClient(searchField) : getClientList()
   setFilterValue("");
    }
    firstRun.current = false
  }, [searchField]);

  const getClientSearched = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setSearchField(e.target.value);
    }, 800);
  };

  const onFilterItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
    orderClients(e.target.value);
    setFilterValue(e.target.value);
  };

  return (
    <div className="md:flex">
      <Sidebar />
      <div className="w-full">
        <SectionBanner sectionName="Mis Clientes"></SectionBanner>
        <PageContent status={status} direction="flex-col">
          <SearchField onSearch={(e) => getClientSearched(e)} />
          <div className="w-full flex justify-end mb-2 gap-2">
            <label className="font-light text-gray-600" htmlFor="">
              ordernar por:
            </label>
            <select
              onChange={(e) => onFilterItems(e)}
              value={filterValue}
              className="w-2/6 md:w-1/12"
              name="filter"
              id="filter"
            >
              <option value="nombre-asc">A - Z</option>
              <option value="nombre-desc">Z - A</option>
              <option value="saldo-asc">Menor saldo</option>
              <option value="saldo-desc">Mayor saldo</option>
            </select>
          </div>
          {clientList.length > 0 ? 
          <ClientList>
            {clientList.map((client) => {
              return (
                <ClientLi key={client.clientid}>
                  <p className="mx-auto font-semibold text-gray-800">
                    {client.nombre} {client.apellido}
                  </p>
                  <p className="mx-auto font-semibold text-gray-500">
                    ${client.saldo}
                  </p>
                  <div className="mx-auto">
                    <Link to={`/mis-clientes/cliente/${client.clientid}`}>
                      <Button colorScheme="primary">Editar</Button>
                    </Link>
                  </div>
                </ClientLi>
              );
            })}
            </ClientList>
            :
            <p className="text-center text-base my-10 text-gray-500">Todavía no tienes clientes. Comienza a añadirlos <Link to="/nuevo-cliente" className="text-indigo-500">aquí</Link>!</p>
          }
        </PageContent>
      </div>
    </div>
  );
};

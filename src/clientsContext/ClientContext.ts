import {createContext} from 'react';
import {Client} from './types';
import {User} from '../authContext/types';

type ClientContextProps = {
    addClient: (firstname: Client["nombre"], lastname:Client["apellido"], telefono: Client["telefono"], user: User["id"]) => Promise<void>,
    updateClient: (id: Client["clientid"], amount: number, operation: string) => Promise<void>,
    updateClientInfo: (id: Client["clientid"], clientValueToEdit: string, newClientValue: string) => Promise<void>
    getClientList: (id: User["id"]) => Promise<void>,
    clientList: Client[],
    searchClient: (name: Client["nombre"]) => Promise<void>,
    orderClients: (orderType: string) => Promise<void>,
    getClient: (id: Client["clientid"]) => Promise<void>,
    currentClient: Client,
    deleteClient: (id: Client["clientid"]) => Promise<void>,
    getFullClientBalance: (id: User["id"]) => Promise<void>,
    totalClientBalance: number
}

export const ClientContext = createContext<ClientContextProps>({} as ClientContextProps);
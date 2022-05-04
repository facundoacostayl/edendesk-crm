import { Request, Response } from "express";
import { Client } from "../entities/Client";

export const getClients = async (req: Request, res: Response) => {
  try {
    const clientList = await Client.find();

    res.json(clientList);
  } catch (error) {
    error instanceof Error && res.status(500).json({ message: error.message });
  }
};

export const getClient = async (req: Request, res: Response) => {
  try{
    const {id} = req.params;
    
    const client = await Client.findOneBy({clientid: parseInt(id)});

    return res.json(client);

  }catch (error) {
    error instanceof Error && res.status(500).json({ message: error.message});
  }
}

export const addClient = async (req: Request, res: Response) => {
  try {
    //Require Body
    const { nombre, apellido, telefono } = req.body;

    //Check if client has already been added
    const clientRequest = await Client.findOneBy({ telefono: telefono });

    if (clientRequest === null) {
      const client = new Client();
      client.nombre = nombre;
      client.apellido = apellido;
      client.telefono = telefono;

      await client.save();

      return res.json(client);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }
};

export const addToClientBalance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const client = await Client.findOneBy({ clientid: parseInt(id) });

    if (!client)
      return res.sendStatus(403).json({ message: "User doesn't exists" });

    client.saldo += amount;

    const today = new Date();
      const todayDate =
      today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear(); 
    client.fechaultcarga = todayDate;
    client.montoultcarga = client.saldo;

    await client.save();

    return res.json(await Client.find());
  } catch (e) {
    e instanceof Error && res.status(500).json("Internal server error");
  }
};

export const substractFromClientBalance = async (req: Request, res: Response) => {
  try{
    const {amount} = req.body;
    const {id} = req.params;
  
    const client = await Client.findOneBy({clientid: parseInt(id)});
  
    if(!client) return res.status(403).json("User doesn't exists");
  
    client.saldo = client.saldo - amount;
    client.montoultretiro = amount;
  
    const today = new Date();
    const todayDate =
      today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear(); 
    client.fechaultretiro = todayDate;
  
    await client.save();
  
    return res.json(await Client.find());
  }catch(error){
    error instanceof Error && res.status(500).json("Internal server error");
  }
}

export const searchClient = async(req: Request, res: Response) => {
  try{
    const {name} = req.query;

    const clients = await Client.query("SELECT * FROM clients WHERE nombre || ' ' || apellido ILIKE $1", [`%${name}%`]);

    return res.json(clients);
  }catch(error){
    error instanceof Error && res.status(500).json("Server internal error");
  }
}

export const orderByClientNameAsc = async(req: Request, res: Response) =>{
  try{
    const clients = await Client.query("SELECT * FROM clients ORDER BY nombre ASC");

    return res.json(clients);
  }catch(error){
    error instanceof Error && res.status(500).json("Server internal error");
  }
}

export const orderByClientNameDesc = async(req: Request, res: Response) => {
  try{
    const clients = await Client.query("SELECT * FROM clients ORDER BY nombre DESC")

    return res.json(clients);
  }catch(error){
    error instanceof Error && res.status(500).json("Server internal error");
  }
}

export const orderByClientBalanceAsc = async(req: Request, res: Response) => {
  try{
    const clients = await Client.query("SELECT * FROM clients ORDER BY saldo ASC")

    return res.json(clients);
  }catch(error){
    error instanceof Error && res.status(500).json("Server internal error");
  }
}

export const orderByClientBalanceDesc = async(req: Request, res: Response) => {
  try{
    const clients = await Client.query("SELECT * FROM clients ORDER BY saldo DESC");

    return res.json(clients);
  }catch(error){
    error instanceof Error && res.status(500).json("Server internal error");
  }
}

export const deleteClient = async(req: Request, res: Response) => {
  const {id} = req.params;

  const client = await Client.delete({clientid: parseInt(id)});

  if (!client) return res.status(403).json({message: "Client not found"});

  return res.status(200).json({message: "Client deleted successfully"});
}
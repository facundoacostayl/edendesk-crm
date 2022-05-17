import {Button} from '../controls/button';

type Props = {
    children: React.ReactNode;
}

export const ClientList: React.FC<Props> = ({children}) => {
  return (
    <ul className="border border-gray-200 shadow-sm">
        <div className="w-full grid grid-cols-3 grid-rows-1 items-center gap-7 p-4">
          <p className="mx-auto text-lg font-medium">Nombre</p>
          <p className="mx-auto text-lg font-medium">Saldo</p>
          <div className="opacity-0">
          <Button colorScheme="primary">Editar</Button>
          </div>
        </div>
        {children}
    </ul>
  )
}
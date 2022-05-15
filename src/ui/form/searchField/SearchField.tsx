//COMPONENTS
import {TextField} from '../textField';

//ICONS
import {FontAwesomeIcon, SearchIcon} from '../../icons';

type Props = {
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchField = ({onSearch}: Props) => {
  return (
    <div className="relative max-w-[700px] mx-auto my-4">
            <TextField
              onChange={onSearch}
              autoFocus
              type="text"
              placeholder="Buscar cliente..."
            />
            <FontAwesomeIcon icon={SearchIcon} className="absolute text-xl text-indigo-700 top-[25%] right-4"/>
          </div>
  )
}

import { Dispatch, SetStateAction } from 'react';
import { clearLoadedCSV } from '../../mocked_data/mockedCSVFunc';


interface loginProps {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

export function LoginButton(props: loginProps) {

  const authenticate = () => {
    const newValue = !props.isLoggedIn
    props.setIsLoggedIn(newValue)
    return newValue
  }

  if (props.isLoggedIn) {
    return (
      <button aria-label='Sign Out' 
      onClick={() => {
        clearLoadedCSV();
        authenticate();
      }}
      >Sign out</button>
    )
  } else {
    return (
      <button aria-label='Login' onClick={authenticate}>Login</button>
    )
  }
}
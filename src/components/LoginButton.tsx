import { Dispatch, SetStateAction } from 'react';
import { clearLoadedCSV } from '../../mocked_data/mockedCSVFunc';

/**
 * The properties for a Login Button.
 */
interface loginProps {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

/**
 * The function for creating a Login Button.
 * @param props The props for the Login Button.
 * @returns A JSX element representing the Login Button.
 */
export function LoginButton(props: loginProps) {

  /**
   * A click event method to log in the user.
   * @returns 
   */
  const authenticate = () => {
    const newValue = !props.isLoggedIn
    props.setIsLoggedIn(newValue)
    return newValue
  }

  /**
   * The rendering method that returns a button based on the status of the 
   * user's login state.
   */
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
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginAccount} from '../../context/userSlice';
import {showMessage} from 'react-native-flash-message';

const useFirebaseAuth = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const loginUser = (_email: string, _password: string) => {
    setLoading(true);
    dispatch(loginAccount());
    showMessage({
      message: 'You have successfully logged into your account',
      type: 'success',
    });
    setLoading(false);
  };

  const createUser = (
    _email: string,
    _password: string,
    _backLogin: never, // TODO: type this
  ) => {};

  return {loading, createUser, loginUser};
};

export default useFirebaseAuth;

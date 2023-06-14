import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks';
import { Button } from './button';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();

  const onSubmit = async (data: any) => {
    console.log(data);
    const res = await login(data);
    if (res.success) {
      console.log('RES', res);
      navigate('/');
    }
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start flex-col">
          <label>Email</label>
          <input
            className="border-0 my-3 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            type="text"
            {...registerField('email', {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
          />
          {errors.email && errors.email.type === 'required' && (
            <p className="errorMsg">Email is required.</p>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <p className="errorMsg">Email is not valid.</p>
          )}
        </div>
        <div className="flex items-start flex-col">
          <label>Password</label>
          <input
            className="border-0 mt-3 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            type="password"
            {...registerField('password', {
              required: true,
            })}
          />
          {errors.password && errors.password.type === 'required' && (
            <p className="errorMsg">Password is required.</p>
          )}
        </div>
        <div className="text-blue-300 hover:text-blue-500 cursor-pointer">
          Forgot password?{' '}
        </div>
        <div className="mt-3">
          <label></label>
          <Button type="submit" title="Login" />
        </div>
      </form>
    </div>
  );
};

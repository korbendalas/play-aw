import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks';
import { Button } from './button.tsx';

export const RegisterForm = () => {
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { register } = useAuth();

  const onSubmit = async (data: any) => {
    console.log(data);
    await register(data);
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start flex-col mt-3">
          <label>First Name</label>
          <input
            type="text"
            className="border-0 mt-2 px-3 py-3 placeholder-blueGray-300 text-blueGray-600  rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            {...registerField('firstName', {
              required: true,
            })}
          />
          {errors.firstName && errors.firstName.type === 'required' && (
            <p className="text-red-500">First name is required.</p>
          )}
        </div>
        <div className="flex items-start flex-col mt-3">
          <label>Last Name</label>
          <input
            type="text"
            className="border-0 mt-2 px-3 py-3 placeholder-blueGray-300 text-blueGray-600  rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            {...registerField('lastName', {
              required: true,
            })}
          />
          {errors.lastName && errors.lastName.type === 'required' && (
            <p className="text-red-500">Last name is required.</p>
          )}
        </div>

        <div className="flex items-start flex-col mt-3">
          <label>Email</label>
          <input
            type="text"
            className="border-0 mt-2 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            {...registerField('email', {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
          />
          {errors.email && errors.email.type === 'required' && (
            <p className="text-red-500">Email is required.</p>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <p className="text-red-500">Email is not valid.</p>
          )}
        </div>
        <div className="flex items-start flex-col mt-3">
          <label>Password</label>
          <input
            type="password"
            className="border-0 mt-2 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            {...registerField('password', {
              required: true,
            })}
          />
          {errors.password && errors.password.type === 'required' && (
            <p className="text-red-500">Password is required.</p>
          )}
        </div>
        <div className="flex items-center mt-3">
          <label></label>
          <Button type="submit" title="Register" />
        </div>
      </form>
    </div>
  );
};

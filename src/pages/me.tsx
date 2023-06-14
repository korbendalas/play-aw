import { useAuth } from '../hooks';

export const MePage = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Me Page</h1>

      <div className="flex flex-col items-center justify-center">
        <div>{user?.firstName}</div>
        <div>{user?.lastName}</div>
        <div>{user?.email}</div>
      </div>
    </div>
  );
};

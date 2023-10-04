import { FC, PropsWithChildren } from 'react';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-full">{children}</div>
  );
};

export default AuthLayout;

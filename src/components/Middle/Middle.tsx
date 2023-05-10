import React from 'react';

interface Props {
  children: React.ReactNode;
}
const Middle = ({ children }: Props) => {
  return <div className="middle">{children}</div>;
};

export default Middle;

import React from 'react';
import './MainSection.css';
interface mainSectionProps {
  children: React.ReactNode;
}
const MainSection = ({ children }: mainSectionProps) => {
  return (
    <main>
      <div className="container">{children}</div>
    </main>
  );
};

export default MainSection;

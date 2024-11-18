"use client"; // Ajoute cette ligne au début

import React, { useState } from 'react';

const Accordion = ({ children }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="accordion" role="presentation">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isOpen: openIndex === index,
          onToggle: () => toggle(index),
          index,
        })
      )}
    </div>
  );
};

const AccordionItem = ({ children, isOpen, onToggle, index }) => (
  <div className="accordion-item">
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { isOpen, onToggle, index })
    )}
  </div>
);

const AccordionHeader = ({ children, isOpen, onToggle, index }) => (
  <button
    id={`accordion-header-${index}`}
    aria-expanded={isOpen}
    aria-controls={`accordion-panel-${index}`}
    onClick={onToggle}
    className={`accordion-header ${isOpen ? 'open' : ''}`}
  >
    {children}
    <span aria-hidden="true" className="indicator">
      {isOpen ? '−' : '+'}
    </span>
  </button>
);

const AccordionPanel = ({ children, isOpen, index }) => (
  <div
    id={`accordion-panel-${index}`}
    role="region"
    aria-labelledby={`accordion-header-${index}`}
    hidden={!isOpen}
    className={`accordion-panel ${isOpen ? 'open' : ''}`}
  >
    {children}
  </div>
);

const Home = () => {
  return (
    <main>
      <h1>Accordion Demo</h1>
      <Accordion>
        <AccordionItem>
          <AccordionHeader>Section 1</AccordionHeader>
          <AccordionPanel>Contenu de la section 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader>Section 2</AccordionHeader>
          <AccordionPanel>Contenu de la section 2</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader>Section 3</AccordionHeader>
          <AccordionPanel>Contenu de la section 3</AccordionPanel>
        </AccordionItem>
      </Accordion>

      <style jsx>{`
        .accordion-item {
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: #f9f9f9;
          border: none;
          font-size: 1.2rem;
          width: 100%;
          cursor: pointer;
        }

        .accordion-header.open {
          background-color: #e9e9e9;
        }

        .indicator {
          font-size: 1.5rem;
        }

        .accordion-panel {
          padding: 1rem;
          background-color: #fff;
        }

        .accordion-panel.open {
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            max-height: 0;
            opacity: 0;
          }
          to {
            max-height: 300px;
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
};

export default Home;

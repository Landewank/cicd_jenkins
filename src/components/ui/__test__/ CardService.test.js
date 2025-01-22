import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardService from '../CardService'; 

describe('CardService Component', () => {
  it('renders correctly with default props', () => {
    render(
      <CardService 
        imageSrc="/images/service1.png" 
        title="Service 1" 
        description="Description for Service 1" 
      />
    );

    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/service1.png'); 
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Service 1');
    expect(screen.getByText('Description for Service 1')).toBeInTheDocument();
  });

  it('renders with custom props', () => {
    render(
      <CardService 
        backgroundColor="bg-blue-500" 
        textColor="text-white" 
        width="w-1/3" 
        imageSrc="/images/service2.png" 
        title="Service 2" 
        description="Description for Service 2" 
      />
    );

    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/service2.png'); 
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Service 2');
    expect(screen.getByText('Description for Service 2')).toBeInTheDocument();
    expect(screen.getByTestId('cardService')).toHaveClass('bg-blue-500'); // Assuming you add data-testid="cardService" to the main div
    expect(screen.getByTestId('cardService')).toHaveClass('text-white');
    expect(screen.getByTestId('cardService')).toHaveClass('w-1/3'); 
  });
});
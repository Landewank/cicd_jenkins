import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { ButtonIcon, Button } from '../Button';

describe('ButtonIcon Component', () => {
  it('renders correctly with given props', () => {
    act(() => {
      render(
        <ButtonIcon
          className="test-class"
          icon="add-circle"
          text="Click Me"
          textClassName="text-class"
          bgColor="bg-blue-500"
          hoverBgColor="hover:bg-blue-700"
          onClick={() => {}}
        />
      );
    });

    expect(screen.getByText('Click Me')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('test-class bg-blue-500 hover:bg-blue-700');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();

    act(() => {
      render(
        <ButtonIcon
          className="test-class"
          icon="add-circle"
          text="Click Me"
          textClassName="text-class"
          bgColor="bg-blue-500"
          hoverBgColor="hover:bg-blue-700"
          onClick={handleClick}
        />
      );
    });

    // button 2
    

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('Button Component', () => {
    it('renders button with correct text and styles', () => {
      act(() => {
        render(
          <Button 
            text="Click Me" 
            bgColor="bg-blue-500" 
            hoverBgColor="hover:bg-blue-700" 
            onClick={() => {}} 
          />
        );
      });
  
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Click Me');
      expect(button).toHaveClass('bg-blue-500');
      expect(button).toHaveClass('hover:bg-blue-700');
    });
  
    it('calls onClick function when clicked', () => {
      const handleClick = jest.fn();
  
      act(() => {
        render(
          <Button 
            text="Click Me" 
            bgColor="bg-blue-500" 
            hoverBgColor="hover:bg-blue-700" 
            onClick={handleClick} 
          />
        );
      });
  
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
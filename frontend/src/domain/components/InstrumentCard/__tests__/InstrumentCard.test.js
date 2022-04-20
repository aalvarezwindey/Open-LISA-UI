import { fireEvent, render, screen } from '@testing-library/react';
import InstrumentCard from '../InstrumentCard';

describe('InstrumentCard', () => {
  const someBrand = 'Tektronix';
  const someModel = '1002B';
  const someImage = 'https://images-domain.com/my-url';

  it('should render brand a model', () => {
    render(<InstrumentCard brand={someBrand} model={someModel} />);
    const brand = screen.getByText(new RegExp(someBrand, 'i'));
    const model = screen.getByText(new RegExp(someModel, 'i'));
    expect(brand).toBeInTheDocument();
    expect(model).toBeInTheDocument();
  });

  it('should render img element with src', () => {
    render(<InstrumentCard brand={someBrand} model={someModel} image={someImage} />);
    const img = screen.getByAltText(new RegExp(someBrand, 'i'));
    expect(img.src).toEqual(someImage);
  });

  it('should call onViewMore on button click', () => {
    const handler = jest.fn();
    render(
      <InstrumentCard brand={someBrand} model={someModel} image={someImage} onViewMore={handler} />,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

import { render, screen } from '@testing-library/react';
import instruments from '../../../../mock_data/instruments';
import InstrumentsList from '../InstrumentsList';

describe('InstrumentsList', () => {
  it('should render all instruments', () => {
    render(<InstrumentsList instruments={instruments} />);
    instruments.forEach((i) => {
      const brand = screen.getByText(new RegExp(i.brand, 'i'));
      const model = screen.getByText(new RegExp(i.model, 'i'));
      expect(brand).toBeInTheDocument();
      expect(model).toBeInTheDocument();
    });
  });
});

const { screen, fireEvent, waitFor, act } = require('@testing-library/react');
const { default: InstrumentsPage } = require('../InstrumentsPage');

const clickNewInstrumentButton = () => {
  const newInstrumentButton = screen.getByRole('button', { name: /nuevo instrumento/i });
  fireEvent.click(newInstrumentButton);
};

const getModalPrimaryAction = () =>
  screen.getByRole('button', {
    name: /crear instrumento/i,
  });

const getModalSecondaryAction = () =>
  screen.getByRole('button', {
    name: /cancelar/i,
  });

const getModalCloseButton = () =>
  screen.getByRole('button', {
    name: /close/i,
  });
describe('InstrumentsPage', () => {
  describe('New instrument', () => {
    it('should open dialog when clicking new instrument button', async () => {
      global.renderApp(<InstrumentsPage />);
      clickNewInstrumentButton();

      expect(getModalPrimaryAction()).toBeInTheDocument();
    });

    it('should close dialog when clicking secondary action or close button', async () => {
      global.renderApp(<InstrumentsPage />);

      clickNewInstrumentButton();
      let modalPrimaryAction = getModalPrimaryAction();
      expect(modalPrimaryAction).toBeInTheDocument();

      fireEvent.click(getModalSecondaryAction());
      await waitFor(() => expect(modalPrimaryAction).not.toBeInTheDocument());

      clickNewInstrumentButton();
      modalPrimaryAction = getModalPrimaryAction();
      await waitFor(() => expect(modalPrimaryAction).toBeInTheDocument());

      fireEvent.click(getModalCloseButton());
      await waitFor(() => expect(modalPrimaryAction).not.toBeInTheDocument());
    });
  });
});

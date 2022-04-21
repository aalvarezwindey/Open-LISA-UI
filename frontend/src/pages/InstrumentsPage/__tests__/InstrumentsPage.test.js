const { screen, fireEvent, waitFor } = require('@testing-library/react');
const { default: InstrumentsPage } = require('../InstrumentsPage');

const clickNewInstrumentButton = () => {
  const newInstrumentButton = screen.getByRole('button', { name: /nuevo instrumento/i });
  fireEvent.click(newInstrumentButton);
};

const typeInInputWithLabel = async (label, value) => {
  const input = await screen.findByRole('textbox', { name: new RegExp(label, 'i') });
  fireEvent.change(input, { target: { value } });
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

    describe('when filling the new instrument form', () => {
      const FORM_LABELS = {
        BRAND: 'marca',
        MODEL: 'modelo',
      };
      const VALID_FORM = {
        BRAND: 'Siglient',
        MODEL: 'AABBCC1234',
      };
      it('should add instrument after submitting a valid form', async () => {
        global.renderApp(<InstrumentsPage />);

        clickNewInstrumentButton();

        await typeInInputWithLabel(FORM_LABELS.BRAND, VALID_FORM.BRAND);
        await typeInInputWithLabel(FORM_LABELS.MODEL, VALID_FORM.MODEL);
        const modalPrimaryAction = getModalPrimaryAction();
        fireEvent.click(modalPrimaryAction);
        const newInstrumentCardTitle = await screen.findByText(
          new RegExp(`${VALID_FORM.BRAND} - ${VALID_FORM.MODEL}`, 'i'),
        );
        expect(newInstrumentCardTitle).toBeInTheDocument();
      });

      it('should display errors after submitting an invalid form', async () => {
        global.renderApp(<InstrumentsPage />);

        clickNewInstrumentButton();

        await typeInInputWithLabel(FORM_LABELS.BRAND, VALID_FORM.BRAND);
        // without model

        const modalPrimaryAction = getModalPrimaryAction();
        const input = await screen.findByRole('textbox', {
          name: new RegExp(FORM_LABELS.MODEL, 'i'),
        });

        expect(input).not.toHaveAttribute('aria-invalid', 'true');
        fireEvent.click(modalPrimaryAction);
        expect(input).toHaveAttribute('aria-invalid', 'true');
      });
    });
  });
});

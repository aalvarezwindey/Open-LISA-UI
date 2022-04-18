import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import useForm from '../useForm';

describe('useForm', () => {
  describe('given some fields', () => {
    const valueWithError = 'value with error';
    const error = 'ERROR';

    const someFields = [
      {
        name: 'A',
      },
      {
        name: 'B',
      },
    ];
    const someFieldsWithGetError = [
      {
        name: 'A',
        getError: (v) => (v === valueWithError ? error : ''),
      },
      {
        name: 'B',
      },
    ];

    it('should return updateField function', async () => {
      const { result } = renderHook(() => useForm({ fields: someFields }));
      await waitFor(() => expect(result.current.updateField).toEqual(expect.any(Function)));
    });

    it('should return values, errors and touched object with the field name as keys', async () => {
      const { result } = renderHook(() => useForm({ fields: someFields }));
      await waitFor(() => expect(result.current.updateField).toEqual(expect.any(Function)));

      someFields.forEach((field) => {
        expect(result.current.values[field.name]).toBeDefined();
        expect(result.current.errors[field.name]).toBeDefined();
        expect(result.current.touched[field.name]).toBeDefined();
      });
    });

    it('when updateField is called should update the corresponding field value', async () => {
      const { result } = renderHook(() => useForm({ fields: someFields }));
      await waitFor(() => expect(result.current.updateField).toEqual(expect.any(Function)));

      const fieldName = someFields[0].name;
      const someValue = 'value';
      result.current.updateField(fieldName)(someValue);
      await waitFor(() => expect(result.current.values[fieldName]).toEqual(someValue));
    });

    it('when getError is provided and updateField is called error should be update according getError', async () => {
      const { result } = renderHook(() => useForm({ fields: someFieldsWithGetError }));
      await waitFor(() => expect(result.current.updateField).toEqual(expect.any(Function)));

      const fieldName = someFields[0].name;
      const validValue = 'valid value';
      result.current.updateField(fieldName)(validValue);
      await waitFor(() => expect(result.current.values[fieldName]).toEqual(validValue));
      await waitFor(() => expect(result.current.errors[fieldName]).toEqual(''));

      result.current.updateField(fieldName)(valueWithError);
      await waitFor(() => expect(result.current.values[fieldName]).toEqual(valueWithError));
      await waitFor(() => expect(result.current.errors[fieldName]).toEqual(error));
    });
  });
});

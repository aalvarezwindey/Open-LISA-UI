import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import useInstruments from '../useInstruments';

describe('useInstruments', () => {
  it('should return instruments provided by the service', async () => {
    const someInstruments = [{ a: 1, b: 2 }];
    const mockService = jest.fn();
    mockService.mockResolvedValueOnce(someInstruments);
    const { result } = renderHook(() => useInstruments(mockService));
    await waitFor(() => expect(result.current.instruments).toEqual(someInstruments));
  });
});

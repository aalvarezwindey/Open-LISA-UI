import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import useDetectedPhysicalAddresses from '../useDetectedPhysicalAddresses';

describe('useDetectedPhysicalAddresses', () => {
  it('should return detected physical addreses provided by the service', async () => {
    const somePhysicalAddresses = [{ a: 1, b: 2 }];
    const mockService = jest.fn();
    mockService.mockResolvedValueOnce(somePhysicalAddresses);
    const { result } = renderHook(() => useDetectedPhysicalAddresses(mockService));
    await waitFor(() =>
      expect(result.current.detectedPhysicalAddresses).toEqual(somePhysicalAddresses),
    );
  });
});

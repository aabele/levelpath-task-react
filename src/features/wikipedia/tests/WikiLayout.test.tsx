import React from 'react';
import { render, fireEvent, act, waitFor, screen } from '@testing-library/react';
import { getDateUrl } from '../useWikipediaData';
import { WikiLayout } from '../WikiLayout';
import apiResponse from './apiResponse.json';

describe('WikiLayout', () => {
  it('should render properly', async () => {
    await act(async () => {
      const { baseElement } = await render(<WikiLayout />);
      await expect(baseElement).toMatchSnapshot();
    });
  });

  it('should trigger fetching api data on button click', async () => {

    const mockedFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(apiResponse),
      }),
    ) as jest.Mock

    global.fetch = mockedFetch;

    await render(<WikiLayout />);
    await expect(mockedFetch).not.toHaveBeenCalled();
    await act(async () => {

      const item = await waitFor(() => screen.getByText(/Load wikipedia data/));
      fireEvent.click(item);
    })

    await expect(mockedFetch).toHaveBeenCalledTimes(1);
    await expect(mockedFetch).toBeCalledWith(getDateUrl());
  });

});

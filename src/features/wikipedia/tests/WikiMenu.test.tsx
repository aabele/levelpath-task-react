import React from 'react';
import { render, fireEvent, act, waitFor, screen } from '@testing-library/react';
import { WikiMenu } from '../WikiMenu';

describe('WikiMenu', () => {
  it('should render properly', async () => {
    const items = ['item1', 'item2']
    await act(async () => {
      const { baseElement } = await render(<WikiMenu items={items} activeKey={items[0]} setActive={() => {}} />);
      await expect(baseElement).toMatchSnapshot();
    });
  });

  it('should trigger callback on item click', async () => {
    const items = ['Item1', 'Item2']
    const setActiveKey = jest.fn();
    await act(async () => {
      await render(<WikiMenu items={items} activeKey={items[0]} setActive={setActiveKey} />);
    })
    const item = await waitFor(() => screen.getByText(/Item1/));
    fireEvent.click(item);
    await expect(setActiveKey).toHaveBeenCalledTimes(1);
  });

});

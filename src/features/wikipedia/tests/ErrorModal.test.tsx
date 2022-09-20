import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ErrorModal } from '../ErrorModal';

describe('ErrorModal', () => {
  it('should render properly', () => {
    const { baseElement: el1 } = render(<ErrorModal close={() => {}} isOpen={true} />);
    expect(el1).toMatchSnapshot()

    const { baseElement: el2 } = render(<ErrorModal close={() => {}} isOpen={false} />);
    expect(el2).toMatchSnapshot()
  });

  it('should trigger close on ok click', () => {
    const closeAction = jest.fn();
    const {getByText} = render(<ErrorModal close={closeAction} isOpen={true} />);
    const okButton = getByText('OK');
    fireEvent.click(okButton);
    expect(closeAction).toHaveBeenCalledTimes(1);
  });

  it('should trigger close on Cancel click', () => {
    const closeAction = jest.fn();
    const {getByText} = render(<ErrorModal close={closeAction} isOpen={true} />);
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(closeAction).toHaveBeenCalledTimes(1);
  });

});

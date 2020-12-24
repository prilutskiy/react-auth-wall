import React from 'react'
import { AuthWall } from './auth-wall'
import { render } from '@testing-library/react'

describe('AuthWall', () => {
  it('Should render null and complain when authHook is not provided', () => {
    const originalConsoleError = console.error;
    const mockedConsoleError: typeof originalConsoleError = jest.fn(() => '')
    console.error = mockedConsoleError;

    const wrapper = render(<AuthWall />)

    expect(mockedConsoleError).toBeCalled();
    expect(wrapper.container.firstChild).toBeNull();
  });

  it('Should render auth component when not authenticated', () => {
    const authHook = jest.fn(() => ({ isLoading: false, data: null }))
    const authComponent = jest.fn(() => <span id="auth-component" />)

    const wrapper = render(
      <AuthWall
        authHook={authHook}
        authComponent={authComponent}
      />
    );

    expect(authComponent).toBeCalled()
    expect(wrapper.container.querySelector('#auth-component')).not.toBeNull()
  });

  it('Should render app component when authenticated', () => {
    const authHook = jest.fn(() => ({ isLoading: false, data: {} }))
    const appComponent = jest.fn(() => <span id="app-component" />)

    const wrapper = render(
      <AuthWall
        authHook={authHook}
        appComponent={appComponent}
      />
    );

    expect(appComponent).toBeCalled()
    expect(wrapper.container.querySelector('#app-component')).not.toBeNull()
  });
});

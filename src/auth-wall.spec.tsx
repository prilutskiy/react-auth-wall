import React, { useEffect, useState } from 'react'
import { AuthWall } from './auth-wall'
import { render, act } from '@testing-library/react'
import { Subject } from 'rxjs'

describe('AuthWall', () => {
  it('Should render null and complain when authHook is not provided', () => {
    const originalConsoleError = console.error;
    const mockedConsoleError: typeof originalConsoleError = jest.fn(() => '')
    console.error = mockedConsoleError;

    const wrapper = render(<AuthWall />)

    console.error = originalConsoleError
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

  it('Should switch components when auth state changes', () => {
    const { authDataSubject, useTestAuth } = createTestAuth()

    const authComponent = jest.fn(() => <span id="auth-component" />)
    const appComponent = jest.fn(() => <span id="app-component" />)

    const component = (
      <AuthWall
        authHook={useTestAuth}
        authComponent={authComponent}
        appComponent={appComponent}
      />
    )

    // 1. set initial auth data, non-authenticated user
    act(() => authDataSubject.next(null))
    // 2. render a component tree
    const wrapper = render(component);
    // 3. Check that auth component is renderer
    expect(wrapper.container.querySelector('#auth-component')).not.toBeNull()
    // 4. change auth state by setting new auth data
    act(() => authDataSubject.next({}))
    // 5. Check that app component is rendered
    expect(wrapper.container.querySelector('#app-component')).not.toBeNull()
  });
});

// Tools

function createTestAuth() {
  const authDataSubject = new Subject<any>()
  const useTestAuth = () => {
    const [data, setData] = useState()
    useEffect(handleAuthChange, [])

    return { isLoading: false, data }

    function handleAuthChange() {
      const subscription = authDataSubject.subscribe({
        next: setData,
      })

      return () => subscription.unsubscribe()
    }
  }

  return {
    authDataSubject,
    useTestAuth,
  };
}

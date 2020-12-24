import React from 'react'
import { act, render } from '@testing-library/react'

import { AuthWallFirebase } from './auth-wall-firebase'

describe('AuthWallFirebase', () => {
  it('Is in loading state by default', () => {
    const firebaseAuthMock = {
      currentUser: null,
      onAuthStateChanged: jest.fn(() => jest.fn()),
    }

    const component = (
      <AuthWallFirebase
        auth={firebaseAuthMock as any}
        loaderComponent={() => <span id="loader-component" />}
      />
    )
    const wrapper = render(component)

    expect(wrapper.container.querySelector('#loader-component')).not.toBeNull()
  });
  it('Should switch to auth component when the auth data is falsy', () => {
    let onData: any;
    const onAuthStateChangedMock = jest.fn((_onData) => onData = _onData)
    const firebaseAuthMock = {
      currentUser: null,
      onAuthStateChanged: onAuthStateChangedMock,
    }

    const component = (
      <AuthWallFirebase
        auth={firebaseAuthMock as any}
        loaderComponent={() => <span id="loader-component" />}
        authComponent={() => <span id="auth-component" />}
      />
    )
    const wrapper = render(component)
    act(() => onData(null))
    expect(wrapper.container.querySelector('#auth-component')).not.toBeNull()
  });
  it('Should switch to app component when the auth data is truthy', () => {
    let onData: any;
    const onAuthStateChangedMock = jest.fn((_onData) => onData = _onData)
    const firebaseAuthMock = {
      currentUser: null,
      onAuthStateChanged: onAuthStateChangedMock,
    }

    const component = (
      <AuthWallFirebase
        auth={firebaseAuthMock as any}
        loaderComponent={() => <span id="loader-component" />}
        appComponent={() => <span id="app-component" />}
      />
    )
    const wrapper = render(component)
    act(() => onData({}))
    expect(wrapper.container.querySelector('#app-component')).not.toBeNull()
  });
});

import React from 'react'

export const AuthWall: React.FC<AuthWallProps> = (props) => {
  const authState = props.authHook?.()

  if (!authState) {
    console.error('react-auth-wall: authHook is not provided')
    return null;
  }

  if (authState.isLoading) {
    return renderLoader();
  } else {
    return authState.data ? renderApp() : renderAuth();
  }

  throw new Error('react-auth-wall: Unexpected error');

  function renderLoader() {
    return props.loaderComponent ? <props.loaderComponent /> : null;
  }

  function renderApp() {
    return props.appComponent ? <props.appComponent /> : <>{props.children}</>;
  }

  function renderAuth() {
    if (!props.authComponent) {
      console.warn('react-auth-wall: authComponent is not provided')
      return null;
    }

    return <props.authComponent />;
  }
}

export type AuthWallProps = {
  authHook?: () => { data: any; isLoading: boolean; } | undefined;

  authComponent?: React.ComponentType;
  appComponent?: React.ComponentType;
  loaderComponent?: React.ComponentType;
}

AuthWall.defaultProps = {
  authHook: () => undefined,
}

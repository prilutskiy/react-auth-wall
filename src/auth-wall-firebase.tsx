import React, { useEffect, useMemo, useState } from 'react'
import Firebase from 'firebase/app'

import { AuthWall, AuthWallProps } from './auth-wall'

export const AuthWallFirebase: React.FC<AuthWallFirebaseProps> = (props) => {
  const authHook = useMemo(() => () => useFirebaseAuth(props.auth), [props.auth])

  return (
    <AuthWall
      authHook={authHook}
      {...props}
    />
  )
}

export type AuthWallFirebaseProps = Omit<AuthWallProps, 'authHook'> & {
  auth: Firebase.auth.Auth
}

const useFirebaseAuth = (auth: Firebase.auth.Auth) => {
  const defaultAuthData = auth.currentUser;

  const isLoadingByDefault = !defaultAuthData;
  const [isLoading, setIsLoading] = useState(isLoadingByDefault);

  const [data, setData] = useState(defaultAuthData)
  const [error, setError] = useState<Firebase.auth.Error>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (newData) => {
        setData(newData);
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [auth])

  return {
    isLoading,
    data,
    error,
  }
}

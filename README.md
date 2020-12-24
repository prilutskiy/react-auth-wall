React Auth Wall
---
Components to handle protected resources in a React app.

[![Build Status](https://travis-ci.com/prilutskiy/react-auth-wall.svg?branch=master)](https://travis-ci.com/prilutskiy/react-auth-wall)
[![codecov](https://codecov.io/gh/prilutskiy/react-auth-wall/branch/master/graph/badge.svg)](https://codecov.io/gh/prilutskiy/react-auth-wall)
[![CodeFactor](https://www.codefactor.io/repository/github/prilutskiy/react-auth-wall/badge)](https://www.codefactor.io/repository/github/prilutskiy/react-auth-wall)



## 📦 Install

Install `react-auth-wall` using yarn:

```
yarn add react-auth-wall
```

## ⚙️ Usage

User is considered authenticated when `data` isn't falsy.

#### `AuthWall`


```js
import React from 'react'
import { AuthWall } from 'react-auth-wall'

export const App = () => {
  return (
    <AuthWall
      authHook={useAuth}
      authComponent={() => <div>Login form</div>}
      loaderComponent={() => <div>Loading...</div>}
    >
      My Web App
    </AuthWall>
  )
}

const useAuth = () => {
  // ... user retrieval logic here

  return { data: null, isLoading: false }
}
```


#### `AuthWallFirebase`


```js
import React from 'react'
import { AuthWallFirebase } from 'react-auth-wall'
import { firebaseApp } from './firebase'

export const App = () => {
  return (
    <AuthWallFirebase
      auth={firebaseApp.auth()}
      authComponent={() => <div>Login form</div>}
      loaderComponent={() => <div>Loading...</div>}
    >
      My Web App
    </AuthWallFirebase>
  )
}
```

import React from 'react'
import { AuthWall } from './auth-wall'
import { render } from '@testing-library/react'

describe('AuthWall', () => {
  it('Should render without exceptions', () => {
    const wrapper = render(<AuthWall />)

    expect(wrapper).toBeDefined()
  });
});

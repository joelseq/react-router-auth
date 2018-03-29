import React from 'react'
import { render } from 'react-testing-library'
import { StaticRouter } from 'react-router-dom'
import { AuthRoute } from '../index'

describe('AuthRoute Test', () => {
  const TestComponent = () => <div data-testid="test-component">Test Component</div>
  const REDIRECT_PATH = '/redirect'
  const componentProps = {
    redirectTo: REDIRECT_PATH,
    component: TestComponent,
  }

  test('It renders component if authenticated', () => {
    const props = { ...componentProps, authenticated: true }
    const context = {}

    const { queryByTestId } = render(
      <StaticRouter context={context}>
        <AuthRoute {...props} />
      </StaticRouter>
    )
    const testComponent = queryByTestId('test-component')
    expect(testComponent).toBeTruthy()
    expect(testComponent.textContent).toBe('Test Component')
    // If not redirected, then the action and url will be undefined in context
    expect(context.action).toBeUndefined()
    expect(context.url).toBeUndefined()
  })

  test('It does not render component if unauthenticated', () => {
    const props = { ...componentProps, authenticated: false }
    const context = {}

    const { queryByTestId } = render(
      <StaticRouter context={context}>
        <AuthRoute {...props} />
      </StaticRouter>
    )
    expect(queryByTestId('test-component')).toBeNull()
    // If redirected, the action and url will be set in context
    expect(context.action).toBe('REPLACE')
    expect(context.url).toBe(REDIRECT_PATH)
  })
})

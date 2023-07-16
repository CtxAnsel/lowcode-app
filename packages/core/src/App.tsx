import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import * as React from 'react'
import type { UserComponent, UserComponentConfig } from '@craftjs/core';
import { useNode } from '@craftjs/core'

export type MaterialComponent = UserComponent

/**
 * 物料组件HOC，透传 useNode Ref
 * @param WrapComponent 物料组件
 */
export function withMaterialNode<T = any>(WrapComponent: React.FunctionComponent<T>) {
  return React.forwardRef(function (props: any) {
    const { connectors: { connect, drag } } = useNode()

    return <WrapComponent ref={(dom: HTMLElement) => connect(drag(dom))} {...props} />
  })
}

/**
 * 创建React物料组件
 * @param component 物料组件
 * @param options 物料配置
 */
export function createReactMaterial<T>(component: MaterialComponent, options: Partial<UserComponentConfig<T>>) {
  component.craft = options
  return component as MaterialComponent
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

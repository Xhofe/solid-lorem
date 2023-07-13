import type { Component } from 'solid-js'
import { Lorem } from '../src'

const App: Component = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
      }}
    >
      <Lorem
        style={{
          width: '64%',
          'box-shadow': '2px 2px 10px rgba(0,0,0,0.5)',
          'border-radius': '16px',
          padding: '1rem',
        }}
      />
    </div>
  )
}

export default App

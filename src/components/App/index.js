import React from 'react'

import ModelsProvider from '../ModelsProvider'
import TaskInput from '../TaskInput'
import Manual from '../Manual'

const App = () => (
  <ModelsProvider>
    <Manual>
      <TaskInput />
    </Manual>
  </ModelsProvider>
)

export default App

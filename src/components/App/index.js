import React from 'react'

import ModelsProvider from '../ModelsProvider'
import TaskInput from '../TaskInput'

const App = () => (
  <ModelsProvider>
    <TaskInput />
  </ModelsProvider>
)

export default App

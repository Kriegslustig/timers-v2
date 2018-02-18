import React from 'react'

import Task from '../Task'
import bindViewModel from '../../utils/bindViewModel'
import mkViewModel from './viewModel'
import styles from './styles.module.css'

const TasksList = ({ viewModel }) => (
  <ul
    className={styles.container}
    onKeyDown={viewModel.handleKeyDown}
  >
    {viewModel.tasks.map((task, key) =>
      <Task
        ref={viewModel.setTaskRef(task)}
        onFocus={viewModel.handleTaskFocus(task)}
        onStart={viewModel.handleTaskStart(task)}
        task={task}
        key={key}
      />
    )}
  </ul>
)

export default bindViewModel(mkViewModel, TasksList)

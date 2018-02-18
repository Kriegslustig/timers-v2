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
        key={key}
        onFocus={viewModel.handleTaskFocus(task)}
        onStart={viewModel.handleTaskStart(task)}
        ref={viewModel.setTaskRef(task)}
        showToday={viewModel.showToday}
        task={task}
      />
    )}
  </ul>
)

export default bindViewModel(mkViewModel, TasksList)

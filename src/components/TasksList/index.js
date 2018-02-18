import React from 'react'

import Task from '../Task'
import LineChart from '../LineChart'
import bindViewModel from '../../utils/bindViewModel'
import mkViewModel from './viewModel'
import styles from './styles.module.css'

const TasksList = ({ viewModel }) => (
  <div onKeyDown={viewModel.handleKeyDown}>
    {viewModel.showLineChart && (
      <LineChart />
    )}
    <ul
      className={styles.container}
      onBlur={viewModel.handleBlur}
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
  </div>
)

export default bindViewModel(mkViewModel, TasksList)

import React from 'react'

import bindViewModel from '../../utils/bindViewModel'
import TasksList from '../TasksList'
import mkViewModel from './viewModel'
import styles from './styles.module.css'

const TaskInput = ({ viewModel, ...props }) => (
  <div onKeyDown={viewModel.handleContainerKeyDown}>
    <input
      {...props}
      className={styles.input}
      autoFocus
      type='text'
      value={viewModel.value}
      onChange={viewModel.handleChange}
      ref={viewModel.setInputRef}
      onKeyDown={viewModel.handleInputKeyDown}
    />
    <TasksList tasks={viewModel.tasks} />
  </div>
)

export default bindViewModel(mkViewModel, TaskInput)

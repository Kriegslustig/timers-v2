import React from 'react'

import Tags from '../Tags'
import TaskName from '../TaskName'
import bindViewModel from '../../utils/bindViewModel'
import cls from '../../utils/classnames'
import mkViewModel from './viewModel'
import styles from './styles.module.css'

const Task = ({ viewModel }) => (
  <li
    tabIndex={0}
    onKeyDown={viewModel.handleKeyDown}
    className={cls(
      styles.container,
      viewModel.isRunning && styles.running
    )}
    ref={viewModel.setListItemRef}
    onFocus={viewModel.handleFocus}
  >
    <p className={styles.time}>{viewModel.timeRunning}</p>
    <TaskName
      className={styles.name}
      task={viewModel.task}
      ref={viewModel.setTaskNameRef}
      onChange={viewModel.handleChangeName}
    />
    <Tags
      className={styles.tags}
      task={viewModel.task}
      ref={viewModel.setTagsRef}
    />
  </li>
)

export default bindViewModel(mkViewModel, Task)

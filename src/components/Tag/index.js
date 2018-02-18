import React from 'react'

import bindViewModel from '../../utils/bindViewModel'
import cls from '../../utils/classnames'
import mkViewModel from './viewModel'
import styles from './styles.module.css'

const Tag = ({ viewModel, className }) => (
  <li
    tabIndex={0}
    onKeyDown={viewModel.handleKeyDown}
    className={cls(styles.container, className)}
  >
    {viewModel.tag}
  </li>
)

export default bindViewModel(mkViewModel, Tag)

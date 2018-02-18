import React from 'react'

import bindViewModel from '../../utils/bindViewModel'
import cls from '../../utils/classnames'
import mkViewModel from './viewModel'
import styles from './styles.module.css'

const Tag = ({ viewModel, className }) => (
  <li
    className={cls(styles.container, className)}
    onKeyDown={viewModel.handleKeyDown}
    ref={viewModel.setRef}
    style={{ backgroundColor: viewModel.tag.color }}
    tabIndex={0}
  >
    {viewModel.tag.name}
  </li>
)

export default bindViewModel(mkViewModel, Tag)

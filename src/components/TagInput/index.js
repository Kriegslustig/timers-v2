import React from 'react'

import bindViewModel from '../../utils/bindViewModel'
import mkViewModel from './viewModel'
import styles from './styles.module.css'

const TagInput = ({ viewModel }) => (
  <input
    autoFocus
    className={styles.input}
    type='text'
    value={viewModel.value}
    onChange={viewModel.handleChange}
    onKeyDown={viewModel.handleKeyDown}
    onBlur={viewModel.handleBlur}
  />
)

export default bindViewModel(mkViewModel, TagInput)

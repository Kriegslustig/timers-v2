import React from 'react'

import bindViewModel from '../../utils/bindViewModel'
import mkViewModel from './viewModel'

const TagInput = ({ viewModel }) => (
  <input
    autoFocus
    type='text'
    value={viewModel.value}
    onChange={viewModel.handleChange}
    onKeyDown={viewModel.handleKeyDown}
    onBlur={viewModel.handleBlur}
  />
)

export default bindViewModel(mkViewModel, TagInput)

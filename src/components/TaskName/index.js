import React from 'react'

import bindViewModel from '../../utils/bindViewModel'
import mkViewModel from './viewModel'

const TaskName = ({ viewModel, className }) => viewModel.showLabel
  ? (
    <p
      className={className}
      tabIndex={0}
      onKeyDown={viewModel.handleNameKeyDown}
    >
      {viewModel.name}
    </p>
  )
  : (
    <input
      autoFocus
      className={className}
      type='text'
      onKeyDown={viewModel.handleInputKeyDown}
      onChange={viewModel.handleChange}
      value={viewModel.value}
      ref={viewModel.setInputRef}
    />
  )

export default bindViewModel(mkViewModel, TaskName)

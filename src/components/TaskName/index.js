import React from 'react'

import bindViewModel from '../../utils/bindViewModel'
import mkViewModel from './viewModel'

const TaskName = ({ viewModel, className }) => viewModel.showLabel
  ? (
    <p
      className={className}
      tabIndex={0}
      onKeyDown={viewModel.handleNameKeyDown}
      onFocus={viewModel.handleFocus}
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
      onBlur={viewModel.handleInputBlur}
      value={viewModel.value}
      ref={viewModel.setInputRef}
    />
  )

export default bindViewModel(mkViewModel, TaskName)

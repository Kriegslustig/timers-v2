import React from 'react'

import Tag from '../Tag'
import TagInput from '../TagInput'
import bindViewModel from '../../utils/bindViewModel'
import cls from '../../utils/classnames'
import mkViewModel from './viewModel'
import styles from './styles.module.css'

const Tags = ({ viewModel, className }) => (
  <ul
    tabIndex={0}
    onKeyDown={viewModel.handleKeyDown}
    className={cls(styles.container, className)}
    ref={viewModel.setListRef}
  >
    {viewModel.tags.map((tag) =>
      <Tag
        className={styles.tag}
        task={viewModel.task}
        tag={tag}
        key={tag}
      />
    )}
    {viewModel.showTagInput && (
      <TagInput
        className={styles.input}
        task={viewModel.task}
        onBlur={viewModel.handleTagInputBlur}
      />
    )}
  </ul>
)

export default bindViewModel(mkViewModel, Tags)

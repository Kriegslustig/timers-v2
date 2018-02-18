import React from 'react'

import bindViewModel from '../../utils/bindViewModel'
import mkViewModel from './viewModel'
import styles from './styles.module.css'

const LineChart = ({ viewModel }) => (
  <canvas
    className={styles.canvas}
    ref={viewModel.setRef}
    tabIndex={0}
  />
)

export default bindViewModel(mkViewModel, LineChart)

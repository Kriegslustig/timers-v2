import React from 'react'

import bindViewModel from '../../utils/bindViewModel'
import mkViewModel from './viewModel'
import styles from './styles.module.css'

const Manual = ({ viewModel, children }) => (
  <div className={styles.container} onKeyDown={viewModel.handleKeyDown}>
    {viewModel.show && (
      <section
        className={styles.manual}
        ref={viewModel.setRef}
        tabIndex={0}
      >
        <h2>Help</h2>
        <div className={styles.sections}>
          {viewModel.sections.map(([ title, items ], sectionIndex) => (
            <section key={sectionIndex}>
              <h3>{title}</h3>
              <ul>
                {items.map(([ key, description ], keyIndex) =>
                  <li key={keyIndex}>
                    <code>{key}</code>
                    <p>{description}</p>
                  </li>
                )}
              </ul>
            </section>
          ))}
        </div>
      </section>
    )}
    {children}
  </div>
)

export default bindViewModel(mkViewModel, Manual)

import React from 'react'
import * as mobx from 'mobx'
import { observer } from 'mobx-react'
import { Subject } from 'rxjs'

const bindViewModel = (mkViewModel, component) => {
  class BoundComponent extends React.Component {
    constructor (props, ctx) {
      super(props, ctx)
      this.observableProps = mobx.observable.shallowObject(props)
      this.viewModel = mkViewModel({
        props: this.observableProps,
        afterUpdate: this.afterUpdate,
        ctx
      })
      this.component = observer(component)
    }

    componentWillReceiveProps (nextProps) {
      Object.assign(this.observableProps, nextProps)
    }

    componentWillMount () {
      if (this.viewModel.componentWillMount) {
        this.viewModel.componentWillMount()
      }
    }

    componentWillUnmount () {
      if (this.viewModel.componentWillUnmount) {
        this.viewModel.componentWillUnmount()
      }
    }

    componentDidUpdate () {
      this.update$.next(this.viewModel)
    }

    update$ = new Subject()

    afterUpdate = (fn) => {
      this.update$
        .takeLast(1)
        .subscribe(fn)
    }

    render () {
      const { children, className } = this.props

      return React.createElement(
        this.component,
        { viewModel: this.viewModel, className },
        children
      )
    }
  }

  BoundComponent.contextTypes = mkViewModel.contextTypes

  return BoundComponent
}

export default bindViewModel

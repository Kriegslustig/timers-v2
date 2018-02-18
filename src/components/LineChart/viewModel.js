import * as mobx from 'mobx'
import PT from 'prop-types'
import Chart from 'chart.js'

const mkViewModel = ({ props, ctx }) => {
  const vm = mobx.observable({
    chart: undefined,

    setRef: mobx.action((ref) => {
      if (vm.chart) {
        vm.chart.destroy()
      }

      if (ref) {
        const ctx = ref.getContext('2d')
        vm.chart = new Chart(ctx, {
          type: 'line',
          data: vm.data,
          options: vm.options
        })
        ref.focus()
      }
    }),

    componentWillUnmount: () => {
      disposeReaction()
    },

    options: mobx.computed(() => ({
      responsive: true,
      scales: {
        xAxes: [{
          type: 'time',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Date'
          }
        }],
        yAxes: [{
          type: 'time',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Time Spent'
          }
        }]
      }
    })),

    data: mobx.computed(() => ({
      datasets: ctx.models.tasks.map
        .values()
        .map(task => ({
          data: task.runTimes
            .reduce(
              (values, [ from, to ]) => {
                const lastValue = values[values.length - 1]
                const newValue = {
                  x: from,
                  y:
                    (
                      lastValue
                        ? lastValue.y
                        : 0
                    ) +
                    ((to - from) / 1000 / 60)
                }

                values.push(newValue)

                return values
              },
              []
            ),

          borderColor: task.tags.length > 0
            ? task.tags[0].color
            : null,

          label: task.name,
          lineTension: 0
        }))
    }))
  })

  const disposeReaction = mobx.reaction(
    () => vm.data,
    () => {
      vm.chart.data.datasets = vm.data.datasets
      vm.chart.update()
    },
    { delay: 1000 }
  )

  return vm
}

mkViewModel.contextTypes = {
  models: PT.object.isRequired
}

export default mkViewModel

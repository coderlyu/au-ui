<template>
  <div ref="bar-1" style="height: 100%;" />
</template>
<script>
import * as echarts from 'echarts'

export default {
  name: 'rank-1',
  props: {
    dData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      bar1: null,
      options: {
        color: ['#ff4a45', '#dfb91b', '#7becff'],
        legend: {
          show: true,
          right: 0,
          textStyle: {
            color: 'fff'
          },
          selectedMode: false
        },
        grid: {
          left: 0,
          right: 20,
          bottom: 0,
          top: 25,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisPointer: {
              label: {
                show: true
              }
            },
            pdaaing: [0, 0, 0, 0],
            postion: 'right',
            data: [],
            axisLabel: {
              margin: 30,
              fontSize: 10,
              align: 'left',
              padding: [-8, 0, 0, 0],
              color: '#000',
              rich: {
                nt1: {
                  color: '#fff',
                  backgroundColor: '#981600',
                  borderColor: '#fff',
                  borderType: 'solid',
                  borderWidth: 1,
                  width: 20,
                  height: 20,
                  fontSize: 12,
                  align: 'center',
                  lineHeight: 20
                },
                nt2: {
                  color: '#fff',
                  backgroundColor: '#8e441a',
                  borderColor: '#fff',
                  borderType: 'solid',
                  borderWidth: 1,
                  width: 20,
                  height: 20,
                  fontSize: 12,
                  align: 'center',
                  lineHeight: 20
                },
                nt: {
                  color: '#fff',
                  backgroundColor: '#267d8c',
                  borderColor: '#fff',
                  borderType: 'solid',
                  borderWidth: 1,
                  width: 20,
                  height: 20,
                  fontSize: 12,
                  align: 'center',
                  lineHeight: 20
                }
              },
              formatter(value, index) {
                if (index < 2) {
                  return [`{nt${index + 1}|${index + 1}}`].join('\n')
                } return [`{nt|${index + 1}}`].join('\n')
              }
            }
          },
          { // 名称
            type: 'category',
            offset: -10,
            position: 'left',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            inverse: true,
            axisLabel: {
              interval: 0,
              color: ['#000'],
              align: 'left',
              verticalAlign: 'bottom',
              lineHeight: 32,
              fontSize: 14
            },
            data: []
          }
        ],
        series: [
          {
            name: '事件通报',
            type: 'bar',
            stack: 'total',
            barWidth: 16,
            label: {
              show: false
            },
            data: []
          },
          {
            name: '隐患通报',
            type: 'bar',
            stack: 'total',
            barWidth: 16,
            label: {
              show: false
            },
            data: []
          },
          {
            name: '',
            type: 'bar',
            stack: 'total',
            barWidth: 16,
            itemStyle: {
              color: '#eee'
            },
            cursor: 'context-menu',
            label: {
              show: false
            },
            data: []
          }
        ]
      }
    }
  },
  watch: {
    dData: {
      handler() {
        this.initData()
      },
      deep: true
    }
  },
  mounted() {
    this.bar1 = echarts.init(this.$refs['bar-1'])
    this.initData()
  },
  methods: {
    initData() {
      const events = []
      const dangers = []
      const names = []
      const empty = []
      let nums = 0
      this.dData.forEach((e, i) => {
        if (i === 0) {
          empty.push(0)
          nums = e.event + e.danger
        } else empty.push(nums - e.event - e.danger)
        events.push({ name: e.name, value: e.event })
        dangers.push({ name: e.name, value: e.danger })
        names.push(e.name)
      })
      this.options.series[0].data = events
      this.options.series[1].data = dangers
      this.options.series[2].data = empty
      this.options.yAxis[0].data = names
      this.options.yAxis[1].data = names
      this.bar1.setOption(this.options)
      this.bar1.resize()
      const _this = this
      this.bar1.on('click', (args) => {
        if (args.seriesIndex > 1) return
        _this.$emit('click', args)
      })
    }
  }
}
</script>

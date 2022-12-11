/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../assets/ts/_utils'
import {useThemeMode} from '../../layout/theme-mode/ThemeModeProvider'
import {createArrayOfData, createArrayOfYears} from '../../../../utils/HelperFunctions'

type Props = {
  className?: string
  label: string
}

const LineChartsWidget: React.FC<Props> = ({className, label}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()
  const refreshMode = () => {
    if (!chartRef.current) {
      return
    }

    const height = parseInt(getCSS(chartRef.current, 'height'))

    const chart = new ApexCharts(chartRef.current, getChartOptions(height, label))
    if (chart) {
      chart.render()
    }

    return chart
  }

  useEffect(() => {
    const chart = refreshMode()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mode])

  return (
    <div className={`card ${className}`}>
      {/*/!* begin::Header *!/*/}
      {/*<div className='card-header border-0 pt-5'>*/}
      {/*  <h3 className='card-title align-items-start flex-column'>*/}
      {/*    <span className='card-label fw-bold fs-3 mb-1'>Recent Transactions</span>*/}
      {/*    <span className='text-muted fw-semibold fs-7'>More than 1000 new records</span>*/}
      {/*  </h3>*/}

      {/*  /!* begin::Toolbar *!/*/}
      {/*  <div className='card-toolbar' data-im-buttons='true'>*/}
      {/*    <a*/}
      {/*      className='btn btn-sm btn-color-muted btn-active btn-active-primary active px-4 me-1'*/}
      {/*      id='im_charts_widget_3_year_btn'*/}
      {/*    >*/}
      {/*      Year*/}
      {/*    </a>*/}

      {/*    <a*/}
      {/*      className='btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1'*/}
      {/*      id='im_charts_widget_3_month_btn'*/}
      {/*    >*/}
      {/*      Month*/}
      {/*    </a>*/}

      {/*    <a*/}
      {/*      className='btn btn-sm btn-color-muted btn-active btn-active-primary px-4'*/}
      {/*      id='im_charts_widget_3_week_btn'*/}
      {/*    >*/}
      {/*      Week*/}
      {/*    </a>*/}
      {/*  </div>*/}
      {/*  /!* end::Toolbar *!/*/}
      {/*</div>*/}
      {/*/!* end::Header *!/*/}

      {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Chart */}
        <div ref={chartRef} id='im_charts_widget_3_chart' style={{height: '350px'}}></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {LineChartsWidget}

function getChartOptions(height: number, label: string): ApexOptions {
  const labelColor = getCSSVariableValue('--im-gray-600')
  const borderColor = getCSSVariableValue('--im-gray-300')
  const baseColor = getCSSVariableValue('--im-info')
  const lightColor = getCSSVariableValue('--im-info-light')

  return {
    series: [
      {
        name: label,
        data: createArrayOfData(),
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: [baseColor],
        fontSize: '12px',
      },
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: createArrayOfYears(),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return '$' + val + ' thousands'
        },
      },
    },
    colors: [lightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeColors: baseColor,
      strokeWidth: 3,
    },
  }
}

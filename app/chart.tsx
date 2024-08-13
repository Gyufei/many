'use client';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { Web3Context } from './web3-context';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

export default function RateChart(props: any) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const { hashRate } = useContext(Web3Context);

  const chartInitData = useMemo(() => {
    const data = [];
    const time = new Date().getTime() - 2400000;

    const dataInterSecond = 1;
    for (let i = 0; i < 2400 / dataInterSecond; i++) {
      data.push({
        x: time + i * (dataInterSecond * 1000),
        y: 0,
      });
    }

    return data;
  }, []);

  useEffect(() => {
    if (!hashRate) {
      return;
    }

    const x = new Date().getTime();
    const series = chartComponentRef.current?.chart?.series[0];
    series && series.addPoint([x, Number(hashRate)], true, false);

    updateXRange(x);
  }, [hashRate]);

  useEffect(() => {
    const inter = setInterval(() => {
      const x = new Date().getTime();
      const chartInst = chartComponentRef.current?.chart;
      const series = chartInst?.series[0];
      series && series.addPoint([x, Number(hashRate)], true, false);

      updateXRange(x);
    }, 60000);

    return () => clearInterval(inter);
  }, []);

  function updateXRange(x: number) {
    const chartInst = chartComponentRef.current?.chart;
    const xAxis = chartInst?.xAxis[0] as any;
    const min = x - 2400000;
    const max = x + 1200000;
    xAxis && xAxis.setExtremes(min, max);
  }

  const options = useMemo<Options>(
    () => ({
      chart: {
        backgroundColor: '#050303',
        type: 'line',
        marginLeft: 0,
      },
      title: {
        text: 'My hashrate',
        style: {
          color: '#F5F5F5',
          fontFamily: 'var(--font-inter)',
          fontSize: '28px',
          lineHeight: '30px',
        },
        align: 'left',
      },
      exporting: {
        enabled: false,
      },
      time: {
        useUTC: false,
      },
      xAxis: {
        type: 'datetime',
        tickInterval: 60000 * 10,
        min: new Date().getTime() - 2400000,
        max: new Date().getTime() + 1200000,
        minPadding: 0,
        maxPadding: 0,
        tickWidth: 0,
        tickLength: 0,
        title: undefined,
        lineColor: '#2C2B2B',
        lineWidth: 1,
        dateTimeLabelFormats: {
          hour: '%H:%M',
        },
        labels: {
          style: {
            color: 'rgba(255, 255, 255, 0.5)',
            fontFamily: 'var(--font-inter)',
          },
        },
        crosshair: {
          width: 2,
          color: 'rgba(247, 146, 24, 0.5)',
          label: {
            backgroundColor: 'rgba(247, 146, 24, 0.1)',
            padding: 32,
          },
        },
      },
      yAxis: {
        title: undefined,
        lineWidth: 1,
        lineColor: '#2C2B2B',
        min: -1,
        max: 100,
        gridLineWidth: 1,
        gridLineColor: 'rgba(255, 255, 255, 0.2)',
        tickWidth: 0,
        tickLength: 0,
        tickPosition: 'inside',
        showFirstLabel: false,
        labels: {
          enabled: false,
        },
      },
      series: [
        {
          name: 'Mining',
          type: 'line',
          lineColor: '#F79217',
          data: chartInitData,
        },
      ],
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: true,
                lineWidth: 6,
                lineColor: '#ffffff',
                fillColor: '#F79218',
              },
            },
          },
        },
        area: {
          fillOpacity: 0.2,
          lineWidth: 1,
          step: 'center',
        },
      },
      tooltip: {
        shared: true,
        useHTML: true,
        backgroundColor: '#222426',
        borderRadius: 10,
        borderColor: 'rgba(255, 255, 255, 0.5)', // 50% 透明度的白色边框
        borderWidth: 1,
        valueDecimals: 2,
        headerFormat:
          '<div style="color: #fff; font-size: 20px; line-height: 30px; border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-top: 8px;">{point.y} M/S</div>',
        pointFormat:
          '<div style="color: rgba(255, 255, 255, 0.5);font-size: 12px;line-height: 24px;margin-top: 6px">{point.x:%H:%M, %b %e}</div>',
        footerFormat: '',
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 479,
            },
            chartOptions: {
              chart: {
                height: 200,
              },
              title: {
                style: {
                  fontSize: '14px',
                  lineHeight: '20px',
                },
              },
              xAxis: {
                labels: {
                  style: {
                    fontSize: '12px',
                    lineHeight: '20px',
                  },
                },
              },
            },
          },
          {
            condition: {
              minWidth: 480,
            },
            chartOptions: {
              chart: {
                height: 586,
              },
              title: {
                style: {
                  fontSize: '28px',
                  lineHeight: '30px',
                },
              },
              xAxis: {
                labels: {
                  style: {
                    fontSize: '20px',
                    lineHeight: '30px',
                  },
                },
              },
            },
          },
        ],
      },
    }),
    []
  );

  return <HighchartsReact highcharts={Highcharts} options={options} ref={chartComponentRef} {...props} />;
}

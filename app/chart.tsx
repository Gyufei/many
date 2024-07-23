'use client';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { Web3Context } from './web3-context';
import { useMediaQuery } from './hook/use-media-query';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

export default function RateChart(props: any) {
  const isDesktop = useMediaQuery('(min-width: 380px)');
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const { hashRate } = useContext(Web3Context);

  useEffect(() => {
    if (hashRate) {
      const x = new Date().getTime();
      chartComponentRef.current?.chart?.series[0].addPoint([x, Number(hashRate)], true, true, true);
    }
  }, [hashRate]);

  const options = useMemo<Options>(
    () => ({
      chart: {
        backgroundColor: '#050303',
        type: 'line',
        height: isDesktop ? 585 : 199,
      },
      title: undefined,
      exporting: {
        enabled: false,
      },
      time: {
        useUTC: false,
      },
      xAxis: {
        type: 'datetime',
        // tickInterval: 60000 * 7,
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
            color: '#99A0AF',
            fontSize: '12px',
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
        min: 0,
        gridLineWidth: 0,
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
          data: (function () {
            const data = [];
            const time = new Date().getTime() - 2400000;

            for (let i = 0; i < 2400 / 15; i++) {
              data.push({
                x: time + i * (15 * 1000),
                y: 0,
              });
            }
            return data;
          })(),
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
        valueDecimals: 2,
        headerFormat:
          '<div style="color: #fff; font-size: 20px; line-height: 30px; border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-top: 8px;">{point.y} M/S</div>',
        pointFormat:
          '<div style="color: rgba(255, 255, 255, 0.5);font-size: 12px;line-height: 24px;margin-top: 6px">{point.x:%H:%M, %b %e}</div>', // 设置tooltip格式，包括时
        footerFormat: '',
      },
    }),
    []
  );

  return <HighchartsReact highcharts={Highcharts} options={options} ref={chartComponentRef} {...props} />;
}

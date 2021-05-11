import React from 'react';
import { PanelProps, DataFrameView } from '@grafana/data';
import { ColorPicker, stylesFactory } from '@grafana/ui';
import { css } from 'emotion';
import { SimpleOptions } from 'types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer } from 'recharts';
import moment from 'moment/moment';
interface LegendProps {
  payload?: any;
  options: any;
  onOptionsChange: any;
}

const CustomizedLegend: React.FC<LegendProps> = ({ payload, options, onOptionsChange }) => {
  const styles = getStyles();
  return (
    <div className={styles.legendWrapper}>
      {payload.map((entry: any, index: number) => {
        return (
          <div key={`item-${index}`} className={styles.legendItemWrapper}>
            <div className={styles.legendColor}>
              <ColorPicker
                color={entry.color}
                onChange={(color) => {
                  let newOptions = { ...options };
                  newOptions.layers[index] = color;
                  onOptionsChange(newOptions);
                }}
              />
            </div>{' '}
            {entry.value}
          </div>
        );
      })}
    </div>
  );
};

interface DataPoint {
  Time: number;
  Value: number;
}

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = (props) => {
  const styles = getStyles();

  const formatData = (input: any[]) => {
    let formattedData: any[] = [];
    input.map((srs) => {
      return new DataFrameView<DataPoint>(srs).toArray().map((dd, index) => {
        if (formattedData[index]) {
          formattedData[index] = { ...formattedData[index], [`${srs.name}`]: dd.Value };
        } else {
          formattedData[index] = { [`${srs.name}`]: dd.Value, name: moment(dd.Time).format('L') };
        }
      });
    });
    return formattedData;
  };
  if (props.data.series.length > 7) {
    return <div className={styles.stacklimit}>Maximum 7 sub-bars allowed at a time</div>;
  }
  return (
    <ResponsiveContainer width={props.width} height={props.height}>
      <BarChart data={formatData(props.data.series)}>
        <CartesianGrid />
        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} />
        <Tooltip />
        <Legend
          align="left"
          iconType="line"
          content={<CustomizedLegend options={props.options} onOptionsChange={props.onOptionsChange} />}
        />
        {props.data.series.map((srs, index) => (
          <Bar key={`${srs.name}-${index}`} dataKey={`${srs.name}`} stackId="stack" fill={props.options?.layers[index]}>
            <LabelList dataKey={`${srs.name}`} position="middle" />
          </Bar>
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

const getStyles = stylesFactory(() => {
  return {
    legendWrapper: css`
      display: flex;
    `,
    legendItemWrapper: css`
      display: flex;
      align-items: center;
      margin-right: 10px;
    `,
    legendColor: css`
      margin-right: 6px;
      & div {
        height: 6px !important;
        border-radius: 0px !important;
      }
    `,
    stacklimit: css`
      text-align: center;
    `,
  };
});

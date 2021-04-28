import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';


const labelHalfWidth = 100;
let lastLabelCoordinate;

const ArgumentLabel = props => {
  const { x } = props;
  // filter Labels
  if (
    lastLabelCoordinate &&
    lastLabelCoordinate < x &&
    x - lastLabelCoordinate <= labelHalfWidth
  ) {
    return null;
  }
  lastLabelCoordinate = x;
  return <ArgumentAxis.Label {...props} />;
};


const CustomChart = (props) => {
  const data = props.data;

  return (
    <Paper>
      <Chart
        data={data}
      >
        <ArgumentAxis labelComponent={ArgumentLabel} />
        <ValueAxis />

        <LineSeries valueField="avg_price" argumentField="checkin_date" />
      </Chart>
    </Paper>
  );
};

export default CustomChart;
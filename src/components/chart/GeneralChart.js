import React from 'react';
import Plot from 'react-plotly.js';
import './GeneralChart.css';


const GeneralChart = (props) => {

    return(
       <Plot className="chart"
              data={[
                        {
                          x: props.xValue,
                          y: props.yValue,
                          type: 'scatter',
                          mode: 'lines+markers',
                          marker: {color: 'red'},
                        },
                        {type: 'bar', x: [props.xValue], y: [props.yValue]},
                      ]}
                      layout={ {width: 1000, height: 500, title: props.selectedCoin} }
            />
    );

}

export default GeneralChart;
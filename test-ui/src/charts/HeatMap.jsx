

import ApexCharts from 'apexcharts';
import PropTypes from 'proptypes';
import React, { useEffect} from 'react';


const  HeatMapComponent = ({data, dataType, duration})=>  {

    useEffect(()=> {

    }, [ dataType, duration ]);
    const newSeries =data.map(e => {
        const name = `y =  ${e.instances[1]['pos_y']}`;
        const allData = [];
        for(let instance in  e.instances){
            allData.push(e.instances[instance]['pos_x']);
        }
        return  {
            name,
            data: allData
        };
        
    });
    var options = {
        series: newSeries,
        chart: {
            height: 500,
            width: 700,
            type: 'heatmap',
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#18D8D8',
            '#A9D794',
            '#46AF78',
            '#A93F55',
            '#8C5E58',
            '#2176FF',
            '#33A1FD',
            '#7A918D',
            '#BAFF29'],
        xaxis: {
            type: 'category',
            categories: data.map(e => e.timestamp.substr(14,16))
        },
        grid: {
            padding: {
                right: 20
            }
        },
        title: {
            text: 'Human locations across time'
        },
    };

    if(document){
        const container =   document.querySelector('#heatmap');
       
        if(container){
            let  chart = new ApexCharts(container, options);
            if(chart && data.length ){
                chart.render();
            }
          
        }
    }
    return  (<div>
        <h1>HeatMap</h1>
        <div id="heatmap"></div>
    </div>);
  
};
HeatMapComponent.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    duration: PropTypes.string,
    dataType: PropTypes.string
};
export default HeatMapComponent;


import axios from 'axios';
import {Chart as ChartJs , LineElement, CategoryScale, LinearScale, PointElement} from 'chart.js';
import React, {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';

import HeatMapComponent  from './HeatMap';

ChartJs.register(LineElement,CategoryScale,LinearScale, PointElement);


function Charts() {
    const [data, setData] = useState([]);
    const [dataType, setDataType] = useState('num_people');
    const [duration, setDuration ] = useState('6');
    const date = '2022-09-11'; // it is  a hard coded date , this need to be implemented in the ui via clender pick
    useEffect(() => {
    // Fetch data from backend API
        axios.get(`http://localhost:9000/api/data/${duration}?date=${date}`)
            .then((response) => {
                setData(response.data);
            });
    }, []);

  
    const getXData = () => {
        return data.map((d) => (new Date(d.timestamp)).toISOString().substring(14, 19));
    };

    const getYData = () => {
        if (dataType === 'num_people') {
            return data.map((d) => Object.keys(d.instances).length);
        } else if (dataType === 'x_pos') {
            return data.map((d) => d.instances[1]?.pos_x || 0);
        }
    };

    // Chart configuration
    const chartData = {
        labels: getXData(),
        height: 400,
        width: 700,
        datasets: [
            {
                label: dataType,
                data: getYData(),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            x: {
            },
            y: {
                beginAtZero: true,
            },
        },
    };
    
    return (
        <div>
            <h2>Chart</h2>
            <div>
                <label><strong>Type:</strong></label>
                <select onChange={(e) => setDataType(e.target.value)}>
                    <option value="num_people">Number of people</option>
                    <option value="x_pos">X position of human</option>
                </select>
                <label><strong>Last</strong></label>
                <select onChange={(e) => setDuration(e.target.value)}>
                    <option value="6">6H</option>
                    <option value="12">12H</option>
                    <option value="24">24H</option>
                </select>
            </div>
            <div>
                <Line data={chartData} options={chartOptions} />
            </div>
            <div>
                <HeatMapComponent data={data} dataType={dataType}  duration={duration} />
            </div>
        </div>
    );
}

export default Charts;

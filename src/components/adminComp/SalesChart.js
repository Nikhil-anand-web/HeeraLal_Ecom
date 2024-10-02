"use client"
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { toast } from "react-toastify";
import getYearWiseSales from "@/app/actions/getYearWiseSales";
import roundToXDigits from "@/lib/roundToXDigits";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
function validateYear(year) {
    // Regex pattern for years from 1900 to 2099
    const yearRegex = /^(19|20)\d{2}$/;

    return yearRegex.test(year)
}

const LineChart = ({ style }) => {
    const chartRef = useRef(null);
    const [monthlyData, setmonthlyData] = useState()
    const [countArr, setCountArr] = useState()
    const [year, setYear] = useState( parseInt(new Date(Date.now()).getFullYear()))
    const [aggregateOrder, setAgregateOrder] = useState(0)
    const [aggRev, setRev] = useState(0)

    // Handle window resize event
    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.resize(); // Force the chart to resize
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    useEffect(() => {
        const fetchFunc = async () => {
            try {
                const res = await getYearWiseSales(year)
                console.log(res)
                const coll = []
                const count = []
                let aggrOrder = 0
                let aggrSum = 0
                res.data.forEach((obj) => {
                    coll.push(obj.finalPriceSum)
                    aggrOrder += obj.orderCount

                    count.push(obj.orderCount)
                    aggrSum += obj.finalPriceSum

                });
                setAgregateOrder(aggrOrder)
                setRev(roundToXDigits(aggrSum, 1))

                setmonthlyData(coll)
                setCountArr(count)
                if (!res.success) {
                    throw res;

                }

            } catch (error) {
                console.log(error)
                toast.warning(error.message)

            }
        }
        fetchFunc()
    }, [year])

    const data = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: `Total Sales(₹${aggRev})`,
                data: monthlyData,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },

        ],
    };
    const dataCount = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"],
        datasets: [

            {
                label: `Total Orders${aggregateOrder}`,
                data: countArr,
                fill: false,
                borderColor: "#39FAFA",
                tension: 0.1,
            },


        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allows chart to resize dynamically
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Sales Revenue over Year",
            },

        },
    };
    const options2 = {
        responsive: true,
        maintainAspectRatio: false, // Allows chart to resize dynamically
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "No of orders over Year",
            },

        },
    };

    return (
        <>

            <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Year</span>
                </div>
                <input onChange={(e) => {
                    if (validateYear(e.target.value)) {
                        setYear(parseInt(e.target.value))

                    }

                }} type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
            </div>

            <div style={style}>

                <Line style={{ width: "40%" }} ref={chartRef} data={data} options={options} />
                <Line ref={chartRef} data={dataCount} options={options2} />

            </div>
        </>
    );
};

export default LineChart;

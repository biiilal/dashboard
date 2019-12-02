import React,{ useRef, useEffect, useState } from 'react';
import styled from 'styled-components'
import Chart from 'chart.js'
const Title = styled.h3`
    text-align: center;
    border-bottom: 2px solid black;
    margin: auto;
    background-color: #def1e7;
`
const Content = styled.h1`
    text-align: center;
`
const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
`
function Graph() {
    const chart1Ref = useRef()
    const chart2Ref = useRef()
    const chart3Ref = useRef()
    const chart4Ref = useRef()
    const chart5Ref = useRef()
    const [ctx, setCtx] = useState(null)
    const [chartInstance, setChartInstance] = useState(null)
    const [chartType, setChartType] = useState(null)
    const [index, setIndex] = useState(1)
    useEffect(()=> {
        getCtx()
    },[index])

    useEffect(()=> {
        if(ctx){
            createChart()
        }
    },[ctx])

    function getCtx() {
        if(index === 1) {
            setCtx(chart1Ref.current.getContext("2d"))
            setChartType('line')
            setIndex(2)
        }
        if(index === 2) {
            setCtx(chart2Ref.current.getContext("2d"))
            setChartType('bar')
            setIndex(3)
        }
        if(index === 3) {
            setCtx(chart3Ref.current.getContext("2d"))
            setChartType('line')
            setIndex(4)
        }
        if(index === 4) {
            setCtx(chart4Ref.current.getContext("2d"))
            setChartType('line')
            setIndex(5)
        }
        if(index === 5) {
            setCtx(chart5Ref.current.getContext("2d"))
            setChartType('line')
        }
    }
    function createChart () {
        setChartInstance(new Chart(ctx, {
            type: chartType,
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45],
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                      {
                        gridLines: {
                          display: false
                        }
                      }
                    ],
                    yAxes: [
                      {
                        gridLines: {
                          display: false
                        }
                      }
                    ]
                  },
            }
        }))
    }

    return (
        <div className="container" style={{padding: '5rem'}}>
            <Row>
                <div className="leftItem" style={{width: "40%", display: 'flex', border: "2px solid black"}}>
                    <div className="container1" style={{borderRight: "2px solid black", width: "50%"}} >
                        <Title>Active</Title>
                        <Content>3000</Content>
                    </div>
                    <div className="container2" style={{width: "50%"}}>
                        <Title>Register</Title>
                        <Content>15000</Content>
                    </div>
                </div>
                <div className="rightItem" style={{width: '40%'}}>
                    <canvas ref={chart1Ref} height="200px"/>
                </div>
            </Row>
            <Row>
                <div className="leftItem" style={{width: '40%'}}>
                    <canvas ref={chart2Ref} height="200px"/>
                </div>
                <div className="rightItem" style={{width: '40%'}}>
                    <canvas ref={chart3Ref} height="200px"/>
                </div>
            </Row>
            <Row>
                <div className="leftItem" style={{width: '40%'}}>
                    <canvas ref={chart4Ref} height="200px"/>
                </div>
                <div className="rightItem" style={{width: '40%'}}>
                    <canvas ref={chart5Ref} height="200px"/>
                </div>
            </Row>
        </div>
    );
  }
  
  export default Graph;
import React,{ useRef, useEffect, useState } from 'react';
import styled from 'styled-components'
import Chart from 'chart.js'
import axios from '../api/server'
import '../style.css'
import Select from 'react-select'
const Title = styled.h3`
    text-align: center;
    margin: auto;
`
const Content = styled.h1`
    text-align: center;
`
const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
`
const Container = styled.div`
    padding: 5rem;
`
const LeftItem = styled.div`
    height: 100%;
    width: 40%;
    display: flex;
`
const Container1 = styled.div`
    border-right: 2px solid #00000052;
    width: 50%;
    display: flex; 
    justify-content: center;
    flex-direction: column
`
const ContainerChart = styled.div`
    width: 40%;
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
    const [chartLabel, setChartLabel] = useState(null)
    const [chartData, setChartData] = useState(null)
    const [index, setIndex] = useState(1)
    const [registeredUsers, setRegisteredUsers] = useState(null)
    const [activeUsers, setActiveUsers] = useState(null)
    const [review, setReview] = useState(null)
    const [board, setBoard] = useState(null)
    const [chat, setChat] = useState(null)
    const [performance, setpPerformance] = useState(null)
    const [learning, setLearning] = useState(null)
    const [optionsChart2, setOptionsChart2] = useState([])
    const [selectedOptionsChart2, setSelectedOptionsChart2] = useState(null)
    const [selectedDatasetsLabelChart2, setselectedDatasetsLabelChart2] = useState(null)
    const [labelsChart2, setLabelsChart2] = useState('')
    useEffect(()=>{
        axios
          .get('/GetUserCountsactive')
          .then(({data})=> {
            setActiveUsers(data.todoList[0].Column1)
          })
    },[])
    useEffect(()=>{
        axios
          .get('/GetUserCounts')
          .then(({data})=> {
              setRegisteredUsers(data.todoList[0].RegisteredUsers)
          })
    },[])
    useEffect(()=>{
        axios
          .get('/GetUserCountsreview')
          .then(({data})=> {
              setReview(data.todoList)
              let optionData = []
              data.todoList.forEach(el=> {
                let obj = {
                    value: 'el.ClientName',
                    label: el.ClientName
                }
                optionData.push(obj)
              })
              setOptionsChart2(optionData)
              setLabelsChart2(data.todoList[0].ClientName)
              
          })
    },[])
    useEffect(()=>{
        axios
          .get('/GetUserCountsboard')
          .then(({data})=> {
          })
    },[])
    useEffect(()=>{
        axios
          .get('/GetUserCountschat')
          .then(({data})=> {
          })
    },[])
    useEffect(()=>{
        axios
          .get('/GetUserCountsperformance')
          .then(({data})=> {
          })
    },[])
    useEffect(()=>{
        axios
          .get('/GetUserCountslearning')
          .then(({data})=> {
          })
    },[])
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
            setLabelsChart2(['review', 'board', 'chat', 'performance', 'learning'])
            setIndex(3)
        }
        if(index === 3) {
            setCtx(chart3Ref.current.getContext("2d"))
            setChartType('bar')
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
                labels: labelsChart2,
                datasets: [{
                    label: selectedDatasetsLabelChart2,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 0, 0, 0, 0],
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
    function handleChangeOption2(optionValue,chart) {
        setSelectedOptionsChart2()
    }
    useEffect(()=> {
        setselectedDatasetsLabelChart2()
    },[selectedOptionsChart2])
    return (
        <Container className="container" style={{padding: '5rem'}}>
            <Row>
                <LeftItem>
                    <Container1 >
                        <Title>Active</Title>
                        {
                            activeUsers ? (
                                <Content>{activeUsers && activeUsers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Content>
                            ):(
                                <div className="lds-hourglass" style={{margin: 'auto'}}></div>)
                        }
                    </Container1>
                    <Container1>
                        <Title>Register</Title>
                        {
                            registeredUsers ? (
                                <Content>{registeredUsers && registeredUsers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Content>
                            ):(
                                <div className="lds-hourglass" style={{margin: 'auto'}}></div>)
                        }
                    </Container1>
                </LeftItem>
                <ContainerChart>
                    <canvas ref={chart1Ref} height="200px"/>
                </ContainerChart>
            </Row>
            <Row>
                <ContainerChart className="leftItem" style={{width: '40%'}}>
                    <div style={{width: '200px'}}>
                        <Select 
                            options={optionsChart2}
                            onChange={(optionValue)=>handleChangeOption2(optionValue,'chart2')}
                        />
                    </div>
                    <canvas ref={chart2Ref} height="200px"/>
                </ContainerChart>
                <ContainerChart>
                    <canvas ref={chart3Ref} height="200px"/>
                </ContainerChart>
            </Row>
            <Row>
                <ContainerChart className="leftItem" style={{width: '40%'}}>
                    <canvas ref={chart4Ref} height="200px"/>
                </ContainerChart>
                <ContainerChart>
                    <canvas ref={chart5Ref} height="200px"/>
                </ContainerChart>
            </Row>
        </Container>
    );
  }
  
  export default Graph;
import React,{ useRef, useEffect, useState } from 'react';
import styled from 'styled-components'
import Chart from 'chart.js'
import axios from '../api/server'
import '../style.css'
import Select from 'react-select'
const Title = styled.h3`
    text-align: center;
    margin: 1rem auto;
`
const ContentPercentage = styled.h1`
    text-align: center;
    color: ${props=> props.percentage ? props.countPercentage(props.active,props.register) >= 75 ? 'blue' : props.countPercentage(props.active, props.register) >= 50 && props.countPercentage(props.active, props.register) < 75 ? 'green' : props.countPercentage(props.active, props.register) < 50 && props.countPercentage(props.active, props.register) >= 25 ? '#d8d830' : 'red' : 'black'};
`
const Content = styled.h1`
    text-align : center;
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
    const [registeredUsers, setRegisteredUsers] = useState(null)
    const [activeUsers, setActiveUsers] = useState(null)
    const [chart2Data, setChart2Data] = useState({
        instance: null,
        ctx: null,
        type: null, //
        labels: null, //
        datasetsLabel: null, //
        review: null, //
        board: null, //
        chat: null, //
        performance: null, //
        learning: null, //
        options: null, //
        clientName: null
    })
    const [chart2Index, setChart2Index] = useState(0)
    const [chart2IsCreate, setChart2IsCreate] = useState(false)
    useEffect(()=>{
        axios
          .get('/GetUserCountsactive')
          .then(({data})=> {
            setActiveUsers(data.todoList[chart2Index].Column1)
          })
    },[])
    useEffect(()=>{
        axios
          .get('/GetUserCounts')
          .then(({data})=> {
              setRegisteredUsers(data.todoList[chart2Index].RegisteredUsers)
          })
    },[])
    useEffect(()=>{
        fetchChart2Review()
    },[])
    function fetchChart2Review() {
        axios
          .get('/GetUserCountsreview')
          .then(({data})=>{
            let tempData = []
            let tempClientName = []
            data.todoList.forEach(el=>{
                let obj = {
                    value: el.ClientName,
                    label: el.ClientName
                }
                tempData.push(obj)
                tempClientName.push(el.ClientName)
            })
            setChart2Data({
                ...chart2Data,
                options: tempData,
                labels: ['REVIEW','LEARNING','PERFORMANCE','CHAT','BOARD'],
                type: 'bar',
                datasetsLabel: data.todoList[chart2Index] && data.todoList[chart2Index].ClientName,
                review: data.todoList && data.todoList[chart2Index].ReviewUser,
                clientName: tempClientName
            })
          })
          .catch(err => {
              console.log(err,'error fetch chart2Data')
          })
    }
    useEffect(()=>{
        const {options, labels, instance, type, datasetsLabel, review, board} = chart2Data
        if(options && labels && type && datasetsLabel && review && !board) {
        // if(!board && !instance) {
            axios
              .get('/GetUserCountsboard')
              .then(({data})=> {
                setChart2Data({
                    ...chart2Data,
                    board: data.todoList.length > 0 ? data.todoList[chart2Index].PerformanceUser : "0"
                })
              })
              .catch(err => {
                console.log(err,'error fetch chart2Data')
              })
        }
    },[chart2Data])
    useEffect(()=>{
        const {board, chat, instance} = chart2Data
        if(board && !chat) {
            // if(!chat && !instance) {
            axios
              .get('/GetUserCountschat')
              .then(({data})=> {
                setChart2Data({
                    ...chart2Data,
                    chat: data.todoList.length > 0 ? data.todoList[chart2Index].PerformanceUser : "0"
                })
              })
              .catch(err => {
                console.log(err,'error fetch chart2Data')
              })
        }
    },[chart2Data])
    useEffect(()=>{
        const {chat, instance, performance} = chart2Data
        if(chat && !performance) {
            // if(!performance && !instance) {
            axios
              .get('/GetUserCountsperformance')
              .then(({data})=> {
                setChart2Data({
                    ...chart2Data,
                    performance: data.todoList.length > 0 ? data.todoList[chart2Index].PerformanceUser : "0"
                })
              })
              .catch(err => {
                console.log(err,'error fetch chart2Data')
              })
        }
    },[chart2Data])
    useEffect(()=>{
        const {performance, learning, instance} = chart2Data
        if(performance && !learning) {
            // if(!learning && !instance) {
            axios
              .get('/GetUserCountslearning')
              .then(({data})=> {
                setChart2Data({
                    ...chart2Data,
                    learning: data.todoList.length > 0 ? data.todoList[chart2Index].PerformanceUser : "0"
                })
              })
              .catch(err => {
                console.log(err,'error fetch chart2Data')
              })
        }
    },[chart2Data])
    useEffect(()=> {
        console.log(chart2Data,'data')
        const {ctx, type, labels, datasetsLabel, review, board, chat, performance, learning, options, instance} = chart2Data
        if(type && labels && datasetsLabel && review && board && chat && performance && learning && options && !ctx){
            getCtx(2)
        }
        if(ctx && !instance){
            console.log('create chart')
            createChart2()
        }
    },[chart2Data])

    function getCtx(index) {
        if(index === 1) {
            // setCtx(chart1Ref.current.getContext("2d"))
            // setChartType('line')
            // setIndex(2)
        }
        if(index === 2) {
            setChart2Data({
                ...chart2Data,
                ctx: chart2Ref.current.getContext("2d")
            })
            // setChartType('bar')
            // setLabelsChart2(['review', 'board', 'chat', 'performance', 'learning'])
            // setIndex(3)
        }
        if(index === 3) {
            // setCtx(chart3Ref.current.getContext("2d"))
            // setChartType('bar')
            // setIndex(4)
        }
        if(index === 4) {
            // setCtx(chart4Ref.current.getContext("2d"))
            // setChartType('line')
            // setIndex(5)
        }
        if(index === 5) {
            // setCtx(chart5Ref.current.getContext("2d"))
            // setChartType('line')
        }
    }
    function createChart2 () {
        const {ctx, type, labels, datasetsLabel, review, learning, performance, chat, board, instance} = chart2Data
        setChart2Data({
            ...chart2Data,
            instance: new Chart(ctx, {
                type: type,
                data: { 
                    labels: labels,
                    datasets: [{
                        label: datasetsLabel,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: [review, learning, performance, chat, board],
                        fill: false
                    }],
                    order: 0
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
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }
                        ]
                    },
                }
            })
        })
        setChart2IsCreate(false)
    }
    function handleChangeOptionChart2({value}) {
        setChart2Index(chart2Data.clientName.findIndex((el)=>  el === value ))
    }
    useEffect(()=> {
        if(chart2Data.instance){
            console.log('destroy')
            chart2Data.instance.destroy()
            setChart2IsCreate(true)
            setChart2Data({
                ...chart2Data,
                review: null,
                board: null,
                chat: null,
                performance: null,
                learning: null,
                ctx: null,
                instance: null,
                type: null,
                labels: null
            })
        }
    },[chart2Index])
    useEffect(()=> {
        if(chart2IsCreate) {
            fetchChart2Review()
        }
    }, [chart2IsCreate])
    function countPercentage(active,register) {
        let result = Math.round(Number(active) / Number(register) * 100)
        return result
    }
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
                    <Container1>
                        <Title>Percentage</Title>
                        {
                            registeredUsers ? (
                                <ContentPercentage percentage={true} active={activeUsers} register={registeredUsers} countPercentage={countPercentage}>{registeredUsers && activeUsers && countPercentage(activeUsers,registeredUsers)} %</ContentPercentage>
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
                    {
                        chart2Data.instance ?(
                            <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem'}}>
                                <div style={{width: '200px'}}>
                                    <Select 
                                        options={chart2Data.options}
                                        onChange={(optionValue)=>handleChangeOptionChart2(optionValue,'chart2')}
                                    />
                                </div>
                            </div>
                        ):(
                            <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
                                <div className="lds-hourglass" style={{margin: 'auto'}}></div>
                            </div>)
                    }
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
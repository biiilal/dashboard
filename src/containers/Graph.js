import React,{ useRef, useEffect, useState } from 'react';
import styled from 'styled-components'
import Chart from 'chart.js'
import axios from '../api/server'
import '../style.css'
import Select from 'react-select'
import errorIcon from '../assets/errorIcon.png'
import emptyChartIcon from '../assets/emptyChartIcon.png'
import smallError from '../assets/smallError.gif'
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
    max-height: 30vh;
    min-height: 30vh;
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
    display: flex;
    justify-content: center;
    flex-direction: ${props=> props.isChart2 ? 'column': null};
    align-items: ${props=> props.isChart2 ? 'center': null};
`
const Icon = styled.img`
    width: 70%;
    height: ${props=> props.isSmallIcon ? '80%': '100%'};
`
function Graph() {
    const chart1Ref = useRef()
    const chart2Ref = useRef()
    const chart3Ref = useRef()
    const chart4Ref = useRef()
    const chart5Ref = useRef()
    const [registeredUsers, setRegisteredUsers] = useState(null)
    const [activeUsers, setActiveUsers] = useState(null)
    const [activeUserError, setActiveUserError] = useState(false)
    const [registeredUserError, setRegisteredUserError] = useState(false)
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
        clientName: null,
        isLoading: false
    })
    const [selectedOption, setSelectedOption] = useState(null)
    const [chart2Index, setChart2Index] = useState(0)
    const [chart2IsCreate, setChart2IsCreate] = useState(false)
    const [chart2Error, setChart2Error] = useState(false)
    const [chart3Data, setChart3Data] = useState({
        instance: null,
        ctx: null,
        type: null,
        labels: null,
        datasetsLabel: null,
        data: null,
        isLoading: false
    })
    const [chart3Error,setChart3Error] = useState(false)
    useEffect(()=>{
        fetchActiveUser()
    },[])
    function fetchActiveUser (){
        setActiveUserError(false)
        axios
          .get('/GetUserCountsactive')
          .then(({data})=> {
            setActiveUsers(data.todoList[chart2Index].Column1)
          })
          .catch(err => {
              setActiveUserError(true)
          })
    }

    useEffect(()=>{ 
        fetchRegisteredUser()
    },[])
    function fetchRegisteredUser() {
        setRegisteredUserError(false)
        axios
          .get('/GetUserCounts')
          .then(({data})=> {
              setRegisteredUsers(data.todoList[chart2Index].RegisteredUsers)
          })
          .catch(err => {
              setRegisteredUserError(true)
          })
    }
    useEffect(()=>{
        fetchChart2Review()
    },[])

    function fetchChart2Review() {
        setChart2Data({
            ...chart2Data,
            isLoading: true
        })
        setChart2Error(false)
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
                datasetsLabel: 'Active User By Module',
                review: data.todoList.length > 0 ? data.todoList[chart2Index] && data.todoList[chart2Index].ReviewUser : "0",
                clientName: tempClientName,
            })
            setSelectedOption({
                value: data.todoList.length > 0 ? data.todoList[chart2Index] && data.todoList[chart2Index].ClientName : '',
                label: data.todoList.length > 0 ? data.todoList[chart2Index] && data.todoList[chart2Index].ClientName : ''
            })
          })
          .catch(err => {
              setChart2Error(true)
              console.log(err,'error fetch chart2Data review')
          })
    }

    useEffect(()=>{
        const {options, labels, instance, type, datasetsLabel, review, board, chat, performance, learning} = chart2Data
        if(options && labels && type && datasetsLabel && review && !board) {
            axios
              .get('/GetUserCountsboard')
              .then(({data})=> {
                setChart2Data({
                    ...chart2Data,
                    board: data.todoList.length > 0 ? data.todoList[chart2Index] && data.todoList[chart2Index].PerformanceUser : "0"
                })
              })
              .catch(err => {
                setChart2Error(true)
                console.log(err,'error fetch chart2Data board')
              })
        }
        if(board && !chat) {
            axios
              .get('/GetUserCountschat')
              .then(({data})=> {
                setChart2Data({
                    ...chart2Data,
                    chat: data.todoList.length > 0 ? data.todoList[chart2Index] && data.todoList[chart2Index].PerformanceUser : "0"
                })
              })
              .catch(err => {
                setChart2Error(true)
                console.log(err,'error fetch chart2Data chat')
              })
        }
        if(chat && !performance) {
            axios
              .get('/GetUserCountsperformance')
              .then(({data})=> {
                setChart2Data({
                    ...chart2Data,
                    performance: data.todoList.length > 0 ? data.todoList[chart2Index] && data.todoList[chart2Index].PerformanceUser : "0"
                })
              })
              .catch(err => {
                setChart2Error(true)
                console.log(err,'error fetch chart2Data perfromance')
              })
        }
        if(performance && !learning) {
            axios
              .get('/GetUserCountslearning')
              .then(({data})=> {
                setChart2Data({
                    ...chart2Data,
                    learning: data.todoList.length > 0 ?  data.todoList[chart2Index] && data.todoList[chart2Index].PerformanceUser : "0",
                    isLoading: false
                })
              })
              .catch(err => {
                setChart2Error(true)
                console.log(err,'error fetch chart2Data learning')
              })
        }
    },[chart2Data])

    useEffect(()=> {
        fetchChart3Data()
    },[])
    function fetchChart3Data() {
        setChart3Data({
            ...chart3Data,
            isLoading: true
        })
        setChart3Error(false)
        axios
          .get('/GetUserActivePerClient')
          .then(({data})=> {
              let clientNames = []
              let activeCounts = []
              data.todoList.forEach(el => {
                  clientNames.push(el.ClientName)
                  activeCounts.push(el.Column1)
              })
                setChart3Data({
                    ...chart3Data,
                    type: 'bar',
                    labels: clientNames,
                    datasetsLabel: 'Active User By Client',
                    data: activeCounts,
                    isLoading: false
                })
          })
          .catch(err => {
              console.log('error')
            setChart3Error(true)
          })
    }
    useEffect(()=> {
        const {data, labels, ctx, instance, isLoading} = chart3Data
        if(data && labels && !ctx && !isLoading) {
            getCtx(3)
        }
        if(ctx && !instance) {
            createChart3()
        }
    },[chart3Data])

    useEffect(()=> {
        const {ctx, type, labels, datasetsLabel, review, board, chat, performance, learning, options, instance, isLoading} = chart2Data
        if(type && labels && datasetsLabel && review && board && chat && performance && learning && options && !ctx && !isLoading){
            getCtx(2)
        }
        if(ctx && !instance){
            createChart2()
        }
    },[chart2Data])

    function getCtx(index) {
        if(index === 1) {
        }
        if(index === 2) {
            setChart2Data({
                ...chart2Data,
                ctx: chart2Ref.current.getContext("2d")
            })
        }
        if(index === 3) {
            setChart3Data({
                ...chart3Data,
                ctx: chart3Ref.current.getContext("2d")
            })
        }
        if(index === 4) {
        }
        if(index === 5) {
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
    
    useEffect(()=> {
        if(chart2Error){
            setChart2Data({
                ...chart2Data,
                isLoading: false
            })
        }
    },[chart2Error])

    useEffect(()=> {
        console.log(chart3Data,'data chart3')
        if(chart3Error){
            setChart3Data({
                ...chart3Data,
                isLoading: false
            })
        }
    },[chart3Error])
    function createChart3 () {
        const {ctx, type, labels, datasetsLabel, data} = chart3Data
        setChart3Data({
            ...chart3Data,
            instance: new Chart(ctx, {
                type: type,
                data: { 
                    labels: labels,
                    datasets: [{
                        label: datasetsLabel,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: data,
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
    function handleChangeOptionChart2(value) {
        setChart2Index(chart2Data.clientName.findIndex((el)=>  el === value.value ))
        setSelectedOption(value)
        setChart2Data({
            ...chart2Data,
            isLoading: true
        })
    }
    useEffect(()=> {
        if(chart2Data.instance){
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
                            activeUserError ? (
                                <Icon isSmallIcon={true} src={smallError} onClick={()=> fetchActiveUser()} style={{cursor: 'pointer'}} />
                            ):(
                                activeUsers ? (
                                    <Content>{activeUsers && activeUsers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Content>
                                ):(
                                    <div className="lds-hourglass" style={{margin: 'auto'}}></div>)
                            )
                        }
                    </Container1>
                    <Container1>
                        <Title>Register</Title>
                        {   
                            registeredUserError ? (
                                <Icon isSmallIcon={true} src={smallError} onClick={()=> fetchRegisteredUser()} style={{cursor: 'pointer'}}/>
                            ):(
                                registeredUsers ? (
                                    <Content>{registeredUsers && registeredUsers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Content>
                                ):(
                                    <div className="lds-hourglass" style={{margin: 'auto'}}></div>)
                            )
                        }
                    </Container1>
                    <Container1>
                        <Title>Percentage</Title>
                        {
                            registeredUserError || activeUserError ? (
                                <Icon isSmallIcon={true} src={smallError} />
                            ):(
                                registeredUsers ? (
                                    <ContentPercentage percentage={true} active={activeUsers} register={registeredUsers} countPercentage={countPercentage}>{registeredUsers && activeUsers && countPercentage(activeUsers,registeredUsers)} %</ContentPercentage>
                                ):(
                                    <div className="lds-hourglass" style={{margin: 'auto'}}></div>)
                            )
                        }
                    </Container1>
                </LeftItem>
                <ContainerChart>
                    {/* <canvas ref={chart1Ref} height="200px"/> */}
                    <Icon src={emptyChartIcon} />
                </ContainerChart>
            </Row>
            <Row>
                <ContainerChart isChart2={true} className="leftItem" style={{width: '40%'}}>
                    {
                        chart2Data.isLoading ?(
                            <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
                                <div className="lds-hourglass" style={{margin: 'auto'}}></div>
                            </div>
                        ):(
                            chart2Error ? (
                                <Icon src={errorIcon} onClick={()=>fetchChart2Review()} style={{cursor: 'pointer'}} />
                            ):(
                                <>
                                    <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', width: '100%'}}>
                                        <div style={{width: '200px'}}>
                                            <Select 
                                                value={selectedOption}
                                                options={chart2Data.options}
                                                onChange={(optionValue)=>handleChangeOptionChart2(optionValue,'chart2')}
                                            />
                                        </div>
                                    </div>
                                    <canvas ref={chart2Ref} height="200px"/>
                                </>)
                        )
                    }
                </ContainerChart>
                <ContainerChart>
                    {
                        chart3Data.isLoading ? (
                            <>
                                <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
                                    <div className="lds-hourglass" style={{margin: 'auto'}}></div>
                                </div>
                            </>
                        ):(
                            chart3Error ? (
                                <Icon src={errorIcon} onClick={()=> fetchChart3Data()} style={{cursor: 'pointer'}}/>
                            ):(
                                <canvas ref={chart3Ref} height="200px"/>)
                        )
                    }
                </ContainerChart>
            </Row>
            <Row>
                <ContainerChart className="leftItem" style={{width: '40%'}}>
                    {/* <canvas ref={chart4Ref} height="200px"/> */}
                    <Icon src={emptyChartIcon} />
                </ContainerChart>
                <ContainerChart>
                    {/* <canvas ref={chart5Ref} height="200px"/> */}
                    <Icon src={emptyChartIcon} />
                </ContainerChart>
            </Row>
        </Container>
    );
  }
  
  export default Graph;
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
    padding: 3rem;
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
    width: ${props=> props.isEmpty ? '30%' : '45%'};
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
    const chart0Ref = useRef()
    const chart1Ref = useRef()
    const chart2Ref = useRef()
    const chart3Ref = useRef()
    const chart4Ref = useRef()
    const chart5Ref = useRef()
    const [registeredUsers, setRegisteredUsers] = useState(null)
    const [activeUsers, setActiveUsers] = useState(null)
    const [activeUserError, setActiveUserError] = useState(false)
    const [registeredUserError, setRegisteredUserError] = useState(false)
    const [chart0Data, setChart0Data] = useState({
        instance: null,
        ctx: null,
        type: null,
        labels: null,
        datasetsLabel: null,
        data: null
    })
    const [chart2Data, setChart2Data] = useState({
        instance: null,
        ctx: null,
        type: null, //
        labels: null, //
        datasetsLabel: null, //
        options: null, //
        clientName: null,
        isLoading: false,
        data: null
    })
    const [chart2DataServer,setChart2DataServer] = useState({
        learning: null,
        review: null,
        performance: null,
        chat: null,
        board: null
    })
    const [filterData, setFilterData] = useState(null)
    const [clients, setClients] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
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
        fetchRegisteredUser()
    },[])
    useEffect(()=> {
        const {learning, review, performance, chat, board} = chart2DataServer
        if(!learning && !chart2Error) {
           fetchChart2Learning() 
        }
        if(learning && !review && !chart2Error){
            fetchChart2Review()
        }
        if(review && !performance && !chart2Error){
            fetchChart2Performance()
        }
        if(performance && !chat && !chart2Error){
            fetchChart2Chat()
        }
        if(chat && !board && !chart2Error){
            fetchChart2Board()
        }
    },[chart2DataServer])
    function fetchActiveUser (){
        setActiveUserError(false)
        axios
          .get('/GetUserCountsactive')
          .then(({data})=> {
            setActiveUsers(data.todoList[0].Column1)
          })
          .catch(err => {
              setChart2Error(true)
              setActiveUserError(true)
          })
    }
    function fetchRegisteredUser() {
        setRegisteredUserError(false)
        axios
          .get('/GetUserCounts')
          .then(({data})=> {
              setRegisteredUsers(data.todoList[0].RegisteredUsers)
          })
          .catch(err => {
              setChart2Error(true)
              setRegisteredUserError(true)
          })
    }
    useEffect(()=>{
        if(activeUsers && registeredUsers){
            setChart0Data({
                ...chart0Data,
                type: 'pie',
                data: [Number(activeUsers), Number(registeredUsers)],
                labels: ['Active Users', 'Register Users']
            })
        }
    },[activeUsers, registeredUsers])
    useEffect(()=> {
        const {type, data, labels, ctx, instance} = chart0Data
        if(type && data && labels && !ctx ){
            getCtx(0)
        }
        if(ctx && !instance) {
            createChart0()
        }
    },[chart0Data])
    function createChart0 () {
        const {ctx, type, labels, datasetsLabel, data} = chart0Data
        setChart0Data({
            ...chart0Data,
            instance: new Chart(ctx, {
                type: type,
                data: { 
                    labels: labels,
                    datasets: [{
                        backgroundColor: ['#1E90FF','rgb(255, 99, 132)'],
                        borderColor: ['#1E90FF','rgb(255, 99, 132)'],
                        data: data,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                }
            })
        })
    }

    function fetchChart2Learning() {
        setChart2Data({
            isLoading: true
        })
        setChart2Error(false)
        axios
          .get('GetUserCountslearning')
          .then(({data}) => {
            setChart2DataServer({
                ...chart2DataServer,
                learning: data.todoList,
            })
          })
          .catch(err => {
            setChart2Error(true)
            console.log('fetch learning error')
          })
    }
    function fetchChart2Review() {
        axios
          .get('GetUserCountsreview')
          .then(({data}) => {
            setChart2DataServer({
                ...chart2DataServer,
                review: data.todoList
            })
          })
          .catch(err => {
            setChart2Error(true)
            console.log('fetch review error')
          })
    }
    function fetchChart2Performance() {
        axios
          .get('GetUserCountsperformance')
          .then(({data}) => {
            setChart2DataServer({
                ...chart2DataServer,
                performance: data.todoList
            })
          })
          .catch(err => {
            setChart2Error(true)
            console.log('fetch performance error')
          })
    }
    function fetchChart2Chat() {
        axios
          .get('GetUserCountschat')
          .then(({data}) => {
            setChart2DataServer({
                ...chart2DataServer,
                chat: data.todoList
            })
          })
          .catch(err => {
            setChart2Error(true)
            console.log('fetch chat error')
          })
    }
    function fetchChart2Board() {
        axios
          .get('GetUserCountsboard')
          .then(({data}) => {
            setChart2DataServer({
                ...chart2DataServer,
                board: data.todoList
            })
          })
          .catch(err => {
            setChart2Error(true)
            console.log('fetch board error')
          })
    }
    useEffect (()=> {
        const {learning, review, performance, chat, board} = chart2DataServer
        if(learning && review && performance && chat && board) {
            let filter = {}
            learning.forEach(el=> {
                if(!filter[el.ClientName]) {
                    filter[el.ClientName] = {}
                    filter[el.ClientName].learning = el.PerformanceUser
                    filter[el.ClientName].review = "0"
                    filter[el.ClientName].performance = "0"
                    filter[el.ClientName].chat = "0"
                    filter[el.ClientName].board = "0"
                }else filter[el.ClientName].learning = el.PerformanceUser
            })
            review.forEach((el,i)=> {
                if(!filter[el.ClientName]){ 
                    filter[el.ClientName] = {}
                    filter[el.ClientName].learning = "0"
                    filter[el.ClientName].review = el.ReviewUser
                    filter[el.ClientName].performance = "0"
                    filter[el.ClientName].chat = "0"
                    filter[el.ClientName].board = "0"
                }
                else filter[el.ClientName].review = el.ReviewUser
            })
            performance.forEach(el => {
                if(!filter[el.ClientName]){ 
                    filter[el.ClientName] = {}
                    filter[el.ClientName].learning = "0"
                    filter[el.ClientName].review = "0"
                    filter[el.ClientName].performance = el.PerformanceUser
                    filter[el.ClientName].chat = "0"
                    filter[el.ClientName].board = "0"
                }
                else filter[el.ClientName].performance = el.PerformanceUser
            })
            chat.forEach(el => {
                if(!filter[el.ClientName]){ 
                    filter[el.ClientName] = {}
                    filter[el.ClientName].learning = "0"
                    filter[el.ClientName].review = "0"
                    filter[el.ClientName].performance = "0"
                    filter[el.ClientName].chat = el.PerformanceUser
                    filter[el.ClientName].board = "0"
                }
                else filter[el.ClientName].chat = el.PerformanceUser
            })
            board.forEach(el => {
                if(!filter[el.ClientName]){ 
                    filter[el.ClientName] = {}
                    filter[el.ClientName].learning = "0"
                    filter[el.ClientName].review = "0"
                    filter[el.ClientName].performance = "0"
                    filter[el.ClientName].chat = "0"
                    filter[el.ClientName].board = el.PerformanceUser
                }
                else filter[el.ClientName].board = el.PerformanceUser
            })
            let clientsTemp = []
            let totalLearning = 0
            let totalReview = 0
            let totalPerformance = 0
            let totalChat = 0
            let totalBoard = 0

            for (const key in filter) {
                clientsTemp.push(key)
                totalLearning += Number(filter[key].learning)
                totalReview += Number(filter[key].review)
                totalPerformance += Number(filter[key].performance)
                totalChat += Number(filter[key].chat)
                totalBoard += Number(filter[key].board)
            }
            filter.all = {}
            filter.all.learning = totalLearning 
            filter.all.review = totalReview
            filter.all.performance = totalPerformance
            filter.all.chat = totalChat
            filter.all.board = totalBoard
            setClients(clientsTemp)
            setFilterData(filter)
            let optionTemp = [{
                value: 'all',
                label: 'all'
            }]
            clientsTemp.forEach(el => {
                let obj = {
                    value: el,
                    label: el
                }
                optionTemp.push(obj)
            })
            setChart2Data({
                ...chart2Data,
                options: optionTemp
            })
            setSelectedOption({
                value: optionTemp[1].value,
                label: optionTemp[1].label
            })
        }
    },[chart2DataServer])
    useEffect(()=> {
        if(selectedOption) {
            setChart2Data({
                ...chart2Data,
                type: 'bar',
                labels: ['Learning', 'Review', 'Performance', 'Chat', 'Board'],
                datasetsLabel: 'Active User By Module',
                data: [filterData[selectedOption.value].learning, filterData[selectedOption.value].review, filterData[selectedOption.value].performance, filterData[selectedOption.value].chat, filterData[selectedOption.value].board],
                isLoading: false
            })
            
        }
    }, [selectedOption])
    useEffect(()=> {
        const {ctx, type, labels, datasetsLabel, options, instance, isLoading} = chart2Data
        if(type && labels && datasetsLabel && options && !ctx && !isLoading){
            getCtx(2)
        }
        if(ctx && !instance){
            createChart2()
        }
    },[chart2Data])
    function getCtx(index) {
        if(index === 0) {
            setChart0Data({
                ...chart0Data,
                ctx: chart0Ref.current.getContext("2d")
            })
        }
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
        const {ctx, type, labels, datasetsLabel, data} = chart2Data
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
                        data: data,
                        fill: false
                    }],
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
    }
    useEffect(()=> {
        if(chart2Error){
            setChart2Data({
                ...chart2Data,
                isLoading: false
            })
        }
    },[chart2Error])
    function handleChangeOptionChart2(value) {
        if(value !== selectedOption){
            chart2Data.instance.destroy()
            setSelectedOption(value)
            setChart2Data({
                ...chart2Data,
                isLoading: true,
                data: null,
                ctx: null,
                instance: null
            })
        }
    }

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
                    type: 'horizontalBar',
                    labels: clientNames,
                    datasetsLabel: 'Active User By Client',
                    data: activeCounts,
                    isLoading: false
                })
          })
          .catch(err => {
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
    }
    function countPercentage(active,register) {
        let result = Math.round(Number(active) / Number(register) * 100)
        return result
    }
    return (
        <Container className="container">
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
                <div style={{width: '30%', display: 'flex', justifyContent: 'center'}}>
                        <canvas ref={chart0Ref} height="200px"/>
                </div>
                <ContainerChart isEmpty={true}>
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
                                <Icon src={errorIcon} onClick={()=> fetchChart2Learning()} style={{cursor: 'pointer'}} />
                            ):(
                                <>
                                    <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', width: '100%'}}>
                                        <div style={{width: '200px'}}>
                                            <Select 
                                                value={selectedOption}
                                                options={chart2Data.options}
                                                onChange={(optionValue)=>handleChangeOptionChart2(optionValue)}
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
                <ContainerChart isEmpty={true} className="leftItem">
                    {/* <canvas ref={chart4Ref} height="200px"/> */}
                    <Icon src={emptyChartIcon} />
                </ContainerChart>
                <ContainerChart isEmpty={true}>
                    {/* <canvas ref={chart5Ref} height="200px"/> */}
                    <Icon src={emptyChartIcon} />
                </ContainerChart>
            </Row>
        </Container>
    );
  }
  
  
  export default Graph;
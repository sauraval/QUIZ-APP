import { Row,Col,Button } from 'react-bootstrap'
import './App.css'
import Quiz from './Questions'
import { useState,useEffect } from 'react'
function App() {
  const [question,setQuestion]=useState()
  const [red,setRed]=useState()
  const [green,setGreen]=useState(false)
  const [mark,setMark]=useState(0)
  const [questionStoring,setQuestionStoring]=useState([])
  const [timer, setTimer] = useState(15); // Initial timer value in seconds
  // const backgroundgif={backgroundImage:`url("${win}")`}
  // random choosing
  const randomChoosing=()=>{
    let randomSelect=Math.floor(Math.random() * (14 - 0 + 1)) + 0
    if(!questionStoring.includes(randomSelect)){
      setQuestionStoring([...questionStoring,randomSelect])
      return setQuestion(randomSelect)
    }
    else{
      randomChoosing()
    }
  }

  // Next Question/start

  const nextQuest=()=>{
    randomChoosing()
    setGreen(false)
    setRed()
    setTimer(15)
    }
    
    // Get Mark

    const getMark=()=>{
      setQuestionStoring([...questionStoring,''])
    }
  
    // play Again

  const playAgain=()=>{
    setQuestionStoring([])
    setGreen(false)
    setRed()
    setMark(0)
    setTimer(15)
  }

  // Check if the answer is true or not 
  const check=(id)=>{
    if(id.length>0){
      setRed(id)
      setGreen(true)
    }
    else{
      setGreen(true)
      setMark(mark+1)
    }
  }
  // timer
  useEffect(() => {
    let interval;
    if (timer > 0) {
      // Start the timer interval
      interval = setInterval(() => {
       questionStoring.length>0&&setTimer((prevTimer) => prevTimer - 1);
        if(timer==1){
          if(questionStoring.length==15){
            getMark()
          }
          else if(questionStoring.length===6&&mark<3){
            playAgain()
          }
          else{
            nextQuest()
          }
          
        }
      }, 1000);
    } else {
      // Quiz is over, clear the interval
      clearInterval(interval);
    }

    // Clean up the interval on component unmount or when the quiz is over
    return () => clearInterval(interval);
  }, [timer,nextQuest,playAgain]);
  console.log(timer);
  console.log(questionStoring);
  return (
    <>
      <div  style={{height:'100vh'}}  className="main bg-dark d-flex justify-content-center align-items-center w-100">
    
         {
         questionStoring==''?
         <div className='text-white text-center'>
          <h1>GK Quiz</h1>
          <Button variant='primary' className='w-25' onClick={nextQuest}>Let's start</Button>
         </div>
         :
         questionStoring.length===6&&mark<3?
         <div className='text-white text-center'>
         <h1>Your Score is below 3 <br/> you can't go to next stage❌</h1>
         <Button onClick={playAgain} variant='primary'>Play Again</Button>
         </div>
         :questionStoring.length===16?
          <div id={mark>=7&&mark<=11||mark>=12?'background-gif':''} className='result text-center d-flex flex-column justify-content-center align-items-center text-white'>

          <h1>{mark>=7&&mark<=11?'Steady progress! Keep it up! 🌟':mark>=12?'Great job!You Won🥳👏🏻':'Better Luck Next Time!👎🏻☹️'}</h1>
          <h3>{`Score ${mark}/15`}</h3>
          <Button  onClick={playAgain} className='w-25' variant='primary'>Play Again</Button>
        </div>:
        <div  className='q-box w-100' >
        <h1 className='mb-2 text-white'>GK Quiz</h1>
        <h4 className='text-danger'>{`00:${timer}`}</h4>
        <h4 className='text-white'>{`${questionStoring.length}/15`}</h4>
        <div className='quest-box'>
           <h3>{Quiz[question].Q}</h3>
        </div>
          <Row  className='d-flex justify-content-around mt-4 '>
            <Col xl={6} md={6} xs={12}  className='d-flex justify-content-center col'>
              <div  onClick={()=>check(Quiz[question].a[1])} id={red===Quiz[question].a[1]?'red':green===Quiz[question].a[1]?'green':'blue'}  className='ans  rounded-5  d-flex align-items-center ps-1'>
                <div style={{height:'40px',width:'40px'}} className='bg-white text-black border rounded-5 d-flex justify-content-center align-items-center'>A</div>
                <div  className='ps-3'>{Quiz[question].a[0]}</div>
              </div>
            </Col>
            <Col xl={6} md={6} xs={12} className='d-flex justify-content-center col'>
            <div onClick={()=>check(Quiz[question].b[1])} id={red===Quiz[question].b[1]?'red':green===Quiz[question].b[1]?'green':'blue'}  className='ans  rounded-5  d-flex align-items-center ps-1'>
                <div style={{height:'40px',width:'40px'}} className='bg-white text-black border rounded-5 d-flex justify-content-center align-items-center'>B</div>
                <div className='ps-3'>{Quiz[question].b[0]}</div>
              </div>
            </Col>
            <Col xl={6} md={6} xs={12} className='d-flex justify-content-center col '>
            <div onClick={()=>check(Quiz[question].c[1])} id={red===Quiz[question].c[1]?'red':green===Quiz[question].c[1]?'green':'blue'}  className='ans  rounded-5  d-flex align-items-center ps-1'>
                <div style={{height:'40px',width:'40px'}} className='bg-white text-black border rounded-5 d-flex justify-content-center align-items-center'>C</div>
                <div className='ps-3'>{Quiz[question].c[0]}</div>
              </div>
            </Col>
            <Col xl={6} md={6} xs={12} className='d-flex justify-content-center col '>
            <div onClick={()=>check(Quiz[question].d[1])} id={red===Quiz[question].d[1]?'red':green===Quiz[question].d[1]?'green':'blue'} className='ans  rounded-5  d-flex align-items-center ps-1'>
                <div style={{height:'40px',width:'40px'}} className='bg-white text-black border rounded-5 d-flex justify-content-center align-items-center'>D</div>
                <div  className='ps-3'>{Quiz[question].d[0]}</div>
              </div>
            </Col>
          </Row>
         { questionStoring.length==15?
         <Button  variant='primary' className='w-25' onClick={getMark}>GetMark</Button>
         :<Button style={green?{display:'block'}:{display:'none'}} onClick={nextQuest} variant="primary" className='w-25'>NextQuestion</Button>
         }
    </div>
        }
      </div>
    </>
  )
}

export default App
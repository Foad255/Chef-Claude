import { useState } from 'react'
import '../index.css'

function Head() {
  const [ inputValue , setInputValue ] = useState('')
  const [ list , setList ] = useState([])
  const [ placeHolder, setPlaceHolder ] = useState('e.g. organo')

  function handleInputValue(event) {
    setInputValue(event.target.value)
  }

  function handleClick() {
      if (inputValue !== '') {
        setInputValue('')
        setList(prev => [...prev, inputValue])
        // console.log(list) // still not updated because setList is  asynchronous
      } else {
        setPlaceHolder('Please enter something')
      }
  }

  return (
    <>
      <form className="head-container">
        <input 
        value = {inputValue}  placeholder= {placeHolder}
        onChange = {handleInputValue} ></input>
        <button type = "button" onClick= {handleClick} >Add ingredient</button>
      </form>

      <form>
        <ul>
        {list.map((item) => ( <li key= {item}>{item}</li>))}
        </ul>
      </form>

    </>
  )
}

export default Head
import { useState } from 'react'
import '../index.css'



// hidden elements
function HandleElements({count, Decrease,condition,Increase}) {

  return (
    <>
      <span className="count">Count: {count}</span>
      <button type="buttom" onClick={Decrease} className="Decrease-btn" >-</button>
       {condition && <Increase /> }
      <h1>Let's make a recipe: </h1>
    </>
  )
}

// setting the + button
function HandleIncreaseEl() {
  return <button className="Increase-btn">+</button>
}

function Head() {
  const [ list , setList ] = useState([])
  const [ placeHolder, setPlaceHolder ] = useState('e.g. oregano')
  const [ showHandleElements , setShowHandleElements ] = useState(false)
  const [ count , setCount ] = useState(0)
  const [ showHandleIncreaseEl, setShowHandleIncreaseEl ] = useState(false)
 
  function addNewIngredient(formData) {
    const ingredient = formData.get('ingredient')

     if (ingredient !== '') {
      if (list.some((item => item === ingredient))) {
        setPlaceHolder(`${ingredient} is already taken`)
      } else {
        setList(prev => [...prev,  ingredient])
        setPlaceHolder('e.g. oregano')
        setShowHandleElements(true)
        setCount(prev => prev + 1)
      }
    } else {
      setPlaceHolder('Please enter something')
    }
  }

  function handleDecrease() {
    if (count > 0) {
      setCount(count - 1)
      // When + button is going to show
      setShowHandleIncreaseEl(true)
      setList((prevList) => {const newList=[...prevList]; newList.pop(); return newList;})
    } else if (count <= 0) {
      setShowHandleElements(false)
    }
  }

  return (
    <>
      <form action={addNewIngredient} className="head-container">
        <input 
        placeholder= {placeHolder}
         name="ingredient" />
        <button>Add ingredient</button>
      </form>

      <div>
        <div className="pre-title" >
          {showHandleElements && <HandleElements count={count} Decrease={handleDecrease} condition={showHandleIncreaseEl} Increase={HandleIncreaseEl}/>}
        </div>
        <ul>
        {list.map((item) => ( <li key= {item}>{item}</li>))}
        </ul>
      </div>
    </>
  )
}

export default Head
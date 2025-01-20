import { useState } from 'react'
import '../index.css'

function Head() {
  const [ list , setList ] = useState([])
  const [ placeHolder, setPlaceHolder ] = useState('e.g. oregano')


  function addNewIngredient(formData) {
    const ingredient = formData.get('ingredient')

    if (ingredient !== '') {
      if (list.some((item => item === ingredient))) {
        setPlaceHolder(`${ingredient} is already taken`)
      } else {
        setList(prev => [...prev,  ingredient])
        setPlaceHolder('e.g. oregano')
      }
    } else {
      setPlaceHolder('Please enter something')
    }
  }

  return (
    <>
      <form action={addNewIngredient} className="head-container">
        <input 
        placeholder= {placeHolder}
         name="ingredient" ></input>
        <button >Add ingredient</button>
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
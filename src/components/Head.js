import { useState, useRef, useEffect } from 'react';
import '../index.css';

// ------------------ AI API -------------------------------------------------
import {getChatCompletion} from './api.js'

// Hidden elements
import {HandleElements, HandleIncreaseEl} from './features.js'
import {HandleRecipe, Recipe} from './recipe.js'

function Loading() {
  return(
    <strong>Thinking🔃...</strong>
  )
}

function Result() {
  return(
    <>
    <small>⚠️Change the ingredients and try again</small>
    <h1>The Result : </h1>
    </>
  )
}

function Head() {
  const [list, setList] = useState([]);
  const [placeHolder, setPlaceHolder] = useState('e.g. oregano');
  const [showHandleElements, setShowHandleElements] = useState(false);
  const [count, setCount] = useState(0);
  const [showHandleIncreaseEl, setShowHandleIncreaseEl] = useState(false);
  const [ reItem , setReItem ] = useState([])
  const [ showHandleRecipe , setShowHandleRecipe ] = useState(false);
  const [ showRecipe , setShowRecipe ] = useState(false)
  const [ recipe , setRecipe ] = useState('')
  const [ showLoading, setShowLoading ] = useState(false)
  const [ showResult, setShowResult ] = useState(false)
  const recipeSection = useRef(null)
  // console.log(recipeSection)

  useEffect(() => {
    if (recipe !== '' && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({behavior: 'smooth'})
    } if (recipe) {
        const mySection = document.querySelector('#mySection')
        mySection.classList.add('visible')
        setShowLoading(false)
        setShowResult(true)
    }
  }, [recipe])


  function addNewIngredient(formData) {
    const ingredient = formData.get('ingredient');
    if (ingredient !== '') {
      if (list.some((item) => item === ingredient)) {
        setPlaceHolder(`${ingredient} is already taken`);
      } else {
        setList((prev) => [...prev, ingredient]);
        setPlaceHolder('e.g. oregano');
        setShowHandleElements(true);
        setCount((prev) => prev + 1);
        // with 3 ingredient you can make a recipe
         if (list.length > 1) {
           setShowHandleRecipe(true)
         }
      }
    } else {
      setPlaceHolder('Please enter something');
    }
  }
  
  function handleDecrease() {
    if (count > 0) {
      setCount(count - 1);
      setShowHandleIncreaseEl(true);  

      // console.log(count)
      if (count < 4) {
        setShowHandleRecipe(false)
     }
      setList((prevList) => {
        const Dlist = [...prevList];
        let  Item = Dlist.pop();
        setReItem((prev) => [...prev, Item])
        return Dlist;
      });
    } else {
      setShowHandleElements(false);
    }
  }


/*
1- set array for removed values
2- Increase the count
3- remove the item from the array (removed values array)
4- add the item to The list
---- link for diagram ( - and + )
-- https://lucid.app/lucidspark/caec8dc3-bd21-4d0b-b819-2776cecae6f8/edit?viewport_loc=-3877%2C-2280%2C6100%2C2946%2C0_0&invitationId=inv_de6ba947-bf16-42d1-bce3-e9805db123a4
 */

// console.log(reItem)

function handleIncrease() {
  if (reItem.length > 0)  // Ensure there are a removed values
    {
      setReItem((prevList) => {
      const IList = [... new Set(prevList)]; // Just Double sure
      const removedItem = IList.pop(); // Remove the first item
      if (!list.includes(removedItem)) // Ensure the ingredient hasn't been added to the list
      {
        setCount(count + 1); // increase the count
        setList((prev) => [...prev, removedItem]); // Adding the Item to the list
      } else {

      }
      console.log(list.length)
      if (list.length > 1) {
        setShowHandleRecipe(true)
      }

      return IList;
  });
}}

function handleRecipe() {
  //  when click Get recipe shoe loading
  setShowLoading(true)
  setShowRecipe(true)
  // render the recipe
  getChatCompletion(list).then(result =>   setRecipe(result));


}
  return (
    <>
      <form action={addNewIngredient} className="head-container">
        <input placeholder={placeHolder} name="ingredient" />
        <button type="submit" className="add-btn">Add ingredient</button>
      </form>

      <div>
        <div className="pre-title">
          {showHandleElements && (
            <HandleElements
              count={count}
              Decrease={handleDecrease}
              condition={showHandleIncreaseEl}
              Increase={HandleIncreaseEl}
              Hincrease={handleIncrease}
            />
          )}
        </div>
        <ul>
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
       {showHandleRecipe && <HandleRecipe Hrecipe={handleRecipe}/> }
       {showLoading && <Loading />}
       {showResult && <Result />}
       {showRecipe && <Recipe recipeSection={recipeSection} recipe={recipe} />}
    </>
  );
}

export default Head;

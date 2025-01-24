import { useState } from 'react';
import '../index.css';

// ------------------ AI API -------------------------------------------------
import {getChatCompletion} from './api.js'


// Hidden elements
import {HandleElements, HandleIncreaseEl} from './features.js'
import {HandleRecipe, Recipe} from './recipe.js'



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
  setShowRecipe(true)
  // render the recipe
  getChatCompletion(list).then(result =>   setRecipe(result));

}
  return (
    <>
      <form action={addNewIngredient} className="head-container">
        <input placeholder={placeHolder} name="ingredient" />
        <button type="submit">Add ingredient</button>
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
       {showRecipe && <Recipe recipe={recipe} />}
    </>
  );
}

export default Head;

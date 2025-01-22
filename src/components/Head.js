import { useState } from 'react';
import '../index.css';

// Hidden elements
function HandleElements({ count, Decrease, condition, Increase, Hincrease }) {
  return (
    <>
      <span className="count">Count: {count}</span>
      <button type="button" onClick={Decrease} className="Decrease-btn" disabled={count === 0}>-</button>
      {/* condition <HandleIncreaseEl  define handleIncrease function /> */}
      {condition && <Increase reback={Hincrease} />}
      <h1>Let's make a recipe:</h1>
    </>
  );
}

// Setting the + button
function HandleIncreaseEl({reback}) {
  return <button onClick={reback} className="Increase-btn">+</button>;
}


function Head() {
  const [list, setList] = useState([]);
  const [placeHolder, setPlaceHolder] = useState('e.g. oregano');
  const [showHandleElements, setShowHandleElements] = useState(false);
  const [count, setCount] = useState(0);
  const [showHandleIncreaseEl, setShowHandleIncreaseEl] = useState(false);
  const [ reItem , setReItem ] = useState([])

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
      }
    } else {
      setPlaceHolder('Please enter something');
    }
  }

  
  function handleDecrease() {
    if (count > 0) {
      setCount(count - 1);
      setShowHandleIncreaseEl(true);
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
 */

// console.log(reItem)

function handleIncrease() {
  if (reItem.length > 0)  // Ensure there are a removed values
    {
  setCount(count + 1);
  setReItem((prevList) => {
      const IList = [...prevList];
      const removedItem = IList.pop(); // Remove the first item
      setList((prev) => [...prev, removedItem]); // Adding the Item to the list
      return IList;
  });

  console.log('Current reItem:', reItem);
  console.log('Increase');
}}



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
    </>
  );
}

export default Head;

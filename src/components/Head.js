import { useState } from 'react';
import Markdown from 'react-markdown'
 
import '../index.css';

// ------------------ AI API -------------------------------------------------
import { HfInference } from "@huggingface/inference";

const client = new HfInference("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");

export async function getChatCompletion(list) {
    let out = "";

    const stream = await client.chatCompletionStream({
        model: "google/gemma-2-2b-it",
        messages: [
            {
                role: "user",
                content: `I have these ingredients ${list} please give me a recipe i can make with these ingredients`
            }
        ],
        max_tokens: 500
    });

    for await (const chunk of stream) {
        if (chunk.choices && chunk.choices.length > 0) {
            const newContent = chunk.choices[0].delta.content;
            out += newContent;
        }  
    }

    return out;
}


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

function HandleRecipe({recipe}) {

  return (
  <div>
      <p>Ready for recipe</p>
      <button onClick={recipe}>Get recipe</button>
  </div>
  )
}

function Recipe({recipe}) {
  return (
    <section aria-live="polite">
        <Markdown>
          {recipe}
        </Markdown>
    </section>
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
       {showHandleRecipe && <HandleRecipe recipe={handleRecipe}/> }
       {showRecipe && <Recipe recipe={recipe} />}
    </>
  );
}

export default Head;

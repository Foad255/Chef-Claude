import Markdown from 'react-markdown'

export function HandleRecipe(props) {

  return (
  <span>
      <button onClick={props.Hrecipe} className="recipe-btn">Get recipe</button>
  </span>
  )
}

export function Recipe({recipe,recipeSection}) {
  return (
    <section id="mySection"  ref={recipeSection}aria-live="polite">
        <Markdown>
          {recipe}
        </Markdown>
    </section>
  )
}
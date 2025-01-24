import Markdown from 'react-markdown'

export function HandleRecipe(props) {

  return (
  <div>
      <p>Ready for recipe</p>
      <button onClick={props.Hrecipe}>Get recipe</button>
  </div>
  )
}

export function Recipe({recipe}) {
  return (
    <section aria-live="polite">
        <Markdown>
          {recipe}
        </Markdown>
    </section>
  )
}
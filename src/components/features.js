// Hidden elements   props: { count, Decrease, condition, Increase, Hincrease }
export function HandleElements(props) {
    return (
      <>
        <span className="count">Count: {props.count}</span>
        <button type="button" onClick={props.Decrease} className="Decrease-btn" disabled={props.count === 0}>-</button>
        {/* condition <HandleIncreaseEl  define handleIncrease function /> */}
        {props.condition && <props.Increase reback={props.Hincrease} />}
        <h1>Let's make a recipe:</h1>
      </>
    );
  }

// setting + element
export function HandleIncreaseEl({reback}) {
    return <button onClick={reback} className="Increase-btn">+</button>;
  }
  
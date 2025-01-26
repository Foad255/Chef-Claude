import '../index.css'

function NavBar() {
  return (
    <div className="nav-container">
      <span>Chef</span>
      <img onMouseLeave={e => console.log('hovered')} width="80px" src="../assets/ropot.png" />
      <span>Claude</span>
    </div>
  )
}

export default NavBar
import '../index.css'

function NavBar() {
  return (
    <div className="nav-container">
      <span>
        <img onMouseLeave={e => console.log('hovered')} width="80px" src="../assets/ropot.png" />
      </span>
      <span>
        Chef Claude
      </span>
    </div>
  )
}

export default NavBar
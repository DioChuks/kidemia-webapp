const MenuIcon = () => {
  return (
    <div className="hamburger" id="menuBtn">
 <input className="checkbox" type="checkbox"/>
 <svg fill="none" viewBox="0 0 50 50" height="50" width="50">
  <path className="lineTop line" strokeLinecap="round" strokeWidth="4" stroke="black" d="M6 11L44 11"></path>
  <path strokeLinecap="round" strokeWidth="4" stroke="black" d="M6 24H43" className="lineMid line"></path>
  <path strokeLinecap="round" strokeWidth="4" stroke="black" d="M6 37H43" className="lineBottom line"></path>
 </svg>
</div>
  )
}

export default MenuIcon

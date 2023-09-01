import { Link, useSearchParams } from "react-router-dom"

function NavBar() {
  const [searchParams] = useSearchParams();
  let todos̥Data = searchParams.get("todos");
  return (
    <nav>
    <Link to = "/" className={todos̥Data === null ? "active" : ""}> All </Link>
    <Link to = "/?todos=Active" className={todos̥Data === "active" ? "active" : ""}> Active </Link>
    <Link to = "/?todos=Completed" className={todos̥Data === "completed" ? "active" :""}> Completed</Link>
    </nav>
  )
}

export default NavBar
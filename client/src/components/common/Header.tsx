import { Link } from "react-router";
import { Button } from "../ui/button";

function Header() {
  return (
    <nav className="flex items-center justify-between layout py-8">
      <Link to={"/"} className="text-4xl font-extrabold">
        NOVA
      </Link>
      <div className="space-x-4">
        <Button>Login</Button>
        <Button variant={"outline"}>Register</Button>
      </div>
    </nav>
  );
}

export default Header;

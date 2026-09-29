import { navLinks } from "@/constants/insex";
import Image from "next/image";

const NavBar = () => {
  return (
    <header>
      <nav>
        <Image
          src={"/logo.svg"}
          loading="eager"
          alt="Apple logo"
          width={24}
          height={24}
        />
        <ul>
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="flex-center gap-3">
          <button>
            <Image src="/search.svg" alt="Search" width={24} height={24} />
          </button>
          <button>
            <Image src="/cart.svg" alt="Cart" width={24} height={24} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;

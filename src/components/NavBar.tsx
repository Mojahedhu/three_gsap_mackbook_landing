import { navLinks } from "@/constants/insex";
import Image from "next/image";
import { GitHubIcon } from "./GitHubIcon";

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
          {/* GitHub / Code Repository Link */}
          <a
            href="https://github.com/Mojahedhu/three_gsap_mackbook_landing.git"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Code Repository on GitHub"
            className="flex-center cursor-pointer transition-opacity hover:opacity-80"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;

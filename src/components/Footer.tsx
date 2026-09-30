import { footerLinks } from "@/constants/insex";
import Image from "next/image";

const Footers = () => {
  return (
    <footer>
      <div className="info">
        <p>
          More ways to shop: Find an Apple Store or other retailer near you. Or
          call 000800 040 1966.
        </p>
        <Image src={"/logo.svg"} width={24} height={24} alt="Apple logo" />
      </div>
      <hr />
      <div className="links">
        <p>Copyright © &copy; 2024 Apple Inc. All rights reserved.</p>
        <ul>
          {footerLinks.map(({ label, link }) => (
            <li key={label}>
              <a href={link}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footers;

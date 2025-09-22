import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/home">
      <Image
        src="/logosudeaseg.png"
        alt="logo Sudeaseg"
        width={185}
        height={90}
      />
    </Link>
  );
};

export default Logo;

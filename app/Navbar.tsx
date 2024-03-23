"use client";
// Because usePathname uses client-side APIs

import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { Container, Flex } from "@radix-ui/themes";

const Navbar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex border-b mb-5 px-5 h-14 items-center">
      <Container>
        <Flex gap="6" align="center">
        <Link href="/">
          <AiFillBug />
        </Link>
        <ul className="flex space-x-6">
          {links.map((link) => (
            <li
              key={link.href}
              className={classnames({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;

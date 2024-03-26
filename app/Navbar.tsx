"use client";
// Because usePathname uses client-side APIs

import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { Container, Flex, Box, DropdownMenu, Avatar, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const currentPath = usePathname();

  const {status, data: session} = useSession()

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex border-b mb-5 px-5 h-14 items-center">
      <Container>
        <Flex justify="between">
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
        <Box>
              { status === "authenticated" && (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Avatar src={session.user!.image!} fallback="?" size="2" radius="full" className="cursor-pointer"/>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Label>
                      <Text size="2">
                      {session.user!.email}
                      </Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Logout</Link>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              // <Link href="/api/auth/signout">Logout</Link>
              )}
              { status === "unauthenticated" && (<Link href="/api/auth/signin">Login</Link>)}
        </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;

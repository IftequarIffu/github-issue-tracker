"use client";
// Because usePathname uses client-side APIs

import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { Container, Flex, Box, DropdownMenu, Avatar, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import {Skeleton} from "@/app/components";

const Navbar = () => {

  return (
    <nav className="flex border-b mb-5 px-5 h-14 items-center">
      <Container>
        <Flex justify="between">
        <Flex gap="6" align="center">
        <Link href="/">
          <AiFillBug />
        </Link>
          <GeneralLinks />
        </Flex>
          <AuthLinks />
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;


const AuthLinks = () => {

  const {status, data: session} = useSession()
  if(status === "loading"){
    return <Skeleton width="3rem" />
  }

  else if(status === "unauthenticated"){
    return (<Box>
              <Link href="/api/auth/signin">Login</Link>
            </Box>)
  }

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar src={session!.user!.image!} fallback="?" size="2" radius="full" className="cursor-pointer" referrerPolicy="no-referrer"/>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">
            {session!.user!.email}
            </Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
          <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

const GeneralLinks = () => {

  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
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
  )
}
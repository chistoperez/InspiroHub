"use client";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toogleDropdown, setToogleDropdown] = useState(false);

  useEffect(() => {
    const setProvider = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setProvider();
  }, []);

  return (
    <nav className="w-full pt-3 mb-16 flex-between">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="InspiroHub logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">InspiroHub</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile" className="flex gap-2 flex-center">
              <Image
                src={session?.user.image}
                alt="Profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="relative flex sm:hidden">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="Profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => {
                setToogleDropdown((prev) => !prev);
              }}
            />

            {toogleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToogleDropdown(false)}
                >
                  Profile
                </Link>

                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToogleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToogleDropdown(false);
                    signOut();
                  }}
                  className="w-full mt-2 black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

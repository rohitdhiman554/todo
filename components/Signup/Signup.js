import { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

import { todosApi } from "../../src/utils/api";
import { Link } from "@mui/material";
import { setCookie } from "../../src/utils/tokenHelpers";

export function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const userSignup = async (data) => {
    const url = todosApi.concat("users");
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await console.log(response);

    return response.json();
  };

  const router = useRouter();

  const { mutate } = useMutation(userSignup, {
    onSuccess: (data) => {
      setCookie(data.token);

      router.push("/dashboard");
    },
    onError: () => {
      console.log("error not registered");
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();

    if (user.name !== "" && user.email !== "" && user.password !== "") {
      mutate(user);
    }
    setUser("");
  };

  return (
    <div class="container px-6 py-12 h-full">
      <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
        <div class="w-5/12">
          <img
            src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?w=740&t=st=1669370041~exp=1669370641~hmac=b8d49957ddc4ff419485c8b4efcae1f93a77d84876e8c4911655539ae4f422db"
            class="w-full"
          />
        </div>
        <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
          <form>
            <div class="mb-6">
              <input
                value={user.name}
                type="text"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white  border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Name"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div class="mb-6">
              <input
                value={user.email}
                type="email"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white  border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div class="mb-6">
              <input
                value={user.password}
                type="email"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white  border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              class="inline-block px-7 mb-4 py-3 bg-blue-600 text-white font-medium text-sm  uppercase rounded  w-full"
              onClick={(e) => handleSignup(e)}
            >
              Sign Up
            </button>

            <Link
              href="/"
              className=" flex justify-center inline-block px-7 py-3  rounded text-black font-medium text-sm  uppercase border border-2  no-underline w-full"
            >
              Sign in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

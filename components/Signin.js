import { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

import { todosApi } from "../utils/api";

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const url = todosApi.concat("users/login");

  const userSignin = async (data) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  };

  const { mutate } = useMutation(userSignin, {
    onSuccess: (data) => {
      console.log("mutated", data);
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleSignin = (e) => {
    e.preventDefault();

    const obj = {
      email: email,
      password: password,
    };

    if (obj.email !== "" && obj.password !== "") {
      mutate(obj);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div class="container px-6 py-12 h-full">
      <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
        <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            class="w-full"
          />
        </div>
        <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
          <form>
            <div class="mb-6">
              <input
                value={email}
                type="text"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div class="mb-6">
              <input
                value={password}
                type="password"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              onClick={(e) => handleSignin(e)}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

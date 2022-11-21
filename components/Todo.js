import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";

import { todosApi } from "../utils/api";
import { TodoList } from "./TodoList";

export function Todo() {
  const [task, setTask] = useState("");
  const queryClient = useQueryClient();

  const addTask = async () => {
    const url = todosApi + "tasks";
    const token = localStorage.getItem("token");
    const data = {
      description: task,
      completed: false,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return response.json();
  };

  const getTasks = async () => {
    const token = localStorage.getItem("token");
    const url = todosApi.concat("tasks");

    if (token !== "") {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    }
  };

  const { isLoading, data, error } = useQuery("todoItem", getTasks);

  const { mutate } = useMutation(addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("todoItem");
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleTask = (e) => {
    setTask(e.target.value);
  };

  const submitTask = (e) => {
    if (e.key === "Enter") {
      mutate();
      setTask("");
    }
  };
  console.log(data);
  return (
    <div className="w-1/3 flex flex-col  mx-auto mt-10 border border-black">
      <div className="flex justify-center">
        <h1 className="text-7xl text-[#ead7d7] ">todos</h1>
      </div>

      <input
        className="w-full text-lg  mt-5  p-4 italic"
        placeholder="What needs to be done?"
        value={task}
        onChange={(e) => handleTask(e)}
        onKeyPress={(e) => submitTask(e)}
      />

      <div className="flex flex-col">
        {data !== undefined
          ? data.map((todo) => {
              return (
                <TodoList
                  key={todo._id}
                  id={todo._id}
                  description={todo.description}
                  isChecked={todo.completed}
                />
              );
            })
          : console.log("NOTODO ")}
      </div>
    </div>
  );
}

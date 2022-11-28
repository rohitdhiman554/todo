import { useState } from "react";

import { BsCircle, BsCheckCircle } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { todosApi } from "../../src/utils/api";

export const TodoList = (props) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(props.description);
  const queryClient = useQueryClient();

  const updateTask = async (data) => {
    let url = todosApi + "tasks/" + data.id;
    const token = localStorage.getItem("token");
    let obj = {
      description: data.description,
      completed: data.isChecked,
    };

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(obj),
    });
    return response.json();
  };

  const deleteTask = async (id) => {
    const url = todosApi + `tasks/${id}`;
    const token = localStorage.getItem("token");
    console.log(url);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  };

  const toggleUpdate = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("todoItem");
    },
    onError: () => {
      console.log("update failed");
    },
  });

  const deleteMutation = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("todoItem");
    },
    onError: () => {
      console.log("delete failed");
    },
  });

  const handleComplete = () => {
    const data = {
      id: props.id,
      description: props.description,
      completed: props.isChecked ? false : true,
    };

    props.onToggle(data);
  };

  const handleEdit = (e) => {
    const data = {
      id: props.id,
      description: text,
      isChecked: props.isChecked,
    };

    if (e.key === "Enter") {
      toggleUpdate.mutate(data);
      setEdit(false);
    }
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="flex flex-row w-full mt-4 items-center justify-center  border border-1 shadow hover:shadow-lg">
      <div className=" w-1/8 flex justify-center mr-4">
        {props.isChecked ? (
          <BsCheckCircle onClick={handleComplete}></BsCheckCircle>
        ) : (
          <BsCircle onClick={handleComplete}></BsCircle>
        )}
      </div>
      {edit ? (
        <input
          className={`w-5/6 text-lg  p-2`}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onKeyPress={(e) => handleEdit(e)}
          autoFocus
        />
      ) : (
        <div
          className={`${
            props.isChecked ? "line-through" : ""
          } w-5/6 p-2 text-lg  `}
          onDoubleClick={() => {
            setEdit(true);
          }}
        >
          {text}
        </div>
      )}
      <div className="flex items-center text-2xl ">
        <AiOutlineDelete onClick={() => handleDelete(props.id)} />
      </div>
    </div>
  );
};

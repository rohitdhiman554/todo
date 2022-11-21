import { useState } from "react";

import { BsCircle, BsCheckCircle } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

export const TodoList = (props) => {
  const [edit, setEdit] = useState(false);

  const editTask = () => {
    setEdit(!edit);
  };
  return (
    <div className="flex flex-row w-full mt-4 items-center justify-center  border border-2">
      <div className=" w-1/8 flex justify-center mr-4">
        {props.isChecked ? (
          <BsCheckCircle></BsCheckCircle>
        ) : (
          <BsCircle></BsCircle>
        )}
      </div>
      {edit ? (
        <input className="w-5/6 text-lg  p-2" />
      ) : (
        <input className="w-5/6 text-lg  p-2" value={props.description} />
      )}
    </div>
  );
};

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React, { forwardRef } from 'react';


export const MyMeals = forwardRef(({ text, deleteMeal, updatingInInput }, ref) => {
    return (
      <div className="box" ref={ref}>
        <p>{text}</p>
        <AiFillEdit onClick={updatingInInput} />
        <AiFillDelete onClick={deleteMeal} />
      </div>
    );
  });
    


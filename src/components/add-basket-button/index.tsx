"use client";
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../stores/category-store';
import { category } from '../../utils/categoryOptConf';
import React from "react";

interface AddBasketButtonProps {
  product: any; 
}

export function AddBasketButton({ product }: AddBasketButtonProps) {
  const dispatch = useDispatch();

  const handleSetCategory = (e: string) => {
    dispatch(actions.setToCategory(e));
  };
  // const activeCategory = useSelector((state: any) => state.category?.category); 

  return (
    <div className="bg-white p-4 rounded-md">
      <ul className="flex items-center gap-2 text-sm font-medium">
        {category?.map((e, index) => (
          <li className="flex-1" key={index} onClick={() => handleSetCategory(e?.name)}>
            <a
              href={`/category/${e.name}`}
              className="relative flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {e.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

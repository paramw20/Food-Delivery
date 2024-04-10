import React, { createContext, useReducer, useContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {  
  switch(action.type){
    case "ADD":
      return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}]
      break;
      case 'UPDATE':
      return state.map((item) =>
        item.id === action.id && item.name === action.name && item.size === action.size
          ? { ...item, qty: action.qty } // Update quantity 
          : item // Leave other items unchanged
      );
      case 'REMOVE':
      return state.filter((item) => item.id !== action.id);
      break;
case "DROP":
  let emptyArray=[]
  return emptyArray
      default:
        console.log("error in reducer");
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

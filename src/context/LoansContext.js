import { createContext, useReducer } from 'react'

export const LoansContext = createContext()

export const loansReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOANS':
      return { 
        loans: action.payload 
      }
    case 'CREATE_LOAN':
      return { 
        loans: [action.payload, ...state.loans] 
      }
    case 'DELETE_LOAN':
      return{
        loans: state.loans.filter((l) => l._id !==action.payload._id)
      }
    default:
      return state
  }
}

export const LoansContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loansReducer, { 
    loans: null
  })
  
  return (
    <LoansContext.Provider value={{ ...state, dispatch }}>
      { children }
    </LoansContext.Provider>
  )
}
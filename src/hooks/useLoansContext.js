import { LoansContext } from "../context/LoansContext"
import { useContext } from "react"

export const useLoansContext = () => {
  const context = useContext(LoansContext)

  if(!context) {
    throw Error('useLooksContext must be used inside an LoansContextProvider')
  }

  return context
}
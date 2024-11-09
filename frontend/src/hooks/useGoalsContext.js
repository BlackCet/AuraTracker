import { GoalsContext } from '../context/GoalsContext'
import { useContext } from "react"

export const useGoalsContext = () => {
    const context = useContext(GoalsContext)

    if(!context) {
        throw Error('useGoalsContext must be used inside an GoalsContextProvider')
    }

    return context
}
import * as React from 'react'

const ThingsContext = React.createContext()


function useTask() {
    const context = React.useContext(ThingsContext)
    if(!context)
        throw new Error(`useTask requires ThingsProvider`)
    return context
    
}

function ThingsProvider(props) {
    const [states, setStates] = React.useState([])
    const [functions, setFunctions] = React.useState({})
    const statesVal = React.useMemo(() => [states, setStates], [states])
    const functionsVal = React.useMemo(() => [functions, setFunctions], [functions])
    return <ThingsContext.Provider value={{'states': statesVal, 'funcs': functionsVal}} {...props}/>
}

export {useTask, ThingsProvider}

export default ThingsContext
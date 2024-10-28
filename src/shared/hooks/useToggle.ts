import { useCallback, useState } from 'react'

type UseToggleReturn = [boolean, () => void, (value: boolean) => void]

const useToggle = (initialValue: boolean = false): UseToggleReturn => {
    const [state, setState] = useState<boolean>(initialValue)
    const toggle = useCallback(() => setState((prev) => !prev), [])
    const setToggle = useCallback((value: boolean) => setState(value), [])

    return [state, toggle, setToggle]
}

export default useToggle

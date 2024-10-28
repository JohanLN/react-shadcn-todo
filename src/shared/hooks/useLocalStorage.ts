import { useEffect, useState } from 'react'

const useLocalStorage = <T>(
    key: string,
    initialValue: T
): [T, (value: T) => void] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(`Error when recieving localStorage value: ${error}`)
            return initialValue
        }
    })

    useEffect(() => {
        try {
            console.log(
                'localStorage ==>',
                storedValue,
                JSON.stringify(storedValue)
            )

            localStorage.setItem(key, JSON.stringify(storedValue))
        } catch (error) {
            console.error(
                `Error when saving a new value to the localStorage: ${error}`
            )
        }
    }, [key, storedValue])

    return [storedValue, setStoredValue]
}

export default useLocalStorage

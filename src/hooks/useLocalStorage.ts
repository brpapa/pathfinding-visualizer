import { useState, useEffect } from 'react'

// uso muito similiar ao useState
export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState(() => {
    const value = localStorage.getItem(key)
    // prettier-ignore
    return value
      ? JSON.parse(value)
      : initialValue instanceof Function
        ? initialValue()
        : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue))
  }, [storedValue, key])

  return [storedValue, setStoredValue]
}

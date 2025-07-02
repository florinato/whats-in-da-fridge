import { useState, useCallback } from 'react'

interface Toast {
  id: string
  title: string
  description?: string
  duration?: number
}

interface ToastState {
  toasts: Toast[]
}

export function useToast() {
  const [state, setState] = useState<ToastState>({ toasts: [] })

  const toast = useCallback(
    ({ title, description, duration = 3000 }: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9)
      const newToast: Toast = { id, title, description, duration }

      setState((prev) => ({
        ...prev,
        toasts: [...prev.toasts, newToast]
      }))

      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          toasts: prev.toasts.filter((t) => t.id !== id)
        }))
      }, duration)

      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
          body: description,
          icon: '/favicon.ico'
        })
      } else {
        console.log(`Toast: ${title}${description ? ` - ${description}` : ''}`)
      }
    },
    []
  )

  return { toast, toasts: state.toasts }
}
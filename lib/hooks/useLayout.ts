import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Layout = {
  theme: string
}
const initialState: Layout = {
  theme: 'system',
}

export const layoutStore = create<Layout>()(
  persist(() => initialState, {
    name: 'layoutStore',
  })
)

export default function useLayoutService() {
  const { theme } = layoutStore()

  return {
    theme,
    toggleTheme: () => {
      layoutStore.setState({
        theme: theme === 'dark' ? 'light' : 'dark',
      })
    },
  }
}

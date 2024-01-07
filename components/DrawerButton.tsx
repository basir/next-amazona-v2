'use client'
import useLayoutService from '@/lib/hooks/useLayout'

const DrawerButton = () => {
  const { drawerOpen, toggleDrawer } = useLayoutService()

  return (
    <input
      id="my-drawer"
      type="checkbox"
      className="drawer-toggle"
      checked={drawerOpen}
      onChange={toggleDrawer}
    />
  )
}

export default DrawerButton

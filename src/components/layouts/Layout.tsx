import { useState } from "react"
import { Outlet, useLocation, Link } from "react-router-dom"
import { CollapseHideIcon, CollapseShowIcon, AddProductIcon, ProductsIcon } from "../ui/Icons"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react"

export const Layout = () => {

  const { pathname } = useLocation()

  console.log(pathname)

  const [colapse, setColapse] = useState(false)

  return (
    <>
      <nav className="bg-zinc-50 px-4 py-2 border-b border-zinc-200 flex justify-end items-center">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              }}
              className="transition-transform"
              description="@tonyreichert"
              name="Tony Reichert"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">Signed in as</p>
              <p className="font-bold">@tonyreichert</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </nav>
      <div className="h-[calc(100vh-57px)] flex">
        <aside className="h-[calc(100vh-57px)] w-64 bg-zinc-50 border-r border-zinc-200">
          <div className="p-6 border-b border-zinc-200 flex justify-between items-center">
            <h2 className="text-xl text-zinc-800 font-bold">Dashboard</h2>
            <Button
              isIconOnly
              onClick={() => setColapse(!colapse)}
              size="sm"
              variant="flat"
            >
              {
                colapse ? <CollapseShowIcon className="fill-zinc-500" /> : <CollapseHideIcon className="fill-zinc-500" />
              }
            </Button>
          </div>
          <div className="p-6 space-y-1">
            <Link to="/" className="block">
              <Button
                fullWidth
                variant={pathname === "/" ? "solid" : "light"}
                color={pathname === "/" ? "primary" : "default"}
                startContent={<ProductsIcon className={pathname === "/" ? "fill-white" : "fill-zinc-500"} />}
                className="justify-start"
              >
                Todos los productos
              </Button>
            </Link>
            <Link to="/crear-producto" className="block">
              <Button
                fullWidth
                variant={pathname === "/crear-producto" ? "solid" : "light"}
                color={pathname === "/crear-producto" ? "primary" : "default"}
                startContent={<AddProductIcon className={pathname === "/crear-producto" ? "fill-white" : "fill-zinc-500"} />}
                className="justify-start"
              >
                Crear productos
              </Button>
            </Link>
          </div>
        </aside>
        <main className="p-6 w-full">
          <Outlet />
        </main>
      </div>
    </>
  )
}

import { Products } from "../components/Products";


export default function Productos() {

  return (
    <div className="h-[calc(100vh-105px)] overflow-y-auto">
      <h1 className="text-3xl text-zinc-800 font-bold mb-6">Todos los productos</h1>
      <div className="overflow-x-auto w-full h-[calc(100%-60px)]">
        <Products />
      </div>
    </div>
  )
}

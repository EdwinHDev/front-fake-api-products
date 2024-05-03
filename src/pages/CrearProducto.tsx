import { CreateProduct } from "../components/form/CreateProduct";

export default function CrearProducto() {
  return (
    <div className="w-full pb-10">
      <h1 className="text-3xl text-zinc-800 font-bold mb-6">Crear producto</h1>
      <CreateProduct />
    </div>
  )
}

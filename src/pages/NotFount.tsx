import { Button } from "@nextui-org/react"
import { Link } from "react-router-dom"

export default function NotFountPage() {
  return (
    <main className="container mx-auto px-4">
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl text-zinc-800 text-center font-black mb-2">Página no encontrada</h1>
        <p className="text-base text-zinc-500 text-center mb-6">No se encontro la página que buscas, provablemente no existe</p>
        <Link to="/">
          <Button
            variant="shadow"
            color="primary"
          >
            Volver al inicio
          </Button>
        </Link>
      </div>
    </main>
  )
}

import { Button, Input } from "@nextui-org/react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type LoginForm = {
  email: string
  password: string
}

export const Login = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginForm>()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      console.log(data)
      reset()
    }, 3000);
  }

  return (
    <div className="max-w-max">
      <h1 className="text-3xl text-zinc-800 text-center font-black mb-10">Inicio de Sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6 p-6 rounded-2xl bg-white border border-zinc-100 shadow-lg shadow-zinc-100">
        <div className="col-span-12">
          <label htmlFor="email" className="text-base text-zinc-500 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Email</label>
          <Input
            id="email"
            type="email"
            size="lg"
            color="primary"
            variant="bordered"
            placeholder="Introduce tu email"
            fullWidth
            {...register("email", { required: "El email es requerido", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "El email es inválido" }})}
            isInvalid={errors.email ? true : false}
            errorMessage={errors.email?.message}
          />
        </div>
        <div className="col-span-12">
          <label htmlFor="password" className="text-base text-zinc-500 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Contraseña</label>
          <Input
            id="password"
            type="password"
            size="lg"
            color="primary"
            variant="bordered"
            placeholder="Introduce tu contraseña"
            fullWidth
            {...register("password", { required: "La contraseña es requerida", minLength: { value: 8, message: "La contraseña debe tener al menos 8 caracteres" } })}
            isInvalid={errors.password ? true : false}
            errorMessage={errors.password?.message}
          />
        </div>
        <div className="col-span-12 flex justify-center">
          <Button
            variant="shadow"
            size="lg"
            color="primary"
            type="submit"
            isLoading={isLoading}
          >
            Iniciar Sesión
          </Button>
        </div>
      </form>
    </div>
  )
}

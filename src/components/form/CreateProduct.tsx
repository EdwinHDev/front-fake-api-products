import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, Tooltip, useDisclosure } from "@nextui-org/react"
import { useCallback, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ICharacteristic, IProductCondition, IRating, ISubCategory } from "../../interfaces/products";
import { toast } from "sonner";
import { DeleteIcon } from "../ui/Icons";

type LoginForm = {
  name: string;
  description: string;
  characteristics: ICharacteristic[];
  condition: IProductCondition;
  category: string;
  subCategories: ISubCategory[];
  freeShipping: boolean;
  images: string[];
  stock: number;
  price: number;
  companyName?: string;
  discount?: number;
  rating?: IRating;
}

type Characteristic = {
  name: string;
  value: string;
}

const columns = [
  {name: "NOMBRE", uid: "name"},
  {name: "VALOR", uid: "value"},
  {name: "ACCIONES", uid: "actions"},
];

export const CreateProduct = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginForm>()
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()

  const [isLoading, setIsLoading] = useState(false)
  const [characteristicsData, setCharacteristicsData] = useState<Characteristic[]>([])
  const [nameC, setNameC] = useState("");
  const [valueC, setValueC] = useState("");
  
  const addCharacteristicsData = () => {
    if(nameC === "") {
      return toast.error("El nombre de la caracteristica es obligatorio")
    }

    if(valueC === "") {
      return toast.error("El valor de la caracteristica es obligatorio")
    }

    setCharacteristicsData([...characteristicsData, {
      name: nameC,
      value: valueC,
    }])

    onClose()
    toast.success(`Se agrego ${nameC}`)
    setNameC("")
    setValueC("")
  }

  const deleteCharacteristicsData = (name: string) => {
    const updateCharacteristicsData = characteristicsData.filter(item => item.name !== name)
    setCharacteristicsData(updateCharacteristicsData)
    toast.success(`Se elimino ${name}`)
  }

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      console.log(data)
      reset()
    }, 3000);
  }

  const renderCell = useCallback((characteristic: Characteristic, columnKey: React.Key) => {
    const cellValue = characteristic[columnKey as keyof Characteristic];

    switch (columnKey) {
      case "name":
        return (
          <div>
            { cellValue }
          </div>
        );
      case "value":
        return (
          <div>
            { cellValue }
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Eliminar">
              <span className="text-lg text-default-400 hover:text-danger-500 cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => deleteCharacteristicsData(characteristic.name)}/>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agregar Caracteristicas</ModalHeader>
              <ModalBody>
                <div>
                  <label htmlFor="nameC" className="text-base text-zinc-500 font-medium">Nombre</label>
                  <Input
                    id="nameC"
                    type="text"
                    size="lg"
                    color="primary"
                    variant="bordered"
                    placeholder="Ejemplo: Marca"
                    fullWidth
                    onChange={(e) => setNameC(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="valueC" className="text-base text-zinc-500 font-medium">Valor</label>
                  <Input
                    id="valueC"
                    type="text"
                    size="lg"
                    color="primary"
                    variant="bordered"
                    placeholder="Ejemplo: Samsung"
                    fullWidth
                    onChange={(e) => setValueC(e.target.value)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button onClick={addCharacteristicsData} color="primary">
                  Agregar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <label htmlFor="name" className="text-base text-zinc-500 font-medium">Nombre del producto</label>
          <Textarea
            id="name"
            size="lg"
            color="primary"
            variant="bordered"
            placeholder="Televisor Samsung 50 pulgadas con todas las aplicaciones de Streaming."
            fullWidth
            {...register("name", { required: "El nombre del producto es requerido"})}
            isInvalid={errors.name ? true : false}
            errorMessage={errors.name?.message}
          />
        </div>
        <div className="col-span-12">
          <label htmlFor="description" className="text-base text-zinc-500 font-medium">Descripción del producto</label>
          <Textarea
            id="description"
            size="lg"
            color="primary"
            variant="bordered"
            placeholder="El televisor es Smart TV, viene con Netflix, HBO, Disney Plus y más, posee sistema android."
            fullWidth
            {...register("description", { required: "La descripción del producto es requerida"})}
            isInvalid={errors.description ? true : false}
            errorMessage={errors.description?.message}
          />
        </div>
        <div className="col-span-12 flex flex-col justify-center">
          <label htmlFor="description" className="text-base text-zinc-500 font-medium text-center">Descripción del producto</label>
          <div className="flex justify-center">
            <Table
              aria-label="Caracteristicas del producto"
              className="max-w-[500px] select-none"
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody emptyContent="No hay caracteristicas" items={characteristicsData}>
                {(item) => (
                  <TableRow key={item.name}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <Button
            onPress={onOpen}
            className="mt-6 max-w-max mx-auto"
          >
            Agregar Caracteristica
          </Button>
        </div>
        {/* <div className="col-span-3">
          <label htmlFor="email" className="text-base text-zinc-500 font-medium">Email</label>
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
        <div className="col-span-3">
          <label htmlFor="email" className="text-base text-zinc-500 font-medium">Email</label>
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
        <div className="col-span-3">
          <label htmlFor="email" className="text-base text-zinc-500 font-medium">Email</label>
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
        </div> */}
        <div className="col-span-12 flex justify-center">
            <Button
              variant="shadow"
              size="lg"
              color="primary"
              type="submit"
              isLoading={isLoading}
            >
              Crear Producto
            </Button>
          </div>
      </form>
    </>
  )
}

import { Autocomplete, AutocompleteItem, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, Tooltip, useDisclosure } from "@nextui-org/react"
import { useCallback, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ICharacteristic, IProductCondition, IRating } from "../../interfaces/products";
import { toast } from "sonner";
import { DeleteIcon } from "../ui/Icons";

type LoginForm = {
  name: string;
  description: string;
  characteristics: ICharacteristic[];
  condition: IProductCondition;
  category: string;
  subCategories: string;
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

const categories = [
  {label: "Gaming", value: "gaming", description: "Video juegos y todo lo relacionado al mundo gaming"},
  {label: "Belleza", value: "belleza", description: "Todo para que luzcas mejor"},
  {label: "Electrodomesticos", value: "electrodomesticos", description: "Todo en electrodomesticos para el hogar"},
  {label: "Smart Phone", value: "smart phone", description: "Telefonos de todo tipo, disfruta de todas las gamas"},
  {label: "Computadoras", value: "computadoras", description: "Todo lo que necesitas de computadoras en un mismo lugar"},
  {label: "Ropa", value: "ropa", description: "Todo lo que buscas en ropa para ellas y para ellos"},
  {label: "Canzados", value: "calzados", description: "Todo en calzados para ellas y ellos"},
]

const subCategories = [
  {label: "Consolas", value: "consolas", description: "Consolas de video juegos"},
  {label: "Computadoras Gaming", value: "computadoras gaming", description: "Computadoras gaming"},
  {label: "Cuidado del rostro", value: "cuidado del rostro", description: "Todo tipo de cremas y tonicos"},
  {label: "Cosmeticos", value: "cosmeticos", description: "Todo es cosmeticos"},
  {label: "Televisores", value: "televisores", description: "Todo en televisores"},
  {label: "Lavadoras", value: "lavadoras", description: "Todo en lavadoras"},
  {label: "Telefonos gama baja", value: "telefonos gama baja", description: "Telefonos gama baja"},
  {label: "Telefonos gama media", value: "telefonos gama media", description: "Telefonos gama media"},
  {label: "Telefonos gama alta", value: "telefonos gama alta", description: "Telefonos gama alta"},
  {label: "Telefonos gaming", value: "telefonos gaming", description: "Telefonos gaming"},
  {label: "Computadoras profesionales", value: "computadoras profesionales", description: "Computadoras profesionales"},
  {label: "Computadoras de oficina", value: "computadoras de oficina", description: "Computadoras de oficina"},
  {label: "Franelas", value: "franelas", description: "Franelas para dama, caballeros y niños"},
  {label: "Bermudas", value: "bermudas", description: "Bermudas para caballeros y niños"},
  {label: "Chemise", value: "chemise", description: "Chemise para caballeros y niños"},
  {label: "Vestidos", value: "vestidos", description: "Vestidos para damas"},
  {label: "Deportivos", value: "deportivos", description: "Deportivos para ellas y ellos"},
  {label: "Casuales", value: "casuales", description: "Casuales para ellas y ellos"},
]

const conditions = [
  {label: "Nuevo", value: "nuevo", description: "Producto nuevo"},
  {label: "Usado", value: "usado", description: "Producto usado"},
  {label: "Como nuevo", value: "como nuevo", description: "Producto en buenas condiciones"},
]

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
          <label htmlFor="description" className="text-base text-zinc-500 font-medium">Caracteristicas del producto</label>
          <div className="flex justify-center">
            <Table
              aria-label="Caracteristicas del producto"
              className="select-none"
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} className={`${column.name === "ACCIONES" ? "w-40" : "w-auto"}`}>
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody emptyContent="No hay caracteristicas" items={characteristicsData}>
                {(item) => (
                  <TableRow key={item.name}>
                    {(columnKey) => <TableCell className={`${columnKey === "actions" ? "w-40" : "w-auto"}`}>{renderCell(item, columnKey)}</TableCell>}
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
        <div className="col-span-3">
          <label htmlFor="category" className="text-base text-zinc-500 font-medium">Categoría</label>
          <Autocomplete 
            fullWidth
            id="category"
            size="lg"
            color="primary"
            variant="bordered"
            placeholder="Elije una categoría"
          >
            {categories.map((category) => (
              <AutocompleteItem key={category.value} value={category.value}>
                {category.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
        <div className="col-span-3">
          <label htmlFor="condition" className="text-base text-zinc-500 font-medium">Condición</label>
          <Autocomplete 
            fullWidth
            id="condition"
            size="lg"
            color="primary"
            variant="bordered"
            placeholder="Elije una condición"
          >
            {conditions.map((condition) => (
              <AutocompleteItem key={condition.value} value={condition.value}>
                {condition.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
        <div className="col-span-3">
          <label htmlFor="subcategories" className="text-base text-zinc-500 font-medium">Sub categoría</label>
          <Autocomplete 
            fullWidth
            id="subcategories"
            size="lg"
            color="primary"
            variant="bordered"
            placeholder="Elije una sub categoría"
          >
            {subCategories.map((subCategory) => (
              <AutocompleteItem key={subCategory.value} value={subCategory.value}>
                {subCategory.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
        <div className="col-span-3">
          <label htmlFor="stock" className="text-base text-zinc-500 font-medium">Stock</label>
          <Input
            id="stock"
            type="number"
            size="lg"
            color="primary"
            variant="bordered"
            placeholder="Unidades en Stock"
            fullWidth
            {...register("stock", { required: "El stock es requerido" })}
            isInvalid={errors.stock ? true : false}
            errorMessage={errors.stock?.message}
          />
        </div>
        <div className="col-span-3">
          <label htmlFor="price" className="text-base text-zinc-500 font-medium">Precio</label>
          <Input
            id="price"
            type="number"
            size="lg"
            color="primary"
            variant="bordered"
            placeholder="Precio del producto"
            fullWidth
            {...register("price", { required: "El precio es requerido" })}
            isInvalid={errors.price ? true : false}
            errorMessage={errors.price?.message}
          />
        </div>
        <div className="col-span-3">
          <label htmlFor="discount" className="text-base text-zinc-500 font-medium">Descuento</label>
          <Input
            id="discount"
            type="number"
            size="lg"
            color="primary"
            variant="bordered"
            placeholder="Descuento del producto"
            fullWidth
          />
        </div>
        <div className="col-span-3">
          <label htmlFor="company" className="text-base text-zinc-500 font-medium">Nombre de la empresa</label>
          <Input
            id="company"
            type="text"
            size="lg"
            color="primary"
            variant="bordered"
            placeholder="Nombre de la empresa"
            fullWidth
            {...register("companyName", { required: "El precio es requerido" })}
            isInvalid={errors.companyName ? true : false}
            errorMessage={errors.companyName?.message}
          />
        </div>
        <div className="col-span-3">
          <Switch
            id="freeShipping"
            aria-label="Envio gratis"
          >
            Envío gratis
          </Switch>
        </div>
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

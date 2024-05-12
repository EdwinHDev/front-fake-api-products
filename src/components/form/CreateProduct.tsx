import { Autocomplete, AutocompleteItem, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, Tooltip, useDisclosure } from "@nextui-org/react"
import { useCallback, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { ICharacteristic, IImages, IProductCondition, IRating } from "../../interfaces/products"
import { toast } from "sonner"
import { DeleteIcon } from "../ui/Icons"
import ImagePreview from "../ui/ImagePreview"
import { createProduct, uploadImages } from "../../services/products_services"
import { fillProductRating } from "../utils/ramdomRating"
import { clients, comments } from "../utils/dataRating"

type LoginForm = {
  name: string;
  description: string;
  characteristics: ICharacteristic[];
  condition: IProductCondition;
  category: string;
  subCategories: string;
  freeShipping: boolean;
  images: File[];
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
]

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

  const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm<LoginForm>()
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()

  const [isLoading, setIsLoading] = useState(false)
  const [characteristicsData, setCharacteristicsData] = useState<Characteristic[]>([])
  const [nameC, setNameC] = useState("")
  const [valueC, setValueC] = useState("")
  const [characteristicsError, setCharacteristicsError] = useState(false)
  
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

    setValue("characteristics", [...characteristicsData, {
      name: nameC,
      value: valueC,
    }])

    setCharacteristicsError(false)

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

    if(!data.characteristics) {
      setCharacteristicsError(true)
      return
    }

    setIsLoading(true)

    let urlList: IImages[] = []

    try {
      const res = await uploadImages(data.images)
      console.log(res.data)
      urlList = res.data
    } catch (error: any) {
      console.log(error)
      setIsLoading(false)
      toast.error(error)
      return
    }

    try {
      const res = await createProduct({
        category: data.category,
        characteristics: data.characteristics,
        condition: data.condition,
        description: data.description,
        freeShipping: data.freeShipping,
        name: data.name,
        price: data.price,
        stock: data.stock,
        subCategories: data.subCategories,
        companyName: data.companyName,
        discount: data.discount,
        status: "publicado",
        images: urlList,
        rating: fillProductRating(clients, comments)
      })
      setIsLoading(false)
      setCharacteristicsData([])
      reset()
      toast.success(res.message)
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const renderCell = useCallback((characteristic: Characteristic, columnKey: React.Key) => {
    const cellValue = characteristic[columnKey as keyof Characteristic]

    switch (columnKey) {
      case "name":
        return (
          <div>
            { cellValue }
          </div>
        )
      case "value":
        return (
          <div>
            { cellValue }
          </div>
        )
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Eliminar">
              <span className="text-lg text-default-400 hover:text-danger-500 cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => deleteCharacteristicsData(characteristic.name)}/>
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agregar Caracteristicas</ModalHeader>
              <ModalBody>
                <div>
                  <label htmlFor="name-c" className="text-base text-zinc-500 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Nombre</label>
                  <Input
                    aria-label="Nombre"
                    id="name-c"
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
                  <label htmlFor="value-c" className="text-base text-zinc-500 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Valor</label>
                  <Input
                    aria-label="Valor"
                    id="value-c"
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
          <label htmlFor="name" className="text-base text-zinc-500 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Nombre del producto</label>
          <Textarea
            aria-label="Nombre del producto"
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
          <label htmlFor="description" className="text-base text-zinc-500 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Descripción del producto</label>
          <Textarea
            aria-label="Descripción del producto"
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
          <label className="text-base text-zinc-500 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Caracteristicas del producto</label>
          <div className={`flex justify-center rounded-xl p-2 border-2 ${characteristicsError ? "border-danger-500" : "border-zinc-200"}`}>
            <Table
              {...register("characteristics", { required: "Debes agregar al menos una caracteristica"})}
              aria-label="Caracteristicas del producto"
              className="select-none"
              removeWrapper
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
          {characteristicsError && <p className="text-xs text-danger-500 mt-1 ml-1">Debes agregar al menos una caracteristica</p>}
          <Button
            onPress={onOpen}
            className="mt-6 max-w-max mx-auto"
            variant="flat"
          >
            Agregar Caracteristica
          </Button>
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-3">
          <label htmlFor="category" className="text-base text-zinc-500 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Categoría</label>
          <Controller
            control={control}
            name="category"
            defaultValue=""
            render={({ field }) => (
              <Autocomplete
                aria-label="Categoría"
                fullWidth
                id="category"
                size="lg"
                color="primary"
                variant="bordered"
                placeholder="Elije una categoría"
                defaultItems={categories}
                selectedKey={field.value}
                onSelectionChange={field.onChange}
                onBlur={field.onBlur}
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>
            )}
          />
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-3">
          <label htmlFor="condition" className="text-base text-zinc-500 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Condición</label>
          <Controller
            control={control}
            name="condition"
            defaultValue="nuevo"
            render={({ field }) => (
              <Autocomplete
                aria-label="Categoría"
                fullWidth
                id="condition"
                size="lg"
                color="primary"
                variant="bordered"
                placeholder="Elije una condición"
                defaultItems={conditions}
                selectedKey={field.value}
                onSelectionChange={field.onChange}
                onBlur={field.onBlur}
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>
            )}
          />
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-3">
          <label htmlFor="subcategories" className="text-base text-zinc-500 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Sub categoría</label>
          <Controller
            control={control}
            name="subCategories"
            defaultValue=""
            render={({ field }) => (
              <Autocomplete
                aria-label="Sub categoría"
                fullWidth
                id="subcategories"
                size="lg"
                color="primary"
                variant="bordered"
                placeholder="Elije una sub categoría"
                defaultItems={subCategories}
                selectedKey={field.value}
                onSelectionChange={field.onChange}
                onBlur={field.onBlur}
              >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
              </Autocomplete>
            )}
          />
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-3">
          <label htmlFor="stock" className="text-base text-zinc-500 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Stock</label>
          <Input
            aria-label="Stock"
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
        <div className="col-span-12 md:col-span-6 xl:col-span-3">
          <label htmlFor="price" className="text-base text-zinc-500 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Precio</label>
          <Input
            aria-label="Precio"
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
        <div className="col-span-12 md:col-span-6 xl:col-span-3">
          <label htmlFor="company" className="text-base text-zinc-500 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Nombre de la empresa</label>
          <Input
            aria-label="Nombre de la empresa"
            id="company"
            type="text"
            size="lg"
            color="primary"
            variant="bordered"
            placeholder="Nombre de la empresa"
            fullWidth
            {...register("companyName", { required: "El nombre de la empresa es requerido" })}
            isInvalid={errors.companyName ? true : false}
            errorMessage={errors.companyName?.message}
          />
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-3">
          <label htmlFor="discount" className="text-base text-zinc-500 font-medium">Descuento</label>
          <Input
            aria-label="Descuento"
            id="discount"
            type="number"
            size="lg"
            color="primary"
            variant="bordered"
            placeholder="Descuento del producto"
            fullWidth
            {...register("discount")}
          />
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-3">
        <Controller
            control={control}
            name="freeShipping"
            render={({ field }) => (
              <Switch
                id="freeShipping"
                aria-label="Envio gratis"
                isSelected={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
              >
                Envío gratis
              </Switch>
            )}
          />
          {/* <Controller
            control={control}
            {...register("freeShipping")}
            render={({ field: { onChange, onBlur, value } }) => (
              <Switch
                id="freeShipping"
                aria-label="Envio gratis"
                isSelected={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
              >
                Envío gratis
              </Switch>
            )}
          /> */}
        </div>
        <div className="col-span-12 mb-10">
          <label className="text-base text-zinc-500 font-medium after:content-['*'] after:ml-0.5 after:text-red-500">Imagenes</label>
          <div className="mt-2 w-full">
            <Controller
              control={control}
              name="images"
              render={({ field }) => (
                <ImagePreview setImages={field.onChange} images={field.value} error={errors.images ? true : false} />
              )}
            />
            {/* <Controller
              control={control}
              {...register("images", { required: "Las imagenes son requeridas" })}
              render={({ field: { onChange, value } }) => (
                <ImagePreview setImages={onChange} images={value} error={errors.images ? true : false} />
              )}
            /> */}
            {errors.images && <p className="text-xs text-danger-500 mt-1 ml-1">{ errors.images?.message }</p>}
          </div>
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

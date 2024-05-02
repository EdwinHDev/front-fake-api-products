import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Spinner} from "@nextui-org/react"
import { useEffect, useMemo, useState } from "react"
import { IProduct } from "../interfaces/products"

export const Products = () => {
  
  const [page, setPage] = useState(1)
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoadind, setIsLoading] = useState(true)

  console.log(products)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = "https://fake-api-products-git-main-edwinhdevs-projects.vercel.app/api/products"
        const res = await fetch(url)
        const products = await res.json()

        setProducts(products)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }

    getProducts()
  }, [])

  const rowsPerPage = 4

  const pages = Math.ceil(products.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return products.slice(start, end)
  }, [page, products])

  return (
    <Table
      fullWidth
      removeWrapper
      layout="fixed"
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="name">NOMBRE</TableColumn>
        <TableColumn key="category">CATEGORÍA</TableColumn>
        <TableColumn key="stock">STOCK</TableColumn>
        <TableColumn key="price">PRECIO</TableColumn>
        <TableColumn key="status">ESTADO</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No hay productos disponibles"} loadingContent={<Spinner />} isLoading={isLoadind} items={items}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
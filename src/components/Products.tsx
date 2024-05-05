import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, Button, SortDescriptor, ChipProps, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input, Selection} from "@nextui-org/react"
import { Key, useCallback, useEffect, useMemo, useState } from "react"
import { IProduct } from "../interfaces/products"
import { capitalize } from "./utils/capitalize";

const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "IMAGEN", uid: "image" },
  {name: "NOMBRE", uid: "name", sortable: true},
  {name: "CATEGORÍA", uid: "category", sortable: true},
  {name: "STOCK", uid: "stock", sortable: true},
  {name: "PRECIO", uid: "price", sortable: true},
  {name: "ESTADO", uid: "status", sortable: true},
  {name: "ACCIONES", uid: "actions", sortable: true},
];

const statusOptions = [
  {name: "Publicado", uid: "publicado"},
  {name: "No Publicado", uid: "nopublicado"},
  {name: "Bloqueado", uid: "bloqueado"},
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  publicado: "success",
  nopublicado: "warning",
  bloqueado: "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["image", "name", "category", "stock", "price", "status", "actions"];

export const Products = () => {
  
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [productsData, setProductsData] = useState<IProduct[]>([])
  const [isLoadind, setIsLoading] = useState(true)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = "https://fake-api-products-git-main-edwinhdevs-projects.vercel.app/api/products"
        const res = await fetch(url)
        const products = await res.json()

        console.log(products)

        setIsLoading(false)

        if (Array.isArray(products) && products.length > 0) {
          setProductsData(products);
        } else {
          setProductsData([]);
        }

      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }

    getProducts()
  }, [])

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredProducts: IProduct[] = [...productsData];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredProducts = filteredProducts.filter((product) =>
        Array.from(statusFilter).includes(product.status!),
      );
    }

    return filteredProducts;
  }, [productsData, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: IProduct, b: IProduct) => {
      const first = a[sortDescriptor.column as keyof IProduct] as number;
      const second = b[sortDescriptor.column as keyof IProduct] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((product: IProduct, columnKey: Key) => {

    switch (columnKey) {
      case "name":
        return (
          <div className="line-clamp-3">
            { product.name }
          </div>
        );
      case "image":
        return (
          <div className="w-16 h-16 overflow-hidden">
            <img src={ product.images[0] } alt={ product.name } />
          </div>
        );
      case "category":
        return (
          <div>
            { product.category }
          </div>
        );
      case "stock":
        return (
          <div>
            { product.stock }
          </div>
        );
      case "price":
        return (
          <div>
            { product.price }
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[product.status!]} size="sm" variant="flat">
            {product.status}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  {/* <VerticalDotsIcon className="text-default-300" /> */}
                  icono
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre..."
            startContent={"icono"} // icono de busqueda
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={"icono chevron"} variant="flat">
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={"icono chevron"} variant="flat">
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total de productos: {productsData.length}</span>
          <label className="flex items-center text-default-400 text-small">
            Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    productsData.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos los productos seleccionados"
            : `${selectedKeys.size} de ${filteredItems.length} seleccionado`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
      className="h-auto"
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody isLoading={isLoadind} loadingContent={<Spinner />} emptyContent={"No hay productos para mostrar"} items={sortedItems}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
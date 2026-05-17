# 📊 React Table Component

A highly customizable, virtualized, and performant table built with:

- `@tanstack/react-table` for data management
- `@tanstack/react-virtual` for virtualization
- SCSS Modules for styling
- Supports sorting, filtering, pagination, and expandable rows

---

## ✅ Features

- ✅ **Virtualization** (supports thousands of rows)
- ✅ **Expandable rows** (nested sub-tables or components)
- ✅ **Sorting**, **Filtering**, **Pagination**
- ✅ **Custom column types**: Text, Select, Date, and Multi-Select filters
- ✅ **Column-level filters** with clear/reset
- ✅ **Sticky headers**, **hover effects**, and **selection controls**
- ✅ **Server-side support** via external state props
- ✅ **SCSS modules** for scoped, themeable styles

---

## 📦 Install

```bash
npm install @tanstack/react-table @tanstack/react-virtual
```

---

## 🧱 Basic Usage

```tsx
<Table
  data={yourData}
  columns={yourColumns}
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  pageSize={pageSize}
  setPageSize={setPageSize}
  totalCount={totalCount}
  isLoading={isLoading}
  sorting={sorting}
  setSorting={setSorting}
/>
```

---

## 🔧 Column Configuration

Each column supports:

| Property        | Description                             |
| --------------- | --------------------------------------- | -------- | -------------- | ------- |
| `header`        | Column display name                     |
| `accessorKey`   | Key from your data object               |
| `cell`          | Custom cell render function             |
| `filterType`    | `'text'                                 | 'select' | 'multi-select' | 'date'` |
| `filterOptions` | Options for select-type filters         |
| `sort`          | Field name used for server-side sorting |
| `size`          | Optional fixed size                     |
| `enableSorting` | Enable/disable sorting for this column  |

---

## 🔍 Filtering

You can define filters per column.

```tsx
{
  header: "Name",
  accessorKey: "name",
  filterType: "text",
}

{
  header: "Status",
  accessorKey: "status",
  filterType: "select",
  filterOptions: ["Active", "Inactive"],
}
```

---

## 📂 Expandable Rows

Add a `renderSubComponent` prop to support nested content.

```tsx
<Table
  data={data}
  columns={columns}
  renderSubComponent={(row) => <SubTable parentRow={row} />}
/>
```

---

## ♻️ Server-side Support

Supports server-side:

- Pagination
- Sorting
- Filtering

Pass external values via props:

```tsx
<Table
  ...
  currentPage={page}
  setCurrentPage={setPage}
  pageSize={pageSize}
  setPageSize={setPageSize}
  sorting={sorting}
  setSorting={setSorting}
/>
```

---

## 🧩 Defining Columns Dynamically

In more advanced use cases, columns can be defined **dynamically** using external data and custom renderers.

### `DevicesTableColumns` Example

```tsx
export const DevicesTableColumns = ({
  deviceModelResponse,
  organizationResponse,
  deviceCategoryResponse,
  deviceAccessPointResponse,
  onEdit,
  queryKey,
}: {
  deviceModelResponse?: any;
  organizationResponse?: any;
  deviceCategoryResponse?: any;
  deviceAccessPointResponse?: any;
  onEdit?: (row: any) => void;
  queryKey: string;
}) => [
  {
    header: getTranslatedValue('Active'),
    accessorKey: 'active', // row?.active will show the data reffered to this column header
    sort: 'Active', // Active will show be content of column item
    size: 50,
    cell: ({ row }: any) => <StatusIcon status={row?.original?.active} />, //custom rendering of data
  },
  {
    header: getTranslatedValue('Description'),
    accessorKey: 'deviceDescription',
    sort: 'DeviceDescription',
  },
  {
    header: getTranslatedValue('DeviceModel'),
    accessorKey: 'deviceModelId',
    sort: 'DeviceModelId',
    cell: ({ row }: any) => {
      return (
        <>
          {deviceModelResponse?.items?.find(
            (item: any) => item?.id === row?.original?.deviceModelId,
          )?.displayName ?? '-'}
        </>
      );
    },
  },
];
```

---

### Props Explained

| Prop                        | Type                 | Description                                                                |
| --------------------------- | -------------------- | -------------------------------------------------------------------------- |
| `deviceModelResponse`       | `any`                | Used to map `deviceModelId` to display name in the table.                  |
| `organizationResponse`      | `any`                | (Optional) Maps `organizationId` to organization name.                     |
| `deviceCategoryResponse`    | `any`                | (Optional) Maps `deviceCategoryId` to a readable name.                     |
| `deviceAccessPointResponse` | `any`                | (Optional) Maps `accessPointId` to a label.                                |
| `onEdit`                    | `(row: any) => void` | Optional callback for row-specific actions (e.g. open edit drawer).        |
| `queryKey`                  | `string`             | Required for query/mutation cache identification (e.g., React Query keys). |

---

### Usage Example

```tsx
<Table
  data={devices}
  columns={DevicesTableColumns({
    deviceModelResponse,
    organizationResponse,
    deviceCategoryResponse,
    deviceAccessPointResponse,
    onEdit: handleEdit,
    queryKey: 'devices-list',
  })}
  currentPage={currentPage}
  totalCount={total}
  setCurrentPage={setCurrentPage}
  pageSize={pageSize}
  setPageSize={setPageSize}
  isLoading={isLoading}
  sorting={sorting}
  setSorting={setSorting}
/>
```

---

## 🎨 Styling

Styles are modular and scoped using SCSS modules. Override or extend styles via classNames like:

```scss
.table-wrapper {
  border-radius: 8px;
  background: #fff;
}
```

## 📁 File Structure

```
/components/table/
├── index.tsx
├── hooks/
│   └── useVirtualTable.ts
├── utils/
│   └── getColumnConfig.ts
├── styles/
│   └── table.module.scss
```

---

## 🤝 Contributing

Feel free to open issues or PRs. This is designed to be a reusable, extensible base for production tables.

import React from 'react';
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  MarkdownField,
} from '@pankod/refine-mui';
import { useMany } from '@pankod/refine-core';

export const ProductList = () => {
  const { dataGridProps } = useDataGrid();

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: 'categories',
    ids: dataGridProps?.rows?.map((item: any) => item?.category?.id) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColumns<any>>(
    () => [
      {
        field: 'id',
        headerName: 'Id',
        type: 'number',
        minWidth: 50,
      },
      {
        field: 'name',
        headerName: 'Name',
        minWidth: 200,
      },
      {
        field: 'material',
        headerName: 'Material',
        minWidth: 200,
      },
      {
        field: 'description',
        headerName: 'Description',
        minWidth: 250,
        renderCell: function render({ value }) {
          return <MarkdownField value={(value ?? '').slice(0, 80) + '...'} />;
        },
      },
      {
        field: 'price',
        headerName: 'Price',
        minWidth: 200,
      },
      {
        field: 'category',
        headerName: 'Category',
        valueGetter: ({ row }) => {
          const value = row?.category?.id;

          return value;
        },
        minWidth: 300,
        renderCell: function render({ value }) {
          return categoryIsLoading ? (
            <>Loading...</>
          ) : (
            categoryData?.data?.find((item) => item.id === value)?.title
          );
        },
      },
      {
        field: 'actions',
        headerName: 'Actions',
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: 'center',
        headerAlign: 'center',
        minWidth: 80,
      },
    ],
    [categoryData?.data]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};

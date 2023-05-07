import type { Meta, StoryObj } from "@storybook/react";

import { ColumnDef } from "@tanstack/react-table";
import { Table } from "./table";

const meta: Meta<typeof Table> = {
  component: Table,
  title: "Components/Table/Detail/Table",
};

export default meta;

interface EntityDetail {
  creationDate: string;
  entityID: string;
  entityName: string;
  entityType: string;
  lastModifiedDate: string;
}

type Story = StoryObj<typeof Table<EntityDetail>>;

const defaultData: EntityDetail[] = [
  {
    creationDate: "2022-01-01",
    entityID: "12345",
    entityName: "Acme Corporation",
    entityType: "Company",
    lastModifiedDate: "2022-06-30",
  },
  {
    creationDate: "2022-02-15",
    entityID: "67890",
    entityName: "John Smith",
    entityType: "Employee",
    lastModifiedDate: "2022-07-15",
  },
  {
    creationDate: "2022-03-10",
    entityID: "24680",
    entityName: "Project X",
    entityType: "Project",
    lastModifiedDate: "2022-08-20",
  },
  {
    creationDate: "2022-04-01",
    entityID: "13579",
    entityName: "Jane Doe",
    entityType: "Contractor",
    lastModifiedDate: "2022-09-01",
  },
  {
    creationDate: "2022-05-15",
    entityID: "86420",
    entityName: "Product Y",
    entityType: "Product",
    lastModifiedDate: "2022-10-15",
  },
];

const defaultColumns: ColumnDef<EntityDetail>[] = [
  {
    accessorKey: "entityName",
    header: "Entity Name",
  },
  {
    accessorKey: "entityType",
    header: "Entity Type",
  },
  {
    accessorKey: "entityID",
    header: "Entity ID",
  },
  {
    accessorKey: "creationDate",
    header: "Creation Date",
  },
  {
    accessorKey: "lastModifiedDate",
    header: "Last Modified Date",
  },
];

export const Default: Story = {
  args: {
    columns: defaultColumns,
    gridTemplateColumns: "repeat(5, 1fr)",
    items: defaultData,
  },
};

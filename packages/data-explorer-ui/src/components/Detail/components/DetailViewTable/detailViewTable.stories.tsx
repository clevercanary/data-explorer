import { Meta, StoryObj } from "@storybook/react";
import { DetailViewTable } from "./detailViewTable";

const meta: Meta<typeof DetailViewTable> = {
  argTypes: {
    columns: { control: false },
    gridTemplateColumns: { control: false },
    items: { control: false },
  },
  component: DetailViewTable,
  title: "Components/Table/DetailViewTable",
};

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  {
    age: 24,
    firstName: "tanner",
    lastName: "linsley",
    progress: 50,
    status: "In Relationship",
    visits: 100,
  },
  {
    age: 40,
    firstName: "tandy",
    lastName: "miller",
    progress: 80,
    status: "Single",
    visits: 40,
  },
  {
    age: 45,
    firstName: "joe",
    lastName: "dirte",
    progress: 10,
    status: "Complicated",
    visits: 20,
  },
];

const columns = [
  {
    accessorKey: "firstName",
  },
  {
    accessorKey: "lastName",
  },
  {
    accessorKey: "age",
  },
  {
    accessorKey: "visits",
  },
  {
    accessorKey: "status",
  },
  {
    accessorKey: "progress",
  },
];

export const DetailViewTableStory: Story = {
  args: {
    columns,
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
    items,
    noResultsTitle: "No results",
  },
};

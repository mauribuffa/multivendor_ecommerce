import { Category } from "@prisma/client";

interface CategoryDetailsProps {
  data?: Category;
}

export const CategoryDetails = ({ category }: CategoryDetailsProps) => {
  return <div>CategoryDetails</div>;
};

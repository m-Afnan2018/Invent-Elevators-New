import CategoryPageClient from "@/components/core/category/CategoryPageClient";
import { getCategoryById } from "@/services/categories.service";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  try {
    const category = await getCategoryById(resolvedParams?.id);
    const name = category?.name || "Category";
    const description = category?.description || `Browse ${name} products — premium lift solutions by Invent Elevator.`;
    return {
      title: name,
      description,
      openGraph: {
        title: `${name} | Invent Elevator`,
        description,
      },
    };
  } catch {
    return { title: "Products | Invent Elevator" };
  }
}

export default async function CategoryByIdPage({ params }) {
  const resolvedParams = await params;
  return <CategoryPageClient categoryId={resolvedParams?.id} />;
}

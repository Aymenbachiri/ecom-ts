import EditForm from "@/components/EditForm";

async function getData(id: string) {
  const url = process.env.API_URL;
  const res = await fetch(`${url}/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Edit({ params }: { params: { id: string } }) {
  const product = await getData(params.id);
  return (
    <EditForm
      id={product._id}
      title={product.title}
      category={product.category}
      price={product.price}
      oldprice={product.oldprice}
      description={product.description}
      imageurl={product.imageurl}
      rating={product.rating}
    />
  );
}

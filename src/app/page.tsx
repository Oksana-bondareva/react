import { Suspense } from "react";
import Home from "./(home)/home";
import Loader from "../components/Loader/Loader";

interface SearchParams {
  search?: string;
  page?: string;
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<Loader />}>
      <Home searchParams={searchParams} />
    </Suspense>
  );
}

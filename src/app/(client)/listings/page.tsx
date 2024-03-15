import getListings from "@/actions/getListings";
import ListingList from "@/components/lists/ListingList";
import ListingLoadMore from "@/components/pagination/ListingLoadMore";

export default async function Home({ params }: { params: any }) {
  const { listings, pagination } = await getListings();
  return (
    <>
      <ListingList
        className="pt-44 pb-0"
        listings={listings}
        pagination={pagination}
        main
      />
      <ListingLoadMore pagination={pagination} params={params.searchParams} />
    </>
  );
}

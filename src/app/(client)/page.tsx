import getListings from "@/actions/getListings";
import ListingList from "@/components/lists/ListingList";
import ListingLoadMore from "@/components/pagination/ListingLoadMore";

export default async function Home(params: any) {
  const { listings, pagination } = await getListings(params.searchParams);

  return (
    <>
      <ListingList
        pagination={pagination}
        className="pt-52"
        main
        listings={listings}
      />
      {listings.length === 10 && (
        <ListingLoadMore pagination={pagination} params={params.searchParams} />
      )}
    </>
  );
}

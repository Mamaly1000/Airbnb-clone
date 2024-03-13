import getListings from "@/actions/getListings";
import ListingList from "@/components/lists/ListingList";
import ListingLoadMore from "@/components/pagination/ListingLoadMore";

export default async function Home(params: any) {
  const { listings, pagination } = await getListings(params.searchParams);

  return (
    <>
      <ListingList className="pt-44 pb-0" main listings={listings} />
      {listings.length === 10 && (
        <ListingLoadMore pagination={pagination} params={params.searchParams} />
      )}
    </>
  );
}

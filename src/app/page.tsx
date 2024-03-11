import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import ListingList from "@/components/lists/ListingList";
import ListingLoadMore from "@/components/pagination/ListingLoadMore";
import EmptyState from "@/components/ui/EmptyState";
import { isNull } from "lodash";

export default async function Home(params: any) {
  const { listings } = await getListings(params.searchParams);
  const currentUser = await getCurrentUser();

  if (isNull(currentUser)) {
    return <EmptyState showReset />;
  }
  return (
    <>
      <ListingList
        className="pt-44 pb-0"
        main
        listings={listings}
        user={currentUser}
      />
      {listings.length === 10 && (
        <ListingLoadMore params={params.searchParams} user={currentUser} />
      )}
    </>
  );
}

import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import ListingList from "@/components/lists/ListingList";
import ListingLoadMore from "@/components/pagination/ListingLoadMore";
import EmptyState from "@/components/ui/EmptyState";
import { isNull } from "lodash";

export default async function Home({ params }: { params: any }) {
  const { listings } = (await getListings()) || [];
  const currentUser = await getCurrentUser();
  if (isNull(currentUser)) {
    return <EmptyState showReset />;
  }
  return (
    <>
      <ListingList
        className="pt-44 pb-0"
        listings={listings}
        user={currentUser}
        main
      />
      {listings.length === 10 && (
        <ListingLoadMore params={params.searchParams} user={currentUser} />
      )}
    </>
  );
}

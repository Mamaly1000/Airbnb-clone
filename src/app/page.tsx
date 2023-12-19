import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import ListingCard from "@/components/card/ListingCard";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";

export default async function Home(params: any) { 

  const listings = await getListings(params.searchParams);
  const currentUser = await getCurrentUser();

  if (!listings) {
    return;
  }
  if (listings.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <Container classname="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {listings?.map((listing) => {
        return (
          <ListingCard user={currentUser} listing={listing} key={listing.id} />
        );
      })}
    </Container>
  );
}

import RoomCard from "@/components/home/RoomCard";
import { GET_ALL_ROOMS } from "@/graphql/queries/room";
import type { RoomType } from "@/types/room";
import { useQuery } from "@apollo/client/react";

function Home() {
  const { data, loading } = useQuery<{ getAllRooms: RoomType[] }>(
    GET_ALL_ROOMS,
  );

  return (
    <main className="layout pb-12">
      <div>
        <h1 className="text-2xl font-bold">Top trending hotel in Myanmar</h1>
        <p className="text-sm font-medium text-muted-foreground">
          Discover the most trending hotels for unforgettable experience.
        </p>
      </div>
      <div className="mt-5">
        {loading && <p>Loading...</p>}
        {!loading && data?.getAllRooms && (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.getAllRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default Home;

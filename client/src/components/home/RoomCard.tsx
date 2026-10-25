import type { RoomType } from "@/types/room";
import { cn } from "cn";
import { MapPin, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

type RoomCardProps = {
  room: RoomType;
};

function RoomCard({ room }: RoomCardProps) {
  const image = room.images[0]?.url;
  const [loading, setLoading] = useState(Boolean(image));

  return (
    <Link to={`/rooms/${room.id}`} className="block">
      {loading && image && (
        <div className="w-full aspect-video bg-gray-300 flex items-center justify-center rounded-lg animate-pulse">
          <p>loading</p>
        </div>
      )}
      {image ? (
        <img
          src={image}
          alt={room.title}
          className={cn(
            "w-full rounded-lg aspect-video object-cover",
            loading ? "hidden" : "block",
          )}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      ) : (
        <div className="w-full aspect-video rounded-lg bg-gray-300 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-500">No image</span>
        </div>
      )}
      <div>
        <h2 className="text-lg font-bold my-1">{room.title}</h2>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-gray-400">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-5 h-5" aria-hidden="true" />
            {room.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="w-5 h-5" aria-hidden="true" />
            {room.reviews.length} reviews
          </span>
        </div>
      </div>
      <p className="text-xl font-bold">
        $ {room.pricePerNight}
        <span className="ml-1 text-sm font-medium text-gray-400">/ night</span>
      </p>
    </Link>
  );
}

export default RoomCard;

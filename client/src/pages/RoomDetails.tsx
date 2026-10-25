import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GET_ROOM_BY_ID } from "@/graphql/queries/room";
import type { RoomType } from "@/types/room";
import { useQuery } from "@apollo/client/react";
import { cn } from "cn";
import {
  ArrowLeft,
  BadgeCheck,
  CircleX,
  Hash,
  MapPin,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";

function RoomDetails() {
  const params = useParams<{ id: string }>();
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const { data, loading, error } = useQuery<{ getRoomById: RoomType }>(
    GET_ROOM_BY_ID,
    {
      variables: { roomId: params.id },
    },
  );

  if (loading) {
    return (
      <main className="layout pb-12">
        <p>Loading...</p>
      </main>
    );
  }

  if (error || !data?.getRoomById) {
    return (
      <main className="layout pb-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-200"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" /> Back to home
        </Link>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-2xl font-bold">Room not found.</p>
          <p className="text-sm font-medium text-gray-400">
            The room you are looking for may have been removed or is
            unavailable.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 underline underline-offset-4 hover:text-gray-100"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" /> Browse all
            rooms
          </Link>
        </div>
      </main>
    );
  }

  const {
    images,
    isAvailable,
    location,
    pricePerNight,
    reviews,
    type,
    capacity,
    description,
    roomNumber,
    title,
  } = data.getRoomById;

  const items = [
    {
      value: capacity,
      label: "Guests",
      icon: <Users className="w-5 h-5" aria-hidden="true" />,
    },
    {
      value: type,
      label: "Room type",
      icon: <BadgeCheck className="w-5 h-5" aria-hidden="true" />,
    },
    {
      value: location,
      label: "Location",
      icon: <MapPin className="w-5 h-5" aria-hidden="true" />,
    },
  ];

  return (
    <main className="layout pb-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-200"
      >
        <ArrowLeft className="w-5 h-5" aria-hidden="true" /> Back to home
      </Link>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3 lg:min-h-96">
          <Carousel className="h-full w-full">
            <CarouselContent className="ml-0 h-full">
              {images.map((image, index) => (
                <CarouselItem key={index} className="pl-0">
                  {!loadedImages.includes(index) && (
                    <div className="w-full aspect-video bg-gray-300 flex items-center justify-center rounded-lg animate-pulse lg:h-full lg:aspect-auto">
                      <p>loading</p>
                    </div>
                  )}
                  <img
                    src={image.url}
                    alt={`${title} ${index + 1}`}
                    className={cn(
                      "w-full aspect-video rounded-lg object-cover lg:h-full lg:aspect-auto",
                      loadedImages.includes(index) ? "block" : "hidden",
                    )}
                    onLoad={() =>
                      setLoadedImages((prev) =>
                        prev.includes(index) ? prev : [...prev, index],
                      )
                    }
                    onError={() =>
                      setLoadedImages((prev) =>
                        prev.includes(index) ? prev : [...prev, index],
                      )
                    }
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <CarouselPrevious className="left-4! bg-background/80 backdrop-blur-sm" />
                <CarouselNext className="right-4! bg-background/80 backdrop-blur-sm" />
              </>
            )}
          </Carousel>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-medium text-gray-400">
              <Hash className="w-5 h-5" aria-hidden="true" /> {roomNumber}
              {isAvailable ? (
                <>
                  <BadgeCheck
                    className="w-5 h-5 text-green-500"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Available</span>
                </>
              ) : (
                <>
                  <CircleX
                    className="w-5 h-5 text-red-500"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Not available</span>
                </>
              )}
            </div>
          </div>
          <p className="text-sm font-medium text-gray-300">{description}</p>
          <p className="text-3xl font-bold">
            $ {pricePerNight}
            <span className="ml-1 text-base font-medium text-gray-400">
              / night
            </span>
          </p>
          <div className="flex items-center justify-center gap-4 border-2 border-gray-400 rounded-md p-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-1"
              >
                {item.icon}
                <span className="text-sm font-medium">{item.value}</span>
                <span className="text-xs font-medium text-gray-400">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-yellow-500 text-sm font-medium">
            Reviews ({reviews.length})
          </p>
        </div>
      </div>
    </main>
  );
}

export default RoomDetails;

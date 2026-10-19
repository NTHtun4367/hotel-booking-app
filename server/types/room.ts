type RoomImageType = {
  url: string;
  public_id: string;
};

export type RoomType = {
  roomNumber: string;
  type: string;
  pricePerNight: number;
  capacity: number;
  isAvailable: boolean;
  images: RoomImageType[];
  reviews: string[];
  location: string;
  createdAt: string;
  updatedAt: string;
};

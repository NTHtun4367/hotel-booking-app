import { gql } from "@apollo/client";

export const GET_ALL_ROOMS = gql`
  query GetAllRooms {
    getAllRooms {
      id
      title
      images {
        url
      }
      location
      pricePerNight
      reviews
    }
  }
`;

export const GET_ROOM_BY_ID = gql`
  query GetRoomById($roomId: ID!) {
    getRoomById(roomId: $roomId) {
      id
      title
      description
      roomNumber
      type
      pricePerNight
      capacity
      isAvailable
      images {
        url
        public_id
      }
      reviews
      location
    }
  }
`;

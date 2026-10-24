import gql from "graphql-tag";

export const roomTypeDefs = gql`
  type RoomImages {
    url: String!
    public_id: String!
  }

  type Room {
    id: ID!
    title: String!
    description: String!
    roomNumber: String!
    type: String!
    pricePerNight: Float!
    capacity: Int!
    isAvailable: Boolean!
    images: [RoomImages]
    reviews: [String]
    location: String!
    createdAt: String
    updatedAt: String
  }

  input roomInput {
    title: String!
    description: String!
    roomNumber: String!
    type: String!
    pricePerNight: Float!
    capacity: Int!
    isAvailable: Boolean!
    images: [String]
    reviews: [String]
    location: String!
  }

  type Query {
    getAllRooms: [Room]
    getRoomById(roomId: ID!): Room
  }

  type Mutation {
    createNewRoom(roomInput: roomInput!): Room
    updateRoom(roomId: ID!, roomInput: roomInput!): String
    deleteRoom(roomId: ID!): String
  }
`;

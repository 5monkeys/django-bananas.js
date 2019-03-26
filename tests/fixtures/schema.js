export const nestedSchema = {
  id: {
    title: "Id",
    type: "integer",
    readOnly: true,
    required: false,
  },
  status: {
    title: "Status",
    type: "string",
    enum: [
      "SUBMITTED",
      "INCOMPLETE",
      "PENDING",
      "APPROVED",
      "UNAPPROVED",
      "DELIVERED",
      "UNDELIVERABLE",
      "RELEASED",
      "REJECTED",
      "TAKEDOWN",
      "DELETED",
    ],
    required: true,
  },
  name: {
    title: "Name",
    type: "string",
    minLength: 1,
    required: true,
  },
  artist: {
    title: "Artist",
    required: false,
    type: "object",
    properties: {
      id: {
        title: "Id",
        type: "integer",
        readOnly: true,
      },
      name: {
        title: "Name",
        type: "string",
        readOnly: true,
        maxLength: 255,
        minLength: 1,
      },
      members: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              title: "Id",
              type: "integer",
              readOnly: true,
            },
            first_name: {
              title: "First name",
              type: "string",
              readOnly: true,
              minLength: 1,
            },
            releases: {
              title: "Releases",
              type: "object",
              properties: {
                total: {
                  title: "Total",
                  type: "integer",
                  readOnly: true,
                },
                pending: {
                  title: "Pending",
                  type: "integer",
                  readOnly: true,
                },
              },
              $$ref: "#/definitions/MemberReleasesStats",
            },
          },
          $$ref: "#/definitions/Member",
        },
      },
    },
    $$ref: "#/definitions/Artist",
  },
};

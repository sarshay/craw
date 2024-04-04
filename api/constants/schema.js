exports.SCHEMA = {
  CREATE: {
    USER: ["name", "email", "img_url"],
    CONTENT: [
      "title",
      "description",
      "body",
      "type_id",
      "created_by",
      'image_file_name',
      "isDraft",
    ],
  },
  CREATE_REQUIRED: {
    USER: ["name", "username", "power", "password"],
    CONTENT: ["title", "type_id"],
  },
  READ: {
    USER: ["id", "name", "email", "img_url"],
    CONTENT: [
      "id",
      "title",
      "image_file_name",
      "description",
      "body",
      "type_id",
      "type",
      "fields",
      "created_by",
      "modify_by",
      "create_time",
      "modify_time",
      "topics",
      "vote_count",
      "amIVote",
    ],
  },
  UPDATE: {
    USER: ["id", "name", "email", "img_url", "modify_by"],
    CONTENT: [
      "id",
      "title",
      "description",
      "body",
      "type_id",
      "topic_id",
      "keywords",
      "image_file_name"
    ],
  },
  UPDATE_REQUIRED: {
    USER: ["id"],
    CONTENT: ["id"],
  },
};

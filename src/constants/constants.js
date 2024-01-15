module.exports = Object.freeze({
  INDEX_NOT_FOUND: -1,
  NO_ITEM_COUNT: 0,
  INDEX_ZERO: 0,
  INDEX_ONE: 1,
  SALT_ROUNDS: 10,

  Delimeters: {
    EMPTY: "",
    STRING_JOIN_SYMBOL_TILT: "~~",
    EXTRA_SPACE: " ",
    AMPERSAND: "&",
    PIPE: "|",
    ASTRIK: "*",
    FORWARD_SLASH: "/",
  },
  response_code: {
    /** Success Codes */
    SUCCESS: 200,
    No_Content: 204,
    EMPTY_REQ: 227,

    /** Error Codes*/
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    JWT: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INVALID_ID: 406,
    DUPLICATE: 406,
    CONFLICT: 409,
    FILE_NOT_SUPPORTED: 415,
    UPGRADE_APP: 426,
    ROLE_BREACH: 451,
    RECORD_NOT_FOUND: 499,
    INTERNAL_SERVER_ERROR: 500,
  },

  STRING_CONSTANTS: {
    SOME_ERROR_OCCURED: "Some error occurred while retrieving data.",
    INVALID_AUTHORIZATION: "Unauthorized Request",
  },
  METHODS: {
    GET: "get",
    POST: "post",
  }
});

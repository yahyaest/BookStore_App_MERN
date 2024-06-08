db.orders.insertMany([
  {
    _id: ObjectId("60aad465feb58d194461abc0"),
    is_shiped: false,
    order_key: "koma8n8fin",
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6cb"),
      username: "ace",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6da"),
      name: "A Promised Land",
    },
    order_date: {
      $date: "2021-05-23T22:17:09.620Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("60aad46afeb58d194461abc4"),
    is_shiped: false,
    order_key: "koma8n8fin",
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6cb"),
      username: "ace",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6de"),
      name: "Attack on Titan",
    },
    order_date: {
      $date: "2021-05-23T22:17:14.554Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("60aad49efeb58d194461abf4"),
    is_shiped: false,
    order_key: "koma8n8fin",
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6c2"),
      username: "luffy",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6d6"),
      name: "Cracking the Coding Interview: 189 Programming Questions and Solutions",
    },
    order_date: {
      $date: "2021-05-23T22:18:06.954Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("60aad4d6feb58d194461abfe"),
    is_shiped: false,
    order_key: "koma8n8fin",
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6c2"),
      username: "luffy",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6d4"),
      name: "Antifragile: Things That Gain from Disorder",
    },
    order_date: {
      $date: "2021-05-23T22:19:02.162Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("60aad4f9feb58d194461ac32"),
    is_shiped: false,
    order_key: "koma8n8fin",
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6cb"),
      username: "ace",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6e0"),
      name: "Parasyte",
    },
    order_date: {
      $date: "2021-05-23T22:19:37.081Z",
    },
    __v: 0,
  },
]);

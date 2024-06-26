db.comments.insertMany([
  {
    _id: ObjectId("60969d3e3a11b955b0c64c10"),
    like_counter: 0,
    dislike_counter: 0,
    comment_replies: [],
    like_submitter: [],
    dislike_submitter: [],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6cb"),
      username: "ace",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6d5"),
      name: "Your Next Five Moves: Master the Art of Business Strategy",
    },
    comment: "Great book. Also watch Patrick Bet-David podcast on youtube.",
    created_at: "2021-05-08T14:16:30.418Z",
    __v: 0,
  },
  {
    _id: ObjectId("60987840c3514655903adf3d"),
    like_counter: 4,
    dislike_counter: 1,
    comment_replies: [
      {
        submitter: "yahya",
        body: "Yes, I totaly agree.",
      },
      {
        submitter: "luffy",
        body: "Absolutely",
      },
      {
        submitter: "brook",
        body: "Just finished it yesterday.",
      },
    ],
    like_submitter: ["luffy", "kaido", "nami", "sanji"],
    dislike_submitter: ["zoro"],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6c1"),
      username: "yahya",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6d1"),
      name: "Rich Dad, Poor Dad",
    },
    comment: "Great Book !",
    created_at: "2021-05-10T00:03:12.382Z",
    __v: 0,
  },
  {
    _id: ObjectId("609879c4c3514655903adf49"),
    like_counter: 3,
    dislike_counter: 0,
    comment_replies: [
      {
        submitter: "nami",
        body: "You need to read The Secret History of the American Empire as next step.",
      },
    ],
    like_submitter: ["luffy", "nami", "robin"],
    dislike_submitter: [],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6c1"),
      username: "yahya",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6d2"),
      name: "Confessions of an Economic Hitman",
    },
    comment:
      "One of the best books.Can't wait to read more books from the same athor.",
    created_at: "2021-05-10T00:09:40.271Z",
    __v: 0,
  },
  {
    _id: ObjectId("60987a85c3514655903adf53"),
    like_counter: 1,
    dislike_counter: 0,
    comment_replies: [
      {
        submitter: "nami",
        body: "Agreed.",
      },
    ],
    like_submitter: ["nami"],
    dislike_submitter: [],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6c2"),
      username: "luffy",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6d3"),
      name: "The Art of War",
    },
    comment:
      "Recommended book for everyone looking for historical and wars books.",
    created_at: "2021-05-10T00:12:53.566Z",
    __v: 0,
  },
  {
    _id: ObjectId("60987b14c3514655903adf5f"),
    like_counter: 3,
    dislike_counter: 1,
    comment_replies: [
      {
        submitter: "nami",
        body: "Yes, I confirm.",
      },
      {
        submitter: "luffy",
        body: "I'm planning to read it.",
      },
      {
        submitter: "ace",
        body: "Agreed",
      },
    ],
    like_submitter: ["nami", "ace", "brook"],
    dislike_submitter: ["luffy"],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6c3"),
      username: "zoro",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6d4"),
      name: "Antifragile: Things That Gain from Disorder",
    },
    comment: "One of the greatest psychological books.",
    created_at: "2021-05-10T00:15:16.575Z",
    __v: 0,
  },
  {
    _id: ObjectId("60987c83c3514655903adf69"),
    like_counter: 3,
    dislike_counter: 2,
    comment_replies: [
      {
        submitter: "luffy",
        body: "Agreed.",
      },
    ],
    like_submitter: ["sanji", "kaido", "ace"],
    dislike_submitter: ["luffy", "zoro"],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6c6"),
      username: "brook",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6d1"),
      name: "Rich Dad, Poor Dad",
    },
    comment:
      "This book is very generalized, sounds good but, without any details like where to start getting capital?",
    created_at: "2021-05-10T00:21:23.594Z",
    __v: 0,
  },
  {
    _id: ObjectId("60989016c3514655903adf73"),
    like_counter: 0,
    dislike_counter: 1,
    comment_replies: [
      {
        submitter: "luffy",
        body: "Same.",
      },
    ],
    like_submitter: [],
    dislike_submitter: ["kaido"],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6cc"),
      username: "sabo",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6d1"),
      name: "Rich Dad, Poor Dad",
    },
    comment:
      "I found this book very helpful and inspiring to my future, i liked that is straight to the point and the stories he tells are actually relatable and realistic.",
    created_at: "2021-05-10T01:44:54.844Z",
    __v: 0,
  },
  {
    _id: ObjectId("60989096c3514655903adf7d"),
    like_counter: 3,
    dislike_counter: 1,
    comment_replies: [
      {
        submitter: "luffy",
        body: "I'm more intersted to read it now.",
      },
    ],
    like_submitter: ["kaido", "luffy", "sanji"],
    dislike_submitter: ["ace"],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6c7"),
      username: "nami",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6d1"),
      name: "Rich Dad, Poor Dad",
    },
    comment:
      "This book is full of many much concepts. This book inspires and motivates us to reprogram our minds and finances to escape from the Rat Race of “Get up, Go for Job and Pay Bill.",
    created_at: "2021-05-10T01:47:02.615Z",
    __v: 0,
  },
  {
    _id: ObjectId("60989163c3514655903adf8b"),
    like_counter: 1,
    dislike_counter: 0,
    comment_replies: [
      {
        submitter: "luffy",
        body: "Same Opinion",
      },
    ],
    like_submitter: ["ussop"],
    dislike_submitter: [],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6c4"),
      username: "sanji",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6d1"),
      name: "Rich Dad, Poor Dad",
    },
    comment:
      "This book is full of many much concepts and is a source of inspiration and motivations.",
    created_at: "2021-05-10T01:50:27.814Z",
    __v: 0,
  },
  {
    _id: ObjectId("6098920bc3514655903adf93"),
    like_counter: 1,
    dislike_counter: 0,
    comment_replies: [
      {
        submitter: "zoro",
        body: "What's the channel name ?",
      },
      {
        submitter: "nami",
        body: "Rich dad channel.",
      },
    ],
    like_submitter: ["nami"],
    dislike_submitter: [],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6c8"),
      username: "robin",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6d1"),
      name: "Rich Dad, Poor Dad",
    },
    comment:
      "I love Robert  Kiyosaki. He has a youtube channel that explain in depth the monetary system and economics in general.",
    created_at: "2021-05-10T01:53:15.460Z",
    __v: 0,
  },
  {
    _id: ObjectId("60989280c3514655903adf9d"),
    like_counter: 1,
    dislike_counter: 2,
    comment_replies: [
      {
        submitter: "luffy",
        body: "Yes, Of course.",
      },
    ],
    like_submitter: ["luffy"],
    dislike_submitter: ["nami", "sanji"],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6cd"),
      username: "law",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6d1"),
      name: "Rich Dad, Poor Dad",
    },
    comment: "Is it worth reading ?",
    created_at: "2021-05-10T01:55:12.266Z",
    __v: 0,
  },
  {
    _id: ObjectId("60989312c3514655903adfa5"),
    like_counter: 2,
    dislike_counter: 2,
    comment_replies: [
      {
        submitter: "zoro",
        body: "Can't wait to read it.",
      },
    ],
    like_submitter: ["kaido", "zoro"],
    dislike_submitter: ["nami", "ace"],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6cf"),
      username: "kaido",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6d1"),
      name: "Rich Dad, Poor Dad",
    },
    comment: "I think i'm goinig to read after all these recommandations.",
    created_at: "2021-05-10T01:57:38.162Z",
    __v: 0,
  },
  {
    _id: ObjectId("609915045bc8d757285a124a"),
    like_counter: 2,
    dislike_counter: 1,
    comment_replies: [
      {
        submitter: "zoro",
        body: "Can't wait to read it.",
      },
      {
        submitter: "luffy",
        body: "Agreed.",
      },
    ],
    like_submitter: ["zoro", "luffy"],
    dislike_submitter: ["kaido"],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6c7"),
      username: "nami",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6d2"),
      name: "Confessions of an Economic Hitman",
    },
    comment: "Great author.This book reveal a lot of secrets.",
    created_at: "2021-05-10T11:12:04.214Z",
    __v: 0,
  },
  {
    _id: ObjectId("609917a95bc8d757285a1252"),
    like_counter: 1,
    dislike_counter: 0,
    comment_replies: [],
    like_submitter: ["brook"],
    dislike_submitter: [],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6c6"),
      username: "brook",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6d7"),
      name: "Rich Dad's CASHFLOW Quadrant: Rich Dad's Guide to Financial Freedom",
    },
    comment:
      "Financial freedom is a vastly different from financial security. For those of you who have read Rich Dad Poor Dad this book is basically an extension of the lessons taught in that book.",
    created_at: "2021-05-10T11:23:21.372Z",
    __v: 0,
  },
  {
    _id: ObjectId("6099182b5bc8d757285a125a"),
    like_counter: 2,
    dislike_counter: 0,
    comment_replies: [
      {
        submitter: "doflamingo",
        body: "Bought the book yesterday. Can't wait to start reading it.",
      },
    ],
    like_submitter: ["brook", "doflamingo"],
    dislike_submitter: [],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6c6"),
      username: "brook",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6d6"),
      name: "Cracking the Coding Interview: 189 Programming Questions and Solutions",
    },
    comment:
      "This book feels very unique and like other books by McDowell I highly recommend it for people at the beginning of their career. I wish I've read a book like this 20 years ago, my career could have been much better. The actual back-to-back part of the book is quite short, so don't be intimidated by its size, most of the book are answers to the problems, which is a good thing.The book goes into a lot of detail on how to solve problems so it doesn't suffer from that problem where you are following the steps and suddenly once seems magical and unreproduceable. This means that sometimes the book is tedious and slow, but you can't have both things at the same time and for this book it's better for it to be slow that jumping around making magic leaps.",
    created_at: "2021-05-10T11:25:31.220Z",
    __v: 0,
  },
  {
    _id: ObjectId("609918b95bc8d757285a1260"),
    like_counter: 1,
    dislike_counter: 1,
    comment_replies: [
      {
        submitter: "sabo",
        body: "You're totally right.",
      },
      {
        submitter: "ace",
        body: "That's not true !",
      },
    ],
    like_submitter: ["sabo"],
    dislike_submitter: ["ace"],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6c6"),
      username: "brook",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6d8"),
      name: "Think and Grow Rich",
    },
    comment:
      "I expected a practical guide to managing personal finance, but got something a little kooky.On to the next one.",
    created_at: "2021-05-10T11:27:53.084Z",
    __v: 0,
  },
  {
    _id: ObjectId("609925ab72e8ec450cc3bac8"),
    like_counter: 2,
    dislike_counter: 1,
    comment_replies: [
      {
        submitter: "ace",
        body: "Me too",
      },
    ],
    like_submitter: ["nami", "ussop"],
    dislike_submitter: ["ace"],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6c2"),
      username: "luffy",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6de"),
      name: "Attack on Titan",
    },
    comment: "Can't wait for part 2 of the last season.",
    created_at: "2021-05-10T12:23:07.925Z",
    __v: 0,
  },
  {
    _id: ObjectId("60a2df6b5b50b3360077b36e"),
    like_counter: 2,
    dislike_counter: 1,
    comment_replies: [],
    like_submitter: ["nami", "ace"],
    dislike_submitter: ["zoro"],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6cb"),
      username: "ace",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6da"),
      name: "A Promised Land",
    },
    comment: "Worst book ever.",
    created_at: "2021-05-17T21:26:03.402Z",
    __v: 0,
  },
  {
    _id: ObjectId("60a304072fffbd4688484c62"),
    like_counter: 1,
    dislike_counter: 0,
    comment_replies: [],
    like_submitter: ["ace"],
    dislike_submitter: [],
    user: {
      _id: ObjectId("601e81b9cc45272a0875c6cb"),
      username: "ace",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6dc"),
      name: "Death Note",
    },
    comment: "Best Manga",
    created_at: "2021-05-18T00:02:15.588Z",
    __v: 0,
  },
  {
    _id: ObjectId("60a437847995085f445d6a98"),
    like_counter: 1,
    dislike_counter: 0,
    comment_replies: [],
    like_submitter: ["doflamingo"],
    dislike_submitter: [],
    user: {
      _id: ObjectId("60a4369a7995085f445d6a12"),
      username: "doflamingo",
    },
    book: {
      _id: ObjectId("601e81b9cc45272a0875c6e0"),
      name: "Parasyte",
    },
    comment: "This manga has a great anime adaptation by MAD studio.",
    created_at: "2021-05-18T21:54:12.819Z",
    __v: 0,
  },
]);

const request = require("supertest");
const { User } = require("../../models/user");
const { Book } = require("../../models/book");
const multer = require("multer");

describe("auth middleware", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await Book.remove({}); // Cleaning database
  });

  let token;
  const exec = () => {
    return request(server)
      .post("/api/books")
      .set("x-auth-token", token)
      .send({
        name: "aaaa",
        author: "aaaa",
        genre: "aaaa",
        publisher: "aaaa",
        date: "aaaa",
        summary: "aaaa",
        about_author: "aaaa",
        rate: 5,
        price: 5,
        image: [
          {
            originalname: "sample.name",
            mimetype: "sample.type",
            path: "sample.url",
          },
        ],
      });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it("should return 401 if no token is provided", async () => {
    token = "";

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "a";

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});

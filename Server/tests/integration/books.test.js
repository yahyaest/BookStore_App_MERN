const request = require("supertest");
const { Book } = require("../../models/book");
const { User } = require("../../models/user");
const mongoose = require("mongoose");

let server;

describe("/api/books", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await Book.remove({}); // Cleaning database
  });

  describe("GET/", () => {
    it("should return all books", async () => {
      await Book.collection.insertMany([
        {
          name: "book1",
          author: "aaaa",
          genre: "aaaa",
          publisher: "aaaa",
          date: "aaaa",
          summary: "aaaa",
          about_author: "aaaa",
          rate: 5,
          price: 5,
        },
        {
          name: "book2",
          author: "aaaa",
          genre: "aaaa",
          publisher: "aaaa",
          date: "aaaa",
          summary: "aaaa",
          about_author: "aaaa",
          rate: 5,
          price: 5,
        },
      ]);
      const res = await request(server).get("/api/books");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((book) => (book.name = "book1"))).toBeTruthy();
      expect(res.body.some((book) => (book.name = "book2"))).toBeTruthy();
    });
  });
});

const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",

    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

    it('can save a user with an array of numbers', (done) => {
      const user = new User({
        email: "someone@example.com",
        password: "password",
        firstName: "Rachel",
        surname: "Newby",
        friendsList: [1, 2, 3]
      });

      user.save((err) => {
        expect(err).toBeNull();
  
        User.find((err, users) => {
          expect(err).toBeNull();
  
          expect(users[0].toJSON()).toMatchObject({
            email: "someone@example.com",
            password: "password",
            firstName: "Rachel",
            surname: "Newby",
            friendsList: [1, 2, 3]
          });
          done();
      })
    });
  })
});
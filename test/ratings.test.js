// Do the data types of the body parameters for an axios post request to add a review match those in the api documentation (learn)?

// import data object from Ratings&Reviews.jsx

// hardcoded data object used to test axios post request
let data = {
  product_id: 40344,
  rating: 5,
  summary: "good stuff",
  body: "good stuff...looking forward to using this product",
  recommend: true,
  name: "questionasker",
  email: "questionasker@email.com",
  photos: ["https://static.vecteezy.com/system/resources/thumbnails/001/189/165/small/star.png"],
  characteristics: {"14": 5, "15": 5}
}

describe("data", () => {

  test("checks to make sure the product_id is a number (integer)", () => {
    expect(
      typeof data.product_id
    ).toBe("number")
  });

  test("checks to make sure the rating is a number (integer)", () => {
    expect(
      typeof data.rating
    ).toBe("number")
  });

  test("checks to make sure the summary is a string (text)", () => {
    expect(
      typeof data.summary
    ).toBe("string")
  });

  test("checks to make sure recommend is a boolean", () => {
    expect(
      typeof data.recommend
    ).toBe("boolean")
  });

  test("checks to make sure the username is a string (text)", () => {
    expect(
      typeof data.name
    ).toBe("string")
  });

  test("checks to make sure the email address is a string (text)", () => {
    expect(
      typeof data.email
    ).toBe("string")
  });

  test("checks to make sure photos is an array", () => {
    expect(
      Array.isArray(data.photos)
    ).toBe("true")
  });

  test("checks to make sure characteristics is an object", () => {
    expect(
      typeof data.characteristics
    ).toBe("object")
  });
})


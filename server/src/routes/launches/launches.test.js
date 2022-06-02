const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/api/v1/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  const completeData = {
    mission: "US Enterprise",
    rocket: "NCC 1701-D",
    destination: "Kepler-422-B",
    launchDate: "December 20, 2030",
  };
  const completeDataWithInvalidDate = {
    mission: "US Enterprise",
    rocket: "NCC 1701-D",
    destination: "Kepler-422-B",
    launchDate: "hi",
  };

  const dataWithoutData = {
    mission: "US Enterprise",
    rocket: "NCC 1701-D",
    destination: "Kepler-422-B",
  };

  test("It Should Respond With 201 Created", async () => {
    const response = await request(app)
      .post("/api/v1/launches")
      .send(completeData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(requestDate).toBe(responseDate);
    expect(response.body).toMatchObject(dataWithoutData);
  });

  test("It Should Catch Missing Required Launch Property", async () => {
    const response = await request(app)
      .post("/api/v1/launches")
      .send(dataWithoutData)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing Required Launch Property",
    });
  });

  test("It Should Catch Invalid Launch Date", async () => {
    const response = await request(app)
      .post("/api/v1/launches")
      .send(completeDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid Launch Date",
    });
  });
});

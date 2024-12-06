test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(201);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
  expect(responseBody[0]).toHaveProperty("path");
  expect(responseBody[0]).toHaveProperty("name");
  expect(responseBody[0]).toHaveProperty("timestamp");

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);

  const responseBody2 = await response2.json();
  expect(Array.isArray(responseBody2)).toBe(true);
  expect(responseBody2.length).toBe(0);
});

test("PATCH to /api/v1/migrations should return 405 and error message", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PATCH",
  });
  expect(response.status).toBe(405);

  const responseBody = await response.json();
  expect(responseBody.message).toBe(
    "This endpoint does not accept this method",
  );
});

/*
 * To test organizational user, like login, permission, and so on
 */
import {ApplicationConfig, ExpressServer} from '../../server';

//export async function main(options: ApplicationConfig = {}) {
//  const server = new ExpressServer(options);
//  await server.boot();
//  await server.start();
//  console.log('Server is running.');
//}
const request = require("supertest");
const seed = require("../../tests/seed/seed.ts");

console.log(seed.description);

describe("Orgnaization", () => {
  let server;

  beforeAll(async () => {
    await seed.clear();
    await seed.seed();
    const config = {
      rest: {
        port: +(process.env.NODE_PORT || 3000),
        host: process.env.HOST || 'localhost',
        openApiSpec: {
          // useful when used with OpenAPI-to-GraphQL to locate your application
          setServersFromRequest: true,
        },
        // Use the LB4 application as a route. It should not be listening.
        listenOnStart: false,
      },
      //hack the root dir to let Loopback load the ./dict though it's not 
      //generated by Jest (by tsc though)
      projectRoot: __dirname + "/../../../dist",
    };
    server = new ExpressServer(config);
    await server.boot();
    await server.lbApp.start();
  });

  afterAll(async () => {
    await seed.clear();
  });


  it("can login with default account admin:admin", async () => {
    const response = await request(server.app)
      .post("/auth/login")
      .send({
        userName: "admin",
        password: "admin",
      });
    expect(response.statusCode).toBe(200);
  });

  

  describe(`Login with account ${seed.users.test.username}`, () => {
    let token;

    beforeEach(async () => {
      const response = await request(server.app)
        .post("/auth/login")
        .send({
          userName: seed.users.test.username,
          password: seed.users.test.password,
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBeDefined();
      token = response.body.token;
    });

    it("shoulbe be able request /api/trees, and get 2 trees", async () => {
      const response = await request(server.app)
        .get("/api/trees?filter[offset]=0&filter[limit]=100&filter[skip]=0")
        .set('Authorization', token);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).toHaveLength(2);
    });

    it("shoulbe not be able to request /api/planters", async () => {
      const response = await request(server.app)
        .get("/api/planter/count")
        .set('Authorization', token);
      expect(response.statusCode).toBe(401);
    });

  });


  describe(`can login with organization account ${seed.users.freetown}`, () => {
    let token;

    beforeAll(async () => {
      const response = await request(server.app)
        .post("/auth/login")
        .send({
          userName: seed.users.freetown.username,
          password: seed.users.freetown.password,
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        token: expect.any(String),
        user: {
          policy: {
            organization: {
              name: expect.any(String),
              id: expect.any(Number),
            },
            policies: expect.any(Array),
          },
        },
      });
      token = response.body.token;
    });

    it(`Should be able to request /api/organization/${seed.roles.freetownManager.policy.organization.id}/trees and get 1 trees`, async () => {
      const response = await request(server.app)
        .get(`/api/organization/${seed.roles.freetownManager.policy.organization.id}/trees?filter[offset]=0&filter[limit]=100&filter[skip]=0`)
        .set('Authorization', token);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(1);
    });

    it("Should not be able to request /api/trees", async () => {
      const response = await request(server.app)
        .get("/api/trees?")
        .set('Authorization', token);
      expect(response.statusCode).toBe(401);
    });

  });


});


import * as request from 'supertest';
import Server from '../Server';
import { DispatcherTable } from '../DispatcherTable';
import { Path, GET, PathParam, Produces } from '../annotation';
import { MediaType, RequestMethod } from '../constants';
import { router } from '../middleware/router';

describe('handle test', () => {
  it.skip('should return name when request path', async () => {
    const server = new Server();

    const { text: response } = await request(server.callback()).get('/name');

    expect(response).toBe('name');
  });

  // it("", async () => {
  //   const table = new DispatcherTable(NameResource);
  //
  //   //const table = stub table
  //
  //   const server = new Server(table);
  //
  //   const { text: response } = await request(server.callback()).get('/name');
  //
  //   expect(response).toBe('name');
  // });
  //
  // it("", async() => {
  //   const table = new DispatcherTable(NameResource);
  //
  //   //table.get("")
  // });

  it('should get method from dispatcher table', async () => {
    const dispatcherTable = new DispatcherTable(NameResource);

    const resourceMethod = dispatcherTable.get('/name', RequestMethod.GET);

    expect(resourceMethod).not.toBeUndefined();
    // expect(resourceMethod.fn()).toBe('name');
    expect(resourceMethod()).toBe('name');
  });

  it('should throw error from dispatcher table when path does not exist', async () => {
    const dispatcherTable = new DispatcherTable(NameResource);

    expect(() => {
      dispatcherTable.get('/nameTest', RequestMethod.GET);
    }).toThrowError();
    expect(() => {
      dispatcherTable.get('/name', RequestMethod.POST);
    }).toThrowError();
  });

  it('should get method from dispatcher table by path params', async () => {
    const dispatcherTable = new DispatcherTable(NameResource);

    const resourceMethod = dispatcherTable.get('/name/1', RequestMethod.GET);

    expect(resourceMethod).not.toBeUndefined();
    // expect(resourceMethod.fn()).toBe('name1');
    expect(resourceMethod()).toBe('name1');
  });

  it('should return name when request path with dispatcher table', async () => {
    const server = new Server();
    const dispatcherTable = new DispatcherTable(NameResource);
    server.use(router(dispatcherTable));

    const { text: response } = await request(server.callback()).get('/name/2');

    expect(response).toBe('name2');
  });

  it('should return media type response when request content-type with dispatcher table', async () => {
    const server = new Server();
    const dispatcherTable = new DispatcherTable(UserResource);
    server.use(router(dispatcherTable));

    const { text: defaultResponse } = await request(server.callback()).get(
      '/users'
    );

    expect(defaultResponse).toBe('default');

    // application/json
    const { text: jsonResponse } = await request(server.callback())
      .get('/users')
      .set('Content-Type', MediaType.APPLICATION_JSON);

    expect(jsonResponse).toBe('JSON');

    // application/xml
    const { text: xmlResponse } = await request(server.callback())
      .get('/users')
      .set('Content-Type', MediaType.APPLICATION_XML);

    expect(xmlResponse).toBe('XML');
  });

  it('should throw error when request content-type without match function', async () => {
    const server = new Server();
    const dispatcherTable = new DispatcherTable(UserResource);
    server.use(router(dispatcherTable));

    // application/x-www-form-urlencoded
    const { text: response } = await request(server.callback())
      .get('/users')
      .set('Content-Type', MediaType.APPLICATION_FORM_URLENCODED);

    // todo: error type
    expect(response).toBe('Internal Server Error');
  });

  // it('should throw error when request content-type without match function', async () => {
  //   const server = new Server();
  //   const dispatcherTable = new DispatcherTable(UserResource);
  //   server.use(router(dispatcherTable));

  //   // application/x-www-form-urlencoded
  //   const { text: response } = await request(server.callback())
  //     .get('/users')
  //     .set('Content-Type', MediaType.APPLICATION_FORM_URLENCODED);

  //   // todo: error type
  //   expect(response).toBe('Internal Server Error');
  // });
});

@Path('/name')
class NameResource {
  @GET()
  getName(): string {
    return 'name';
  }

  @GET(':id')
  getNameById(@PathParam() id: string): string {
    return `name${id}`;
  }
}

@Path('/users')
class UserResource {
  @GET()
  @Produces(MediaType.WILDCARD)
  findById() {
    return 'default';
  }

  @GET()
  @Produces(MediaType.APPLICATION_JSON)
  findByIdJSON() {
    return 'JSON';
  }

  @GET()
  @Produces(MediaType.APPLICATION_XML)
  findByIdXML() {
    return 'XML';
  }
}

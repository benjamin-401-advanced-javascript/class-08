'use strict';

const { server } = require('../lib/server.js');
const supergoose = require('./supergoose.js');
const mockRequest = supergoose(server);

describe('Category API', () => {

  it('can post() a new category', () => {
    let obj = { name: 'Food' };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(data => {
        let record = data.body;
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });

  it('can get() a category', () => {
    let obj = { name: 'Grocery' };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(data => {
        return mockRequest.get(`/api/v1/categories/${data.body._id}`)
          .then(record => {
            Object.keys(obj).forEach(key => {
              expect(record.body[key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can get() all categories', () => {
    let obj = { name: 'Kitchen' };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(data => {
        return mockRequest.get(`/api/v1/categories`)
          .then(record => {
            Object.keys(obj).forEach(key => {
              expect(record.body.count).toEqual(3);
            });
          });
      });
  });

  it('can put() a category', () => {
    let obj1 = { name: 'Clothes' };
    let obj2 = { name: 'New Clothes' };
    return mockRequest.post('/api/v1/categories')
      .send(obj1)
      .then(data => {
        return mockRequest.put(`/api/v1/categories/${data.body._id}`)
          .send(obj2)
          .then(record => {
            Object.keys(obj2).forEach(key => {
              expect(record.body[key]).toEqual(obj2[key]);
            });
          });
      });
  });

  it('can delete() a category', () => {
    return mockRequest.get(`/api/v1/categories`)
      .then(Originalrecords => {
        const idToDelete = Originalrecords.body.results[0]._id;
        return mockRequest.delete(`/api/v1/categories/${idToDelete}`)
          .then(deletedResult => {
            return mockRequest.get(`/api/v1/categories`)
              .then(newrecords => {
                const matchingResults = newrecords.body.results.filter(e => e._id === deletedResult.body._id);
                expect(matchingResults.length).toEqual(0);
              })
          });
      });
  });

});

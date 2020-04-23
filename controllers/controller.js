const db = require('../config/connection');
const queries = require('../models/Schedule/scheduleQueries');

module.exports = {
  // saveProvider: (req, res) => {
  //     // How to handle new service since need to save it and service ID
  //     const { name,email,service,daily_slots} = req.body
  //     db.query(queries.getServiceByName, service, (err, serviceId) => {
  //         if (err) {
  //           throw err
  //         }
  //         if (serviceId===null){
  //     db.query(queries.insertProvider,[name,email,service_id,daily_slots], (err, dbRes) => {
  //       if (err) {
  //         throw err
  //       }
  //       db.query(queries.getServiceByName,name, (err, serviceId) => {
  //         if (err) {
  //           throw err
  //         }
  //         return res.json(serviceId)
  //     })
  //   },


  saveCustomer: (req, res) => {
    const { name, email } = req.body;
    db.query(queries.insertCustomer, [name, email], (err, dbRes) => {
      if (err) {
        throw err;
      }
      db.query(queries.getCustomerByName, name, (err, customerId) => {
        if (err) {
          throw err;
        }
        return res.json(customerId);
      });
    });
  },
  saveService: (req, res) => {
    const { name } = req.body;
    db.query(queries.insertService, name, (err, dbRes) => {
      if (err) {
        throw err;
      }
      db.query(queries.getServiceByName, name, (err, serviceId) => {
        if (err) {
          throw err;
        }
        return res.json(serviceId);
      });
    });
  },
  // login: (req, res) => {
  //     // Issues
  //     // 1. Need to return sessions and type (customer or provider)
  //     // 2. Need to return if not found.
  //     { email } = req.body
  //     db.query(queries.getCustomerByEmail, (err, customerId) => {
  //     if (err) {
  //       throw err
  //     }
  //     if (customerId){
  //         db.query(queries.getCustomerSessions, (err, customerSessions) => {
  //             if (err) {
  //               throw err
  //             }
  //             return res.json(customerSessions)
  //         }
  //     } else {
  //         db.query(queries.getProviderByEmail, (err, providerId) => {
  //             if (err) {
  //               throw err
  //             }
  //             if (providerId){
  //                 db.query(queries.getProviderSessions, (err, ProviderSessions) => {
  //                     if (err) {
  //                       throw err
  //                     }
  //                     return res.json(providerSessions)
  //                 }
  //             } else {
  //                 return res.json()
  //             }
  //     }

  //   })
  // },
  getCustomerSessions: async (req, res) => {
    console.log('in getCustomerSessions');
    try {
      console.log(req.body);
      const { customerId } = req.body;
      console.log(customerId);
      const sessions = await db.query(queries.getCustomerSessions, [customerId]);
      console.log(sessions);
      res.json(sessions);
    } catch (err) {
      res.json({ error: err });
    }
  },

  // getCustomerSessions: (req, res) => {
  //   const { CustomerId } = req.body;
  //   db.query(queries.getCustomerSessions, [CustomerId], (err, sessions) => {
  //     if (err) {
  //       throw err;
  //     }
  //     return res.json(sessions);
  //   });
  // },

  getProviderSessions: (req, res) => {
    const { ProviderId } = req.body;
    db.query(queries.getProviderSessions, [ProviderId], (err, sessions) => {
      if (err) {
        throw err;
      }
      return res.json(sessions);
    });
  },
  deleteSession: (req, res) => {
    const { sessionId } = req.params;
    db.query(queries.deleteSessionById, parseInt(sessionId), (err, dbRes) => {
      if (err) {
        throw err;
      }
      return res.json({ success: true });
    });
  },
  getServices: (req, res) => {
    db.query(queries.getServices, (err, services) => {
      if (err) {
        return res.json(err);
      }
      return res.json(services);
    });
  },
  getProviders: (req, res) => {
    const { serviceId } = req.body;
    db.query(queries.getProvidersByService, serviceId, (err, providers) => {
      if (err) {
        throw new Error(err);
      }
      res.json(providers);
    });
  },
  getDates: (req, res) => {
    const { providerId } = req.body;
    db.query(queries.getDates, providerId, (err, dates) => {
      if (err) {
        throw err;
      }
      return res.json(dates);
    });
  },
  getSlots: (req, res) => {
    const { providerID, date } = req.body;
    db.query(queries.getSlots, (err, slots) => {
      if (err) {
        throw err;
      }
      return res.json(slots);
    });
  },
};

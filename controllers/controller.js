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


  saveCustomer: async (req, res) => {
    try {
      const { name, email } = req.body;
      await db.query(queries.insertCustomer, [name, email]);
      const customerId = await db.query(queries.getCustomerByEmail, email);
      res.json(customerId);
    } catch (err) {
      res.json({ error: 'err' });
    }
  },

  saveProvider: async (req, res) => {
    try {
      const { name, email, service, daily_slots } = req.body;
      
      await db.query(queries.insertService, [name, emai, service, daily_slots]);
      const providerId = await db.query(queries.getCustomerByEmail, email);
      res.json(providerId);
    } catch (err) {
      res.json({ error: err });
    }
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

  providersLogin: async (req, res) => {
    try {
      const { providerId } = req.body;
      const providerSessions = await db.query(queries.getProviderSessions, parseInt(providerId));
      res.json(providerSessions);
    } catch (err) {
      res.json({ error: err });
    }
  },

  customerLogin: async (req, res) => {
    try {
      const { customerId } = req.body;
      const providerSessions = await db.query(queries.getCustomerSessions, parseInt(customerId));
      res.json(providerSessions);
    } catch (err) {
      res.json({ error: err });
    }
  },

  getServiceId: async (req, res) => {
    try {
      console.log(req.body);
      
      const { name } = req.body;
      console.log(name);
      const serviceId = await db.query(queries.getServiceByName, name);
      res.json(serviceId);
    } catch (err) {
      res.json({ error: err });
    }
  },

  getCustomerSessions: async (req, res) => {
    try {
      const { customerId } = req.body;
      const sessions = await db.query(queries.getCustomerSessions, [customerId]);
      res.json(sessions);
    } catch (err) {
      res.json({ error: err });
    }
  },

  getProviderSessions: async (req, res) => {
    console.log(req.body);
    try {
      const { providerId } = req.body;
      const sessions = await db.query(queries.getProviderSessions, [providerId]);
      res.json(sessions);
    } catch (err) {
      res.json({ error: err });
    }
  },

  deleteSession: async (req, res) => {
    try {
      const { sessionId } = req.body;
      const sessions = await db.query(queries.deleteSessionById, parseInt(sessionId));
      res.json({ success: true });
    } catch (err) {
      res.json({ error: err });
    }
  },

  getServices: async (req, res) => {
    try {
      const services = await db.query(queries.getServices);
      res.json(services);
    } catch (err) {
      res.json({ error: err });
    }
  },

  getProviders: async (req, res) => {
    try {
      const { serviceId } = req.body;
      const providers = await db.query(queries.getProviders, parseInt(providerId));
      res.json(providers);
    } catch (err) {
      res.json({ error: err });
    }
  },

  getDates: async (req, res) => {
    try {
      const { providerId } = req.body;
      const dates = await db.query(queries.deleteSessionById, parseInt(providerId));
      res.json(dates);
    } catch (err) {
      res.json({ error: err });
    }
  },


  getSlots: async (req, res) => {
    try {
      const { providerId, date } = req.body;
      const dates = await db.query(queries.deleteSessionById, [parseInt(providerId), date]);
      res.json(dates);
    } catch (err) {
      res.json({ error: err });
    }
  },

};

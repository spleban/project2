/* eslint-disable prefer-destructuring */
const db = require('../config/connection');
const queries = require('../models/Schedule/scheduleQueries');

const findServiceId = async (name) => {
  const serviceIds = await db.query(queries.getServiceByName, name);
  let serviceId = 0;
  if (serviceIds.length > 0) {
    serviceId = serviceIds[0];
  }
  return serviceId;
};

const findOrCreateServiceId = async (name) => {
  let serviceIds = await db.query(queries.getServiceByName, name);
  if (serviceIds.length === 0) {
    await db.query(queries.insertService, [name]);
    serviceIds = await db.query(queries.getServiceByName, name);
  }
  return serviceIds[0];
};

const findProviderId = async (email) => {
  const data = await db.query(queries.getProviderByEmail, [email]);
  const providerIds = JSON.parse(JSON.stringify(data));
  let providerId = 0;
  if (providerIds.length > 0) {
    providerId = providerIds[0];
  }
  return providerId;
};

const findCustomerId = async (email) => {
  const data = await db.query(queries.getCustomerByEmail, [email]);
  const customerIds = JSON.parse(JSON.stringify(data));
  let customerId = 0;
  if (customerIds.length > 0) {
    customerId = customerIds[0].id;
  }
  return customerId;
};


module.exports = {

  saveProvider: async (req, res) => {
    try {
      const { name, email, service, dailySlots, } = req.body;
      let providerId = await findProviderId(email);
      if (providerId === 0) {
        const serviceId = await findOrCreateServiceId(service);
        await db.query(queries.insertProvider,
          [name, email, serviceId, parseInt(dailySlots, 10)]);
        providerId = await findProviderId(email);
      } else {
        providerId = 0;
      }
      res.json(providerId);
    } catch (err) {
      res.json({ error: 'err' });
    }
  },

  saveCustomer: async (req, res) => {
    try {
      const { name, email } = req.body;
      let customerId = await findCustomerId(email);
      if (customerId === 0) {
        await db.query(queries.insertCustomer, [name, email]);
        customerId = await findCustomerId(email);
      } else {
        customerId = 0;
      }
      res.json(customerId);
    } catch (err) {
      res.json({ error: 'err' });
    }
  },

  saveService: async (req, res) => {
    try {
      const { name } = req.body;
      const serviceId = await findOrCreateServiceId(name);
      res.json(serviceId);
    } catch (err) {
      res.json({ error: 'err' });
    }
  },

  providersLogin: async (req, res) => {
    try {
      const { providerId } = req.body;
      const providerSessions = await db.query(queries.getProviderSessions,
        parseInt(providerId, 10));
      res.json(providerSessions);
    } catch (err) {
      res.json({ error: err });
    }
  },

  customerLogin: async (req, res) => {
    try {
      const { customerId } = req.body;
      const providerSessions = await db.query(queries.getCustomerSessions,
        parseInt(customerId, 10));
      res.json(providerSessions);
    } catch (err) {
      res.json({ error: err });
    }
  },

  getServiceId: async (req, res) => {
    try {
      const { name } = req.body;
      const serviceId = await findServiceId(name);
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
      await db.query(queries.deleteSessionById, parseInt(sessionId, 10));
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
      const providers = await db.query(queries.getProviders, parseInt(serviceId, 10));
      res.json(providers);
    } catch (err) {
      res.json({ error: err });
    }
  },

  getDates: async (req, res) => {
    try {
      const { providerId } = req.body;
      const dates = await db.query(queries.deleteSessionById, parseInt(providerId, 10));
      res.json(dates);
    } catch (err) {
      res.json({ error: err });
    }
  },

  getSlots: async (req, res) => {
    try {
      const { providerId, date } = req.body;
      const dates = await db.query(queries.deleteSessionById, [parseInt(providerId, 10), date]);
      res.json(dates);
    } catch (err) {
      res.json({ error: err });
    }
  },

};

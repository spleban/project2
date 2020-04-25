/* eslint-disable prefer-destructuring */
const db = require('../config/connection');
const queries = require('../models/Schedule/scheduleQueries');


const findCustomerSessions = async (customerId) => {
  const customerSessions = await db.query(queries.getCustomerSessions,
    parseInt(customerId, 10));
  return (customerSessions);
};

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
  return serviceIds[0].id;
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

  saveCustomer: async (req, res) => {
    try {
      const { name, email } = req.body;
      let customerId = await findCustomerId(email);
      if (customerId === 0) {
        await db.query(queries.insertCustomer, [name, email]);
        customerId = await findCustomerId(email);
      } else {
        throw new Error(`email: ${email} is already used by a customer, choose a different email.`);
      }
      res.json([]);
    } catch (err) {
      res.json({ error: err.message });
    }
  },


  saveProvider: async (req, res) => {
    try {
      const {
        name, email, service, slots,
      } = req.body;
      let providerId = await findProviderId(email);
      if (providerId === 0) {
        const serviceId = await findOrCreateServiceId(service);
        await db.query(queries.insertProvider,
          [name, email, serviceId, parseInt(slots, 10)]); //
        providerId = await findProviderId(email);
      } else {
        throw new Error(`email: ${email} is already used by a provider, choose a different email.`);
      }
      res.json([]);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  saveService: async (req, res) => {
    try {
      const { name } = req.body;
      const serviceId = await findOrCreateServiceId(name);
      res.json(serviceId);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  providersLogin: async (req, res) => {
    try {
      const { providerId } = req.body;
      const providerSessions = await db.query(queries.getProviderSessions,
        parseInt(providerId, 10));
      res.json(providerSessions);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  customerLogin: async (req, res) => {
    try {
      const { customerId } = req.body;
      const providerSessions = await db.query(queries.getCustomerSessions,
        parseInt(customerId, 10));
      res.json(providerSessions);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  getServiceId: async (req, res) => {
    try {
      const { name } = req.body;
      const serviceId = await findServiceId(name);
      res.json(serviceId);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  getCustomerSessions: async (req, res) => {
    try {
      const { customerId } = req.body;
      const sessions = await findCustomerSessions(customerId);
      res.json(sessions);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  getProviderSessions: async (req, res) => {
    try {
      const { providerId } = req.body;
      const sessions = await db.query(queries.getProviderSessions, [providerId]);
      res.json(sessions);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  deleteSession: async (req, res) => {
    try {
      const { sessionId } = req.body;
      await db.query(queries.deleteSessionById, parseInt(sessionId, 10));
      res.json({ success: true });
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  getServices: async (req, res) => {
    try {
      const services = await db.query(queries.getServices);
      res.json(services);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  getProviders: async (req, res) => {
    try {
      const { serviceId } = req.body;
      const providers = await db.query(queries.getProviders, parseInt(serviceId, 10));
      res.json(providers);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  getDates: async (req, res) => {
    try {
      const { providerId } = req.body;
      const dates = await db.query(queries.deleteSessionById, parseInt(providerId, 10));
      res.json(dates);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  getSlots: async (req, res) => {
    try {
      const { providerId, date } = req.body;
      const dates = await db.query(queries.deleteSessionById, [parseInt(providerId, 10), date]);
      res.json(dates);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

};

/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
const db = require('../config/connection');
const queries = require('../models/Schedule/scheduleQueries');

function dateToMoDaYear(d) {
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
}

function dateToYearMoDa(d) {
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}


function addDays(date, days) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
}


function nextSevenDays() {
  const today = new Date();
  const dates = [];
  for (let i = 1; i < 8; i++) {
    const date = addDays(today, i);
    dates.push({ date: dateToYearMoDa(date), dateDisplay: dateToMoDaYear(date) });
  }
  return dates;
}

const findProviderSlots = (currentSlots, allowedSlots) => {
  const oSlots = [];
  let available;
  for (let i = 1; i <= allowedSlots; i++) {
    for (let j = 0; j < currentSlots.length; j++) {
      available = true;
      if (i === currentSlots[j]) {
        available = false;
        break;
      }
    }
    if (available) {
      oSlots.push(i);
    }
  }
  return oSlots;
};


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

const findProviderByEmail = async (email) => {
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

  getProviderDates: async (req, res) => {
    const { providerId } = req.body;
    const dates = nextSevenDays();
    // console.log(providerId);
    // console.log(dates);
    return res.json(dates);
  },

  getProviderSlots: async (req, res) => {
    try {
      const { providerId, date } = req.body;
      const slots = await db.query(queries.getProviderSlots, [providerId, date]);
      const providerSlot = await db.query(queries.getProviderSlot, [providerId]);
      const slots1 = findProviderSlots(slots, providerSlot);
      res.json(slots1);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  saveCustomer: async (req, res) => {
    try {
      let customer;
      const { name, email } = req.body;
      const customerId = await findCustomerId(email);
      if (customerId === 0) {
        await db.query(queries.insertCustomer, [name, email]);
        customer = await db.query(queries.getCustomerDataByEmail, [email]);
        // customerId = JSON.parse(JSON.stringify(response[0])).id;
      } else {
        throw new Error(`email: ${email} is already used by another customer, choose a different email.`);
      }
      res.json(customer);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  saveProvider: async (req, res) => {
    try {
      let provider;
      const {
        name, email, service, slots,
      } = req.body;
      const providerId = await findProviderByEmail(email);
      if (providerId === 0) {
        const serviceId = await findOrCreateServiceId(service);
        await db.query(queries.insertProvider,
          [name, email, serviceId, parseInt(slots, 10)]); //
        provider = await db.query(queries.getProviderDataByEmail, [email]);
      } else {
        throw new Error(`email: ${email} is already used by another provider, choose a different email.`);
      }
      res.json(provider);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  providerLogin: async (req, res) => {
    try {
      const { name, email } = req.body;
      const provider = await db.query(queries.getProviderByNameAndEmail, [name, email]);
      if (provider.length === 0) {
        throw new Error('Provider login failed!');
      }
      res.json(provider);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  customerLogin: async (req, res) => {
    try {
      const { name, email } = req.body;
      const customer = await db.query(queries.getCustomerByNameAndEmail, [name, email]);
      if (customer.length === 0) {
        throw new Error('Customer login failed!');
      }
      res.json(customer);
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

  getServices: async (req, res) => {
    try {
      const services = await db.query(queries.getServices);
      res.json(services);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  getServiceProviders: async (req, res) => {
    try {
      const { serviceId } = req.body;
      const providers = await db.query(queries.getServiceProviders, parseInt(serviceId, 10));
      res.json(providers);
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

  getServiceId: async (req, res) => {
    try {
      const { name } = req.body;
      const serviceId = await findServiceId(name);
      res.json(serviceId);
    } catch (err) {
      res.json({ error: err.message });
    }
  },


  // deleteCustomerSession: async (req, res) => {
  //   try {
  //     console.log(req.body);
  //     const { sessionId } = req.body;
  //     console.log(`session id: '${sessionId}`);
  //     const customerId = await db.query(queries.getSessionCustomerId, parseInt(sessionId, 10));
  //     console.log(`customer id: '${customerId}`);
  //     const a = await db.query(queries.deleteSessionById, parseInt(sessionId, 10));
  //     console.log(`delete result: '${a}`);
  //     const sessions = await findCustomerSessions(customerId);
  //     console.log(`sessions: '${sessions}`);
  //     res.json(sessions);
  //   } catch (err) {
  //     res.json({ error: err.message });
  //   }
  // },

  deleteSession: async (req, res) => {
    try {
      const { sessionId } = req.body;
      const dres = await db.query(queries.deleteSession, parseInt(sessionId, 10));
      res.json({ success: true });
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

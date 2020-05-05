/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
const db = require('../config/connection');
const queries = require('../models/Schedule');

function padLeadingZeros(num, size) {
  let s = `${num}`;
  while (s.length < size) s = `0${s}`;
  return s;
}

function dateToMoDaYear(d) {
  const day = padLeadingZeros(d.getDate(), 2);
  const month = padLeadingZeros(d.getMonth() + 1, 2);
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
}

function dateToYearMoDa(d) {
  const day = padLeadingZeros(d.getDate(), 2);
  const month = padLeadingZeros(d.getMonth() + 1, 2);
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}

function correctDates(sessions) {
  const s = [...sessions];
  for (let i = 0; i < s.length; i++) {
    s[i].date = dateToMoDaYear(s[i].date);
  }
  return s;
}

function addDays(date, days) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
}


// function nextSevenDays() {
//   const today = new Date();
//   const dates = [];
//   for (let i = 1; i < 8; i++) {
//     const date = addDays(today, i);
//     dates.push({ date: dateToYearMoDa(date), dateDisplay: dateToMoDaYear(date) });
//   }
//   return dates;
// }

function findProviderDates(sessions, slotsPerDay, numberOfDays) {
  const dFirst = new Date();
  const dates = [];
  let dDate = dFirst;
  for (let i = 0; i < numberOfDays; i++) {
    const currentDate = dateToYearMoDa(dDate);
    const dailySessions = sessions.filter((session) => session.date === currentDate);
    if (dailySessions.length < slotsPerDay) {
      dates.push({ date: currentDate, dateDisplay: dateToMoDaYear(dDate) });
    }
    dDate = addDays(dDate, 1);
  }
  return dates;
}

function findProviderSlots(currentSlots, slotsPerDay) {
  const oSlots = [];
  for (let i = 1; i <= slotsPerDay; i++) {
    let available = true;
    for (let j = 0; j < currentSlots.length; j++) {
      if (i === currentSlots[j]) {
        available = false;
        break;
      }
    }
    if (available) {
      oSlots.push({ slot: i });
    }
  }
  return oSlots;
}


const findCustomerSessions = async (customerId) => {
  const customerSessions = await db.query(queries.getCustomerSessions,
    parseInt(customerId, 10));
  return (customerSessions);
};

const findProviderDailySlots = async (providerId) => {
  const res = await db.query(queries.getProviderDailySlots, [providerId]);
  let slotsPerDay = 0;
  if (res.length > 0) {
    slotsPerDay = res[0];
  }
  return slotsPerDay;
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
    const sessions = await db.query(queries.getProviderSessions, [providerId]);
    const slotsPerDay = await findProviderDailySlots(providerId);
    const dates = findProviderDates(sessions, slotsPerDay.daily_slots, 7);
    return res.json(dates);
  },

  getProviderSlots: async (req, res) => {
    try {
      const { providerId, date } = req.body;
      const scheduledSlots = await db.query(queries.getProviderSlotsByDate, [providerId, date]);
      const slotsPerDay = await findProviderDailySlots(providerId);
      const availableSlots = findProviderSlots(scheduledSlots, slotsPerDay.daily_slots);
      res.json(availableSlots);
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
      let sessions = await findCustomerSessions(customerId);
      sessions = [...correctDates(sessions)];
      res.json(sessions);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  getProviderSessions: async (req, res) => {
    try {
      const { providerId } = req.body;
      let sessions = await db.query(queries.getProviderSessions, [providerId]);
      sessions = [...correctDates(sessions)];
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

  saveSession: async (req, res) => {
    try {
      const {
        customerId, providerId, serviceId, date, slot,
      } = req.body;
      const session = await db.query(queries.insertSession,
        [customerId, providerId, serviceId, date, slot]);
      res.json(session);
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


  deleteSession: async (req, res) => {
    try {
      const { sessionId } = req.body;
      await db.query(queries.deleteSession, parseInt(sessionId, 10));
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

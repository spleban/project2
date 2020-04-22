const insertProvider = 'INSERT INTO provider (name,email,service_id,daily_slots) VALUES (?)';
const insertCustomer = 'INSERT INTO customer (name,email) VALUES (?)';
const insertService = 'INSERT INTO service (name) VALUES (?)';
const insertSession = 'INSERT INTO session (customer_id,provider_id,service_id,date,slot) VALUES (?)';
const getProviderByEmail = 'SELECT id FROM provider WHERE email = ?';
const getCustomerByEmail = 'SELECT id FROM customer WHERE email = ?';
const getCustomerByName = 'SELECT id FROM customer WHERE name = ?';
const getProviderByName = 'SELECT id FROM provider WHERE name = ?';
const getServiceByName = 'SELECT id FROM service WHERE name = ?';
const getCustomerSessions = 'SELECT * FROM session WHERE customer_id = ?';
const getProviderSessions = 'SELECT * FROM session WHERE provider_id = ?';
const deleteSession = 'DELETE FROM session WHERE id = ?';
const getServices = 'SELECT name FROM service';
const getProvidersByService = 'SELECT name FROM provider WHERE service_id = ?';
const getDates = 'SELECT date FROM session WHERE provider_id = ? AND (date BETWEEN ? AND ?)';
const getSlots = 'SELECT slot FROM session WHERE date = ?';

module.exports = {
  insertProvider,
  insertCustomer,
  insertService,
  insertSession,
  getProviderByEmail,
  getCustomerByEmail,
  getProviderByName,
  getCustomerByName,
  getServiceByName,
  getProviderSessions,
  getCustomerSessions,
  deleteSession,
  getServices,
  getProvidersByService,
  getDates,
  getSlots,
};

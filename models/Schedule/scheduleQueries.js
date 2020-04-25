const insertProvider = 'INSERT INTO provider (name,email,service_id,daily_slots,password) VALUES (?,?,?,?,"")';
const insertCustomer = 'INSERT INTO customer (name,email,password) VALUES (?,?,"")';
const insertService = 'INSERT INTO service (name) VALUES (?)';
const insertSession = 'INSERT INTO session (customer_id,provider_id,service_id,date,slot) VALUES (?,?,?,?,?)';
const getProviderByEmail = 'SELECT id FROM provider WHERE email=?';
const getProviderByNameAndEmail = 'SELECT id FROM provider WHERE name=? AND email=?';
const getCustomerByEmail = 'SELECT id FROM customer WHERE email=?';
const getCustomerDataByEmail = 'SELECT * FROM customer WHERE email=?';
const getCustomerByNameAndEmail = 'SELECT id FROM customer WHERE name=? AND email=?';
const getServiceByName = 'SELECT id FROM service WHERE name=?';
const getCustomerSessions = 'SELECT * FROM session WHERE customer_id=?';
const getProviderSessions = 'SELECT * FROM session WHERE provider_id=?';
const deleteSession = 'DELETE FROM session WHERE id=?';
const getServices = 'SELECT name FROM service';
const getProvidersByService = 'SELECT name FROM provider WHERE service_id=?';
const getDates = 'SELECT date FROM session WHERE provider_id=? AND (date BETWEEN ? AND ?)';
const getSlots = 'SELECT slot FROM session WHERE date=?';

module.exports = {
  insertProvider,
  insertCustomer,
  insertService,
  insertSession,
  getProviderByEmail,
  getProviderByNameAndEmail,
  getCustomerByEmail,
  getCustomerDataByEmail,
  getCustomerByNameAndEmail,
  getServiceByName,
  getProviderSessions,
  getCustomerSessions,
  deleteSession,
  getServices,
  getProvidersByService,
  getDates,
  getSlots,
};

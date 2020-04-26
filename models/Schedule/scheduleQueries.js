const insertProvider = 'INSERT INTO provider (name,email,service_id,daily_slots,password) VALUES (?,?,?,?,"")';
const insertCustomer = 'INSERT INTO customer (name,email,password) VALUES (?,?,"")';
const insertService = 'INSERT INTO service (name) VALUES (?)';
const insertSession = 'INSERT INTO session (customer_id,provider_id,service_id,date,slot) VALUES (?,?,?,?,?)';
const getProviderByEmail = 'SELECT id FROM provider WHERE email=?';
const getProviderByNameAndEmail = 'SELECT * FROM provider WHERE name=? AND email=?';
const getProviderDataByEmail = 'SELECT * FROM provider WHERE email=?';
const getCustomerByEmail = 'SELECT id FROM customer WHERE email=?';
const getCustomerDataByEmail = 'SELECT * FROM customer WHERE email=?';
const getCustomerByNameAndEmail = 'SELECT * FROM customer WHERE name=? AND email=?';
const getServiceByName = 'SELECT id FROM service WHERE name=?';
const deleteSession = 'DELETE FROM session WHERE id=?';
const getServices = 'SELECT name FROM service';
const getProvidersByService = 'SELECT name FROM provider WHERE service_id=?';
const getDates = 'SELECT date FROM session WHERE provider_id=? AND (date BETWEEN ? AND ?)';
const getSlots = 'SELECT slot FROM session WHERE date=?';
const SessionTabelByName = 'SELECT session.id, customer.name AS customer, provider.name AS provider,'
+ ' service.name AS service, session.date, session.slot FROM session '
+ ' JOIN customer ON session.customer_id=customer.id '
+ ' JOIN provider ON session.provider_id=provider.id '
+ ' JOIN service ON session.service_id=service.id ';
const getCustomerSessions = `${SessionTabelByName}WHERE session.customer_id=?`;
const getProviderSessions = `${SessionTabelByName}WHERE session.provider_id=?`;

module.exports = {
  insertProvider,
  insertCustomer,
  insertService,
  insertSession,
  getProviderByEmail,
  getProviderDataByEmail,
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

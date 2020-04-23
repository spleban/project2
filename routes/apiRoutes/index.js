const router = require('express').Router();

const controller = require('../../controllers/controller');
// /api/schedule prepended to every route


router.route('/getcustomersessions')
  .post(controller.getCustomerSessions)
  router.route('/getprovidersessions')
  .post(controller.getProviderSessions);
router.route('/savecustomer')
  .post(controller.saveCustomer);

module.exports = router;

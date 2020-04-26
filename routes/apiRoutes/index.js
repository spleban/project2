const router = require('express').Router();

const controller = require('../../controllers/controller');
// /api/schedule prepended to every route


router.route('/getcustomersessions')
  .post(controller.getCustomerSessions);
router.route('/getprovidersessions')
  .post(controller.getProviderSessions);
router.route('/savecustomer')
  .post(controller.saveCustomer);
router.route('/saveprovider')
  .post(controller.saveProvider);
router.route('/saveservice')
  .post(controller.saveService);
router.route('/providerlogin')
  .post(controller.providerLogin);
router.route('/customerlogin')
  .post(controller.customerLogin);
router.route('/getcustomersessions')
  .post(controller.getCustomerSessions);
router.route('/getprovidersessions')
  .post(controller.getProviderSessions);
router.route('/getservices')
  .get(controller.getServices);

router.route('/getserviceproviders')
  .post(controller.getServiceProviders);
module.exports = router;

const router = require('express').Router();

const controller = require('../../controllers/controller');
// /api/schedule prepended to every route


router.route('/getcustomersessions')
  .post(controller.getCustomerSessions)

module.exports = router;

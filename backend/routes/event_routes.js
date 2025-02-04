
const {Router} = require('express');
const {createEvent, getEvents, getEventById, updateEvent, deleteEvent} = require('../controllers/event_controller')
const restrictToAccess = require('../middlewares/authentication');
const authorizedRoles = require('../middlewares/authorization');

const router = Router();



router.post('/create',restrictToAccess,authorizedRoles("Vendor"), createEvent);
router.get('/all',restrictToAccess, getEvents);
router.get('/:id',restrictToAccess, getEventById);
router.put('/:id',restrictToAccess,authorizedRoles("Vendor"), updateEvent);
router.delete('/:id',restrictToAccess,authorizedRoles("Vendor"), deleteEvent);


module.exports = router;
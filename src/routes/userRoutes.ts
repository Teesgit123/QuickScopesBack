import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

// Define the routes for user operations
// create
router.post('/', UserController.createUser);

// get user by id
router.get('/:id', UserController.getUserById);

// get user by email
router.get('/:email', UserController.getUserByEmail);

// update user by id
router.put('/:id', UserController.updateUser);

// // delete user by id
// router.delete('/:id', UserController.)

export default router;

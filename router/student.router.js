import express from 'express';
import { crStudent, deleteStudent, readStudentById, updateStudent } from '../controller/student.controllers.js';
import multer from 'multer';
import {  storage } from '../s3.config.js'; 



// move code from line 9 to line 29 of file s3.config.js

const router = express.Router();
const upload = multer({ storage });


router.post('/',upload.single("avatar"), crStudent);
router.get('/:studentId/student', readStudentById); 
router.delete('/:studentId', deleteStudent);
router.patch('/:studentId',upload.single("avatar"), updateStudent);
export default router;
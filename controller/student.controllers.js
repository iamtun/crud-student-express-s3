import Student from "../model/student.model.js";
import { validationResult , body} from "express-validator";
// no validation data input from user
// no remove log
// naming failure
export const createStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'fail', errors: errors.array() });
  }

  const { fullName, dayOfBirth, gender, major } = req.body;

  // fix: Các ràng buộc dữ liệu
  const validateStudent = [
    body('fullName').notEmpty().isString(),
    body('dayOfBirth').notEmpty().isString(),
    body('gender').optional().isBoolean(),
    body('major').notEmpty().isString(),
  ];
// fix: kiểm tra ràng buộc dữ liệu
  for (let validator of validateStudent) {
    const result = await validator.run(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ status: 'fail', errors: result.array() });
    }
  }

  try {
    const student = await Student.create({
      fullName,
      dayOfBirth,
      gender,
      major,
      avatar: req.file.location,
    });

    res.status(201).json({
      status: "success",
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};


// naming failure
export const findStudentById = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findById(studentId);
    if (student) {
      res.status(200).json({
        status: "success",
        data: student,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Student not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// delete failed
// step1: delete go to catch: error -> Assignment to constant variable.
// step2: re-delete go not not found
//fix: em thay đổi ở dòng 63 thành let, có thể gán giá trị vào, nên khi hàm findByIdAndDelete tìm tới
//id thì có thể xoá đi chúng
export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findByIdAndDelete(studentId);
    if (student) {
      res.status(201).json({ status: "success" });
    } else {
      res.status(404).json({ status: "fail", message: "Student not found" });
    }
  } catch (error) {
    res.status(400).json({ status: "ok", message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findById(studentId);
    if (student) {
      if (req.body.fullName) {
        student.fullName = req.body.fullName;
      }
      if (req.body.dayOfBirth) {
        student.dayOfBirth = req.body.dayOfBirth;
      }
      if (req.body.gender !== undefined) {
        student.gender = req.body.gender;
      }
      if (req.body.major) {
        student.major = req.body.major;
      }
      if (req.file) {
        student.avatar = req.file.location;
      }
      const updatedStudent = await student.save();
      res.status(201).json({ status: "success", data: updatedStudent });
    } else {
      res.status(404).json({ status: "fail", message: "Student not found" });
    }
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};


export const getAllStudent = async (req, res)=>{
  try {
    const students = await Student.find();
    res.status(200).json({ status: "success", data: students });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

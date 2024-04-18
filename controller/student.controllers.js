import Student from "../model/student.model.js";
// no validation data input from user
// no remove log
// naming failure
export const crStudent = async (req, res) => {
  const { fullName, dayOfBirth, gender, major } = req.body;
  try {
    console.log(req.file.location);
    const newStudent = await Student.create({
      fullName: fullName,
      dayOfBirth: dayOfBirth,
      gender: gender,
      major: major,
      avatar: req.file.location,
    });
    console.log({ newStudent });
    res.status(201).json({
      status: "success",
      data: {
        ...newStudent._doc,
      },
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
export const readStudentbyId = async (req, res) => {
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
export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findById(studentId);
    if (student) {
      student = await Student.findByIdAndDelete(studentId);
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

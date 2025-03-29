class Course {
    constructor(courseId, name, credits, preRequisites, groupId, year, semester, term, status) {
        this.courseId = courseId;
        this.name = name;
        this.credits = credits;
        this.preRequisites = preRequisites;
        this.groupId = groupId;
        this.year = year;
        this.semester = semester;
        this.term = term;
        this.status = status;
    }
}

class StudentCourse {
    constructor(courseId, studentId, year, semester, term, status) {
        this.courseId = courseId;
        this.studentId = studentId;
        this.year = year;
        this.semester = semester;
        this.term = term;
        this.status = status;
    }
}

class Group {
    constructor(groupId, name) {
        this.groupId = groupId;
        this.name = name;
    }
}

const Semesters = {
    Fall: "Fall",
    Winter: "Winter",
    Spring: "Spring"
};

const CourseStatus = {
    Registered: "Registered",
    InProgress: "InProgress",
    Completed: "Completed",
    Waived: "Waived",
    Dropped: "Dropped"
};

export {Course, StudentCourse, Group, Semesters, CourseStatus};

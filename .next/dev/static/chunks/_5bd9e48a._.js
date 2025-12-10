(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/language-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// Translation dictionary
const translations = {
    en: {
        // Navigation
        "nav.home": "Home",
        "nav.myCoursesEd": "My Courses",
        "nav.grades": "Grades",
        "nav.students": "Students",
        "nav.messages": "Messages",
        "nav.settings": "Settings",
        "nav.browseCourses": "Browse Courses",
        "nav.myCourses": "My Courses",
        "nav.myWork": "My Work",
        "nav.gradesStudent": "Grades & Progress",
        // Auth
        "auth.register": "Sign Up",
        "auth.login": "Login",
        "auth.email": "Email",
        "auth.password": "Password",
        "auth.confirmPassword": "Confirm Password",
        "auth.fullName": "Full Name",
        "auth.selectRole": "Select Role",
        "auth.educator": "Educator",
        "auth.student": "Student",
        "auth.createAccount": "Create Account",
        "auth.signIn": "Sign In",
        "auth.haveAccount": "Already have an account?",
        "auth.noAccount": "Don't have an account?",
        "auth.rememberMe": "Remember Me",
        "auth.welcomeBack": "Welcome back",
        "auth.getStarted": "Get Started",
        // Educator Dashboard
        "educator.dashboard": "Educator Dashboard",
        "educator.quickStats": "Quick Stats",
        "educator.activeCourses": "Active Courses",
        "educator.totalStudents": "Total Students",
        "educator.pendingSubmissions": "Pending Submissions",
        "educator.myCourses": "My Courses",
        "educator.createNewCourse": "Create New Course",
        "educator.enrolled": "enrolled",
        "educator.active": "active",
        "educator.edit": "Edit",
        "educator.delete": "Delete",
        "educator.viewGrades": "View Grades",
        "educator.postAnnouncement": "Post Announcement",
        "educator.courseTitle": "Course Title",
        "educator.courseDescription": "Course Description",
        "educator.difficulty": "Difficulty Level",
        "educator.beginner": "Beginner",
        "educator.intermediate": "Intermediate",
        "educator.advanced": "Advanced",
        "educator.courseImage": "Course Image",
        "educator.create": "Create",
        "educator.cancel": "Cancel",
        // Student Dashboard
        "student.dashboard": "My Learning Dashboard",
        "student.enrolledCourses": "Enrolled Courses",
        "student.progressOverall": "Overall Progress",
        "student.pendingAssignments": "Pending Assignments",
        "student.gradeAverage": "Grade Average",
        "student.enrolledIn": "Enrolled in",
        "student.lessonsCompleted": "lessons completed",
        "student.continueLearning": "Continue Learning",
        "student.dueIn": "Due in",
        "student.days": "days",
        "student.browseMoreCourses": "Browse More Courses",
        // Courses
        "course.allCourses": "All Courses",
        "course.filter": "Filter",
        "course.search": "Search Courses",
        "course.category": "Category",
        "course.enroll": "Enroll",
        "course.enrolled": "Enrolled",
        "course.viewDetails": "View Details",
        "course.lessons": "Lessons",
        "course.assignments": "Assignments",
        "course.quizzes": "Quizzes",
        "course.courseName": "Course Name",
        "course.educator": "Educator",
        "course.students": "Students",
        "course.level": "Level",
        // Lessons
        "lesson.title": "Lesson Title",
        "lesson.description": "Description",
        "lesson.video": "Video",
        "lesson.resources": "Resources",
        "lesson.downloadNotes": "Download Lesson Notes",
        "lesson.markComplete": "Mark as Complete",
        "lesson.nextLesson": "Next Lesson",
        "lesson.previousLesson": "Previous Lesson",
        "lesson.completed": "Completed",
        // Assignments
        "assignment.title": "Assignment",
        "assignment.dueDate": "Due Date",
        "assignment.points": "Points",
        "assignment.instructions": "Instructions",
        "assignment.submitAssignment": "Submit Assignment",
        "assignment.uploadFile": "Upload File",
        "assignment.submitted": "Submitted",
        "assignment.notSubmitted": "Not Submitted",
        "assignment.late": "Late",
        "assignment.feedback": "Feedback",
        "assignment.yourGrade": "Your Grade",
        "assignment.viewFeedback": "View Feedback",
        // Quizzes
        "quiz.title": "Quiz",
        "quiz.takeQuiz": "Take Quiz",
        "quiz.questions": "Questions",
        "quiz.timeLimit": "Time Limit",
        "quiz.passingScore": "Passing Score",
        "quiz.startQuiz": "Start Quiz",
        "quiz.submitQuiz": "Submit Quiz",
        "quiz.yourScore": "Your Score",
        "quiz.passed": "Passed",
        "quiz.failed": "Failed",
        "quiz.retakeQuiz": "Retake Quiz",
        "quiz.questionNumber": "Question",
        "quiz.of": "of",
        "quiz.nextQuestion": "Next Question",
        "quiz.previousQuestion": "Previous Question",
        "quiz.review": "Review",
        // Profile
        "profile.myProfile": "My Profile",
        "profile.editProfile": "Edit Profile",
        "profile.changePassword": "Change Password",
        "profile.logout": "Logout",
        "profile.name": "Name",
        "profile.email": "Email",
        "profile.bio": "Bio",
        "profile.photo": "Photo",
        "profile.save": "Save Changes",
        // Language
        "language.english": "English",
        "language.khmer": "ខ្មែរ",
        "language.selectLanguage": "Select Language",
        // Common
        "common.loading": "Loading...",
        "common.error": "Error",
        "common.success": "Success",
        "common.save": "Save",
        "common.delete": "Delete",
        "common.edit": "Edit",
        "common.back": "Back",
        "common.next": "Next",
        "common.submit": "Submit",
        "common.close": "Close",
        "common.search": "Search"
    },
    km: {
        // Navigation
        "nav.home": "ទំព័រដើម",
        "nav.myCoursesEd": "វគ្គរបស់ខ្ញុំ",
        "nav.grades": "ពិន្ទុ",
        "nav.students": "សិស្ស",
        "nav.messages": "សារ",
        "nav.settings": "ការកំណត់",
        "nav.browseCourses": "រកមើលវគ្គ",
        "nav.myCourses": "វគ្គរបស់ខ្ញុំ",
        "nav.myWork": "ការងាររបស់ខ្ញុំ",
        "nav.gradesStudent": "ពិន្ទុ និងវឌ្ឍនភាព",
        // Auth
        "auth.register": "ចុះឈ្មោះ",
        "auth.login": "ចូលប្រើប្រាស់",
        "auth.email": "អ័ក្សរឯកសារ",
        "auth.password": "ពាក្យសម្ងាត់",
        "auth.confirmPassword": "បញ្ជាក់ពាក្យសម្ងាត់",
        "auth.fullName": "ឈ្មោះពេញលេញ",
        "auth.selectRole": "ជ្រើសរើសតនមួយ",
        "auth.educator": "គ្រូ",
        "auth.student": "សិស្ស",
        "auth.createAccount": "បង្កើតគណនី",
        "auth.signIn": "ចូលប្រើប្រាស់",
        "auth.haveAccount": "មានគណនីរួចហើយ?",
        "auth.noAccount": "មិនមានគណនីទេ?",
        "auth.rememberMe": "ចាប់ចងចាំខ្ញុំ",
        "auth.welcomeBack": "ស្វាគមន៍ក្រលប់មកវិញ",
        "auth.getStarted": "ចាប់ផ្តើម",
        // Educator Dashboard
        "educator.dashboard": "ផ្ទាំងគ្រូ",
        "educator.quickStats": "ស្ថិតិរហ័ស",
        "educator.activeCourses": "វគ្គសក្រិយ",
        "educator.totalStudents": "សរុបសិស្ស",
        "educator.pendingSubmissions": "ការដាក់ស្នើប្រញាប់",
        "educator.myCourses": "វគ្គរបស់ខ្ញុំ",
        "educator.createNewCourse": "បង្កើតវគ្គថ្មី",
        "educator.enrolled": "ចុះឈ្មោះ",
        "educator.active": "សក្រិយ",
        "educator.edit": "កែប្រែ",
        "educator.delete": "លុប",
        "educator.viewGrades": "មើលពិន្ទុ",
        "educator.postAnnouncement": "ប្រកាសប្រកាយ",
        "educator.courseTitle": "ចំណងជើងវគ្គ",
        "educator.courseDescription": "ការពិពណ៌នាវគ្គ",
        "educator.difficulty": "កម្រិតលំបាក",
        "educator.beginner": "ថ្មីម្នាក់",
        "educator.intermediate": "មិនច្រើនច្រើនប្រឹង",
        "educator.advanced": "កម្រិតខ្ពស់",
        "educator.courseImage": "រូបភាពវគ្គ",
        "educator.create": "បង្កើត",
        "educator.cancel": "បោះបង់",
        // Student Dashboard
        "student.dashboard": "ផ្ទាំងរៀនរបស់ខ្ញុំ",
        "student.enrolledCourses": "វគ្គដែលចុះឈ្មោះ",
        "student.progressOverall": "វឌ្ឍនភាពទូទៅ",
        "student.pendingAssignments": "ការងារដែលកំពុងរង់ចាំ",
        "student.gradeAverage": "ពិន្ទុមធ្យម",
        "student.enrolledIn": "ចុះឈ្មោះក្នុង",
        "student.lessonsCompleted": "មេរៀនបានបញ្ចប់",
        "student.continueLearning": "បន្តរៀន",
        "student.dueIn": "ដល់កាលកំណត់ក្នុង",
        "student.days": "ថ្ងៃ",
        "student.browseMoreCourses": "រកមើលវគ្គលម្អិត",
        // Courses
        "course.allCourses": "វគ្គទាំងអស់",
        "course.filter": "ច្រោះលើក",
        "course.search": "ស្វាគមន៍វគ្គ",
        "course.category": "ប្រភេទ",
        "course.enroll": "ចុះឈ្មោះ",
        "course.enrolled": "ចុះឈ្មោះ",
        "course.viewDetails": "មើលលម្អិត",
        "course.lessons": "មេរៀន",
        "course.assignments": "ការងារ",
        "course.quizzes": "សម្ភស្ដារ",
        "course.courseName": "ឈ្មោះវគ្គ",
        "course.educator": "គ្រូ",
        "course.students": "សិស្ស",
        "course.level": "កម្រិត",
        // Lessons
        "lesson.title": "ចំណងជើងមេរៀន",
        "lesson.description": "ការពិពណ៌នា",
        "lesson.video": "វីដេអូ",
        "lesson.resources": "ធនធាន",
        "lesson.downloadNotes": "ទាញយកចំណាំមេរៀន",
        "lesson.markComplete": "សម្គាល់ថាបានបញ្ចប់",
        "lesson.nextLesson": "មេរៀនបន្ទាប់",
        "lesson.previousLesson": "មេរៀនមុន",
        "lesson.completed": "បានបញ្ចប់",
        // Assignments
        "assignment.title": "ការងារ",
        "assignment.dueDate": "កាលកំណត់",
        "assignment.points": "ពិន្ទុ",
        "assignment.instructions": "សេចក្តីណែនាំ",
        "assignment.submitAssignment": "ដាក់ស្នើការងារ",
        "assignment.uploadFile": "ផ្ទុកឯកសារ",
        "assignment.submitted": "ដាក់ស្នើ",
        "assignment.notSubmitted": "មិនបានដាក់ស្នើ",
        "assignment.late": "យឺត",
        "assignment.feedback": "មតិយោបល់",
        "assignment.yourGrade": "ពិន្ទុរបស់អ្នក",
        "assignment.viewFeedback": "មើលមតិយោបល់",
        // Quizzes
        "quiz.title": "សម្ភស្ដារ",
        "quiz.takeQuiz": "ឆ្លើយសម្ភស្ដារ",
        "quiz.questions": "សំណួរ",
        "quiz.timeLimit": "ដែនកំណត់ពេលវេលា",
        "quiz.passingScore": "ពិន្ទុប្រលង",
        "quiz.startQuiz": "ចាប់ផ្តើមសម្ភស្ដារ",
        "quiz.submitQuiz": "ដាក់ស្នើសម្ភស្ដារ",
        "quiz.yourScore": "ពិន្ទុរបស់អ្នក",
        "quiz.passed": "ឆ្លងកាត់",
        "quiz.failed": "មិនឆ្លងកាត់",
        "quiz.retakeQuiz": "ឆ្លើយសម្ភស្ដារម្ដងទៀត",
        "quiz.questionNumber": "សំណួរ",
        "quiz.of": "នៃ",
        "quiz.nextQuestion": "សំណួរបន្ទាប់",
        "quiz.previousQuestion": "សំណួរមុន",
        "quiz.review": "ពិនិត្យ",
        // Profile
        "profile.myProfile": "ប្រវត្តិរូបរបស់ខ្ញុំ",
        "profile.editProfile": "កែប្រែប្រវត្តិរូប",
        "profile.changePassword": "ផ្លាស់ប្តូរលេខសម្ងាត់",
        "profile.logout": "ចាកចេញ",
        "profile.name": "ឈ្មោះ",
        "profile.email": "អ័ក្សរឯកសារ",
        "profile.bio": "ជីវប្រវត្តិ",
        "profile.photo": "រូបថត",
        "profile.save": "រក្សាទុកការផ្លាស់ប្តូរ",
        // Language
        "language.english": "English",
        "language.khmer": "ខ្មែរ",
        "language.selectLanguage": "ជ្រើសរើសភាសា",
        // Common
        "common.loading": "កំពុងផ្ទុក...",
        "common.error": "កំហុស",
        "common.success": "ជោគជ័យ",
        "common.save": "រក្សាទុក",
        "common.delete": "លុប",
        "common.edit": "កែប្រែ",
        "common.back": "ត្រឡប់ក្រោយ",
        "common.next": "បន្ទាប់",
        "common.submit": "ដាក់ស្នើ",
        "common.close": "បិទ",
        "common.search": "ស្វាគមន៍"
    }
};
function LanguageProvider({ children }) {
    _s();
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("en");
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const saved = localStorage.getItem("language");
            if (saved) {
                setLanguageState(saved);
            }
            setMounted(true);
        }
    }["LanguageProvider.useEffect"], []);
    // Add Khmer font effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                if (language === "km") {
                    document.body.classList.add("khmer-font");
                } else {
                    document.body.classList.remove("khmer-font");
                }
            }
        }
    }["LanguageProvider.useEffect"], [
        language
    ]);
    const setLanguage = (lang)=>{
        setLanguageState(lang);
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem("language", lang);
        }
    };
    const t = (key)=>{
        return translations[language][key] || key;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/language-context.tsx",
        lineNumber: 371,
        columnNumber: 10
    }, this);
}
_s(LanguageProvider, "6sBW27h1ogTlpnvF+igzZhDT/BA=");
_c = LanguageProvider;
function useLanguage() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
}
_s1(useLanguage, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/auth-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            // <CHANGE> Add check for window to prevent SSR errors
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            // Simulate checking if user is logged in (from localStorage or API)
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                try {
                    setUser(JSON.parse(savedUser));
                } catch (error) {
                    console.error("Error parsing saved user:", error);
                    localStorage.removeItem("user");
                }
            }
            setIsLoading(false);
        }
    }["AuthProvider.useEffect"], []);
    const login = async (email, password)=>{
        let mockUser;
        if (email === "admin@komplex.edu") {
            mockUser = {
                id: "admin-1",
                email,
                fullName: "Admin User",
                role: "admin",
                status: "active"
            };
        } else if (email === "analyst@komplex.edu") {
            mockUser = {
                id: "analyst-1",
                email,
                fullName: "Analyst User",
                role: "analyst",
                status: "active"
            };
        } else if (email.includes("educator")) {
            mockUser = {
                id: "educator-1",
                email,
                fullName: "Educator User",
                role: "educator",
                status: "active"
            };
        } else {
            mockUser = {
                id: "student-1",
                email,
                fullName: "Student User",
                role: "student",
                status: "active"
            };
        }
        setUser(mockUser);
        // <CHANGE> Add check for window before localStorage access
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem("user", JSON.stringify(mockUser));
        }
    };
    const signup = async (email, password, fullName, role)=>{
        // Simulate signup (in real app, call API)
        const mockUser = {
            id: Date.now().toString(),
            email,
            fullName,
            role,
            status: role === "educator" ? "pending" : "active"
        };
        setUser(mockUser);
        // <CHANGE> Add check for window before localStorage access
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem("user", JSON.stringify(mockUser));
        }
    };
    const logout = ()=>{
        setUser(null);
        // <CHANGE> Add check for window before localStorage access
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem("user");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isLoading,
            isAuthenticated: !!user,
            login,
            signup,
            logout
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/auth-context.tsx",
        lineNumber: 122,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "YajQB7LURzRD+QP5gw0+K2TZIWA=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
"[project]/node_modules/@vercel/analytics/dist/next/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Analytics",
    ()=>Analytics2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// src/nextjs/index.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// src/nextjs/utils.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
"use client";
;
;
// package.json
var name = "@vercel/analytics";
var version = "1.6.1";
// src/queue.ts
var initQueue = ()=>{
    if (window.va) return;
    window.va = function a(...params) {
        (window.vaq = window.vaq || []).push(params);
    };
};
// src/utils.ts
function isBrowser() {
    return typeof window !== "undefined";
}
function detectEnvironment() {
    try {
        const env = ("TURBOPACK compile-time value", "development");
        if ("TURBOPACK compile-time truthy", 1) {
            return "development";
        }
    } catch (e) {}
    return "production";
}
function setMode(mode = "auto") {
    if (mode === "auto") {
        window.vam = detectEnvironment();
        return;
    }
    window.vam = mode;
}
function getMode() {
    const mode = isBrowser() ? window.vam : detectEnvironment();
    return mode || "production";
}
function isDevelopment() {
    return getMode() === "development";
}
function computeRoute(pathname, pathParams) {
    if (!pathname || !pathParams) {
        return pathname;
    }
    let result = pathname;
    try {
        const entries = Object.entries(pathParams);
        for (const [key, value] of entries){
            if (!Array.isArray(value)) {
                const matcher = turnValueToRegExp(value);
                if (matcher.test(result)) {
                    result = result.replace(matcher, `/[${key}]`);
                }
            }
        }
        for (const [key, value] of entries){
            if (Array.isArray(value)) {
                const matcher = turnValueToRegExp(value.join("/"));
                if (matcher.test(result)) {
                    result = result.replace(matcher, `/[...${key}]`);
                }
            }
        }
        return result;
    } catch (e) {
        return pathname;
    }
}
function turnValueToRegExp(value) {
    return new RegExp(`/${escapeRegExp(value)}(?=[/?#]|$)`);
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function getScriptSrc(props) {
    if (props.scriptSrc) {
        return props.scriptSrc;
    }
    if (isDevelopment()) {
        return "https://va.vercel-scripts.com/v1/script.debug.js";
    }
    if (props.basePath) {
        return `${props.basePath}/insights/script.js`;
    }
    return "/_vercel/insights/script.js";
}
// src/generic.ts
function inject(props = {
    debug: true
}) {
    var _a;
    if (!isBrowser()) return;
    setMode(props.mode);
    initQueue();
    if (props.beforeSend) {
        (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
    }
    const src = getScriptSrc(props);
    if (document.head.querySelector(`script[src*="${src}"]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.dataset.sdkn = name + (props.framework ? `/${props.framework}` : "");
    script.dataset.sdkv = version;
    if (props.disableAutoTrack) {
        script.dataset.disableAutoTrack = "1";
    }
    if (props.endpoint) {
        script.dataset.endpoint = props.endpoint;
    } else if (props.basePath) {
        script.dataset.endpoint = `${props.basePath}/insights`;
    }
    if (props.dsn) {
        script.dataset.dsn = props.dsn;
    }
    script.onerror = ()=>{
        const errorMessage = isDevelopment() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
        console.log(`[Vercel Web Analytics] Failed to load script from ${src}. ${errorMessage}`);
    };
    if (isDevelopment() && props.debug === false) {
        script.dataset.debug = "false";
    }
    document.head.appendChild(script);
}
function pageview({ route, path }) {
    var _a;
    (_a = window.va) == null ? void 0 : _a.call(window, "pageview", {
        route,
        path
    });
}
// src/react/utils.ts
function getBasePath() {
    if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] === "undefined" || typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env === "undefined") {
        return void 0;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH;
}
// src/react/index.tsx
function Analytics(props) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Analytics.useEffect": ()=>{
            var _a;
            if (props.beforeSend) {
                (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
            }
        }
    }["Analytics.useEffect"], [
        props.beforeSend
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Analytics.useEffect": ()=>{
            inject({
                framework: props.framework || "react",
                basePath: props.basePath ?? getBasePath(),
                ...props.route !== void 0 && {
                    disableAutoTrack: true
                },
                ...props
            });
        }
    }["Analytics.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Analytics.useEffect": ()=>{
            if (props.route && props.path) {
                pageview({
                    route: props.route,
                    path: props.path
                });
            }
        }
    }["Analytics.useEffect"], [
        props.route,
        props.path
    ]);
    return null;
}
;
var useRoute = ()=>{
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    if (!params) {
        return {
            route: null,
            path
        };
    }
    const finalParams = Object.keys(params).length ? params : Object.fromEntries(searchParams.entries());
    return {
        route: computeRoute(path, finalParams),
        path
    };
};
function getBasePath2() {
    if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] === "undefined" || typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env === "undefined") {
        return void 0;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH;
}
// src/nextjs/index.tsx
function AnalyticsComponent(props) {
    const { route, path } = useRoute();
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(Analytics, {
        path,
        route,
        ...props,
        basePath: getBasePath2(),
        framework: "next"
    });
}
function Analytics2(props) {
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: null
    }, /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(AnalyticsComponent, {
        ...props
    }));
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_5bd9e48a._.js.map
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentProfile() {
    const {userData} = useContext(AuthContext);
    const navigate = useNavigate();
  return (
    <div className="min-h-screen w-72 lg:w-[500px] flex items-center justify-center">
      <Card className="w-full max-w-md bg-orange-600 text-white rounded-3xl overflow-hidden">
        <div className="p-6 flex flex-col items-center text-center">
          {/* Profile Image */}
          <div className="w-32 h-32 rounded-full bg-orange-200 overflow-hidden mb-4">
            <img
              src="https://placeholder.co/100x100"
              alt="Profile picture"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <h2 className="text-2xl font-semibold mb-1">{userData?.user.name}</h2>
          <p className="text-orange-200 mb-4">{userData?.user.email}</p>

          {/* Level Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold">
              L
            </span>
            <span>Junior WAEC</span>
          </div>

          <p className="text-orange-200 text-sm mb-6">
            Science Student • 13 Subjects
          </p>

          {/* Overall Performance */}
          <div className="mb-6 flex gap-2 items-center">
            <p className="text-lg mb-2">Overall Performance</p>
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#FFA500"
                  strokeWidth="3"
                  strokeDasharray={`${45}, 100`}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
                45%
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-brand-white p-6 space-y-3">
          <Button className="w-full bg-orange-500 h-[43px] hover:bg-orange-600" onClick={() => navigate("/student-history/exam")}>
            Exam History
          </Button>
          <Button className="w-full bg-orange-500 h-[43px] hover:bg-orange-600" onClick={() => navigate("/student-history/test")}>
            Test History
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button className="w-full bg-orange-500 rounded-lg h-[75px] hover:bg-orange-600" onClick={() => navigate("/pick/test/subject") }>
              Take a Test
            </Button>
            <Button className="w-full bg-orange-500 rounded-lg h-[75px] hover:bg-orange-600" onClick={() => navigate("/pick/exam/subject") }>
              Take an Exam
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}


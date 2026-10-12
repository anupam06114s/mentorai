from typing import Dict, Any, List

EXAM_PRESETS = [
    {
        "id": "ssc_cgl",
        "title": "SSC CGL / CHSL Tier 1",
        "category": "Government Exam",
        "duration_minutes": 15,
        "total_marks": 50,
        "description": "Staff Selection Commission Combined Graduate Level examination covering Quantitative Aptitude, Reasoning, and General Awareness.",
        "subjects": ["Quantitative Aptitude", "General Intelligence & Reasoning", "General Awareness"]
    },
    {
        "id": "banking_exam",
        "title": "Banking PO / Clerk (IBPS & SBI)",
        "category": "Government Exam",
        "duration_minutes": 15,
        "total_marks": 50,
        "description": "Institute of Banking Personnel Selection exam covering Data Interpretation, Reasoning, and Financial Awareness.",
        "subjects": ["Quantitative Aptitude", "Reasoning Ability", "Financial Awareness"]
    },
    {
        "id": "tcs_nqt",
        "title": "TCS NQT Placement Assessment",
        "category": "Company Placement",
        "duration_minutes": 15,
        "total_marks": 50,
        "description": "Tata Consultancy Services National Qualifier Test testing Numerical Ability, Logical Reasoning, and Technical Pseudocode.",
        "subjects": ["Numerical Ability", "Reasoning Ability", "Technical Knowledge"]
    },
    {
        "id": "infosys_wipro",
        "title": "Infosys & Wipro Campus Placement",
        "category": "Company Placement",
        "duration_minutes": 15,
        "total_marks": 50,
        "description": "Campus recruitment test testing Mathematical Ability, Critical Thinking, and Core Computer Science.",
        "subjects": ["Mathematical Ability", "Logical Reasoning", "Core CS"]
    },
    {
        "id": "python_dsa",
        "title": "Python & Data Structures Assessment",
        "category": "Technical Skill",
        "duration_minutes": 15,
        "total_marks": 50,
        "description": "Comprehensive technical assessment covering Python internals, complexity analysis, and algorithms.",
        "subjects": ["Python Core", "Data Structures", "Algorithms"]
    },
    {
        "id": "sql_dbms",
        "title": "SQL & Relational Database Assessment",
        "category": "Technical Skill",
        "duration_minutes": 15,
        "total_marks": 50,
        "description": "Database queries, indexing, normalization, transactions, and performance optimization.",
        "subjects": ["SQL Queries", "Indexing & Transactions", "Schema Design"]
    }
]

EXAM_QUESTION_BANKS: Dict[str, List[Dict[str, Any]]] = {
    "ssc_cgl": [
        {
            "id": "ssc-1",
            "subject": "Quantitative Aptitude",
            "question_type": "Verified PYQ",
            "source": "SSC CGL 2023 Tier 1 Shift 2",
            "question": "If the price of petrol increases by 25%, by what percentage must a motorist reduce petrol consumption so that the total expenditure remains unchanged?",
            "options": ["15%", "20%", "25%", "16.66%"],
            "correct_index": 1,
            "explanation": "Formula: Reduction = [R / (100 + R)] * 100. Here R = 25%. So [25 / (100 + 25)] * 100 = 25/125 * 100 = 20%."
        },
        {
            "id": "ssc-2",
            "subject": "General Intelligence & Reasoning",
            "question_type": "Verified PYQ",
            "source": "SSC CGL 2024 Official Paper",
            "question": "In a certain code language, if 'MONKEY' is coded as 'XDJMNL', how will 'TIGER' be coded in that language?",
            "options": ["QDFHS", "SDFHQ", "SHFDQ", "QDFSH"],
            "correct_index": 0,
            "explanation": "Pattern: Each letter from the end is shifted backward by 1: Y-1=X, E-1=D, K-1=J, N-1=M, O-1=N, M-1=L. For TIGER from end: R-1=Q, E-1=D, G-1=F, I-1=H, T-1=S. Result is QDFHS."
        },
        {
            "id": "ssc-3",
            "subject": "General Awareness",
            "question_type": "Verified PYQ",
            "source": "SSC CGL 2023 Shift 1",
            "question": "Which Article of the Indian Constitution provides for the 'Right to Constitutional Remedies' allowing citizens to approach the Supreme Court directly for the enforcement of fundamental rights?",
            "options": ["Article 21", "Article 32", "Article 19", "Article 44"],
            "correct_index": 1,
            "explanation": "Article 32 is called the 'Heart and Soul' of the Constitution by Dr. B.R. Ambedkar, granting the right to move the Supreme Court by appropriate proceedings for enforcement of fundamental rights."
        },
        {
            "id": "ssc-4",
            "subject": "Quantitative Aptitude",
            "question_type": "AI-Generated Practice",
            "source": "Mentor AI Aura Practice Bank",
            "question": "A train 300 meters long passes a standing pole in 15 seconds. What is the speed of the train in kilometers per hour?",
            "options": ["60 km/h", "72 km/h", "80 km/h", "90 km/h"],
            "correct_index": 1,
            "explanation": "Speed in m/s = Distance / Time = 300 / 15 = 20 m/s. To convert to km/h, multiply by 18/5: 20 * (18/5) = 72 km/h."
        },
        {
            "id": "ssc-5",
            "subject": "General Intelligence & Reasoning",
            "question_type": "AI-Generated Practice",
            "source": "Mentor AI Aura Practice Bank",
            "question": "Find the odd one out from the given alternatives: (A) 64 (B) 125 (C) 216 (D) 343 (E) 144",
            "options": ["64", "125", "144", "343"],
            "correct_index": 2,
            "explanation": "64 (4^3), 125 (5^3), 216 (6^3), and 343 (7^3) are perfect cubes. 144 is 12^2 (a square, not a cube of an integer)."
        }
    ],
    "banking_exam": [
        {
            "id": "bank-1",
            "subject": "Quantitative Aptitude",
            "question_type": "Verified PYQ",
            "source": "IBPS PO Prelims 2023",
            "question": "A sum of money invested at compound interest doubles itself in 4 years. In how many years will it amount to 8 times the original sum at the same interest rate?",
            "options": ["8 years", "12 years", "16 years", "24 years"],
            "correct_index": 1,
            "explanation": "If it doubles (2^1) in 4 years, it will become 8 times (2^3) in 4 * 3 = 12 years."
        },
        {
            "id": "bank-2",
            "subject": "Financial Awareness",
            "question_type": "Verified PYQ",
            "source": "SBI PO 2023",
            "question": "What is the primary monetary policy objective of the Reserve Bank of India (RBI) under the Flexible Inflation Targeting (FIT) framework?",
            "options": [
                "Maintaining inflation at 4% with a tolerance band of +/- 2%",
                "Pegging the Indian Rupee directly to the US Dollar",
                "Maintaining zero percent interest rate",
                "Controlling fiscal deficit to exactly 3% of GDP"
            ],
            "correct_index": 0,
            "explanation": "Under the RBI Act, the inflation target is set at 4% Consumer Price Index (CPI) with a tolerance band of +/- 2% (i.e. 2% to 6%)."
        },
        {
            "id": "bank-3",
            "subject": "Reasoning Ability",
            "question_type": "AI-Generated Practice",
            "source": "Mentor AI Aura Practice Bank",
            "question": "Statement: 'All birds are animals. Some animals are wild.' Conclusion I: Some birds are wild. Conclusion II: Some wild creatures are animals.",
            "options": [
                "Only Conclusion I follows",
                "Only Conclusion II follows",
                "Both I and II follow",
                "Neither I nor II follows"
            ],
            "correct_index": 1,
            "explanation": "From 'Some animals are wild', the immediate conversion is 'Some wild creatures are animals' (Conclusion II is unconditionally true). Conclusion I is not necessarily true."
        }
    ],
    "tcs_nqt": [
        {
            "id": "tcs-1",
            "subject": "Numerical Ability",
            "question_type": "Verified PYQ",
            "source": "TCS NQT 2024 Slot 1",
            "question": "Two numbers are in the ratio 3:5. If 9 is subtracted from each, the new ratio becomes 12:23. What is the smaller number?",
            "options": ["27", "33", "42", "55"],
            "correct_index": 1,
            "explanation": "Let numbers be 3x and 5x. (3x - 9)/(5x - 9) = 12/23 => 23(3x - 9) = 12(5x - 9) => 69x - 207 = 60x - 108 => 9x = 99 => x = 11. Smaller number = 3 * 11 = 33."
        },
        {
            "id": "tcs-2",
            "subject": "Technical Knowledge",
            "question_type": "Verified PYQ",
            "source": "TCS NQT Technical Section 2024",
            "question": "What will be the output of the following pseudocode?\nInteger a = 5, b = 10\na = a ^ b\nb = a ^ b\na = a ^ b\nPrint a, b",
            "options": ["5, 10", "10, 5", "15, 10", "0, 0"],
            "correct_index": 1,
            "explanation": "The XOR swap algorithm exchanges values between two variables without requiring temporary storage. Result is a=10, b=5."
        },
        {
            "id": "tcs-3",
            "subject": "Reasoning Ability",
            "question_type": "AI-Generated Practice",
            "source": "Mentor AI Aura Practice Bank",
            "question": "In a coding contest, 5 friends A, B, C, D, and E scored distinct marks. B scored more than D but less than C. A scored more than E, who scored more than C. Who scored the highest marks?",
            "options": ["A", "C", "B", "E"],
            "correct_index": 0,
            "explanation": "Order: A > E > C > B > D. Therefore, A scored the highest marks."
        }
    ],
    "infosys_wipro": [
        {
            "id": "inf-1",
            "subject": "Mathematical Ability",
            "question_type": "Verified PYQ",
            "source": "Infosys Campus Drive 2024",
            "question": "A cistern can be filled by two pipes A and B in 12 minutes and 15 minutes respectively. If both pipes are opened together, how long will they take to fill the cistern?",
            "options": ["6 minutes 40 seconds", "7 minutes 30 seconds", "8 minutes", "9 minutes 15 seconds"],
            "correct_index": 0,
            "explanation": "Rate A = 1/12, Rate B = 1/15. Combined = 1/12 + 1/15 = (5+4)/60 = 9/60 = 3/20 per min. Time = 20/3 minutes = 6 minutes 40 seconds."
        },
        {
            "id": "inf-2",
            "subject": "Core CS",
            "question_type": "Verified PYQ",
            "source": "Wipro Elite National Talent Hunt",
            "question": "Which data structure follows the LIFO (Last In First Out) principle and is used for recursion function call stacks?",
            "options": ["Queue", "Stack", "Binary Search Tree", "Circular Linked List"],
            "correct_index": 1,
            "explanation": "A Stack operates on the LIFO principle. In programming runtimes, the call stack uses a stack data structure to manage function activations."
        }
    ],
    "python_dsa": [
        {
            "id": "py-1",
            "subject": "Python Core",
            "question_type": "Verified PYQ",
            "source": "Technical Interview Question Bank",
            "question": "What is the time complexity of looking up a key in a standard Python dictionary in the average case?",
            "options": ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            "correct_index": 0,
            "explanation": "Python dictionaries are implemented as hash tables. In the average case, hash lookup, insertion, and deletion are O(1) constant time operations."
        },
        {
            "id": "py-2",
            "subject": "Data Structures",
            "question_type": "AI-Generated Practice",
            "source": "Mentor AI Aura Practice Bank",
            "question": "What is the worst-case time complexity of QuickSort when the pivot element is always chosen as the smallest or largest element in an already sorted array?",
            "options": ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
            "correct_index": 2,
            "explanation": "In unbalanced partitions (e.g. sorted array with first or last element as pivot), QuickSort degenerates to O(n^2) time complexity. Using randomized pivots or 3-way median mitigates this."
        }
    ],
    "sql_dbms": [
        {
            "id": "sql-1",
            "subject": "SQL Queries",
            "question_type": "Verified PYQ",
            "source": "Database Engineering Interview Bank",
            "question": "Which SQL statement is used to remove all rows from a table quickly without logging individual row deletions?",
            "options": ["DELETE FROM table_name;", "TRUNCATE TABLE table_name;", "DROP TABLE table_name;", "REMOVE TABLE table_name;"],
            "correct_index": 1,
            "explanation": "TRUNCATE TABLE is a DDL operation that deallocates data pages quickly, resetting auto-increment counters and avoiding per-row logging overhead."
        },
        {
            "id": "sql-2",
            "subject": "Indexing & Transactions",
            "question_type": "Verified PYQ",
            "source": "Database Systems Standard",
            "question": "What does the 'I' stand for in ACID properties of database transactions?",
            "options": ["Integrity", "Isolation", "Immutability", "Indexing"],
            "correct_index": 1,
            "explanation": "ACID stands for Atomicity, Consistency, Isolation, and Durability. Isolation ensures concurrent transactions do not interfere with one another."
        }
    ]
}

def get_all_exams() -> List[Dict[str, Any]]:
    return EXAM_PRESETS

def get_exam_questions(exam_id: str) -> List[Dict[str, Any]]:
    return EXAM_QUESTION_BANKS.get(exam_id, EXAM_QUESTION_BANKS["ssc_cgl"])

def evaluate_exam_submission(exam_id: str, answers: Dict[str, int], time_taken_seconds: int = 0) -> Dict[str, Any]:
    questions = get_exam_questions(exam_id)
    total_q = len(questions)
    
    correct_count = 0
    incorrect_count = 0
    unanswered_count = 0
    
    question_breakdown = []
    subject_stats: Dict[str, Dict[str, int]] = {}

    for q in questions:
        qid = q["id"]
        subj = q.get("subject", "General")
        if subj not in subject_stats:
            subject_stats[subj] = {"total": 0, "correct": 0}
        subject_stats[subj]["total"] += 1

        selected_idx = answers.get(qid)
        is_correct = False
        is_unanswered = selected_idx is None or selected_idx < 0

        if is_unanswered:
            unanswered_count += 1
        elif selected_idx == q["correct_index"]:
            correct_count += 1
            is_correct = True
            subject_stats[subj]["correct"] += 1
        else:
            incorrect_count += 1

        question_breakdown.append({
            "id": q["id"],
            "subject": subj,
            "question": q["question"],
            "question_type": q.get("question_type", "Practice"),
            "source": q.get("source", ""),
            "options": q["options"],
            "selected_index": selected_idx,
            "correct_index": q["correct_index"],
            "is_correct": is_correct,
            "is_unanswered": is_unanswered,
            "explanation": q["explanation"]
        })

    marks_per_q = 2.0
    negative_marking = 0.5
    raw_score = max(0.0, (correct_count * marks_per_q) - (incorrect_count * negative_marking))
    max_marks = total_q * marks_per_q
    accuracy = round((correct_count / max(correct_count + incorrect_count, 1)) * 100, 1)

    # Subject performance
    subject_performance = []
    weak_topics = []
    for s_name, s_data in subject_stats.items():
        s_acc = round((s_data["correct"] / s_data["total"]) * 100)
        subject_performance.append({
            "subject": s_name,
            "correct": s_data["correct"],
            "total": s_data["total"],
            "accuracy_percent": s_acc
        })
        if s_acc < 60:
            weak_topics.append(s_name)

    recommendations = []
    if weak_topics:
        recommendations.append(f"Focus revision on {', '.join(weak_topics)} where accuracy was under 60%.")
    if unanswered_count > 1:
        recommendations.append("Work on pacing: Several questions were left unanswered.")
    if accuracy >= 80:
        recommendations.append("Outstanding accuracy! Try full-length previous year papers to test endurance under strict time limits.")
    else:
        recommendations.append("Review detailed explanations below to eliminate conceptual misunderstandings.")

    return {
        "exam_id": exam_id,
        "total_questions": total_q,
        "correct_answers": correct_count,
        "incorrect_answers": incorrect_count,
        "unanswered": unanswered_count,
        "score": round(raw_score, 1),
        "max_marks": max_marks,
        "accuracy_percent": accuracy,
        "time_taken_seconds": time_taken_seconds,
        "subject_performance": subject_performance,
        "weak_topics": weak_topics,
        "recommendations": recommendations,
        "questions_detail": question_breakdown
    }

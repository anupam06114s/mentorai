from typing import Dict, Any, List

EXAM_PRESETS = [
    {
        "id": "google_swe",
        "title": "Google SWE Coding Assessment",
        "company": "Google",
        "category": "Big Tech Placement",
        "duration_minutes": 20,
        "total_marks": 60,
        "badge": "Tier-1 Big Tech",
        "logoType": "google",
        "description": "Google Software Engineer screening assessment testing Algorithmic problem-solving, Dynamic Programming, Graphs, and Asymptotic Complexity.",
        "subjects": ["Algorithms & DSA", "Time Complexity", "Graph Algorithms", "Dynamic Programming"]
    },
    {
        "id": "microsoft_codility",
        "title": "Microsoft Codility Assessment",
        "company": "Microsoft",
        "category": "Big Tech Placement",
        "duration_minutes": 20,
        "total_marks": 60,
        "badge": "Tier-1 Big Tech",
        "logoType": "microsoft",
        "description": "Microsoft technical online assessment covering Codility-style algorithmic questions, Hash Maps, Concurrency, and OOP Architecture.",
        "subjects": ["Data Structures", "Dynamic Programming", "Concurrency", "OOP Design"]
    },
    {
        "id": "meta_swe",
        "title": "Meta SWE Coding Challenge",
        "company": "Meta",
        "category": "Big Tech Placement",
        "duration_minutes": 20,
        "total_marks": 60,
        "badge": "Tier-1 Big Tech",
        "logoType": "meta",
        "description": "Meta (Facebook) software engineering screening covering Binary Trees, Sliding Window, Graph Traversals, and String Optimization.",
        "subjects": ["Binary Trees", "Sliding Window", "Graph BFS/DFS", "Recursion"]
    },
    {
        "id": "amazon_oa",
        "title": "Amazon SDE 1 Online Assessment (OA)",
        "company": "Amazon",
        "category": "Big Tech Placement",
        "duration_minutes": 20,
        "total_marks": 60,
        "badge": "Tier-1 Big Tech",
        "logoType": "amazon",
        "description": "Amazon SDE 1 Online Assessment covering Arrays, Two Pointers, Heap / Priority Queue, and Amazon Leadership Principles.",
        "subjects": ["Arrays & Strings", "Heap & Sorting", "Leadership Principles", "Tree Traversal"]
    },
    {
        "id": "apple_swe",
        "title": "Apple Software Engineering Challenge",
        "company": "Apple",
        "category": "Big Tech Placement",
        "duration_minutes": 20,
        "total_marks": 60,
        "badge": "Tier-1 Big Tech",
        "logoType": "apple",
        "description": "Apple technical screening testing low-level memory management, C++ / Swift fundamentals, Cache locality, and core algorithms.",
        "subjects": ["Memory Management", "Algorithms", "OS Fundamentals", "Pointer Arithmetic"]
    },
    {
        "id": "anthropic_claude",
        "title": "Anthropic Alignment & Reasoning Challenge",
        "company": "Anthropic",
        "category": "Big Tech Placement",
        "duration_minutes": 25,
        "total_marks": 75,
        "badge": "Frontier AI Lab",
        "logoType": "anthropic",
        "description": "Screening assessment covering Large Language Model internals, Constitutional AI alignment, Reasoning logic, and Python algorithmic optimization.",
        "subjects": ["LLM Architectures", "RLHF & Constitutional AI", "Prompt Engineering", "Python DSA"]
    },
    {
        "id": "nvidia_cuda",
        "title": "NVIDIA CUDA & Parallel Computing OA",
        "company": "NVIDIA",
        "category": "Big Tech Placement",
        "duration_minutes": 25,
        "total_marks": 75,
        "badge": "AI Hardware Giant",
        "logoType": "nvidia",
        "description": "NVIDIA technical screening covering GPU thread hierarchy, Shared memory banking, CUDA kernels, and SIMD parallel optimization.",
        "subjects": ["CUDA Programming", "GPU Architecture", "C++ / Concurrency", "Matrix Multiplications"]
    },
    {
        "id": "openai_swe",
        "title": "OpenAI Deep Learning & Distributed Systems",
        "company": "OpenAI",
        "category": "Big Tech Placement",
        "duration_minutes": 25,
        "total_marks": 75,
        "badge": "Frontier AI Lab",
        "logoType": "openai",
        "description": "OpenAI software engineering assessment covering Distributed training, Attention mechanisms, Tensor sharding, and Scalable RPC pipelines.",
        "subjects": ["Transformer Models", "Distributed Systems", "Attention Mechanisms", "PyTorch Internals"]
    },
    {
        "id": "netflix_swe",
        "title": "Netflix Distributed Streaming Architecture",
        "company": "Netflix",
        "category": "Big Tech Placement",
        "duration_minutes": 20,
        "total_marks": 60,
        "badge": "Tier-1 Big Tech",
        "logoType": "netflix",
        "description": "Netflix technical assessment covering Resilient microservices, Global distributed caching, Event-driven pipelines, and Java concurrency.",
        "subjects": ["Microservices", "Event-Driven Caching", "Java / Concurrency", "High Throughput RPC"]
    },
    {
        "id": "adobe_swe",
        "title": "Adobe Core Software & Algorithms OA",
        "company": "Adobe",
        "category": "Big Tech Placement",
        "duration_minutes": 20,
        "total_marks": 60,
        "badge": "Top Software MNC",
        "logoType": "adobe",
        "description": "Adobe software engineering screening covering Computational geometry, Data structures, C++ design patterns, and Image rendering algorithms.",
        "subjects": ["Computational Geometry", "Data Structures", "OOP & Design Patterns", "C++ Fundamentals"]
    },
    {
        "id": "oracle_cloud",
        "title": "Oracle Cloud & Database Infrastructure",
        "company": "Oracle",
        "category": "Big Tech Placement",
        "duration_minutes": 20,
        "total_marks": 60,
        "badge": "Top Software MNC",
        "logoType": "oracle",
        "description": "Oracle engineering assessment covering Database locking protocols, B+ trees, Distributed query processing, and Java virtual machine tuning.",
        "subjects": ["RDBMS Internals", "Distributed DB", "Core Java", "Cloud Infrastructure"]
    },
    {
        "id": "salesforce_dev",
        "title": "Salesforce Enterprise Architecture & Apex",
        "company": "Salesforce",
        "category": "Big Tech Placement",
        "duration_minutes": 20,
        "total_marks": 60,
        "badge": "Top Software MNC",
        "logoType": "salesforce",
        "description": "Salesforce assessment covering Multi-tenant database design, Asynchronous Apex limits, Event triggers, and SOQL query optimizations.",
        "subjects": ["Multi-Tenant Architecture", "RESTful APIs", "Apex & SOQL", "Data Modeling"]
    },
    {
        "id": "infosys_infytq",
        "title": "Infosys InfyTQ & Specialist Programmer",
        "company": "Infosys",
        "category": "IT & Services",
        "duration_minutes": 15,
        "total_marks": 50,
        "badge": "Top IT MNC",
        "logoType": "infosys",
        "description": "Infosys technical assessment testing Pseudocode interpretation, DBMS SQL, Java/Python programming, and Quantitative logic.",
        "subjects": ["Pseudocode", "DBMS & SQL", "Core Java / Python", "Mathematical Ability"]
    },
    {
        "id": "tcs_nqt",
        "title": "TCS NQT National Qualifier Test",
        "company": "TCS",
        "category": "IT & Services",
        "duration_minutes": 15,
        "total_marks": 50,
        "badge": "Top IT MNC",
        "logoType": "tcs",
        "description": "Tata Consultancy Services National Qualifier Test testing Numerical Ability, Logical Reasoning, and Technical Pseudocode.",
        "subjects": ["Numerical Ability", "Reasoning Ability", "Technical Pseudocode", "Verbal"]
    },
    {
        "id": "wipro_nth",
        "title": "Wipro Elite National Talent Hunt",
        "company": "Wipro",
        "category": "IT & Services",
        "duration_minutes": 15,
        "total_marks": 50,
        "badge": "Top IT MNC",
        "logoType": "wipro",
        "description": "Wipro campus recruitment test testing Mathematical Ability, Critical Thinking, and Core Computer Science fundamentals.",
        "subjects": ["Mathematical Ability", "Logical Reasoning", "Core CS", "English Grammar"]
    },
    {
        "id": "upsc_prelims",
        "title": "UPSC Civil Services Prelims (GS + CSAT)",
        "company": "UPSC",
        "category": "Government Exam",
        "duration_minutes": 20,
        "total_marks": 60,
        "badge": "National UPSC",
        "logoType": "upsc",
        "description": "Union Public Service Commission Prelims assessment covering Indian Polity, Modern History, Ecology, and CSAT logical reasoning.",
        "subjects": ["Indian Polity", "Modern Indian History", "Geography & Ecology", "CSAT Aptitude"]
    },
    {
        "id": "ssc_cgl",
        "title": "SSC CGL / CHSL Tier 1",
        "company": "SSC",
        "category": "Government Exam",
        "duration_minutes": 15,
        "total_marks": 50,
        "badge": "Central Govt",
        "logoType": "ssc",
        "description": "Staff Selection Commission Combined Graduate Level examination covering Quantitative Aptitude, Reasoning, and General Awareness.",
        "subjects": ["Quantitative Aptitude", "General Intelligence & Reasoning", "General Awareness"]
    },
    {
        "id": "banking_exam",
        "title": "Banking PO & Clerk (SBI & IBPS)",
        "company": "SBI / IBPS",
        "category": "Government Exam",
        "duration_minutes": 15,
        "total_marks": 50,
        "badge": "National Banking",
        "logoType": "sbi",
        "description": "Institute of Banking Personnel Selection & State Bank of India covering Data Interpretation, Reasoning, and Financial Awareness.",
        "subjects": ["Quantitative Aptitude", "Reasoning Ability", "Banking & Finance"]
    },
    {
        "id": "isro_scientist",
        "title": "ISRO Scientist / Engineer Recruitment",
        "company": "ISRO",
        "category": "Government Exam",
        "duration_minutes": 20,
        "total_marks": 60,
        "badge": "Premier PSU",
        "logoType": "isro",
        "description": "Indian Space Research Organisation Scientist/Engineer exam covering Computer Networks, Operating Systems, and Digital Logic.",
        "subjects": ["Computer Networks", "Operating Systems", "Computer Architecture", "Digital Logic"]
    },
    {
        "id": "rrb_ntpc",
        "title": "RRB Railways NTPC & Technical",
        "company": "Indian Railways",
        "category": "Government Exam",
        "duration_minutes": 15,
        "total_marks": 50,
        "badge": "Indian Railways",
        "logoType": "rrb",
        "description": "Railway Recruitment Board Non-Technical Categories assessment covering Mathematics, General Science, and Reasoning.",
        "subjects": ["Mathematics", "General Science", "Reasoning Ability", "Current Affairs"]
    },
    {
        "id": "drdo_ceptam",
        "title": "DRDO CEPTAM Senior Technical Assistant",
        "company": "DRDO",
        "category": "Government Exam",
        "duration_minutes": 15,
        "total_marks": 50,
        "badge": "Defence PSU",
        "logoType": "drdo",
        "description": "Defence Research and Development Organisation CEPTAM screening covering Technical Aptitude, General Awareness, and Logic.",
        "subjects": ["Technical Aptitude", "General Science", "Logical Reasoning", "Quantitative Ability"]
    },
    {
        "id": "python_dsa",
        "title": "Python & Data Structures Assessment",
        "company": "Tech Skill",
        "category": "Technical Skill",
        "duration_minutes": 15,
        "total_marks": 50,
        "badge": "Core Programming",
        "logoType": "python",
        "description": "Comprehensive technical assessment covering Python internals, complexity analysis, and algorithms.",
        "subjects": ["Python Core", "Data Structures", "Algorithms"]
    },
    {
        "id": "sql_dbms",
        "title": "SQL & Relational Database Assessment",
        "company": "Tech Skill",
        "category": "Technical Skill",
        "duration_minutes": 15,
        "total_marks": 50,
        "badge": "Database Engg",
        "logoType": "sql",
        "description": "Database queries, indexing, normalization, transactions, and performance optimization.",
        "subjects": ["SQL Queries", "Indexing & Transactions", "Schema Design"]
    }
]

EXAM_QUESTION_BANKS: Dict[str, List[Dict[str, Any]]] = {
    "google_swe": [
        {
            "id": "goog-1",
            "subject": "Algorithms & DSA",
            "question_type": "Verified Interview Question",
            "source": "Google Software Engineer Screening",
            "question": "What is the amortized time complexity of inserting n elements into a dynamic array (like C++ std::vector or Python list) starting from capacity 1?",
            "options": ["O(1) per element, O(n) total", "O(n) per element, O(n^2) total", "O(log n) per element, O(n log n) total", "O(n) per element, O(n) total"],
            "correct_index": 0,
            "explanation": "Because capacity doubles geometrically (e.g. 1, 2, 4, 8, ...), the total copy operations sum to 1 + 2 + 4 + ... + n < 2n = O(n) total for n insertions, making each insertion O(1) amortized."
        },
        {
            "id": "goog-2",
            "subject": "Graph Algorithms",
            "question_type": "Verified Interview Question",
            "source": "Google Technical Interview Question Bank",
            "question": "Which algorithm is best suited to find the shortest path in a weighted directed graph that may contain negative edge weights, provided there are no negative cycles?",
            "options": ["Dijkstra's Algorithm", "Bellman-Ford Algorithm", "Breadth-First Search (BFS)", "Prim's Algorithm"],
            "correct_index": 1,
            "explanation": "Bellman-Ford operates in O(V * E) and correctly relaxes edges with negative weights, while Dijkstra assumes non-negative edge weights."
        },
        {
            "id": "goog-3",
            "subject": "Dynamic Programming",
            "question_type": "Verified Interview Question",
            "source": "Google Coding Round",
            "question": "In the Longest Increasing Subsequence (LIS) problem, what is the most optimal achievable time complexity using Patience Sorting and Binary Search?",
            "options": ["O(n^2)", "O(n log n)", "O(n)", "O(log n)"],
            "correct_index": 1,
            "explanation": "Using an auxiliary array representing pile tails, each element can be binary searched in O(log n), yielding an optimal O(n log n) total runtime."
        }
    ],
    "microsoft_codility": [
        {
            "id": "ms-1",
            "subject": "Data Structures",
            "question_type": "Codility Standard",
            "source": "Microsoft Online Assessment (Codility)",
            "question": "Given an array of N integers, what data structure allows checking whether a subsegment sums to K in O(N) linear time?",
            "options": ["Prefix Sum array with a Hash Map", "Min-Heap", "Segment Tree without Hash Map", "Sorted Doubly Linked List"],
            "correct_index": 0,
            "explanation": "Storing prefix sum frequencies in a Hash Map allows verifying in O(1) whether (current_prefix_sum - K) has been previously encountered."
        },
        {
            "id": "ms-2",
            "subject": "Concurrency",
            "question_type": "Microsoft Technical Standard",
            "source": "Microsoft Software Engineering Assessment",
            "question": "Which of the following conditions is NOT one of the Coffman conditions required for a system deadlock to occur?",
            "options": ["Mutual Exclusion", "Hold and Wait", "Preemption allowed", "Circular Wait"],
            "correct_index": 2,
            "explanation": "The four Coffman conditions are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. If preemption is allowed, deadlocks cannot persist."
        }
    ],
    "meta_swe": [
        {
            "id": "meta-1",
            "subject": "Sliding Window",
            "question_type": "Meta Screening Question",
            "source": "Meta Coding Interview Prep",
            "question": "To find the maximum sum subarray of fixed size K in an array of size N, what is the most optimal time and space complexity?",
            "options": ["Time: O(N), Space: O(1)", "Time: O(N log K), Space: O(K)", "Time: O(N * K), Space: O(1)", "Time: O(N^2), Space: O(N)"],
            "correct_index": 0,
            "explanation": "By maintaining a sliding window of size K and subtracting the outgoing element while adding the incoming element, time is O(N) with O(1) auxiliary space."
        },
        {
            "id": "meta-2",
            "subject": "Binary Trees",
            "question_type": "Meta Screening Question",
            "source": "Meta Technical Assessment",
            "question": "What is the maximum number of nodes at level L (where root is level 0) in a full binary tree?",
            "options": ["2^L", "2^(L + 1)", "2^(L - 1)", "L^2"],
            "correct_index": 0,
            "explanation": "Level 0 has 2^0 = 1 node. Level 1 has 2^1 = 2 nodes. In general, level L contains at most 2^L nodes."
        }
    ],
    "amazon_oa": [
        {
            "id": "amz-1",
            "subject": "Arrays & Strings",
            "question_type": "Amazon OA Question",
            "source": "Amazon SDE 1 Assessment Bank",
            "question": "In Amazon fulfillment centers, items have weights. Given an array of item weights, which algorithm finds the K heaviest items in optimal O(N log K) time?",
            "options": ["Min-Heap of size K", "Max-Heap of size N", "Bubble Sort", "Linear search K times"],
            "correct_index": 0,
            "explanation": "Maintaining a Min-Heap of size K allows processing each of the N items in O(log K) time, keeping only the top K heaviest items."
        },
        {
            "id": "amz-2",
            "subject": "Leadership Principles",
            "question_type": "Amazon LP Question",
            "source": "Amazon Leadership Evaluation",
            "question": "Which Amazon Leadership Principle emphasizes that leaders work vigorously to deconfirm their beliefs and look for perspectives that challenge their own?",
            "options": ["Are Right, A Lot", "Frugality", "Bias for Action", "Earn Trust"],
            "correct_index": 0,
            "explanation": "The principle 'Are Right, A Lot' states: 'Leaders have strong judgment and good instincts. They seek diverse perspectives and work to disconfirm their beliefs.'"
        }
    ],
    "apple_swe": [
        {
            "id": "apple-1",
            "subject": "Memory Management",
            "question_type": "Verified Interview Question",
            "source": "Apple CoreOS & SWE Assessment",
            "question": "In C/C++ memory layout, where are variables allocated dynamically using malloc() or new placed?",
            "options": ["Heap segment", "Stack segment", "BSS segment", "Text segment"],
            "correct_index": 0,
            "explanation": "Dynamic memory allocated via malloc() or new resides on the Heap, while local variables reside on the Stack."
        },
        {
            "id": "apple-2",
            "subject": "Algorithms",
            "question_type": "Verified Interview Question",
            "source": "Apple Technical Screening",
            "question": "What bitwise operation checks whether an unsigned integer N is a power of two in O(1) time?",
            "options": ["(N & (N - 1)) == 0 and N > 0", "(N | (N - 1)) == 0", "(N ^ (N - 1)) == 0", "(N & ~N) == 1"],
            "correct_index": 0,
            "explanation": "A power of two has exactly one bit set. Subtracting 1 flips all bits up to that bit. Hence (N & (N - 1)) clears the single set bit, resulting in 0."
        }
    ],
    "infosys_infytq": [
        {
            "id": "infy-1",
            "subject": "Pseudocode",
            "question_type": "Verified PYQ",
            "source": "Infosys InfyTQ & Specialist Programmer",
            "question": "What is the output of the following pseudocode: Set a = 5, b = 10; a = a ^ b; b = a ^ b; a = a ^ b; Print a, b?",
            "options": ["10, 5", "5, 10", "15, 5", "0, 0"],
            "correct_index": 0,
            "explanation": "The XOR swap algorithm swaps the values of a and b without requiring any third temporary variable: a becomes 10, and b becomes 5."
        },
        {
            "id": "infy-2",
            "subject": "DBMS & SQL",
            "question_type": "Verified PYQ",
            "source": "Infosys Technical Assessment",
            "question": "Which normal form eliminates partial functional dependencies (i.e. where a non-prime attribute depends on part of a composite primary key)?",
            "options": ["First Normal Form (1NF)", "Second Normal Form (2NF)", "Third Normal Form (3NF)", "Boyce-Codd Normal Form (BCNF)"],
            "correct_index": 1,
            "explanation": "2NF requires that the relation is in 1NF and no non-prime attribute is functionally dependent on any proper subset of any candidate key."
        }
    ],
    "tcs_nqt": [
        {
            "id": "tcs-1",
            "subject": "Numerical Ability",
            "question_type": "Verified PYQ",
            "source": "TCS NQT Official Question Paper",
            "question": "Two numbers are in the ratio 3:4. If their LCM is 240, what is the smaller of the two numbers?",
            "options": ["60", "80", "120", "40"],
            "correct_index": 0,
            "explanation": "Let numbers be 3x and 4x. Their LCM = 12x = 240 => x = 20. The smaller number is 3 * 20 = 60."
        },
        {
            "id": "tcs-2",
            "subject": "Reasoning Ability",
            "question_type": "Verified PYQ",
            "source": "TCS NQT Official Question Paper",
            "question": "Pointing to a photograph, Ramesh said, 'She is the daughter of my grandfather's only son.' How is the girl in the photograph related to Ramesh?",
            "options": ["Sister", "Mother", "Cousin", "Aunt"],
            "correct_index": 0,
            "explanation": "Grandfather's only son is Ramesh's father. The daughter of Ramesh's father is Ramesh's sister."
        }
    ],
    "wipro_nth": [
        {
            "id": "wip-1",
            "subject": "Mathematical Ability",
            "question_type": "Verified PYQ",
            "source": "Wipro Elite National Talent Hunt",
            "question": "A shopkeeper marks an item 30% above the cost price and then offers a discount of 10%. What is his net profit percentage?",
            "options": ["17%", "20%", "15%", "18.5%"],
            "correct_index": 0,
            "explanation": "Net percentage change = +30 - 10 - (30 * 10 / 100) = 20 - 3 = 17% profit."
        },
        {
            "id": "wip-2",
            "subject": "Core CS",
            "question_type": "Verified PYQ",
            "source": "Wipro Elite NTH Technical Bank",
            "question": "Which data structure follows the LIFO (Last In First Out) principle and is used for recursion function call stacks?",
            "options": ["Queue", "Stack", "Binary Search Tree", "Circular Linked List"],
            "correct_index": 1,
            "explanation": "A Stack operates on the LIFO principle. In programming runtimes, the call stack uses a stack data structure to manage function activations."
        }
    ],
    "upsc_prelims": [
        {
            "id": "upsc-1",
            "subject": "Indian Polity",
            "question_type": "Verified PYQ",
            "source": "UPSC Civil Services Prelims GS Paper 1",
            "question": "With reference to the Constitution of India, which of the following is correct regarding the 'Basic Structure' doctrine?",
            "options": [
                "It was expounded by the Supreme Court in the landmark Kesavananda Bharati case (1973)",
                "It is explicitly defined in Article 368 of the Constitution",
                "It was introduced by the 42nd Constitutional Amendment Act 1976",
                "Parliament has absolute power to alter the Basic Structure by simple majority"
            ],
            "correct_index": 0,
            "explanation": "In Kesavananda Bharati v. State of Kerala (1973), the Supreme Court ruled that while Parliament can amend any part of the Constitution under Art. 368, it cannot alter its Basic Structure."
        },
        {
            "id": "upsc-2",
            "subject": "Modern Indian History",
            "question_type": "Verified PYQ",
            "source": "UPSC Civil Services Prelims",
            "question": "Who among the following was the Governor-General of India when the Indian National Congress was founded in Bombay in December 1885?",
            "options": ["Lord Curzon", "Lord Dufferin", "Lord Ripon", "Lord Lytton"],
            "correct_index": 1,
            "explanation": "Lord Dufferin served as the Viceroy of India from 1884 to 1888 when the Indian National Congress was founded under the leadership of A.O. Hume and W.C. Bonnerjee."
        }
    ],
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
            "question": "Which Article of the Indian Constitution provides for the 'Right to Constitutional Remedies' allowing citizens to approach the Supreme Court directly for enforcement of fundamental rights?",
            "options": ["Article 21", "Article 32", "Article 19", "Article 44"],
            "correct_index": 1,
            "explanation": "Article 32 is called the 'Heart and Soul' of the Constitution by Dr. B.R. Ambedkar, granting the right to move the Supreme Court for enforcement of fundamental rights."
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
        }
    ],
    "isro_scientist": [
        {
            "id": "isro-1",
            "subject": "Computer Networks",
            "question_type": "Verified PYQ",
            "source": "ISRO Scientist/Engineer (CS) 2023",
            "question": "Which OSI layer is responsible for end-to-end flow control, error recovery, and segmentation/reassembly of packets?",
            "options": ["Transport Layer", "Network Layer", "Data Link Layer", "Session Layer"],
            "correct_index": 0,
            "explanation": "The Transport Layer (Layer 4, e.g. TCP) provides transparent and reliable end-to-end data transfer between end points, including flow control and error checking."
        },
        {
            "id": "isro-2",
            "subject": "Operating Systems",
            "question_type": "Verified PYQ",
            "source": "ISRO Scientist/Engineer (CS)",
            "question": "What is the phenomenon where increasing the number of page frames results in an increase in the number of page faults under the FIFO page replacement algorithm?",
            "options": ["Belady's Anomaly", "Thrashing", "Starvation", "Priority Inversion"],
            "correct_index": 0,
            "explanation": "Belady's Anomaly is a counter-intuitive observation where allocating more memory frames leads to more page faults in FIFO replacement."
        }
    ],
    "rrb_ntpc": [
        {
            "id": "rrb-1",
            "subject": "General Science",
            "question_type": "Verified PYQ",
            "source": "RRB NTPC Stage 1 Official Paper",
            "question": "What is the SI unit of electric resistance?",
            "options": ["Ohm", "Ampere", "Volt", "Coulomb"],
            "correct_index": 0,
            "explanation": "The SI unit of electric resistance is Ohm (symbol Ω), named after German physicist Georg Simon Ohm."
        },
        {
            "id": "rrb-2",
            "subject": "Mathematics",
            "question_type": "Verified PYQ",
            "source": "RRB NTPC 2022",
            "question": "If 15 men can complete a project in 20 days, how many days will 25 men take to complete the same work?",
            "options": ["12 days", "15 days", "10 days", "18 days"],
            "correct_index": 0,
            "explanation": "Work = Men * Days = 15 * 20 = 300 man-days. Days for 25 men = 300 / 25 = 12 days."
        }
    ],
    "drdo_ceptam": [
        {
            "id": "drdo-1",
            "subject": "Technical Aptitude",
            "question_type": "Verified PYQ",
            "source": "DRDO CEPTAM Technical Exam",
            "question": "Which logic gate outputs HIGH (1) if and only if an odd number of its inputs are HIGH?",
            "options": ["XOR Gate", "XNOR Gate", "NAND Gate", "NOR Gate"],
            "correct_index": 0,
            "explanation": "An Exclusive-OR (XOR) gate performs modulo-2 addition and outputs HIGH whenever the parity of inputs is odd."
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
            "explanation": "In unbalanced partitions (e.g. sorted array with first or last element as pivot), QuickSort degenerates to O(n^2) time complexity. Using randomized pivots mitigates this."
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
    return EXAM_QUESTION_BANKS.get(exam_id, EXAM_QUESTION_BANKS.get("google_swe", EXAM_QUESTION_BANKS["ssc_cgl"]))

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
            "explanation": q.get("explanation", "")
        })

    marks_per_question = 5
    score = (correct_count * marks_per_question) - (incorrect_count * 1)
    if score < 0:
        score = 0
    accuracy_percent = round((correct_count / total_q) * 100, 1) if total_q > 0 else 0

    return {
        "exam_id": exam_id,
        "total_questions": total_q,
        "correct_answers": correct_count,
        "incorrect_answers": incorrect_count,
        "unanswered": unanswered_count,
        "score": score,
        "total_marks": total_q * marks_per_question,
        "accuracy_percent": accuracy_percent,
        "time_taken_seconds": time_taken_seconds,
        "subject_breakdown": subject_stats,
        "questions": question_breakdown
    }

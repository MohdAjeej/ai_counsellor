"""
Seed script to populate universities database with sample data
Run this after setting up the database
"""
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, University

# Create tables
Base.metadata.create_all(bind=engine)

# Sample university data
universities_data = [
    {
        "name": "Massachusetts Institute of Technology",
        "country": "United States",
        "city": "Cambridge",
        "ranking": 1,
        "acceptance_rate": 0.07,
        "programs_offered": '["Computer Science", "Engineering", "Business", "Science"]',
        "tuition_min": 53790,
        "tuition_max": 53790,
        "currency": "USD",
        "living_cost_estimate": 20000,
        "min_gpa": 3.8,
        "toefl_required": True,
        "gre_required": True,
        "website": "https://web.mit.edu",
        "description": "World-renowned research university known for innovation and excellence in STEM fields."
    },
    {
        "name": "Stanford University",
        "country": "United States",
        "city": "Stanford",
        "ranking": 3,
        "acceptance_rate": 0.04,
        "programs_offered": '["Computer Science", "Engineering", "Business", "Medicine"]',
        "tuition_min": 56169,
        "tuition_max": 56169,
        "currency": "USD",
        "living_cost_estimate": 22000,
        "min_gpa": 3.7,
        "toefl_required": True,
        "gre_required": True,
        "website": "https://www.stanford.edu",
        "description": "Prestigious private research university in Silicon Valley."
    },
    {
        "name": "Harvard University",
        "country": "United States",
        "city": "Cambridge",
        "ranking": 2,
        "acceptance_rate": 0.03,
        "programs_offered": '["Business", "Law", "Medicine", "Engineering", "Arts"]',
        "tuition_min": 54269,
        "tuition_max": 54269,
        "currency": "USD",
        "living_cost_estimate": 25000,
        "min_gpa": 3.9,
        "toefl_required": True,
        "gre_required": True,
        "website": "https://www.harvard.edu",
        "description": "Ivy League university with world-class programs across disciplines."
    },
    {
        "name": "University of Toronto",
        "country": "Canada",
        "city": "Toronto",
        "ranking": 18,
        "acceptance_rate": 0.43,
        "programs_offered": '["Computer Science", "Engineering", "Business", "Medicine"]',
        "tuition_min": 45000,
        "tuition_max": 60000,
        "currency": "CAD",
        "living_cost_estimate": 15000,
        "min_gpa": 3.3,
        "toefl_required": True,
        "ielts_required": True,
        "gre_required": False,
        "website": "https://www.utoronto.ca",
        "description": "Leading Canadian research university with diverse programs."
    },
    {
        "name": "University of British Columbia",
        "country": "Canada",
        "city": "Vancouver",
        "ranking": 34,
        "acceptance_rate": 0.52,
        "programs_offered": '["Computer Science", "Engineering", "Business", "Arts"]',
        "tuition_min": 42000,
        "tuition_max": 55000,
        "currency": "CAD",
        "living_cost_estimate": 18000,
        "min_gpa": 3.2,
        "toefl_required": True,
        "ielts_required": True,
        "gre_required": False,
        "website": "https://www.ubc.ca",
        "description": "Top-ranked Canadian university with beautiful campus."
    },
    {
        "name": "University of Oxford",
        "country": "United Kingdom",
        "city": "Oxford",
        "ranking": 4,
        "acceptance_rate": 0.17,
        "programs_offered": '["Computer Science", "Engineering", "Business", "Law", "Medicine"]',
        "tuition_min": 26770,
        "tuition_max": 39010,
        "currency": "GBP",
        "living_cost_estimate": 15000,
        "min_gpa": 3.7,
        "toefl_required": True,
        "ielts_required": True,
        "gre_required": False,
        "website": "https://www.ox.ac.uk",
        "description": "Historic and prestigious university with centuries of academic excellence."
    },
    {
        "name": "University of Cambridge",
        "country": "United Kingdom",
        "city": "Cambridge",
        "ranking": 5,
        "acceptance_rate": 0.21,
        "programs_offered": '["Computer Science", "Engineering", "Business", "Science", "Arts"]',
        "tuition_min": 22227,
        "tuition_max": 33975,
        "currency": "GBP",
        "living_cost_estimate": 14000,
        "min_gpa": 3.7,
        "toefl_required": True,
        "ielts_required": True,
        "gre_required": False,
        "website": "https://www.cam.ac.uk",
        "description": "World-class research university with strong academic traditions."
    },
    {
        "name": "ETH Zurich",
        "country": "Switzerland",
        "city": "Zurich",
        "ranking": 7,
        "acceptance_rate": 0.27,
        "programs_offered": '["Computer Science", "Engineering", "Mathematics", "Physics"]',
        "tuition_min": 730,
        "tuition_max": 730,
        "currency": "CHF",
        "living_cost_estimate": 22000,
        "min_gpa": 3.5,
        "toefl_required": True,
        "ielts_required": True,
        "gre_required": False,
        "website": "https://ethz.ch",
        "description": "Leading European technical university with low tuition fees."
    },
    {
        "name": "National University of Singapore",
        "country": "Singapore",
        "city": "Singapore",
        "ranking": 8,
        "acceptance_rate": 0.25,
        "programs_offered": '["Computer Science", "Engineering", "Business", "Medicine"]',
        "tuition_min": 38000,
        "tuition_max": 50000,
        "currency": "SGD",
        "living_cost_estimate": 15000,
        "min_gpa": 3.4,
        "toefl_required": True,
        "ielts_required": True,
        "gre_required": False,
        "website": "https://www.nus.edu.sg",
        "description": "Top Asian university with strong research programs."
    },
    {
        "name": "University of Melbourne",
        "country": "Australia",
        "city": "Melbourne",
        "ranking": 14,
        "acceptance_rate": 0.70,
        "programs_offered": '["Computer Science", "Engineering", "Business", "Arts"]',
        "tuition_min": 40000,
        "tuition_max": 50000,
        "currency": "AUD",
        "living_cost_estimate": 20000,
        "min_gpa": 3.0,
        "toefl_required": True,
        "ielts_required": True,
        "gre_required": False,
        "website": "https://www.unimelb.edu.au",
        "description": "Leading Australian university with diverse programs."
    },
    {
        "name": "University of Sydney",
        "country": "Australia",
        "city": "Sydney",
        "ranking": 19,
        "acceptance_rate": 0.65,
        "programs_offered": '["Computer Science", "Engineering", "Business", "Medicine"]',
        "tuition_min": 38000,
        "tuition_max": 48000,
        "currency": "AUD",
        "living_cost_estimate": 22000,
        "min_gpa": 3.0,
        "toefl_required": True,
        "ielts_required": True,
        "gre_required": False,
        "website": "https://www.sydney.edu.au",
        "description": "Prestigious Australian university with strong global reputation."
    },
    {
        "name": "Technical University of Munich",
        "country": "Germany",
        "city": "Munich",
        "ranking": 30,
        "acceptance_rate": 0.40,
        "programs_offered": '["Computer Science", "Engineering", "Mathematics", "Physics"]',
        "tuition_min": 0,
        "tuition_max": 0,
        "currency": "EUR",
        "living_cost_estimate": 12000,
        "min_gpa": 3.2,
        "toefl_required": True,
        "ielts_required": True,
        "gre_required": False,
        "website": "https://www.tum.de",
        "description": "Top German technical university with no tuition fees for most programs."
    },
    {
        "name": "University of Amsterdam",
        "country": "Netherlands",
        "city": "Amsterdam",
        "ranking": 53,
        "acceptance_rate": 0.45,
        "programs_offered": '["Computer Science", "Business", "Arts", "Social Sciences"]',
        "tuition_min": 12000,
        "tuition_max": 16000,
        "currency": "EUR",
        "living_cost_estimate": 12000,
        "min_gpa": 3.0,
        "toefl_required": True,
        "ielts_required": True,
        "gre_required": False,
        "website": "https://www.uva.nl",
        "description": "Leading Dutch university with English-taught programs."
    },
    {
        "name": "Arizona State University",
        "country": "United States",
        "city": "Tempe",
        "ranking": 179,
        "acceptance_rate": 0.88,
        "programs_offered": '["Computer Science", "Engineering", "Business", "Arts"]',
        "tuition_min": 32000,
        "tuition_max": 45000,
        "currency": "USD",
        "living_cost_estimate": 15000,
        "min_gpa": 3.0,
        "toefl_required": True,
        "gre_required": False,
        "website": "https://www.asu.edu",
        "description": "Large public university with good acceptance rates and diverse programs."
    },
    {
        "name": "Purdue University",
        "country": "United States",
        "city": "West Lafayette",
        "ranking": 127,
        "acceptance_rate": 0.60,
        "programs_offered": '["Computer Science", "Engineering", "Business", "Agriculture"]',
        "tuition_min": 31000,
        "tuition_max": 45000,
        "currency": "USD",
        "living_cost_estimate": 14000,
        "min_gpa": 3.2,
        "toefl_required": True,
        "gre_required": True,
        "website": "https://www.purdue.edu",
        "description": "Strong engineering and technology programs with good value."
    },
    # Indian universities (tuition in INR for India filter + budget 300000–500000)
    {
        "name": "Indian Institute of Technology Delhi",
        "country": "India",
        "city": "New Delhi",
        "ranking": 197,
        "acceptance_rate": 0.02,
        "programs_offered": '["Engineering", "Computer Science", "Management", "Sciences"]',
        "tuition_min": 250000,
        "tuition_max": 450000,
        "currency": "INR",
        "living_cost_estimate": 120000,
        "min_gpa": 3.5,
        "toefl_required": True,
        "ielts_required": True,
        "gre_required": True,
        "website": "https://www.iitd.ac.in",
        "description": "Premier engineering and technology institute in India."
    },
    {
        "name": "Indian Institute of Technology Bombay",
        "country": "India",
        "city": "Mumbai",
        "ranking": 149,
        "acceptance_rate": 0.02,
        "programs_offered": '["Engineering", "Computer Science", "Sciences", "Design"]',
        "tuition_min": 260000,
        "tuition_max": 480000,
        "currency": "INR",
        "living_cost_estimate": 150000,
        "min_gpa": 3.5,
        "toefl_required": True,
        "ielts_required": True,
        "gre_required": True,
        "website": "https://www.iitb.ac.in",
        "description": "Leading IIT with strong research and industry links."
    },
    {
        "name": "Indian Institute of Technology Madras",
        "country": "India",
        "city": "Chennai",
        "ranking": 250,
        "acceptance_rate": 0.03,
        "programs_offered": '["Engineering", "Computer Science", "Management", "Humanities"]',
        "tuition_min": 240000,
        "tuition_max": 420000,
        "currency": "INR",
        "living_cost_estimate": 100000,
        "min_gpa": 3.4,
        "toefl_required": True,
        "ielts_required": True,
        "gre_required": True,
        "website": "https://www.iitm.ac.in",
        "description": "Top IIT known for engineering and entrepreneurship."
    },
    {
        "name": "Delhi University",
        "country": "India",
        "city": "New Delhi",
        "ranking": 407,
        "acceptance_rate": 0.35,
        "programs_offered": '["Arts", "Science", "Commerce", "Law", "Engineering"]',
        "tuition_min": 80000,
        "tuition_max": 200000,
        "currency": "INR",
        "living_cost_estimate": 120000,
        "min_gpa": 3.0,
        "toefl_required": False,
        "ielts_required": True,
        "gre_required": False,
        "website": "https://www.du.ac.in",
        "description": "Large central university with diverse programs."
    },
    {
        "name": "Jawaharlal Nehru University",
        "country": "India",
        "city": "New Delhi",
        "ranking": 601,
        "acceptance_rate": 0.08,
        "programs_offered": '["Social Sciences", "Sciences", "Languages", "International Studies"]',
        "tuition_min": 50000,
        "tuition_max": 150000,
        "currency": "INR",
        "living_cost_estimate": 80000,
        "min_gpa": 3.2,
        "toefl_required": False,
        "ielts_required": True,
        "gre_required": False,
        "website": "https://www.jnu.ac.in",
        "description": "Leading university for research and social sciences."
    },
    {
        "name": "BITS Pilani",
        "country": "India",
        "city": "Pilani",
        "ranking": 351,
        "acceptance_rate": 0.15,
        "programs_offered": '["Engineering", "Pharmacy", "Sciences", "Management"]',
        "tuition_min": 400000,
        "tuition_max": 550000,
        "currency": "INR",
        "living_cost_estimate": 150000,
        "min_gpa": 3.3,
        "toefl_required": True,
        "ielts_required": True,
        "gre_required": False,
        "website": "https://www.bits-pilani.ac.in",
        "description": "Premier private institute for engineering and sciences."
    },
    {
        "name": "University of Hyderabad",
        "country": "India",
        "city": "Hyderabad",
        "ranking": 601,
        "acceptance_rate": 0.12,
        "programs_offered": '["Sciences", "Arts", "Management", "Engineering"]',
        "tuition_min": 100000,
        "tuition_max": 280000,
        "currency": "INR",
        "living_cost_estimate": 90000,
        "min_gpa": 3.0,
        "toefl_required": False,
        "ielts_required": True,
        "gre_required": False,
        "website": "https://www.uoh.ac.in",
        "description": "Central university known for research and sciences."
    },
    # More worldwide universities (filter by country/budget to view and choose)
    {"name": "University of Tokyo", "country": "Japan", "city": "Tokyo", "ranking": 28, "acceptance_rate": 0.34, "programs_offered": '["Engineering", "Science", "Law", "Medicine"]', "tuition_min": 535800, "tuition_max": 535800, "currency": "JPY", "living_cost_estimate": 1200000, "min_gpa": 3.2, "toefl_required": True, "ielts_required": True, "website": "https://www.u-tokyo.ac.jp", "description": "Japan's top national university."},
    {"name": "Kyoto University", "country": "Japan", "city": "Kyoto", "ranking": 46, "acceptance_rate": 0.38, "programs_offered": '["Engineering", "Science", "Humanities"]', "tuition_min": 535800, "tuition_max": 535800, "currency": "JPY", "living_cost_estimate": 1000000, "min_gpa": 3.1, "toefl_required": True, "website": "https://www.kyoto-u.ac.jp", "description": "Leading research university in Japan."},
    {"name": "Seoul National University", "country": "South Korea", "city": "Seoul", "ranking": 41, "acceptance_rate": 0.25, "programs_offered": '["Engineering", "Business", "Medicine", "Law"]', "tuition_min": 4000000, "tuition_max": 8000000, "currency": "KRW", "living_cost_estimate": 12000000, "min_gpa": 3.3, "toefl_required": True, "website": "https://en.snu.ac.kr", "description": "Top university in South Korea."},
    {"name": "Peking University", "country": "China", "city": "Beijing", "ranking": 17, "acceptance_rate": 0.01, "programs_offered": '["Science", "Engineering", "Medicine", "Law"]', "tuition_min": 26000, "tuition_max": 33000, "currency": "CNY", "living_cost_estimate": 20000, "min_gpa": 3.5, "website": "https://www.pku.edu.cn", "description": "Premier university in China."},
    {"name": "Tsinghua University", "country": "China", "city": "Beijing", "ranking": 25, "acceptance_rate": 0.01, "programs_offered": '["Engineering", "Science", "Economics", "Law"]', "tuition_min": 26000, "tuition_max": 40000, "currency": "CNY", "living_cost_estimate": 22000, "min_gpa": 3.6, "website": "https://www.tsinghua.edu.cn", "description": "Leading STEM and research university in China."},
    {"name": "Sorbonne University", "country": "France", "city": "Paris", "ranking": 48, "acceptance_rate": 0.20, "programs_offered": '["Science", "Medicine", "Arts", "Humanities"]', "tuition_min": 170, "tuition_max": 601, "currency": "EUR", "living_cost_estimate": 12000, "min_gpa": 3.0, "website": "https://www.sorbonne-universite.fr", "description": "Historic university in Paris."},
    {"name": "ETH Zurich", "country": "Switzerland", "city": "Zurich", "ranking": 7, "acceptance_rate": 0.27, "programs_offered": '["Engineering", "Science", "Mathematics"]', "tuition_min": 730, "tuition_max": 730, "currency": "CHF", "living_cost_estimate": 22000, "min_gpa": 3.5, "toefl_required": True, "website": "https://ethz.ch", "description": "World-leading technical university."},
    {"name": "University of Barcelona", "country": "Spain", "city": "Barcelona", "ranking": 164, "acceptance_rate": 0.45, "programs_offered": '["Arts", "Science", "Health", "Law"]', "tuition_min": 1500, "tuition_max": 5000, "currency": "EUR", "living_cost_estimate": 10000, "min_gpa": 3.0, "website": "https://www.ub.edu", "description": "Major public university in Spain."},
    {"name": "Sapienza University of Rome", "country": "Italy", "city": "Rome", "ranking": 134, "acceptance_rate": 0.50, "programs_offered": '["Engineering", "Medicine", "Law", "Arts"]', "tuition_min": 1000, "tuition_max": 3500, "currency": "EUR", "living_cost_estimate": 12000, "min_gpa": 3.0, "website": "https://www.uniroma1.it", "description": "Largest university in Europe."},
    {"name": "University of São Paulo", "country": "Brazil", "city": "São Paulo", "ranking": 114, "acceptance_rate": 0.15, "programs_offered": '["Engineering", "Medicine", "Law", "Arts"]', "tuition_min": 0, "tuition_max": 0, "currency": "BRL", "living_cost_estimate": 15000, "min_gpa": 3.2, "website": "https://www5.usp.br", "description": "Top university in Latin America."},
    {"name": "UNAM", "country": "Mexico", "city": "Mexico City", "ranking": 104, "acceptance_rate": 0.08, "programs_offered": '["Science", "Engineering", "Humanities", "Medicine"]', "tuition_min": 0, "tuition_max": 500, "currency": "MXN", "living_cost_estimate": 80000, "min_gpa": 3.0, "website": "https://www.unam.mx", "description": "National autonomous university of Mexico."},
    {"name": "University of Cape Town", "country": "South Africa", "city": "Cape Town", "ranking": 109, "acceptance_rate": 0.42, "programs_offered": '["Commerce", "Engineering", "Law", "Science"]', "tuition_min": 50000, "tuition_max": 120000, "currency": "ZAR", "living_cost_estimate": 80000, "min_gpa": 3.2, "website": "https://www.uct.ac.za", "description": "Top university in Africa."},
    {"name": "Khalifa University", "country": "United Arab Emirates", "city": "Abu Dhabi", "ranking": 230, "acceptance_rate": 0.35, "programs_offered": '["Engineering", "Science", "Medicine"]', "tuition_min": 0, "tuition_max": 0, "currency": "AED", "living_cost_estimate": 50000, "min_gpa": 3.0, "website": "https://www.ku.ac.ae", "description": "Leading research university in UAE."},
    {"name": "University of Malaya", "country": "Malaysia", "city": "Kuala Lumpur", "ranking": 65, "acceptance_rate": 0.30, "programs_offered": '["Engineering", "Business", "Law", "Science"]', "tuition_min": 15000, "tuition_max": 40000, "currency": "MYR", "living_cost_estimate": 25000, "min_gpa": 3.0, "website": "https://www.um.edu.my", "description": "Premier university in Malaysia."},
    {"name": "Chulalongkorn University", "country": "Thailand", "city": "Bangkok", "ranking": 244, "acceptance_rate": 0.25, "programs_offered": '["Engineering", "Business", "Arts", "Medicine"]', "tuition_min": 50000, "tuition_max": 150000, "currency": "THB", "living_cost_estimate": 120000, "min_gpa": 3.0, "website": "https://www.chula.ac.th", "description": "Top university in Thailand."},
    {"name": "University of Auckland", "country": "New Zealand", "city": "Auckland", "ranking": 68, "acceptance_rate": 0.45, "programs_offered": '["Engineering", "Business", "Science", "Arts"]', "tuition_min": 35000, "tuition_max": 50000, "currency": "NZD", "living_cost_estimate": 20000, "min_gpa": 3.0, "website": "https://www.auckland.ac.nz", "description": "Largest university in New Zealand."},
    {"name": "Cairo University", "country": "Egypt", "city": "Giza", "ranking": 561, "acceptance_rate": 0.40, "programs_offered": '["Engineering", "Medicine", "Law", "Commerce"]', "tuition_min": 5000, "tuition_max": 25000, "currency": "EGP", "living_cost_estimate": 60000, "min_gpa": 3.0, "website": "https://cu.edu.eg", "description": "Leading university in Egypt."},
    {"name": "University of Lagos", "country": "Nigeria", "city": "Lagos", "ranking": 801, "acceptance_rate": 0.20, "programs_offered": '["Engineering", "Law", "Business", "Arts"]', "tuition_min": 50000, "tuition_max": 200000, "currency": "NGN", "living_cost_estimate": 500000, "min_gpa": 3.0, "website": "https://unilag.edu.ng", "description": "Top university in Nigeria."},
    {"name": "Technical University of Berlin", "country": "Germany", "city": "Berlin", "ranking": 154, "acceptance_rate": 0.35, "programs_offered": '["Engineering", "Science", "Economics"]', "tuition_min": 0, "tuition_max": 0, "currency": "EUR", "living_cost_estimate": 11000, "min_gpa": 3.0, "website": "https://www.tu.berlin", "description": "Major technical university in Germany."},
    {"name": "Lund University", "country": "Sweden", "city": "Lund", "ranking": 95, "acceptance_rate": 0.30, "programs_offered": '["Engineering", "Science", "Law", "Medicine"]', "tuition_min": 90000, "tuition_max": 140000, "currency": "SEK", "living_cost_estimate": 96000, "min_gpa": 3.2, "website": "https://www.lunduniversity.lu.se", "description": "Leading university in Scandinavia."},
    # --- Country-wise: more universities per country ---
    # United States (more)
    {"name": "Columbia University", "country": "United States", "city": "New York", "ranking": 12, "acceptance_rate": 0.06, "programs_offered": '["Business", "Law", "Engineering", "Arts"]', "tuition_min": 63530, "tuition_max": 63530, "currency": "USD", "living_cost_estimate": 28000, "min_gpa": 3.7, "toefl_required": True, "gre_required": True, "website": "https://www.columbia.edu", "description": "Ivy League university in New York City."},
    {"name": "New York University", "country": "United States", "city": "New York", "ranking": 38, "acceptance_rate": 0.13, "programs_offered": '["Business", "Law", "Arts", "Engineering"]', "tuition_min": 56500, "tuition_max": 56500, "currency": "USD", "living_cost_estimate": 25000, "min_gpa": 3.6, "toefl_required": True, "website": "https://www.nyu.edu", "description": "Global university with NYC campus."},
    {"name": "University of California Berkeley", "country": "United States", "city": "Berkeley", "ranking": 10, "acceptance_rate": 0.15, "programs_offered": '["Engineering", "Business", "Law", "Science"]', "tuition_min": 44000, "tuition_max": 44000, "currency": "USD", "living_cost_estimate": 22000, "min_gpa": 3.7, "toefl_required": True, "gre_required": True, "website": "https://www.berkeley.edu", "description": "Top public research university."},
    {"name": "UCLA", "country": "United States", "city": "Los Angeles", "ranking": 29, "acceptance_rate": 0.11, "programs_offered": '["Engineering", "Business", "Law", "Arts"]', "tuition_min": 43000, "tuition_max": 43000, "currency": "USD", "living_cost_estimate": 24000, "min_gpa": 3.6, "toefl_required": True, "website": "https://www.ucla.edu", "description": "Leading public university in California."},
    {"name": "University of Michigan", "country": "United States", "city": "Ann Arbor", "ranking": 33, "acceptance_rate": 0.20, "programs_offered": '["Engineering", "Business", "Law", "Medicine"]', "tuition_min": 52000, "tuition_max": 52000, "currency": "USD", "living_cost_estimate": 16000, "min_gpa": 3.5, "toefl_required": True, "website": "https://umich.edu", "description": "Top public research university."},
    {"name": "Georgia Institute of Technology", "country": "United States", "city": "Atlanta", "ranking": 51, "acceptance_rate": 0.18, "programs_offered": '["Engineering", "Computing", "Sciences"]', "tuition_min": 32000, "tuition_max": 47000, "currency": "USD", "living_cost_estimate": 15000, "min_gpa": 3.5, "toefl_required": True, "gre_required": True, "website": "https://www.gatech.edu", "description": "Leading technology and engineering school."},
    # United Kingdom (more)
    {"name": "Imperial College London", "country": "United Kingdom", "city": "London", "ranking": 6, "acceptance_rate": 0.14, "programs_offered": '["Engineering", "Medicine", "Business", "Science"]', "tuition_min": 35000, "tuition_max": 45000, "currency": "GBP", "living_cost_estimate": 18000, "min_gpa": 3.5, "toefl_required": True, "ielts_required": True, "website": "https://www.imperial.ac.uk", "description": "World-leading science and engineering."},
    {"name": "London School of Economics", "country": "United Kingdom", "city": "London", "ranking": 45, "acceptance_rate": 0.09, "programs_offered": '["Economics", "Law", "Politics", "Business"]', "tuition_min": 24000, "tuition_max": 28000, "currency": "GBP", "living_cost_estimate": 18000, "min_gpa": 3.5, "ielts_required": True, "website": "https://www.lse.ac.uk", "description": "Leading social sciences university."},
    {"name": "University of Edinburgh", "country": "United Kingdom", "city": "Edinburgh", "ranking": 22, "acceptance_rate": 0.40, "programs_offered": '["Law", "Medicine", "Engineering", "Arts"]', "tuition_min": 23000, "tuition_max": 32000, "currency": "GBP", "living_cost_estimate": 14000, "min_gpa": 3.3, "ielts_required": True, "website": "https://www.ed.ac.uk", "description": "Historic research university in Scotland."},
    {"name": "University of Manchester", "country": "United Kingdom", "city": "Manchester", "ranking": 32, "acceptance_rate": 0.59, "programs_offered": '["Engineering", "Business", "Law", "Science"]', "tuition_min": 23000, "tuition_max": 28000, "currency": "GBP", "living_cost_estimate": 12000, "min_gpa": 3.2, "ielts_required": True, "website": "https://www.manchester.ac.uk", "description": "Large research-intensive university."},
    {"name": "King's College London", "country": "United Kingdom", "city": "London", "ranking": 40, "acceptance_rate": 0.13, "programs_offered": '["Law", "Medicine", "Humanities", "Science"]', "tuition_min": 24000, "tuition_max": 35000, "currency": "GBP", "living_cost_estimate": 17000, "min_gpa": 3.4, "ielts_required": True, "website": "https://www.kcl.ac.uk", "description": "Leading London university."},
    # Canada (more)
    {"name": "McGill University", "country": "Canada", "city": "Montreal", "ranking": 30, "acceptance_rate": 0.46, "programs_offered": '["Medicine", "Law", "Engineering", "Arts"]', "tuition_min": 18000, "tuition_max": 50000, "currency": "CAD", "living_cost_estimate": 15000, "min_gpa": 3.3, "toefl_required": True, "website": "https://www.mcgill.ca", "description": "Top university in Quebec."},
    {"name": "McMaster University", "country": "Canada", "city": "Hamilton", "ranking": 85, "acceptance_rate": 0.58, "programs_offered": '["Engineering", "Health Sciences", "Business", "Science"]', "tuition_min": 28000, "tuition_max": 45000, "currency": "CAD", "living_cost_estimate": 12000, "min_gpa": 3.2, "toefl_required": True, "website": "https://www.mcmaster.ca", "description": "Research-intensive university."},
    {"name": "University of Waterloo", "country": "Canada", "city": "Waterloo", "ranking": 112, "acceptance_rate": 0.53, "programs_offered": '["Engineering", "Computer Science", "Math", "Science"]', "tuition_min": 35000, "tuition_max": 55000, "currency": "CAD", "living_cost_estimate": 14000, "min_gpa": 3.3, "toefl_required": True, "website": "https://uwaterloo.ca", "description": "Strong in tech and co-op programs."},
    # Australia (more)
    {"name": "Monash University", "country": "Australia", "city": "Melbourne", "ranking": 42, "acceptance_rate": 0.40, "programs_offered": '["Engineering", "Business", "Law", "Medicine"]', "tuition_min": 45000, "tuition_max": 55000, "currency": "AUD", "living_cost_estimate": 22000, "min_gpa": 3.0, "ielts_required": True, "website": "https://www.monash.edu", "description": "Largest university in Australia."},
    {"name": "UNSW Sydney", "country": "Australia", "city": "Sydney", "ranking": 19, "acceptance_rate": 0.25, "programs_offered": '["Engineering", "Business", "Law", "Science"]', "tuition_min": 48000, "tuition_max": 52000, "currency": "AUD", "living_cost_estimate": 24000, "min_gpa": 3.2, "ielts_required": True, "website": "https://www.unsw.edu.au", "description": "Leading research university."},
    {"name": "University of Queensland", "country": "Australia", "city": "Brisbane", "ranking": 43, "acceptance_rate": 0.40, "programs_offered": '["Engineering", "Business", "Science", "Health"]', "tuition_min": 43000, "tuition_max": 50000, "currency": "AUD", "living_cost_estimate": 20000, "min_gpa": 3.0, "ielts_required": True, "website": "https://www.uq.edu.au", "description": "Top university in Queensland."},
    {"name": "Australian National University", "country": "Australia", "city": "Canberra", "ranking": 34, "acceptance_rate": 0.35, "programs_offered": '["Law", "Politics", "Science", "Engineering"]', "tuition_min": 45000, "tuition_max": 52000, "currency": "AUD", "living_cost_estimate": 20000, "min_gpa": 3.2, "ielts_required": True, "website": "https://www.anu.edu.au", "description": "National research university."},
    # India (more)
    {"name": "Indian Institute of Technology Kanpur", "country": "India", "city": "Kanpur", "ranking": 278, "acceptance_rate": 0.02, "programs_offered": '["Engineering", "Science", "Management"]', "tuition_min": 220000, "tuition_max": 400000, "currency": "INR", "living_cost_estimate": 80000, "min_gpa": 3.4, "toefl_required": True, "website": "https://www.iitk.ac.in", "description": "Premier IIT for engineering."},
    {"name": "Indian Institute of Science", "country": "India", "city": "Bangalore", "ranking": 225, "acceptance_rate": 0.03, "programs_offered": '["Science", "Engineering", "Research"]', "tuition_min": 300000, "tuition_max": 450000, "currency": "INR", "living_cost_estimate": 120000, "min_gpa": 3.5, "website": "https://www.iisc.ac.in", "description": "Leading research institution."},
    {"name": "Jadavpur University", "country": "India", "city": "Kolkata", "ranking": 601, "acceptance_rate": 0.10, "programs_offered": '["Engineering", "Arts", "Science"]', "tuition_min": 50000, "tuition_max": 150000, "currency": "INR", "living_cost_estimate": 80000, "min_gpa": 3.0, "website": "https://www.jaduniv.edu.in", "description": "Leading state university in West Bengal."},
    {"name": "Anna University", "country": "India", "city": "Chennai", "ranking": 427, "acceptance_rate": 0.15, "programs_offered": '["Engineering", "Technology", "Architecture"]', "tuition_min": 50000, "tuition_max": 200000, "currency": "INR", "living_cost_estimate": 90000, "min_gpa": 3.0, "website": "https://www.annauniv.edu", "description": "Premier technical university in Tamil Nadu."},
    # Japan (more)
    {"name": "Osaka University", "country": "Japan", "city": "Osaka", "ranking": 80, "acceptance_rate": 0.33, "programs_offered": '["Engineering", "Medicine", "Science", "Law"]', "tuition_min": 535800, "tuition_max": 535800, "currency": "JPY", "living_cost_estimate": 1100000, "min_gpa": 3.1, "toefl_required": True, "website": "https://www.osaka-u.ac.jp", "description": "Major national university in Japan."},
    {"name": "Tohoku University", "country": "Japan", "city": "Sendai", "ranking": 99, "acceptance_rate": 0.35, "programs_offered": '["Engineering", "Science", "Medicine"]', "tuition_min": 535800, "tuition_max": 535800, "currency": "JPY", "living_cost_estimate": 900000, "min_gpa": 3.0, "website": "https://www.tohoku.ac.jp", "description": "Leading research university."},
    {"name": "Waseda University", "country": "Japan", "city": "Tokyo", "ranking": 199, "acceptance_rate": 0.20, "programs_offered": '["Political Science", "Economics", "Law", "Engineering"]', "tuition_min": 900000, "tuition_max": 1500000, "currency": "JPY", "living_cost_estimate": 1300000, "min_gpa": 3.2, "website": "https://www.waseda.jp", "description": "Top private university in Japan."},
    # China (more)
    {"name": "Fudan University", "country": "China", "city": "Shanghai", "ranking": 44, "acceptance_rate": 0.05, "programs_offered": '["Medicine", "Law", "Journalism", "Science"]', "tuition_min": 26000, "tuition_max": 33000, "currency": "CNY", "living_cost_estimate": 18000, "min_gpa": 3.4, "website": "https://www.fudan.edu.cn", "description": "Leading university in Shanghai."},
    {"name": "Shanghai Jiao Tong University", "country": "China", "city": "Shanghai", "ranking": 52, "acceptance_rate": 0.05, "programs_offered": '["Engineering", "Medicine", "Business", "Science"]', "tuition_min": 26000, "tuition_max": 40000, "currency": "CNY", "living_cost_estimate": 20000, "min_gpa": 3.4, "website": "https://en.sjtu.edu.cn", "description": "Top engineering and research university."},
    {"name": "Zhejiang University", "country": "China", "city": "Hangzhou", "ranking": 42, "acceptance_rate": 0.04, "programs_offered": '["Engineering", "Science", "Medicine", "Agriculture"]', "tuition_min": 25000, "tuition_max": 35000, "currency": "CNY", "living_cost_estimate": 15000, "min_gpa": 3.4, "website": "https://www.zju.edu.cn", "description": "Comprehensive research university."},
    # South Korea (more)
    {"name": "KAIST", "country": "South Korea", "city": "Daejeon", "ranking": 56, "acceptance_rate": 0.20, "programs_offered": '["Engineering", "Science", "Business"]', "tuition_min": 0, "tuition_max": 5000000, "currency": "KRW", "living_cost_estimate": 10000000, "min_gpa": 3.5, "toefl_required": True, "website": "https://www.kaist.ac.kr", "description": "Top science and technology institute."},
    {"name": "Yonsei University", "country": "South Korea", "city": "Seoul", "ranking": 76, "acceptance_rate": 0.25, "programs_offered": '["Business", "Law", "Medicine", "Engineering"]', "tuition_min": 6000000, "tuition_max": 10000000, "currency": "KRW", "living_cost_estimate": 12000000, "min_gpa": 3.2, "website": "https://www.yonsei.ac.kr", "description": "Leading private university."},
    {"name": "Korea University", "country": "South Korea", "city": "Seoul", "ranking": 74, "acceptance_rate": 0.25, "programs_offered": '["Law", "Business", "Medicine", "Engineering"]', "tuition_min": 5500000, "tuition_max": 9500000, "currency": "KRW", "living_cost_estimate": 11000000, "min_gpa": 3.2, "website": "https://www.korea.ac.kr", "description": "Top private research university."},
    # Germany (more)
    {"name": "Ludwig Maximilian University of Munich", "country": "Germany", "city": "Munich", "ranking": 59, "acceptance_rate": 0.30, "programs_offered": '["Law", "Medicine", "Science", "Humanities"]', "tuition_min": 0, "tuition_max": 0, "currency": "EUR", "living_cost_estimate": 12000, "min_gpa": 3.0, "website": "https://www.lmu.de", "description": "Leading university in Germany."},
    {"name": "Heidelberg University", "country": "Germany", "city": "Heidelberg", "ranking": 87, "acceptance_rate": 0.28, "programs_offered": '["Medicine", "Law", "Science", "Humanities"]', "tuition_min": 0, "tuition_max": 0, "currency": "EUR", "living_cost_estimate": 11000, "min_gpa": 3.0, "website": "https://www.uni-heidelberg.de", "description": "Oldest university in Germany."},
    {"name": "RWTH Aachen University", "country": "Germany", "city": "Aachen", "ranking": 106, "acceptance_rate": 0.35, "programs_offered": '["Engineering", "Science", "Medicine"]', "tuition_min": 0, "tuition_max": 0, "currency": "EUR", "living_cost_estimate": 10000, "min_gpa": 3.0, "website": "https://www.rwth-aachen.de", "description": "Largest technical university in Germany."},
    # France (more)
    {"name": "PSL University", "country": "France", "city": "Paris", "ranking": 24, "acceptance_rate": 0.12, "programs_offered": '["Science", "Engineering", "Arts", "Humanities"]', "tuition_min": 243, "tuition_max": 3800, "currency": "EUR", "living_cost_estimate": 14000, "min_gpa": 3.3, "website": "https://www.psl.eu", "description": "Selective research university in Paris."},
    {"name": "Sciences Po", "country": "France", "city": "Paris", "ranking": 242, "acceptance_rate": 0.10, "programs_offered": '["Political Science", "Law", "Economics", "International Affairs"]', "tuition_min": 10000, "tuition_max": 14000, "currency": "EUR", "living_cost_estimate": 15000, "min_gpa": 3.4, "website": "https://www.sciencespo.fr", "description": "Leading social sciences and policy school."},
    {"name": "École Polytechnique", "country": "France", "city": "Palaiseau", "ranking": 48, "acceptance_rate": 0.08, "programs_offered": '["Engineering", "Science", "Economics"]', "tuition_min": 0, "tuition_max": 15000, "currency": "EUR", "living_cost_estimate": 12000, "min_gpa": 3.6, "website": "https://www.polytechnique.edu", "description": "Top engineering grande école."},
    # Netherlands (more)
    {"name": "Delft University of Technology", "country": "Netherlands", "city": "Delft", "ranking": 47, "acceptance_rate": 0.35, "programs_offered": '["Engineering", "Architecture", "Science"]', "tuition_min": 15000, "tuition_max": 20000, "currency": "EUR", "living_cost_estimate": 12000, "min_gpa": 3.2, "ielts_required": True, "website": "https://www.tudelft.nl", "description": "Largest technical university in Netherlands."},
    {"name": "Utrecht University", "country": "Netherlands", "city": "Utrecht", "ranking": 66, "acceptance_rate": 0.45, "programs_offered": '["Science", "Law", "Humanities", "Medicine"]', "tuition_min": 11000, "tuition_max": 16000, "currency": "EUR", "living_cost_estimate": 11000, "min_gpa": 3.0, "website": "https://www.uu.nl", "description": "Leading research university."},
    {"name": "Erasmus University Rotterdam", "country": "Netherlands", "city": "Rotterdam", "ranking": 176, "acceptance_rate": 0.40, "programs_offered": '["Business", "Economics", "Law", "Medicine"]', "tuition_min": 10000, "tuition_max": 15000, "currency": "EUR", "living_cost_estimate": 12000, "min_gpa": 3.0, "website": "https://www.eur.nl", "description": "Strong in business and economics."},
    # Spain (more)
    {"name": "Autonomous University of Madrid", "country": "Spain", "city": "Madrid", "ranking": 199, "acceptance_rate": 0.40, "programs_offered": '["Science", "Law", "Medicine", "Humanities"]', "tuition_min": 1500, "tuition_max": 4500, "currency": "EUR", "living_cost_estimate": 11000, "min_gpa": 3.0, "website": "https://www.uam.es", "description": "Major public university in Madrid."},
    {"name": "Complutense University of Madrid", "country": "Spain", "city": "Madrid", "ranking": 206, "acceptance_rate": 0.50, "programs_offered": '["Law", "Medicine", "Humanities", "Science"]', "tuition_min": 1200, "tuition_max": 4000, "currency": "EUR", "living_cost_estimate": 12000, "min_gpa": 3.0, "website": "https://www.ucm.es", "description": "One of the oldest universities in Spain."},
    # Italy (more)
    {"name": "Politecnico di Milano", "country": "Italy", "city": "Milan", "ranking": 123, "acceptance_rate": 0.35, "programs_offered": '["Engineering", "Architecture", "Design"]', "tuition_min": 900, "tuition_max": 4000, "currency": "EUR", "living_cost_estimate": 12000, "min_gpa": 3.2, "website": "https://www.polimi.it", "description": "Largest technical university in Italy."},
    {"name": "University of Bologna", "country": "Italy", "city": "Bologna", "ranking": 154, "acceptance_rate": 0.55, "programs_offered": '["Law", "Medicine", "Engineering", "Arts"]', "tuition_min": 900, "tuition_max": 3500, "currency": "EUR", "living_cost_estimate": 10000, "min_gpa": 3.0, "website": "https://www.unibo.it", "description": "Oldest university in the Western world."},
    # Ireland
    {"name": "Trinity College Dublin", "country": "Ireland", "city": "Dublin", "ranking": 81, "acceptance_rate": 0.25, "programs_offered": '["Law", "Medicine", "Engineering", "Arts"]', "tuition_min": 20000, "tuition_max": 27000, "currency": "EUR", "living_cost_estimate": 14000, "min_gpa": 3.3, "ielts_required": True, "website": "https://www.tcd.ie", "description": "Historic university in Ireland."},
    {"name": "University College Dublin", "country": "Ireland", "city": "Dublin", "ranking": 181, "acceptance_rate": 0.35, "programs_offered": '["Business", "Law", "Engineering", "Science"]', "tuition_min": 18000, "tuition_max": 25000, "currency": "EUR", "living_cost_estimate": 13000, "min_gpa": 3.0, "website": "https://www.ucd.ie", "description": "Largest university in Ireland."},
    # Belgium
    {"name": "KU Leuven", "country": "Belgium", "city": "Leuven", "ranking": 61, "acceptance_rate": 0.45, "programs_offered": '["Engineering", "Law", "Medicine", "Humanities"]', "tuition_min": 900, "tuition_max": 6000, "currency": "EUR", "living_cost_estimate": 11000, "min_gpa": 3.0, "website": "https://www.kuleuven.be", "description": "Largest university in Belgium."},
    # Sweden (more)
    {"name": "KTH Royal Institute of Technology", "country": "Sweden", "city": "Stockholm", "ranking": 89, "acceptance_rate": 0.28, "programs_offered": '["Engineering", "Science", "Architecture"]', "tuition_min": 145000, "tuition_max": 155000, "currency": "SEK", "living_cost_estimate": 100000, "min_gpa": 3.2, "website": "https://www.kth.se", "description": "Largest technical university in Sweden."},
    {"name": "Uppsala University", "country": "Sweden", "city": "Uppsala", "ranking": 105, "acceptance_rate": 0.35, "programs_offered": '["Law", "Medicine", "Science", "Humanities"]', "tuition_min": 90000, "tuition_max": 130000, "currency": "SEK", "living_cost_estimate": 90000, "min_gpa": 3.0, "website": "https://www.uu.se", "description": "Oldest university in Scandinavia."},
    # Norway
    {"name": "University of Oslo", "country": "Norway", "city": "Oslo", "ranking": 104, "acceptance_rate": 0.40, "programs_offered": '["Law", "Medicine", "Humanities", "Science"]', "tuition_min": 0, "tuition_max": 0, "currency": "NOK", "living_cost_estimate": 120000, "min_gpa": 3.0, "website": "https://www.uio.no", "description": "Oldest university in Norway."},
    {"name": "Norwegian University of Science and Technology", "country": "Norway", "city": "Trondheim", "ranking": 119, "acceptance_rate": 0.45, "programs_offered": '["Engineering", "Science", "Architecture"]', "tuition_min": 0, "tuition_max": 0, "currency": "NOK", "living_cost_estimate": 110000, "min_gpa": 3.0, "website": "https://www.ntnu.no", "description": "Largest technical university in Norway."},
    # Denmark
    {"name": "University of Copenhagen", "country": "Denmark", "city": "Copenhagen", "ranking": 42, "acceptance_rate": 0.35, "programs_offered": '["Law", "Medicine", "Science", "Humanities"]', "tuition_min": 0, "tuition_max": 15000, "currency": "DKK", "living_cost_estimate": 120000, "min_gpa": 3.2, "website": "https://www.ku.dk", "description": "Largest university in Denmark."},
    {"name": "Technical University of Denmark", "country": "Denmark", "city": "Lyngby", "ranking": 103, "acceptance_rate": 0.40, "programs_offered": '["Engineering", "Science", "Technology"]', "tuition_min": 0, "tuition_max": 15000, "currency": "DKK", "living_cost_estimate": 110000, "min_gpa": 3.0, "website": "https://www.dtu.dk", "description": "Leading technical university."},
    # Finland
    {"name": "University of Helsinki", "country": "Finland", "city": "Helsinki", "ranking": 106, "acceptance_rate": 0.35, "programs_offered": '["Law", "Medicine", "Science", "Humanities"]', "tuition_min": 0, "tuition_max": 18000, "currency": "EUR", "living_cost_estimate": 12000, "min_gpa": 3.0, "website": "https://www.helsinki.fi", "description": "Largest university in Finland."},
    {"name": "Aalto University", "country": "Finland", "city": "Espoo", "ranking": 116, "acceptance_rate": 0.25, "programs_offered": '["Engineering", "Business", "Art and Design"]', "tuition_min": 0, "tuition_max": 15000, "currency": "EUR", "living_cost_estimate": 11000, "min_gpa": 3.2, "website": "https://www.aalto.fi", "description": "Leading university in technology and design."},
    # Singapore (more)
    {"name": "Nanyang Technological University", "country": "Singapore", "city": "Singapore", "ranking": 26, "acceptance_rate": 0.25, "programs_offered": '["Engineering", "Business", "Science", "Humanities"]', "tuition_min": 35000, "tuition_max": 50000, "currency": "SGD", "living_cost_estimate": 18000, "min_gpa": 3.4, "website": "https://www.ntu.edu.sg", "description": "Young research-intensive university."},
    {"name": "Singapore Management University", "country": "Singapore", "city": "Singapore", "ranking": 429, "acceptance_rate": 0.15, "programs_offered": '["Business", "Law", "Economics", "Computing"]', "tuition_min": 40000, "tuition_max": 50000, "currency": "SGD", "living_cost_estimate": 20000, "min_gpa": 3.3, "website": "https://www.smu.edu.sg", "description": "Leading business and law school."},
    # Hong Kong
    {"name": "University of Hong Kong", "country": "Hong Kong", "city": "Hong Kong", "ranking": 26, "acceptance_rate": 0.10, "programs_offered": '["Law", "Medicine", "Engineering", "Business"]', "tuition_min": 180000, "tuition_max": 420000, "currency": "HKD", "living_cost_estimate": 120000, "min_gpa": 3.5, "website": "https://www.hku.hk", "description": "Oldest university in Hong Kong."},
    {"name": "Chinese University of Hong Kong", "country": "Hong Kong", "city": "Hong Kong", "ranking": 47, "acceptance_rate": 0.12, "programs_offered": '["Business", "Medicine", "Engineering", "Law"]', "tuition_min": 145000, "tuition_max": 420000, "currency": "HKD", "living_cost_estimate": 110000, "min_gpa": 3.4, "website": "https://www.cuhk.edu.hk", "description": "Comprehensive research university."},
    {"name": "Hong Kong University of Science and Technology", "country": "Hong Kong", "city": "Hong Kong", "ranking": 60, "acceptance_rate": 0.15, "programs_offered": '["Engineering", "Business", "Science"]', "tuition_min": 145000, "tuition_max": 420000, "currency": "HKD", "living_cost_estimate": 120000, "min_gpa": 3.4, "website": "https://www.ust.hk", "description": "Leading science and technology university."},
    # Taiwan
    {"name": "National Taiwan University", "country": "Taiwan", "city": "Taipei", "ranking": 68, "acceptance_rate": 0.20, "programs_offered": '["Engineering", "Law", "Medicine", "Science"]', "tuition_min": 100000, "tuition_max": 130000, "currency": "TWD", "living_cost_estimate": 120000, "min_gpa": 3.3, "website": "https://www.ntu.edu.tw", "description": "Top university in Taiwan."},
    {"name": "National Tsing Hua University", "country": "Taiwan", "city": "Hsinchu", "ranking": 168, "acceptance_rate": 0.25, "programs_offered": '["Engineering", "Science", "Nuclear Science"]', "tuition_min": 80000, "tuition_max": 120000, "currency": "TWD", "living_cost_estimate": 80000, "min_gpa": 3.2, "website": "https://www.nthu.edu.tw", "description": "Leading science and engineering university."},
    # Malaysia (more)
    {"name": "Universiti Kebangsaan Malaysia", "country": "Malaysia", "city": "Bangi", "ranking": 159, "acceptance_rate": 0.35, "programs_offered": '["Engineering", "Law", "Medicine", "Science"]', "tuition_min": 12000, "tuition_max": 35000, "currency": "MYR", "living_cost_estimate": 22000, "min_gpa": 3.0, "website": "https://www.ukm.my", "description": "National university of Malaysia."},
    {"name": "Universiti Putra Malaysia", "country": "Malaysia", "city": "Serdang", "ranking": 143, "acceptance_rate": 0.40, "programs_offered": '["Agriculture", "Engineering", "Medicine", "Science"]', "tuition_min": 10000, "tuition_max": 30000, "currency": "MYR", "living_cost_estimate": 20000, "min_gpa": 3.0, "website": "https://www.upm.edu.my", "description": "Leading agriculture and research university."},
    # Thailand (more)
    {"name": "Mahidol University", "country": "Thailand", "city": "Bangkok", "ranking": 382, "acceptance_rate": 0.30, "programs_offered": '["Medicine", "Engineering", "Science", "Nursing"]', "tuition_min": 80000, "tuition_max": 200000, "currency": "THB", "living_cost_estimate": 100000, "min_gpa": 3.0, "website": "https://www.mahidol.ac.th", "description": "Leading medical and research university."},
    # Indonesia
    {"name": "University of Indonesia", "country": "Indonesia", "city": "Depok", "ranking": 237, "acceptance_rate": 0.25, "programs_offered": '["Medicine", "Law", "Engineering", "Economics"]', "tuition_min": 15000000, "tuition_max": 50000000, "currency": "IDR", "living_cost_estimate": 120000000, "min_gpa": 3.0, "website": "https://www.ui.ac.id", "description": "Oldest and leading university in Indonesia."},
    {"name": "Bandung Institute of Technology", "country": "Indonesia", "city": "Bandung", "ranking": 303, "acceptance_rate": 0.15, "programs_offered": '["Engineering", "Science", "Management"]', "tuition_min": 10000000, "tuition_max": 35000000, "currency": "IDR", "living_cost_estimate": 80000000, "min_gpa": 3.2, "website": "https://www.itb.ac.id", "description": "Top science and technology institute."},
    # Philippines
    {"name": "University of the Philippines", "country": "Philippines", "city": "Quezon City", "ranking": 399, "acceptance_rate": 0.15, "programs_offered": '["Law", "Medicine", "Engineering", "Arts"]', "tuition_min": 50000, "tuition_max": 100000, "currency": "PHP", "living_cost_estimate": 120000, "min_gpa": 3.0, "website": "https://www.up.edu.ph", "description": "National university of the Philippines."},
    {"name": "Ateneo de Manila University", "country": "Philippines", "city": "Quezon City", "ranking": 601, "acceptance_rate": 0.20, "programs_offered": '["Law", "Business", "Engineering", "Humanities"]', "tuition_min": 150000, "tuition_max": 250000, "currency": "PHP", "living_cost_estimate": 150000, "min_gpa": 3.0, "website": "https://www.ateneo.edu", "description": "Leading private university."},
    # Vietnam
    {"name": "Vietnam National University Hanoi", "country": "Vietnam", "city": "Hanoi", "ranking": 601, "acceptance_rate": 0.25, "programs_offered": '["Engineering", "Science", "Law", "Economics"]', "tuition_min": 30000000, "tuition_max": 80000000, "currency": "VND", "living_cost_estimate": 120000000, "min_gpa": 3.0, "website": "https://www.vnu.edu.vn", "description": "Leading national university in Vietnam."},
    # UAE (more)
    {"name": "American University of Dubai", "country": "United Arab Emirates", "city": "Dubai", "ranking": 601, "acceptance_rate": 0.65, "programs_offered": '["Business", "Engineering", "Architecture", "Law"]', "tuition_min": 80000, "tuition_max": 120000, "currency": "AED", "living_cost_estimate": 60000, "min_gpa": 3.0, "website": "https://www.aud.edu", "description": "American-style university in Dubai."},
    {"name": "University of Sharjah", "country": "United Arab Emirates", "city": "Sharjah", "ranking": 601, "acceptance_rate": 0.50, "programs_offered": '["Engineering", "Medicine", "Law", "Arts"]', "tuition_min": 40000, "tuition_max": 80000, "currency": "AED", "living_cost_estimate": 50000, "min_gpa": 3.0, "website": "https://www.sharjah.ac.ae", "description": "Comprehensive university in UAE."},
    # Saudi Arabia
    {"name": "King Saud University", "country": "Saudi Arabia", "city": "Riyadh", "ranking": 291, "acceptance_rate": 0.30, "programs_offered": '["Medicine", "Engineering", "Law", "Science"]', "tuition_min": 0, "tuition_max": 0, "currency": "SAR", "living_cost_estimate": 50000, "min_gpa": 3.0, "website": "https://www.ksu.edu.sa", "description": "Largest university in Saudi Arabia."},
    {"name": "King Abdullah University of Science and Technology", "country": "Saudi Arabia", "city": "Thuwal", "ranking": 109, "acceptance_rate": 0.08, "programs_offered": '["Engineering", "Science", "Bioscience"]', "tuition_min": 0, "tuition_max": 0, "currency": "SAR", "living_cost_estimate": 0, "min_gpa": 3.5, "website": "https://www.kaust.edu.sa", "description": "Graduate research university with full funding."},
    # Israel
    {"name": "Hebrew University of Jerusalem", "country": "Israel", "city": "Jerusalem", "ranking": 90, "acceptance_rate": 0.25, "programs_offered": '["Law", "Medicine", "Science", "Humanities"]', "tuition_min": 10000, "tuition_max": 15000, "currency": "USD", "living_cost_estimate": 12000, "min_gpa": 3.2, "website": "https://www.huji.ac.il", "description": "Leading research university in Israel."},
    {"name": "Technion", "country": "Israel", "city": "Haifa", "ranking": 83, "acceptance_rate": 0.30, "programs_offered": '["Engineering", "Science", "Medicine"]', "tuition_min": 10000, "tuition_max": 14000, "currency": "USD", "living_cost_estimate": 11000, "min_gpa": 3.2, "website": "https://www.technion.ac.il", "description": "Israel Institute of Technology."},
    # Turkey
    {"name": "Middle East Technical University", "country": "Turkey", "city": "Ankara", "ranking": 451, "acceptance_rate": 0.15, "programs_offered": '["Engineering", "Science", "Economics", "Architecture"]', "tuition_min": 0, "tuition_max": 5000, "currency": "TRY", "living_cost_estimate": 80000, "min_gpa": 3.2, "website": "https://www.metu.edu.tr", "description": "Leading technical university in Turkey."},
    {"name": "Bogazici University", "country": "Turkey", "city": "Istanbul", "ranking": 451, "acceptance_rate": 0.12, "programs_offered": '["Engineering", "Arts", "Science", "Economics"]', "tuition_min": 0, "tuition_max": 3000, "currency": "TRY", "living_cost_estimate": 90000, "min_gpa": 3.3, "website": "https://www.boun.edu.tr", "description": "Top public university in Istanbul."},
    # Russia
    {"name": "Lomonosov Moscow State University", "country": "Russia", "city": "Moscow", "ranking": 87, "acceptance_rate": 0.20, "programs_offered": '["Science", "Law", "Medicine", "Engineering"]', "tuition_min": 300000, "tuition_max": 600000, "currency": "RUB", "living_cost_estimate": 120000, "min_gpa": 3.2, "website": "https://www.msu.ru", "description": "Largest and most famous university in Russia."},
    {"name": "Saint Petersburg State University", "country": "Russia", "city": "Saint Petersburg", "ranking": 242, "acceptance_rate": 0.35, "programs_offered": '["Law", "Science", "Humanities", "Medicine"]', "tuition_min": 250000, "tuition_max": 500000, "currency": "RUB", "living_cost_estimate": 100000, "min_gpa": 3.0, "website": "https://english.spbu.ru", "description": "Oldest university in Russia."},
    # South Africa (more)
    {"name": "University of Witwatersrand", "country": "South Africa", "city": "Johannesburg", "ranking": 259, "acceptance_rate": 0.35, "programs_offered": '["Engineering", "Law", "Commerce", "Science"]', "tuition_min": 45000, "tuition_max": 100000, "currency": "ZAR", "living_cost_estimate": 90000, "min_gpa": 3.0, "website": "https://www.wits.ac.za", "description": "Leading research university."},
    {"name": "Stellenbosch University", "country": "South Africa", "city": "Stellenbosch", "ranking": 283, "acceptance_rate": 0.40, "programs_offered": '["Engineering", "Law", "Business", "Science"]', "tuition_min": 50000, "tuition_max": 95000, "currency": "ZAR", "living_cost_estimate": 70000, "min_gpa": 3.0, "website": "https://www.sun.ac.za", "description": "Historic university in the Western Cape."},
    # Nigeria (more)
    {"name": "Obafemi Awolowo University", "country": "Nigeria", "city": "Ile-Ife", "ranking": 801, "acceptance_rate": 0.18, "programs_offered": '["Engineering", "Law", "Arts", "Science"]', "tuition_min": 40000, "tuition_max": 150000, "currency": "NGN", "living_cost_estimate": 400000, "min_gpa": 3.0, "website": "https://www.oauife.edu.ng", "description": "Leading federal university."},
    # Kenya
    {"name": "University of Nairobi", "country": "Kenya", "city": "Nairobi", "ranking": 801, "acceptance_rate": 0.25, "programs_offered": '["Engineering", "Law", "Medicine", "Commerce"]', "tuition_min": 150000, "tuition_max": 400000, "currency": "KES", "living_cost_estimate": 300000, "min_gpa": 3.0, "website": "https://www.uonbi.ac.ke", "description": "Largest university in Kenya."},
    # Ghana
    {"name": "University of Ghana", "country": "Ghana", "city": "Accra", "ranking": 601, "acceptance_rate": 0.30, "programs_offered": '["Law", "Medicine", "Engineering", "Arts"]', "tuition_min": 5000, "tuition_max": 15000, "currency": "GHS", "living_cost_estimate": 25000, "min_gpa": 3.0, "website": "https://www.ug.edu.gh", "description": "Largest university in Ghana."},
    # Morocco
    {"name": "Mohammed V University", "country": "Morocco", "city": "Rabat", "ranking": 801, "acceptance_rate": 0.40, "programs_offered": '["Law", "Science", "Medicine", "Humanities"]', "tuition_min": 0, "tuition_max": 5000, "currency": "MAD", "living_cost_estimate": 60000, "min_gpa": 3.0, "website": "https://www.um5.ac.ma", "description": "Major public university in Morocco."},
    # Brazil (more)
    {"name": "State University of Campinas", "country": "Brazil", "city": "Campinas", "ranking": 176, "acceptance_rate": 0.12, "programs_offered": '["Engineering", "Science", "Medicine", "Agriculture"]', "tuition_min": 0, "tuition_max": 0, "currency": "BRL", "living_cost_estimate": 18000, "min_gpa": 3.2, "website": "https://www.unicamp.br", "description": "Top research university in Brazil."},
    {"name": "Federal University of Rio de Janeiro", "country": "Brazil", "city": "Rio de Janeiro", "ranking": 201, "acceptance_rate": 0.15, "programs_offered": '["Engineering", "Law", "Medicine", "Arts"]', "tuition_min": 0, "tuition_max": 0, "currency": "BRL", "living_cost_estimate": 15000, "min_gpa": 3.0, "website": "https://ufrj.br", "description": "Largest federal university in Brazil."},
    # Mexico (more)
    {"name": "Tecnológico de Monterrey", "country": "Mexico", "city": "Monterrey", "ranking": 158, "acceptance_rate": 0.35, "programs_offered": '["Engineering", "Business", "Law", "Medicine"]', "tuition_min": 150000, "tuition_max": 250000, "currency": "MXN", "living_cost_estimate": 100000, "min_gpa": 3.2, "website": "https://www.tec.mx", "description": "Leading private technological university."},
    # Argentina
    {"name": "University of Buenos Aires", "country": "Argentina", "city": "Buenos Aires", "ranking": 95, "acceptance_rate": 0.25, "programs_offered": '["Law", "Medicine", "Engineering", "Economics"]', "tuition_min": 0, "tuition_max": 0, "currency": "ARS", "living_cost_estimate": 120000, "min_gpa": 3.0, "website": "https://www.uba.ar", "description": "Largest university in Argentina."},
    # Chile
    {"name": "University of Chile", "country": "Chile", "city": "Santiago", "ranking": 206, "acceptance_rate": 0.30, "programs_offered": '["Law", "Medicine", "Engineering", "Science"]', "tuition_min": 5000, "tuition_max": 8000, "currency": "USD", "living_cost_estimate": 10000, "min_gpa": 3.0, "website": "https://www.uchile.cl", "description": "Oldest university in Chile."},
    {"name": "Pontificia Universidad Católica de Chile", "country": "Chile", "city": "Santiago", "ranking": 121, "acceptance_rate": 0.25, "programs_offered": '["Engineering", "Law", "Medicine", "Business"]', "tuition_min": 8000, "tuition_max": 12000, "currency": "USD", "living_cost_estimate": 11000, "min_gpa": 3.2, "website": "https://www.uc.cl", "description": "Top private university in Chile."},
    # Colombia
    {"name": "Universidad de los Andes", "country": "Colombia", "city": "Bogotá", "ranking": 227, "acceptance_rate": 0.25, "programs_offered": '["Engineering", "Law", "Economics", "Medicine"]', "tuition_min": 15000, "tuition_max": 25000, "currency": "USD", "living_cost_estimate": 8000, "min_gpa": 3.2, "website": "https://uniandes.edu.co", "description": "Leading private university in Colombia."},
    # New Zealand (more)
    {"name": "University of Otago", "country": "New Zealand", "city": "Dunedin", "ranking": 217, "acceptance_rate": 0.50, "programs_offered": '["Medicine", "Law", "Science", "Commerce"]', "tuition_min": 32000, "tuition_max": 48000, "currency": "NZD", "living_cost_estimate": 18000, "min_gpa": 3.0, "website": "https://www.otago.ac.nz", "description": "Oldest university in New Zealand."},
    {"name": "Victoria University of Wellington", "country": "New Zealand", "city": "Wellington", "ranking": 241, "acceptance_rate": 0.55, "programs_offered": '["Law", "Commerce", "Science", "Humanities"]', "tuition_min": 30000, "tuition_max": 45000, "currency": "NZD", "living_cost_estimate": 20000, "min_gpa": 3.0, "website": "https://www.wgtn.ac.nz", "description": "Leading university in the capital."},
    # Qatar
    {"name": "Qatar University", "country": "Qatar", "city": "Doha", "ranking": 224, "acceptance_rate": 0.35, "programs_offered": '["Engineering", "Law", "Medicine", "Business"]', "tuition_min": 0, "tuition_max": 0, "currency": "QAR", "living_cost_estimate": 0, "min_gpa": 3.0, "website": "https://www.qu.edu.qa", "description": "National university of Qatar."},
    # Portugal
    {"name": "University of Lisbon", "country": "Portugal", "city": "Lisbon", "ranking": 206, "acceptance_rate": 0.45, "programs_offered": '["Law", "Medicine", "Engineering", "Science"]', "tuition_min": 1000, "tuition_max": 7000, "currency": "EUR", "living_cost_estimate": 10000, "min_gpa": 3.0, "website": "https://www.ulisboa.pt", "description": "Largest university in Portugal."},
    # Poland
    {"name": "University of Warsaw", "country": "Poland", "city": "Warsaw", "ranking": 308, "acceptance_rate": 0.40, "programs_offered": '["Law", "Psychology", "Science", "Humanities"]', "tuition_min": 0, "tuition_max": 5000, "currency": "EUR", "living_cost_estimate": 9000, "min_gpa": 3.0, "website": "https://www.uw.edu.pl", "description": "Largest university in Poland."},
    # Greece
    {"name": "National Technical University of Athens", "country": "Greece", "city": "Athens", "ranking": 401, "acceptance_rate": 0.25, "programs_offered": '["Engineering", "Architecture", "Science"]', "tuition_min": 0, "tuition_max": 0, "currency": "EUR", "living_cost_estimate": 9000, "min_gpa": 3.0, "website": "https://www.ntua.gr", "description": "Leading technical university in Greece."},
    # ========== ADDITIONAL UNIVERSITIES BY COUNTRY ==========
    # United States (more)
    {"name": "Yale University", "country": "United States", "city": "New Haven", "ranking": 9, "acceptance_rate": 0.05, "programs_offered": '["Law", "Medicine", "Business", "Arts"]', "tuition_min": 59950, "tuition_max": 59950, "currency": "USD", "living_cost_estimate": 18000, "min_gpa": 3.8, "toefl_required": True, "gre_required": True, "website": "https://www.yale.edu", "description": "Ivy League university with world-class professional schools."},
    {"name": "Princeton University", "country": "United States", "city": "Princeton", "ranking": 11, "acceptance_rate": 0.04, "programs_offered": '["Engineering", "Public Policy", "Science", "Humanities"]', "tuition_min": 57410, "tuition_max": 57410, "currency": "USD", "living_cost_estimate": 18000, "min_gpa": 3.8, "toefl_required": True, "gre_required": True, "website": "https://www.princeton.edu", "description": "Ivy League research university."},
    {"name": "University of Pennsylvania", "country": "United States", "city": "Philadelphia", "ranking": 13, "acceptance_rate": 0.06, "programs_offered": '["Business", "Law", "Medicine", "Engineering"]', "tuition_min": 60000, "tuition_max": 60000, "currency": "USD", "living_cost_estimate": 20000, "min_gpa": 3.7, "toefl_required": True, "gre_required": True, "website": "https://www.upenn.edu", "description": "Ivy League with Wharton and strong professional schools."},
    {"name": "Cornell University", "country": "United States", "city": "Ithaca", "ranking": 20, "acceptance_rate": 0.08, "programs_offered": '["Engineering", "Hotel Management", "Agriculture", "Law"]', "tuition_min": 59000, "tuition_max": 59000, "currency": "USD", "living_cost_estimate": 16000, "min_gpa": 3.6, "toefl_required": True, "gre_required": True, "website": "https://www.cornell.edu", "description": "Ivy League with diverse programs."},
    {"name": "Duke University", "country": "United States", "city": "Durham", "ranking": 25, "acceptance_rate": 0.06, "programs_offered": '["Business", "Law", "Medicine", "Engineering"]', "tuition_min": 60435, "tuition_max": 60435, "currency": "USD", "living_cost_estimate": 18000, "min_gpa": 3.7, "toefl_required": True, "gre_required": True, "website": "https://duke.edu", "description": "Top private research university."},
    {"name": "Northwestern University", "country": "United States", "city": "Evanston", "ranking": 24, "acceptance_rate": 0.07, "programs_offered": '["Business", "Law", "Engineering", "Journalism"]', "tuition_min": 60968, "tuition_max": 60968, "currency": "USD", "living_cost_estimate": 18000, "min_gpa": 3.6, "toefl_required": True, "website": "https://www.northwestern.edu", "description": "Leading research university near Chicago."},
    {"name": "University of Chicago", "country": "United States", "city": "Chicago", "ranking": 15, "acceptance_rate": 0.05, "programs_offered": '["Business", "Law", "Economics", "Science"]', "tuition_min": 60000, "tuition_max": 60000, "currency": "USD", "living_cost_estimate": 20000, "min_gpa": 3.8, "toefl_required": True, "gre_required": True, "website": "https://www.uchicago.edu", "description": "Renowned for economics and research."},
    {"name": "Carnegie Mellon University", "country": "United States", "city": "Pittsburgh", "ranking": 28, "acceptance_rate": 0.11, "programs_offered": '["Computer Science", "Engineering", "Business", "Drama"]', "tuition_min": 59864, "tuition_max": 59864, "currency": "USD", "living_cost_estimate": 16000, "min_gpa": 3.6, "toefl_required": True, "gre_required": True, "website": "https://www.cmu.edu", "description": "Top in computer science and engineering."},
    {"name": "University of Texas at Austin", "country": "United States", "city": "Austin", "ranking": 58, "acceptance_rate": 0.31, "programs_offered": '["Engineering", "Business", "Law", "Communication"]', "tuition_min": 40000, "tuition_max": 40000, "currency": "USD", "living_cost_estimate": 15000, "min_gpa": 3.5, "toefl_required": True, "website": "https://www.utexas.edu", "description": "Flagship public university of Texas."},
    {"name": "University of Washington", "country": "United States", "city": "Seattle", "ranking": 26, "acceptance_rate": 0.53, "programs_offered": '["Computer Science", "Engineering", "Medicine", "Business"]', "tuition_min": 39000, "tuition_max": 39000, "currency": "USD", "living_cost_estimate": 18000, "min_gpa": 3.5, "toefl_required": True, "website": "https://www.washington.edu", "description": "Leading public research university."},
    {"name": "Ohio State University", "country": "United States", "city": "Columbus", "ranking": 89, "acceptance_rate": 0.53, "programs_offered": '["Engineering", "Business", "Law", "Medicine"]', "tuition_min": 35000, "tuition_max": 35000, "currency": "USD", "living_cost_estimate": 14000, "min_gpa": 3.3, "toefl_required": True, "website": "https://www.osu.edu", "description": "Large public research university."},
    {"name": "Penn State University", "country": "United States", "city": "State College", "ranking": 83, "acceptance_rate": 0.54, "programs_offered": '["Engineering", "Business", "Agriculture", "Liberal Arts"]', "tuition_min": 36000, "tuition_max": 36000, "currency": "USD", "living_cost_estimate": 14000, "min_gpa": 3.3, "toefl_required": True, "website": "https://www.psu.edu", "description": "Major public research university."},
    {"name": "University of Florida", "country": "United States", "city": "Gainesville", "ranking": 69, "acceptance_rate": 0.30, "programs_offered": '["Engineering", "Business", "Law", "Medicine"]', "tuition_min": 28658, "tuition_max": 28658, "currency": "USD", "living_cost_estimate": 12000, "min_gpa": 3.5, "toefl_required": True, "website": "https://www.ufl.edu", "description": "Flagship university of Florida."},
    {"name": "University of Wisconsin-Madison", "country": "United States", "city": "Madison", "ranking": 75, "acceptance_rate": 0.51, "programs_offered": '["Engineering", "Business", "Law", "Agriculture"]', "tuition_min": 38000, "tuition_max": 38000, "currency": "USD", "living_cost_estimate": 14000, "min_gpa": 3.4, "toefl_required": True, "website": "https://www.wisc.edu", "description": "Top public research university."},
    {"name": "Boston University", "country": "United States", "city": "Boston", "ranking": 70, "acceptance_rate": 0.19, "programs_offered": '["Engineering", "Business", "Law", "Communication"]', "tuition_min": 58200, "tuition_max": 58200, "currency": "USD", "living_cost_estimate": 20000, "min_gpa": 3.5, "toefl_required": True, "website": "https://www.bu.edu", "description": "Private research university in Boston."},
    {"name": "University of Illinois Urbana-Champaign", "country": "United States", "city": "Champaign", "ranking": 64, "acceptance_rate": 0.60, "programs_offered": '["Engineering", "Computer Science", "Business", "Agriculture"]', "tuition_min": 34000, "tuition_max": 34000, "currency": "USD", "living_cost_estimate": 14000, "min_gpa": 3.4, "toefl_required": True, "website": "https://illinois.edu", "description": "Strong engineering and CS programs."},
    {"name": "Rice University", "country": "United States", "city": "Houston", "ranking": 77, "acceptance_rate": 0.08, "programs_offered": '["Engineering", "Business", "Architecture", "Science"]', "tuition_min": 52000, "tuition_max": 52000, "currency": "USD", "living_cost_estimate": 16000, "min_gpa": 3.6, "toefl_required": True, "website": "https://www.rice.edu", "description": "Elite private research university."},
    {"name": "University of Southern California", "country": "United States", "city": "Los Angeles", "ranking": 80, "acceptance_rate": 0.12, "programs_offered": '["Business", "Engineering", "Cinema", "Law"]', "tuition_min": 60000, "tuition_max": 60000, "currency": "USD", "living_cost_estimate": 22000, "min_gpa": 3.6, "toefl_required": True, "website": "https://www.usc.edu", "description": "Private university with strong professional schools."},
    {"name": "North Carolina State University", "country": "United States", "city": "Raleigh", "ranking": 230, "acceptance_rate": 0.45, "programs_offered": '["Engineering", "Agriculture", "Textiles", "Sciences"]', "tuition_min": 30000, "tuition_max": 30000, "currency": "USD", "living_cost_estimate": 12000, "min_gpa": 3.3, "toefl_required": True, "website": "https://www.ncsu.edu", "description": "Leading STEM and agriculture university."},
    {"name": "University of Maryland", "country": "United States", "city": "College Park", "ranking": 57, "acceptance_rate": 0.44, "programs_offered": '["Engineering", "Business", "Computer Science", "Public Policy"]', "tuition_min": 36000, "tuition_max": 36000, "currency": "USD", "living_cost_estimate": 16000, "min_gpa": 3.5, "toefl_required": True, "website": "https://www.umd.edu", "description": "Flagship public university near Washington DC."},
    # United Kingdom (more)
    {"name": "University of Bristol", "country": "United Kingdom", "city": "Bristol", "ranking": 55, "acceptance_rate": 0.67, "programs_offered": '["Engineering", "Law", "Medicine", "Science"]', "tuition_min": 23000, "tuition_max": 28000, "currency": "GBP", "living_cost_estimate": 12000, "min_gpa": 3.3, "ielts_required": True, "website": "https://www.bristol.ac.uk", "description": "Red Brick research university."},
    {"name": "University of Warwick", "country": "United Kingdom", "city": "Coventry", "ranking": 69, "acceptance_rate": 0.14, "programs_offered": '["Business", "Engineering", "Law", "Mathematics"]', "tuition_min": 23000, "tuition_max": 29000, "currency": "GBP", "living_cost_estimate": 12000, "min_gpa": 3.4, "ielts_required": True, "website": "https://www.warwick.ac.uk", "description": "Leading research university."},
    {"name": "University of Glasgow", "country": "United Kingdom", "city": "Glasgow", "ranking": 76, "acceptance_rate": 0.74, "programs_offered": '["Law", "Medicine", "Engineering", "Arts"]', "tuition_min": 21000, "tuition_max": 27000, "currency": "GBP", "living_cost_estimate": 11000, "min_gpa": 3.2, "ielts_required": True, "website": "https://www.gla.ac.uk", "description": "Historic Scottish university."},
    {"name": "University of Birmingham", "country": "United Kingdom", "city": "Birmingham", "ranking": 84, "acceptance_rate": 0.79, "programs_offered": '["Engineering", "Law", "Medicine", "Business"]', "tuition_min": 22000, "tuition_max": 27000, "currency": "GBP", "living_cost_estimate": 11000, "min_gpa": 3.2, "ielts_required": True, "website": "https://www.birmingham.ac.uk", "description": "Red Brick university."},
    {"name": "University of Leeds", "country": "United Kingdom", "city": "Leeds", "ranking": 75, "acceptance_rate": 0.77, "programs_offered": '["Engineering", "Law", "Business", "Arts"]', "tuition_min": 22000, "tuition_max": 26500, "currency": "GBP", "living_cost_estimate": 11000, "min_gpa": 3.2, "ielts_required": True, "website": "https://www.leeds.ac.uk", "description": "Large research university."},
    {"name": "University of Southampton", "country": "United Kingdom", "city": "Southampton", "ranking": 81, "acceptance_rate": 0.84, "programs_offered": '["Engineering", "Oceanography", "Law", "Business"]', "tuition_min": 22000, "tuition_max": 27000, "currency": "GBP", "living_cost_estimate": 12000, "min_gpa": 3.2, "ielts_required": True, "website": "https://www.southampton.ac.uk", "description": "Russell Group university."},
    {"name": "University of Sheffield", "country": "United Kingdom", "city": "Sheffield", "ranking": 96, "acceptance_rate": 0.85, "programs_offered": '["Engineering", "Law", "Medicine", "Arts"]', "tuition_min": 22000, "tuition_max": 26500, "currency": "GBP", "living_cost_estimate": 10000, "min_gpa": 3.2, "ielts_required": True, "website": "https://www.sheffield.ac.uk", "description": "Russell Group university."},
    {"name": "Queen Mary University of London", "country": "United Kingdom", "city": "London", "ranking": 114, "acceptance_rate": 0.44, "programs_offered": '["Law", "Medicine", "Engineering", "Business"]', "tuition_min": 22000, "tuition_max": 28000, "currency": "GBP", "living_cost_estimate": 16000, "min_gpa": 3.2, "ielts_required": True, "website": "https://www.qmul.ac.uk", "description": "Russell Group in London."},
    {"name": "University of York", "country": "United Kingdom", "city": "York", "ranking": 147, "acceptance_rate": 0.79, "programs_offered": '["Law", "Economics", "Science", "Arts"]', "tuition_min": 22000, "tuition_max": 26500, "currency": "GBP", "living_cost_estimate": 11000, "min_gpa": 3.2, "ielts_required": True, "website": "https://www.york.ac.uk", "description": "Research-intensive university."},
    {"name": "Lancaster University", "country": "United Kingdom", "city": "Lancaster", "ranking": 122, "acceptance_rate": 0.73, "programs_offered": '["Business", "Engineering", "Law", "Science"]', "tuition_min": 22000, "tuition_max": 26500, "currency": "GBP", "living_cost_estimate": 10000, "min_gpa": 3.2, "ielts_required": True, "website": "https://www.lancaster.ac.uk", "description": "Leading research university."},
    # Canada (more)
    {"name": "University of Alberta", "country": "Canada", "city": "Edmonton", "ranking": 111, "acceptance_rate": 0.58, "programs_offered": '["Engineering", "Business", "Medicine", "Science"]', "tuition_min": 28000, "tuition_max": 45000, "currency": "CAD", "living_cost_estimate": 12000, "min_gpa": 3.2, "toefl_required": True, "website": "https://www.ualberta.ca", "description": "Top university in Alberta."},
    {"name": "Simon Fraser University", "country": "Canada", "city": "Burnaby", "ranking": 318, "acceptance_rate": 0.59, "programs_offered": '["Business", "Engineering", "Arts", "Science"]', "tuition_min": 28000, "tuition_max": 35000, "currency": "CAD", "living_cost_estimate": 16000, "min_gpa": 3.0, "toefl_required": True, "website": "https://www.sfu.ca", "description": "Leading comprehensive university."},
    {"name": "University of Calgary", "country": "Canada", "city": "Calgary", "ranking": 182, "acceptance_rate": 0.41, "programs_offered": '["Engineering", "Business", "Law", "Medicine"]', "tuition_min": 25000, "tuition_max": 40000, "currency": "CAD", "living_cost_estimate": 14000, "min_gpa": 3.2, "toefl_required": True, "website": "https://www.ucalgary.ca", "description": "Major research university."},
    {"name": "Queen's University", "country": "Canada", "city": "Kingston", "ranking": 246, "acceptance_rate": 0.42, "programs_offered": '["Business", "Law", "Engineering", "Arts"]', "tuition_min": 28000, "tuition_max": 45000, "currency": "CAD", "living_cost_estimate": 12000, "min_gpa": 3.3, "toefl_required": True, "website": "https://www.queensu.ca", "description": "Historic research university."},
    {"name": "Dalhousie University", "country": "Canada", "city": "Halifax", "ranking": 298, "acceptance_rate": 0.73, "programs_offered": '["Law", "Medicine", "Engineering", "Business"]', "tuition_min": 22000, "tuition_max": 35000, "currency": "CAD", "living_cost_estimate": 12000, "min_gpa": 3.0, "toefl_required": True, "website": "https://www.dal.ca", "description": "Leading university in Atlantic Canada."},
    {"name": "University of Ottawa", "country": "Canada", "city": "Ottawa", "ranking": 237, "acceptance_rate": 0.43, "programs_offered": '["Law", "Medicine", "Engineering", "Social Sciences"]', "tuition_min": 25000, "tuition_max": 40000, "currency": "CAD", "living_cost_estimate": 14000, "min_gpa": 3.2, "toefl_required": True, "website": "https://www.uottawa.ca", "description": "Bilingual university in capital."},
    {"name": "Western University", "country": "Canada", "city": "London", "ranking": 114, "acceptance_rate": 0.58, "programs_offered": '["Business", "Law", "Medicine", "Engineering"]', "tuition_min": 32000, "tuition_max": 48000, "currency": "CAD", "living_cost_estimate": 12000, "min_gpa": 3.3, "toefl_required": True, "website": "https://www.uwo.ca", "description": "Leading research university."},
    {"name": "York University", "country": "Canada", "city": "Toronto", "ranking": 456, "acceptance_rate": 0.79, "programs_offered": '["Business", "Law", "Engineering", "Arts"]', "tuition_min": 28000, "tuition_max": 35000, "currency": "CAD", "living_cost_estimate": 16000, "min_gpa": 3.0, "toefl_required": True, "website": "https://www.yorku.ca", "description": "Third-largest university in Ontario."},
    # Australia (more)
    {"name": "University of Western Australia", "country": "Australia", "city": "Perth", "ranking": 72, "acceptance_rate": 0.42, "programs_offered": '["Engineering", "Law", "Medicine", "Business"]', "tuition_min": 40000, "tuition_max": 50000, "currency": "AUD", "living_cost_estimate": 20000, "min_gpa": 3.2, "ielts_required": True, "website": "https://www.uwa.edu.au", "description": "Leading university in Western Australia."},
    {"name": "University of Adelaide", "country": "Australia", "city": "Adelaide", "ranking": 89, "acceptance_rate": 0.65, "programs_offered": '["Engineering", "Medicine", "Law", "Science"]', "tuition_min": 42000, "tuition_max": 50000, "currency": "AUD", "living_cost_estimate": 18000, "min_gpa": 3.0, "ielts_required": True, "website": "https://www.adelaide.edu.au", "description": "Third-oldest university in Australia."},
    {"name": "Macquarie University", "country": "Australia", "city": "Sydney", "ranking": 130, "acceptance_rate": 0.40, "programs_offered": '["Business", "Law", "Engineering", "Science"]', "tuition_min": 38000, "tuition_max": 48000, "currency": "AUD", "living_cost_estimate": 22000, "min_gpa": 3.0, "ielts_required": True, "website": "https://www.mq.edu.au", "description": "Innovative research university."},
    {"name": "RMIT University", "country": "Australia", "city": "Melbourne", "ranking": 140, "acceptance_rate": 0.50, "programs_offered": '["Engineering", "Design", "Business", "Technology"]', "tuition_min": 38000, "tuition_max": 48000, "currency": "AUD", "living_cost_estimate": 22000, "min_gpa": 3.0, "ielts_required": True, "website": "https://www.rmit.edu.au", "description": "Technology and design focused."},
    {"name": "Curtin University", "country": "Australia", "city": "Perth", "ranking": 183, "acceptance_rate": 0.58, "programs_offered": '["Engineering", "Business", "Health", "Science"]', "tuition_min": 35000, "tuition_max": 45000, "currency": "AUD", "living_cost_estimate": 20000, "min_gpa": 3.0, "ielts_required": True, "website": "https://www.curtin.edu.au", "description": "Largest university in Western Australia."},
    {"name": "University of Wollongong", "country": "Australia", "city": "Wollongong", "ranking": 186, "acceptance_rate": 0.62, "programs_offered": '["Engineering", "Business", "Law", "Science"]', "tuition_min": 32000, "tuition_max": 42000, "currency": "AUD", "living_cost_estimate": 18000, "min_gpa": 3.0, "ielts_required": True, "website": "https://www.uow.edu.au", "description": "Strong in engineering and research."},
    # India (more – IITs, NITs, central/state)
    {"name": "Indian Institute of Technology Kharagpur", "country": "India", "city": "Kharagpur", "ranking": 286, "acceptance_rate": 0.02, "programs_offered": '["Engineering", "Science", "Management", "Law"]', "tuition_min": 220000, "tuition_max": 400000, "currency": "INR", "living_cost_estimate": 80000, "min_gpa": 3.4, "toefl_required": True, "website": "https://www.iitkgp.ac.in", "description": "First IIT and largest by campus."},
    {"name": "Indian Institute of Technology Roorkee", "country": "India", "city": "Roorkee", "ranking": 369, "acceptance_rate": 0.02, "programs_offered": '["Engineering", "Architecture", "Management", "Science"]', "tuition_min": 230000, "tuition_max": 420000, "currency": "INR", "living_cost_estimate": 90000, "min_gpa": 3.4, "toefl_required": True, "website": "https://www.iitr.ac.in", "description": "Premier IIT for engineering."},
    {"name": "Indian Institute of Technology Guwahati", "country": "India", "city": "Guwahati", "ranking": 384, "acceptance_rate": 0.03, "programs_offered": '["Engineering", "Science", "Design", "Humanities"]', "tuition_min": 220000, "tuition_max": 400000, "currency": "INR", "living_cost_estimate": 90000, "min_gpa": 3.3, "toefl_required": True, "website": "https://www.iitg.ac.in", "description": "IIT in Northeast India."},
    {"name": "National Institute of Technology Trichy", "country": "India", "city": "Tiruchirappalli", "ranking": 601, "acceptance_rate": 0.05, "programs_offered": '["Engineering", "Science", "Management"]', "tuition_min": 150000, "tuition_max": 300000, "currency": "INR", "living_cost_estimate": 80000, "min_gpa": 3.2, "website": "https://www.nitt.edu", "description": "Top NIT in India."},
    {"name": "National Institute of Technology Warangal", "country": "India", "city": "Warangal", "ranking": 601, "acceptance_rate": 0.06, "programs_offered": '["Engineering", "Science", "Management"]', "tuition_min": 140000, "tuition_max": 280000, "currency": "INR", "living_cost_estimate": 70000, "min_gpa": 3.2, "website": "https://www.nitw.ac.in", "description": "First NIT established."},
    {"name": "Banaras Hindu University", "country": "India", "city": "Varanasi", "ranking": 601, "acceptance_rate": 0.12, "programs_offered": '["Engineering", "Medicine", "Law", "Arts", "Sciences"]', "tuition_min": 50000, "tuition_max": 150000, "currency": "INR", "living_cost_estimate": 70000, "min_gpa": 3.0, "website": "https://www.bhu.ac.in", "description": "Central university with diverse programs."},
    {"name": "Aligarh Muslim University", "country": "India", "city": "Aligarh", "ranking": 801, "acceptance_rate": 0.15, "programs_offered": '["Engineering", "Law", "Medicine", "Arts", "Science"]', "tuition_min": 30000, "tuition_max": 120000, "currency": "INR", "living_cost_estimate": 60000, "min_gpa": 3.0, "website": "https://www.amu.ac.in", "description": "Central university with historic legacy."},
    {"name": "Jamia Millia Islamia", "country": "India", "city": "New Delhi", "ranking": 801, "acceptance_rate": 0.20, "programs_offered": '["Engineering", "Law", "Architecture", "Arts", "Commerce"]', "tuition_min": 40000, "tuition_max": 150000, "currency": "INR", "living_cost_estimate": 120000, "min_gpa": 3.0, "website": "https://www.jmi.ac.in", "description": "Central university in Delhi."},
    {"name": "University of Calcutta", "country": "India", "city": "Kolkata", "ranking": 601, "acceptance_rate": 0.25, "programs_offered": '["Arts", "Science", "Commerce", "Law", "Engineering"]', "tuition_min": 20000, "tuition_max": 100000, "currency": "INR", "living_cost_estimate": 80000, "min_gpa": 3.0, "website": "https://www.caluniv.ac.in", "description": "Oldest university in India."},
    {"name": "Panjab University", "country": "India", "city": "Chandigarh", "ranking": 601, "acceptance_rate": 0.30, "programs_offered": '["Engineering", "Law", "Arts", "Science", "Commerce"]', "tuition_min": 40000, "tuition_max": 150000, "currency": "INR", "living_cost_estimate": 90000, "min_gpa": 3.0, "website": "https://puchd.ac.in", "description": "Central university in Chandigarh."},
    {"name": "Osmania University", "country": "India", "city": "Hyderabad", "ranking": 801, "acceptance_rate": 0.35, "programs_offered": '["Engineering", "Law", "Arts", "Science", "Commerce"]', "tuition_min": 30000, "tuition_max": 120000, "currency": "INR", "living_cost_estimate": 90000, "min_gpa": 3.0, "website": "https://www.osmania.ac.in", "description": "State university in Telangana."},
    # Germany (more)
    {"name": "Free University of Berlin", "country": "Germany", "city": "Berlin", "ranking": 98, "acceptance_rate": 0.35, "programs_offered": '["Law", "Medicine", "Humanities", "Science"]', "tuition_min": 0, "tuition_max": 0, "currency": "EUR", "living_cost_estimate": 11000, "min_gpa": 3.0, "website": "https://www.fu-berlin.de", "description": "Major research university in Berlin."},
    {"name": "Humboldt University of Berlin", "country": "Germany", "city": "Berlin", "ranking": 120, "acceptance_rate": 0.30, "programs_offered": '["Humanities", "Science", "Law", "Medicine"]', "tuition_min": 0, "tuition_max": 0, "currency": "EUR", "living_cost_estimate": 11000, "min_gpa": 3.0, "website": "https://www.hu-berlin.de", "description": "Historic university in Berlin."},
    {"name": "University of Freiburg", "country": "Germany", "city": "Freiburg", "ranking": 113, "acceptance_rate": 0.32, "programs_offered": '["Law", "Medicine", "Science", "Humanities"]', "tuition_min": 0, "tuition_max": 0, "currency": "EUR", "living_cost_estimate": 11000, "min_gpa": 3.0, "website": "https://www.uni-freiburg.de", "description": "Leading research university."},
    # France (more)
    {"name": "Université Paris-Saclay", "country": "France", "city": "Paris", "ranking": 69, "acceptance_rate": 0.15, "programs_offered": '["Science", "Engineering", "Medicine", "Law"]', "tuition_min": 170, "tuition_max": 601, "currency": "EUR", "living_cost_estimate": 12000, "min_gpa": 3.2, "website": "https://www.universite-paris-saclay.fr", "description": "Major research university cluster."},
    {"name": "Université Grenoble Alpes", "country": "France", "city": "Grenoble", "ranking": 129, "acceptance_rate": 0.25, "programs_offered": '["Engineering", "Science", "Law", "Humanities"]', "tuition_min": 170, "tuition_max": 601, "currency": "EUR", "living_cost_estimate": 10000, "min_gpa": 3.0, "website": "https://www.univ-grenoble-alpes.fr", "description": "Leading university in Alps region."},
    # Spain (more)
    {"name": "Autonomous University of Barcelona", "country": "Spain", "city": "Barcelona", "ranking": 149, "acceptance_rate": 0.40, "programs_offered": '["Science", "Law", "Medicine", "Humanities"]', "tuition_min": 1500, "tuition_max": 5000, "currency": "EUR", "living_cost_estimate": 10000, "min_gpa": 3.0, "website": "https://www.uab.cat", "description": "Major public university near Barcelona."},
    {"name": "University of Valencia", "country": "Spain", "city": "Valencia", "ranking": 209, "acceptance_rate": 0.50, "programs_offered": '["Law", "Medicine", "Science", "Arts"]', "tuition_min": 1200, "tuition_max": 4500, "currency": "EUR", "living_cost_estimate": 9000, "min_gpa": 3.0, "website": "https://www.uv.es", "description": "Historic university in Valencia."},
    # Italy (more)
    {"name": "University of Padua", "country": "Italy", "city": "Padua", "ranking": 116, "acceptance_rate": 0.45, "programs_offered": '["Law", "Medicine", "Engineering", "Humanities"]', "tuition_min": 900, "tuition_max": 3500, "currency": "EUR", "living_cost_estimate": 10000, "min_gpa": 3.0, "website": "https://www.unipd.it", "description": "One of oldest universities in Europe."},
    # Austria
    {"name": "University of Vienna", "country": "Austria", "city": "Vienna", "ranking": 134, "acceptance_rate": 0.45, "programs_offered": '["Law", "Medicine", "Humanities", "Science"]', "tuition_min": 0, "tuition_max": 1500, "currency": "EUR", "living_cost_estimate": 12000, "min_gpa": 3.0, "website": "https://www.univie.ac.at", "description": "Largest university in Austria."},
    {"name": "Vienna University of Technology", "country": "Austria", "city": "Vienna", "ranking": 180, "acceptance_rate": 0.40, "programs_offered": '["Engineering", "Architecture", "Science"]', "tuition_min": 0, "tuition_max": 1500, "currency": "EUR", "living_cost_estimate": 12000, "min_gpa": 3.2, "website": "https://www.tuwien.at", "description": "Leading technical university in Austria."},
    # Switzerland (more – avoid duplicate ETH)
    {"name": "EPFL", "country": "Switzerland", "city": "Lausanne", "ranking": 11, "acceptance_rate": 0.25, "programs_offered": '["Engineering", "Computer Science", "Life Sciences", "Architecture"]', "tuition_min": 730, "tuition_max": 730, "currency": "CHF", "living_cost_estimate": 22000, "min_gpa": 3.5, "toefl_required": True, "website": "https://www.epfl.ch", "description": "Leading technical university in French-speaking Switzerland."},
    {"name": "University of Zurich", "country": "Switzerland", "city": "Zurich", "ranking": 70, "acceptance_rate": 0.35, "programs_offered": '["Law", "Medicine", "Economics", "Science"]', "tuition_min": 730, "tuition_max": 1500, "currency": "CHF", "living_cost_estimate": 22000, "min_gpa": 3.2, "website": "https://www.uzh.ch", "description": "Largest university in Switzerland."},
    # Belgium (more)
    {"name": "Ghent University", "country": "Belgium", "city": "Ghent", "ranking": 96, "acceptance_rate": 0.50, "programs_offered": '["Engineering", "Law", "Medicine", "Science"]', "tuition_min": 900, "tuition_max": 6000, "currency": "EUR", "living_cost_estimate": 10000, "min_gpa": 3.0, "website": "https://www.ugent.be", "description": "Leading Dutch-speaking university."},
    {"name": "Université Libre de Bruxelles", "country": "Belgium", "city": "Brussels", "ranking": 201, "acceptance_rate": 0.45, "programs_offered": '["Law", "Medicine", "Science", "Economics"]', "tuition_min": 835, "tuition_max": 4000, "currency": "EUR", "living_cost_estimate": 12000, "min_gpa": 3.0, "website": "https://www.ulb.be", "description": "French-speaking university in Brussels."},
    # Czech Republic
    {"name": "Charles University", "country": "Czech Republic", "city": "Prague", "ranking": 248, "acceptance_rate": 0.35, "programs_offered": '["Law", "Medicine", "Science", "Humanities"]', "tuition_min": 0, "tuition_max": 5000, "currency": "EUR", "living_cost_estimate": 9000, "min_gpa": 3.0, "website": "https://www.cuni.cz", "description": "Oldest university in Central Europe."},
    {"name": "Czech Technical University in Prague", "country": "Czech Republic", "city": "Prague", "ranking": 401, "acceptance_rate": 0.40, "programs_offered": '["Engineering", "Architecture", "Science"]', "tuition_min": 0, "tuition_max": 5000, "currency": "EUR", "living_cost_estimate": 9000, "min_gpa": 3.0, "website": "https://www.cvut.cz", "description": "Leading technical university."},
    # Hungary
    {"name": "Eötvös Loránd University", "country": "Hungary", "city": "Budapest", "ranking": 501, "acceptance_rate": 0.40, "programs_offered": '["Law", "Science", "Humanities", "Education"]', "tuition_min": 2000, "tuition_max": 8000, "currency": "EUR", "living_cost_estimate": 8000, "min_gpa": 3.0, "website": "https://www.elte.hu", "description": "Largest university in Hungary."},
    {"name": "Budapest University of Technology and Economics", "country": "Hungary", "city": "Budapest", "ranking": 401, "acceptance_rate": 0.35, "programs_offered": '["Engineering", "Architecture", "Science"]', "tuition_min": 3000, "tuition_max": 8000, "currency": "EUR", "living_cost_estimate": 8000, "min_gpa": 3.0, "website": "https://www.bme.hu", "description": "Leading technical university in Hungary."},
    # Poland (more)
    {"name": "Jagiellonian University", "country": "Poland", "city": "Kraków", "ranking": 293, "acceptance_rate": 0.35, "programs_offered": '["Law", "Medicine", "Humanities", "Science"]', "tuition_min": 0, "tuition_max": 5000, "currency": "EUR", "living_cost_estimate": 8000, "min_gpa": 3.0, "website": "https://en.uj.edu.pl", "description": "Oldest university in Poland."},
    {"name": "Warsaw University of Technology", "country": "Poland", "city": "Warsaw", "ranking": 401, "acceptance_rate": 0.35, "programs_offered": '["Engineering", "Architecture", "Science"]', "tuition_min": 0, "tuition_max": 5000, "currency": "EUR", "living_cost_estimate": 9000, "min_gpa": 3.0, "website": "https://www.pw.edu.pl", "description": "Leading technical university in Poland."},
    # Portugal (more)
    {"name": "University of Porto", "country": "Portugal", "city": "Porto", "ranking": 274, "acceptance_rate": 0.45, "programs_offered": '["Engineering", "Medicine", "Law", "Science"]', "tuition_min": 1000, "tuition_max": 7000, "currency": "EUR", "living_cost_estimate": 9000, "min_gpa": 3.0, "website": "https://www.up.pt", "description": "Leading university in Porto."},
    # Greece (more)
    {"name": "Aristotle University of Thessaloniki", "country": "Greece", "city": "Thessaloniki", "ranking": 501, "acceptance_rate": 0.40, "programs_offered": '["Engineering", "Law", "Medicine", "Arts"]', "tuition_min": 0, "tuition_max": 0, "currency": "EUR", "living_cost_estimate": 8000, "min_gpa": 3.0, "website": "https://www.auth.gr", "description": "Largest university in Greece."},
    # Russia (more)
    {"name": "Higher School of Economics", "country": "Russia", "city": "Moscow", "ranking": 298, "acceptance_rate": 0.25, "programs_offered": '["Economics", "Law", "Social Sciences", "Computer Science"]', "tuition_min": 300000, "tuition_max": 600000, "currency": "RUB", "living_cost_estimate": 120000, "min_gpa": 3.2, "website": "https://www.hse.ru", "description": "Leading university in economics and social sciences."},
    # Ukraine
    {"name": "Taras Shevchenko National University of Kyiv", "country": "Ukraine", "city": "Kyiv", "ranking": 601, "acceptance_rate": 0.30, "programs_offered": '["Law", "Science", "Humanities", "Medicine"]', "tuition_min": 2000, "tuition_max": 5000, "currency": "USD", "living_cost_estimate": 6000, "min_gpa": 3.0, "website": "https://www.univ.kiev.ua", "description": "Leading university in Ukraine."},
    # Pakistan
    {"name": "Lahore University of Management Sciences", "country": "Pakistan", "city": "Lahore", "ranking": 601, "acceptance_rate": 0.15, "programs_offered": '["Business", "Law", "Engineering", "Science"]', "tuition_min": 800000, "tuition_max": 2000000, "currency": "PKR", "living_cost_estimate": 600000, "min_gpa": 3.2, "website": "https://lums.edu.pk", "description": "Leading private university in Pakistan."},
    {"name": "National University of Sciences and Technology", "country": "Pakistan", "city": "Islamabad", "ranking": 501, "acceptance_rate": 0.20, "programs_offered": '["Engineering", "Business", "Medicine", "Science"]', "tuition_min": 300000, "tuition_max": 800000, "currency": "PKR", "living_cost_estimate": 400000, "min_gpa": 3.0, "website": "https://www.nust.edu.pk", "description": "Leading STEM university in Pakistan."},
    # Bangladesh
    {"name": "University of Dhaka", "country": "Bangladesh", "city": "Dhaka", "ranking": 801, "acceptance_rate": 0.10, "programs_offered": '["Law", "Science", "Arts", "Commerce", "Engineering"]', "tuition_min": 5000, "tuition_max": 20000, "currency": "BDT", "living_cost_estimate": 150000, "min_gpa": 3.0, "website": "https://www.du.ac.bd", "description": "Oldest and largest university in Bangladesh."},
    {"name": "Bangladesh University of Engineering and Technology", "country": "Bangladesh", "city": "Dhaka", "ranking": 601, "acceptance_rate": 0.05, "programs_offered": '["Engineering", "Architecture", "Planning"]', "tuition_min": 8000, "tuition_max": 25000, "currency": "BDT", "living_cost_estimate": 150000, "min_gpa": 3.2, "website": "https://www.buet.ac.bd", "description": "Premier engineering university in Bangladesh."},
    # Sri Lanka
    {"name": "University of Colombo", "country": "Sri Lanka", "city": "Colombo", "ranking": 801, "acceptance_rate": 0.15, "programs_offered": '["Law", "Medicine", "Science", "Arts", "Commerce"]', "tuition_min": 0, "tuition_max": 50000, "currency": "LKR", "living_cost_estimate": 200000, "min_gpa": 3.0, "website": "https://www.cmb.ac.lk", "description": "Leading university in Sri Lanka."},
    # Nepal
    {"name": "Tribhuvan University", "country": "Nepal", "city": "Kirtipur", "ranking": 801, "acceptance_rate": 0.25, "programs_offered": '["Engineering", "Law", "Medicine", "Arts", "Science"]', "tuition_min": 50000, "tuition_max": 200000, "currency": "NPR", "living_cost_estimate": 150000, "min_gpa": 3.0, "website": "https://www.tu.edu.np", "description": "Largest university in Nepal."},
    # Iran
    {"name": "University of Tehran", "country": "Iran", "city": "Tehran", "ranking": 301, "acceptance_rate": 0.15, "programs_offered": '["Engineering", "Law", "Medicine", "Science", "Arts"]', "tuition_min": 0, "tuition_max": 5000, "currency": "IRR", "living_cost_estimate": 150000000, "min_gpa": 3.2, "website": "https://www.ut.ac.ir", "description": "Largest university in Iran."},
    # Lebanon
    {"name": "American University of Beirut", "country": "Lebanon", "city": "Beirut", "ranking": 245, "acceptance_rate": 0.25, "programs_offered": '["Medicine", "Engineering", "Business", "Arts"]', "tuition_min": 20000, "tuition_max": 25000, "currency": "USD", "living_cost_estimate": 12000, "min_gpa": 3.2, "website": "https://www.aub.edu.lb", "description": "Leading university in Lebanon."},
    # Jordan
    {"name": "University of Jordan", "country": "Jordan", "city": "Amman", "ranking": 601, "acceptance_rate": 0.35, "programs_offered": '["Medicine", "Engineering", "Law", "Arts", "Science"]', "tuition_min": 3000, "tuition_max": 8000, "currency": "JOD", "living_cost_estimate": 5000, "min_gpa": 3.0, "website": "https://www.ju.edu.jo", "description": "Largest university in Jordan."},
    # Kuwait
    {"name": "Kuwait University", "country": "Kuwait", "city": "Kuwait City", "ranking": 601, "acceptance_rate": 0.40, "programs_offered": '["Engineering", "Law", "Medicine", "Arts", "Science"]', "tuition_min": 0, "tuition_max": 0, "currency": "KWD", "living_cost_estimate": 0, "min_gpa": 3.0, "website": "https://www.ku.edu.kw", "description": "National university of Kuwait."},
    # Bahrain
    {"name": "University of Bahrain", "country": "Bahrain", "city": "Sakhir", "ranking": 801, "acceptance_rate": 0.50, "programs_offered": '["Engineering", "Business", "Law", "Science"]', "tuition_min": 2000, "tuition_max": 6000, "currency": "BHD", "living_cost_estimate": 4000, "min_gpa": 3.0, "website": "https://www.uob.edu.bh", "description": "National university of Bahrain."},
    # Oman
    {"name": "Sultan Qaboos University", "country": "Oman", "city": "Muscat", "ranking": 401, "acceptance_rate": 0.35, "programs_offered": '["Engineering", "Medicine", "Law", "Arts", "Science"]', "tuition_min": 0, "tuition_max": 0, "currency": "OMR", "living_cost_estimate": 0, "min_gpa": 3.0, "website": "https://www.squ.edu.om", "description": "National university of Oman."},
    # Kazakhstan
    {"name": "Nazarbayev University", "country": "Kazakhstan", "city": "Astana", "ranking": 323, "acceptance_rate": 0.15, "programs_offered": '["Engineering", "Business", "Medicine", "Science", "Humanities"]', "tuition_min": 0, "tuition_max": 0, "currency": "KZT", "living_cost_estimate": 0, "min_gpa": 3.2, "website": "https://nu.edu.kz", "description": "Leading English-medium university in Kazakhstan."},
    # Peru
    {"name": "Pontificia Universidad Católica del Perú", "country": "Peru", "city": "Lima", "ranking": 401, "acceptance_rate": 0.30, "programs_offered": '["Law", "Engineering", "Business", "Arts", "Science"]', "tuition_min": 5000, "tuition_max": 12000, "currency": "USD", "living_cost_estimate": 8000, "min_gpa": 3.0, "website": "https://www.pucp.edu.pe", "description": "Leading private university in Peru."},
    # Ecuador
    {"name": "Universidad San Francisco de Quito", "country": "Ecuador", "city": "Quito", "ranking": 601, "acceptance_rate": 0.45, "programs_offered": '["Medicine", "Engineering", "Business", "Law"]', "tuition_min": 8000, "tuition_max": 15000, "currency": "USD", "living_cost_estimate": 7000, "min_gpa": 3.0, "website": "https://www.usfq.edu.ec", "description": "Leading private university in Ecuador."},
    # Uruguay
    {"name": "Universidad de la República", "country": "Uruguay", "city": "Montevideo", "ranking": 401, "acceptance_rate": 0.50, "programs_offered": '["Law", "Medicine", "Engineering", "Economics", "Arts"]', "tuition_min": 0, "tuition_max": 0, "currency": "UYU", "living_cost_estimate": 120000, "min_gpa": 3.0, "website": "https://www.udelar.edu.uy", "description": "Largest public university in Uruguay."},
    # Costa Rica
    {"name": "University of Costa Rica", "country": "Costa Rica", "city": "San José", "ranking": 501, "acceptance_rate": 0.35, "programs_offered": '["Law", "Medicine", "Engineering", "Arts", "Science"]', "tuition_min": 0, "tuition_max": 500, "currency": "CRC", "living_cost_estimate": 8000, "min_gpa": 3.0, "website": "https://www.ucr.ac.cr", "description": "Leading university in Costa Rica."},
    # Tanzania
    {"name": "University of Dar es Salaam", "country": "Tanzania", "city": "Dar es Salaam", "ranking": 801, "acceptance_rate": 0.25, "programs_offered": '["Law", "Engineering", "Arts", "Science", "Commerce"]', "tuition_min": 1000, "tuition_max": 5000, "currency": "TZS", "living_cost_estimate": 3000000, "min_gpa": 3.0, "website": "https://www.udsm.ac.tz", "description": "Largest university in Tanzania."},
    # Uganda
    {"name": "Makerere University", "country": "Uganda", "city": "Kampala", "ranking": 601, "acceptance_rate": 0.20, "programs_offered": '["Law", "Medicine", "Engineering", "Arts", "Science"]', "tuition_min": 2000, "tuition_max": 8000, "currency": "USD", "living_cost_estimate": 5000, "min_gpa": 3.0, "website": "https://www.mak.ac.ug", "description": "Oldest and largest university in Uganda."},
    # Ethiopia
    {"name": "Addis Ababa University", "country": "Ethiopia", "city": "Addis Ababa", "ranking": 801, "acceptance_rate": 0.25, "programs_offered": '["Law", "Medicine", "Engineering", "Arts", "Science"]', "tuition_min": 0, "tuition_max": 1000, "currency": "ETB", "living_cost_estimate": 50000, "min_gpa": 3.0, "website": "https://www.aau.edu.et", "description": "Largest university in Ethiopia."},
    # Algeria
    {"name": "University of Algiers", "country": "Algeria", "city": "Algiers", "ranking": 801, "acceptance_rate": 0.40, "programs_offered": '["Law", "Medicine", "Engineering", "Science", "Arts"]', "tuition_min": 0, "tuition_max": 500, "currency": "DZD", "living_cost_estimate": 80000, "min_gpa": 3.0, "website": "https://www.univ-alger.dz", "description": "Largest university in Algeria."},
    # Tunisia
    {"name": "University of Tunis", "country": "Tunisia", "city": "Tunis", "ranking": 801, "acceptance_rate": 0.35, "programs_offered": '["Law", "Medicine", "Engineering", "Economics", "Arts"]', "tuition_min": 0, "tuition_max": 1000, "currency": "TND", "living_cost_estimate": 6000, "min_gpa": 3.0, "website": "https://www.utm.tn", "description": "Leading university in Tunisia."},
]

def seed_universities():
    db: Session = SessionLocal()
    try:
        existing_count = db.query(University).count()
        if existing_count == 0:
            # Fresh seed: add all
            for uni_data in universities_data:
                db.add(University(**uni_data))
            db.commit()
            print(f"Successfully seeded {len(universities_data)} universities!")
        else:
            # Add any universities from the list that are not already in DB (e.g. new Indian ones)
            added = 0
            for uni_data in universities_data:
                if db.query(University).filter(University.name == uni_data["name"]).first():
                    continue
                db.add(University(**uni_data))
                added += 1
            db.commit()
            if added:
                print(f"Added {added} new universities (e.g. India). Total in DB: {existing_count + added}")
            else:
                print(f"All {len(universities_data)} universities already in DB ({existing_count} records).")
    except Exception as e:
        db.rollback()
        print(f"Error seeding universities: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_universities()


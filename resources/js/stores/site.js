import { defineStore } from "pinia";

export const useSiteStore = defineStore("site", {
    state: () => ({
        // Organization info
        organizationName: "RiverFlow International",
        tagline: "Optimizing science education experiences and outcomes",

        // Contact information
        contact: {
            email: "info@stiafrica.org",
            phone: "+27 11 234 5678",
            address: "123 Education Street, Johannesburg, South Africa",
            socialMedia: {
                facebook: "https://facebook.com/stiafrica",
                twitter: "https://twitter.com/stiafrica",
                linkedin: "https://linkedin.com/company/stiafrica",
                instagram: "https://instagram.com/stiafrica",
            },
        },

        // Leadership & Staff
        leaders: [
            {
                id: "1",
                name: "Dr. Amina Okonkwo",
                role: "Executive Director",
                bio: "Dr. Okonkwo has over 20 years of experience in education development across Africa.",
                image: "/images/team/leader1.jpg",
            },
            {
                id: "2",
                name: "John Doe",
                role: "Program Director",
                bio: "John leads our teacher training initiatives and has trained over 5,000 educators.",
                image: "/images/team/leader2.jpg",
            },
            {
                id: "3",
                name: "John Mwangi",
                role: "Program Director",
                bio: "John leads our teacher training initiatives and has trained over 5,000 educators.",
                image: "/images/team/leader2.jpg",
            },
            {
                id: "3",
                name: "Sarah Ndlovu",
                role: "Communications and Advocacy Officer",
                bio: "Sarah manages all communications and advocacy efforts for STIA.",
                image: "/images/team/leader3.jpg",
            },
            {
                id: "4",
                name: "Michael Banda",
                role: "Finance Manager",
                bio: "Michael ensures financial sustainability and transparency in all our operations.",
                image: "/images/team/leader4.jpg",
            },
        ],

        // What We Do / Projects
        projects: [
            {
                id: "1",
                name: "USEEP Project",
                slug: "useep-project",
                description:
                    "Urban Schools Educational Empowerment Program - Transforming urban education through innovative teaching methods.",
                fullDescription:
                    "The Urban Schools Educational Empowerment Program (USEEP) is our flagship initiative aimed at revolutionizing education in urban areas across Africa. Through comprehensive teacher training, modern teaching resources, and technology integration, we're creating sustainable change in how science is taught and learned in city schools.",
                image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=500&fit=crop",
                status: "Active",
                startDate: "2020-01-15",
                location: "Multiple cities across Africa",
                beneficiaries: "10,000+ students, 500+ teachers",
                objectives: [
                    "Train 1,000 teachers in urban schools",
                    "Improve learning outcomes by 30%",
                    "Implement technology-enhanced learning",
                    "Develop digital learning resources",
                ],
                impact: [
                    "Trained 500+ teachers across 5 countries",
                    "Reached 10,000+ students",
                    "Improved pass rates by 28%",
                    "Distributed 200+ science kits",
                ],
            },
            {
                id: "2",
                name: "Teacher Training on VAC",
                slug: "teacher-training-vac",
                description:
                    "Violence Against Children Prevention - Equipping teachers to create safe learning environments.",
                fullDescription:
                    "Our Violence Against Children (VAC) Prevention program provides comprehensive training to educators on recognizing, preventing, and responding to violence against children. We work to create safe, nurturing school environments where every child can learn and thrive without fear.",
                image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop",
                status: "Active",
                startDate: "2019-06-01",
                location: "Uganda, Kenya, Tanzania",
                beneficiaries: "2,500+ teachers, 50+ schools",
                objectives: [
                    "Train teachers on identifying signs of abuse",
                    "Create safe reporting mechanisms",
                    "Build supportive school communities",
                    "Develop child protection policies",
                ],
                impact: [
                    "Trained 2,500+ teachers",
                    "Established reporting systems in 50+ schools",
                    "Created 45 child protection committees",
                    "Reduced reported incidents by 40%",
                ],
            },
            {
                id: "3",
                name: "GBV Awareness Program",
                slug: "gbv-awareness-program",
                description:
                    "Gender-Based Violence awareness and prevention training for educators.",
                fullDescription:
                    "The Gender-Based Violence (GBV) Awareness Program focuses on educating teachers and school administrators about preventing and responding to gender-based violence in educational settings. Through workshops, resources, and ongoing support, we're creating safer schools for all students.",
                image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop",
                status: "Active",
                startDate: "2021-03-08",
                location: "Regional implementation",
                beneficiaries: "1,800+ educators",
                objectives: [
                    "Sensitize teachers on GBV issues",
                    "Develop school-based prevention strategies",
                    "Support affected learners",
                    "Promote gender equality in education",
                ],
                impact: [
                    "Trained 1,800+ educators",
                    "Implemented programs in 30+ schools",
                    "Created gender equality clubs",
                    "Supported 200+ affected students",
                ],
            },
            {
                id: "4",
                name: "Science Teaching Kits Distribution",
                slug: "science-teaching-kits",
                description:
                    "Providing hands-on science teaching resources to under-resourced schools.",
                fullDescription:
                    "This program addresses the critical shortage of science teaching materials in rural and under-resourced schools. We design, produce, and distribute affordable science teaching kits that enable hands-on, practical science education even in the most resource-constrained environments.",
                image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&h=500&fit=crop",
                status: "Active",
                startDate: "2018-09-01",
                location: "Rural schools across Africa",
                beneficiaries: "300+ schools, 15,000+ students",
                objectives: [
                    "Distribute science kits to 500 schools",
                    "Train teachers on kit utilization",
                    "Promote hands-on learning",
                    "Bridge resource gaps",
                ],
                impact: [
                    "Distributed 300+ science kits",
                    "Reached 300+ schools",
                    "Benefited 15,000+ students",
                    "Improved practical skills by 45%",
                ],
            },
            {
                id: "5",
                name: "Digital Literacy for Educators",
                slug: "digital-literacy-educators",
                description:
                    "Empowering teachers with digital skills to enhance modern teaching methods.",
                fullDescription:
                    "As education increasingly moves into the digital space, our Digital Literacy program ensures that teachers are equipped with the necessary skills and confidence to integrate technology into their teaching. From basic computer skills to advanced educational technology tools, we provide comprehensive training and ongoing support.",
                image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop",
                status: "Active",
                startDate: "2022-01-10",
                location: "Multiple locations",
                beneficiaries: "800+ teachers",
                objectives: [
                    "Train 1,000 teachers in digital tools",
                    "Provide devices and resources",
                    "Create digital learning content",
                    "Establish online learning communities",
                ],
                impact: [
                    "Trained 800+ teachers",
                    "Distributed 150 tablets",
                    "Created 50+ digital lessons",
                    "Formed 10 online teacher communities",
                ],
            },
            {
                id: "6",
                name: "Environmental Education Initiative",
                slug: "environmental-education",
                description:
                    "Integrating environmental awareness and sustainability into science education.",
                fullDescription:
                    "Our Environmental Education Initiative addresses the urgent need for environmental awareness by integrating sustainability and conservation topics into science curricula. Through practical projects, school gardens, and community engagement, students and teachers become environmental stewards in their communities.",
                image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop",
                status: "Active",
                startDate: "2020-06-05",
                location: "East Africa region",
                beneficiaries: "100+ schools",
                objectives: [
                    "Establish school environmental clubs",
                    "Create school gardens and green spaces",
                    "Train teachers on environmental education",
                    "Conduct community awareness campaigns",
                ],
                impact: [
                    "Established 75 environmental clubs",
                    "Created 50 school gardens",
                    "Trained 400+ teachers",
                    "Planted 10,000+ trees",
                ],
            },
        ],

        // Statistics
        stats: {
            teachers: 15420,
            schools: 500,
            learners: 234650,
            trained: 2000,
        },

        // Causes for Donations
        causes: [
            {
                id: "1",
                title: "Teacher Training Fund",
                slug: "teacher-training-fund",
                description:
                    "Help us train and empower science teachers across Africa with modern teaching methods and resources.",
                fullDescription:
                    "Every teacher we train has the potential to impact hundreds of students over their career. Your donation helps provide comprehensive training, teaching materials, and ongoing support to educators who are transforming science education in their communities. With your help, we can reach more teachers in remote and underserved areas.",
                image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop",
                goalAmount: 50000,
                raisedAmount: 32500,
                currency: "USD",
                category: "Education",
                urgency: "High",
                beneficiaries: "500+ teachers",
                impact: [
                    "Train 500 teachers in modern pedagogy",
                    "Reach 25,000+ students indirectly",
                    "Provide teaching materials and kits",
                    "Offer 6-month mentorship support",
                ],
                donationTiers: [
                    {
                        amount: 25,
                        description: "Provide training materials for 1 teacher",
                    },
                    {
                        amount: 100,
                        description:
                            "Sponsor a teacher's full training program",
                    },
                    {
                        amount: 500,
                        description: "Train 5 teachers with follow-up support",
                    },
                    {
                        amount: 1000,
                        description:
                            "Establish a training center in a rural area",
                    },
                ],
            },
            {
                id: "2",
                title: "Science Kit Distribution",
                slug: "science-kit-distribution",
                description:
                    "Provide hands-on science learning materials to schools lacking basic laboratory equipment.",
                fullDescription:
                    "Many schools across Africa lack even the most basic science equipment, making practical learning impossible. Our science kits contain essential materials for conducting experiments and demonstrations in physics, chemistry, and biology. Each kit serves an entire school and can be used by multiple classes for years.",
                image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&h=500&fit=crop",
                goalAmount: 30000,
                raisedAmount: 18750,
                currency: "USD",
                category: "Resources",
                urgency: "Medium",
                beneficiaries: "100+ schools",
                impact: [
                    "Equip 100 schools with science kits",
                    "Enable hands-on learning for 10,000+ students",
                    "Improve science pass rates by 30%",
                    "Reduce learning gaps in rural areas",
                ],
                donationTiers: [
                    {
                        amount: 50,
                        description: "Provide basic lab supplies for one class",
                    },
                    {
                        amount: 150,
                        description: "Supply a complete basic science kit",
                    },
                    {
                        amount: 300,
                        description: "Equip a school with a full science kit",
                    },
                    { amount: 1500, description: "Provide kits to 5 schools" },
                ],
            },
            {
                id: "3",
                title: "Digital Learning Initiative",
                slug: "digital-learning-initiative",
                description:
                    "Bridge the digital divide by providing tablets, internet access, and digital content to underserved schools.",
                fullDescription:
                    "In today's world, digital literacy is essential. However, many African schools lack access to technology. This initiative provides tablets, internet connectivity, and age-appropriate educational software to schools. We also train teachers to effectively integrate technology into their lessons, ensuring sustainable impact.",
                image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop",
                goalAmount: 75000,
                raisedAmount: 45000,
                currency: "USD",
                category: "Technology",
                urgency: "High",
                beneficiaries: "50 schools, 5,000+ students",
                impact: [
                    "Provide tablets to 50 schools",
                    "Install internet in remote classrooms",
                    "Create digital learning libraries",
                    "Train teachers in educational technology",
                ],
                donationTiers: [
                    {
                        amount: 75,
                        description:
                            "Sponsor internet for a classroom for 1 year",
                    },
                    {
                        amount: 200,
                        description: "Provide one tablet with educational apps",
                    },
                    {
                        amount: 500,
                        description: "Equip a classroom with 5 tablets",
                    },
                    {
                        amount: 2500,
                        description: "Full digital setup for one school",
                    },
                ],
            },
            {
                id: "4",
                title: "Girls in Science Program",
                slug: "girls-in-science-program",
                description:
                    "Empower and encourage young girls to pursue science education and careers in STEM fields.",
                fullDescription:
                    "Gender disparity in STEM education is a significant challenge in Africa. Our Girls in Science Program provides scholarships, mentorship, and safe learning spaces for girls interested in science. We organize science clubs, career talks with female scientists, and leadership workshops to inspire the next generation of women scientists.",
                image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop",
                goalAmount: 40000,
                raisedAmount: 28000,
                currency: "USD",
                category: "Empowerment",
                urgency: "High",
                beneficiaries: "1,000+ girls",
                impact: [
                    "Provide scholarships to 200 girls",
                    "Establish 20 girls' science clubs",
                    "Conduct mentorship programs",
                    "Increase girls' STEM enrollment by 40%",
                ],
                donationTiers: [
                    {
                        amount: 30,
                        description:
                            "Provide science club materials for one girl",
                    },
                    {
                        amount: 100,
                        description:
                            "Sponsor a girl's participation in science camp",
                    },
                    {
                        amount: 200,
                        description: "Full-year scholarship for one girl",
                    },
                    {
                        amount: 1000,
                        description: "Establish a girls' science club",
                    },
                ],
            },
            {
                id: "5",
                title: "Rural School Support",
                slug: "rural-school-support",
                description:
                    "Bring quality science education to remote and underserved rural communities.",
                fullDescription:
                    "Rural schools face unique challenges including lack of qualified teachers, minimal resources, and geographical isolation. This program provides mobile training units, teacher housing support, teaching materials, and community engagement programs to ensure children in rural areas receive the same quality education as their urban counterparts.",
                image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=500&fit=crop",
                goalAmount: 60000,
                raisedAmount: 35000,
                currency: "USD",
                category: "Infrastructure",
                urgency: "Medium",
                beneficiaries: "75 rural schools",
                impact: [
                    "Deploy mobile training units to 75 schools",
                    "Provide housing for rural teachers",
                    "Supply teaching materials and books",
                    "Connect communities with education resources",
                ],
                donationTiers: [
                    {
                        amount: 50,
                        description: "Provide books for one rural classroom",
                    },
                    {
                        amount: 200,
                        description:
                            "Support a teacher in a rural school for 1 month",
                    },
                    {
                        amount: 500,
                        description: "Supply a rural school with teaching aids",
                    },
                    {
                        amount: 2000,
                        description: "Full mobile training unit visit",
                    },
                ],
            },
            {
                id: "6",
                title: "Emergency Education Fund",
                slug: "emergency-education-fund",
                description:
                    "Rapid response support for schools affected by emergencies, disasters, or crises.",
                fullDescription:
                    "When disasters strike, education is often disrupted, leaving children vulnerable and falling behind. Our Emergency Education Fund provides immediate support including temporary learning spaces, emergency teaching materials, psychosocial support for affected students, and resources to resume education as quickly as possible.",
                image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=500&fit=crop",
                goalAmount: 25000,
                raisedAmount: 12000,
                currency: "USD",
                category: "Emergency",
                urgency: "Critical",
                beneficiaries: "Schools in crisis areas",
                impact: [
                    "Rapid deployment to affected areas",
                    "Set up temporary learning spaces",
                    "Provide emergency teaching materials",
                    "Offer psychosocial support to students",
                ],
                donationTiers: [
                    {
                        amount: 25,
                        description: "Emergency learning kit for 1 student",
                    },
                    {
                        amount: 100,
                        description: "Set up a temporary classroom",
                    },
                    {
                        amount: 500,
                        description: "Emergency supplies for one school",
                    },
                    {
                        amount: 2500,
                        description: "Full emergency response package",
                    },
                ],
            },
        ],

        // Upcoming Events
        events: [
            {
                id: "1",
                title: "Annual Teacher Training Workshop",
                slug: "annual-teacher-training-workshop",
                date: "2025-11-15",
                endDate: "2025-11-17",
                time: "9:00 AM - 5:00 PM EAT",
                location:
                    "Kenyatta International Convention Centre, Nairobi, Kenya",
                venue: "Main Hall, 3rd Floor",
                description:
                    "Join us for our flagship annual workshop bringing together educators from across Africa.",
                fullDescription:
                    "<p>Our flagship Annual Teacher Training Workshop returns for its 10th year, bringing together over 500 educators from across Africa for three days of intensive professional development, networking, and knowledge sharing.</p><p>This year's theme focuses on innovative pedagogical approaches and the integration of technology in the classroom. Participants will engage in hands-on workshops, panel discussions, and collaborative sessions led by renowned education experts and practitioners.</p><p>The workshop is designed for teachers at all levels, from primary to secondary education, and covers topics including student-centered learning, assessment strategies, classroom management, and the use of digital tools to enhance teaching effectiveness.</p>",
                image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop",
                category: "Workshop",
                capacity: 500,
                registrationDeadline: "2025-11-01",
                fee: "Free for STIA members, $50 for non-members",
                speakers: [
                    "Dr. Amina Okonkwo - Executive Director, STIA",
                    "Prof. James Muthui - University of Nairobi",
                    "Sarah Ndlovu - Communications Officer, STIA",
                ],
                agenda: [
                    "Day 1: Opening Ceremony & Keynote Presentations",
                    "Day 2: Parallel Workshop Sessions & Group Activities",
                    "Day 3: Panel Discussions & Closing Remarks",
                ],
            },
            {
                id: "2",
                title: "USEEP Project Launch - Phase 2",
                slug: "useep-project-launch-phase-2",
                date: "2025-12-01",
                endDate: "2025-12-01",
                time: "10:00 AM - 2:00 PM WAT",
                location:
                    "Federal Ministry of Education Auditorium, Lagos, Nigeria",
                venue: "Grand Auditorium",
                description:
                    "Launch of the second phase of our Urban Schools Educational Empowerment Program.",
                fullDescription:
                    "<p>We are excited to announce the launch of Phase 2 of the Urban Schools Educational Empowerment Program (USEEP), expanding our reach to 100 additional urban schools across Nigeria.</p><p>Building on the success of Phase 1, which impacted over 10,000 students and trained 500 teachers, Phase 2 will introduce enhanced curriculum materials, digital learning platforms, and comprehensive teacher support systems.</p><p>The launch event will feature presentations from education stakeholders, success stories from Phase 1 schools, and an overview of the expanded program components. We invite educators, policymakers, and partners to join us in celebrating this milestone.</p>",
                image: "https://images.unsplash.com/photo-1516383607781-913a19294fd1?w=1500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D",
                category: "Launch Event",
                capacity: 300,
                registrationDeadline: "2025-11-25",
                fee: "Free (Registration Required)",
                speakers: [
                    "Hon. Minister of Education - Nigeria",
                    "Dr. Amina Okonkwo - Executive Director, STIA",
                    "John Mwangi - Program Director, STIA",
                ],
                agenda: [
                    "Welcome & Opening Remarks",
                    "Phase 1 Impact Report Presentation",
                    "Phase 2 Program Overview",
                    "Networking Lunch",
                ],
            },
            {
                id: "3",
                title: "Digital Learning Conference",
                slug: "digital-learning-conference",
                date: "2026-01-20",
                endDate: "2026-01-22",
                time: "8:30 AM - 6:00 PM SAST",
                location:
                    "Cape Town International Convention Centre, Cape Town, South Africa",
                venue: "Conference Hall A & B",
                description:
                    "Exploring digital transformation in African education systems.",
                fullDescription:
                    "<p>Join education leaders, technology experts, and innovators from across the continent for a comprehensive exploration of digital transformation in African education.</p><p>This three-day conference will showcase cutting-edge educational technology solutions, discuss policy frameworks for digital learning, and provide practical insights into implementing technology-enhanced teaching and learning.</p><p>Attendees will have the opportunity to participate in demo sessions, visit the EdTech exhibition hall, and engage with solution providers who are addressing the unique challenges of African education contexts.</p>",
                image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
                category: "Conference",
                capacity: 800,
                registrationDeadline: "2026-01-10",
                fee: "Early Bird: $150 | Regular: $200",
                speakers: [
                    "Leading EdTech Entrepreneurs",
                    "Education Ministry Officials",
                    "University Researchers",
                    "School Principals & Teachers",
                ],
                agenda: [
                    "Day 1: Keynotes & Policy Discussions",
                    "Day 2: Technology Demonstrations & Workshops",
                    "Day 3: Implementation Case Studies & Networking",
                ],
            },
            {
                id: "4",
                title: "Science Education Symposium",
                slug: "science-education-symposium",
                date: "2026-02-10",
                endDate: "2026-02-12",
                time: "9:00 AM - 5:30 PM GMT",
                location: "University of Ghana Conference Center, Accra, Ghana",
                venue: "Science Complex Auditorium",
                description:
                    "Innovative approaches to teaching science in African schools and universities.",
                fullDescription:
                    "<p>The Science Education Symposium brings together science educators, researchers, and curriculum developers to explore innovative approaches to teaching science in African educational institutions.</p><p>With a focus on practical, hands-on learning and the integration of local contexts into science curricula, this symposium will feature presentations of research findings, demonstrations of innovative teaching methods, and discussions on improving science education outcomes.</p><p>Topics include laboratory management, inquiry-based learning, STEM education, and strategies for making science education more accessible and engaging for all students.</p>",
                image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&h=500&fit=crop",
                category: "Symposium",
                capacity: 400,
                registrationDeadline: "2026-02-01",
                fee: "$100 for educators | $150 for researchers",
                speakers: [
                    "Prof. Emmanuel Mensah - University of Ghana",
                    "Dr. Grace Achieng - Kenya Science Teachers Association",
                    "Laboratory Equipment Specialists",
                ],
                agenda: [
                    "Day 1: Research Presentations & Poster Sessions",
                    "Day 2: Practical Workshops & Lab Demonstrations",
                    "Day 3: Curriculum Development & Collaboration",
                ],
            },
            {
                id: "5",
                title: "Gender Equality in Education Forum",
                slug: "gender-equality-education-forum",
                date: "2026-03-08",
                endDate: "2026-03-08",
                time: "9:00 AM - 4:00 PM EAT",
                location: "African Union Headquarters, Addis Ababa, Ethiopia",
                venue: "Nelson Mandela Hall",
                description:
                    "Addressing gender disparities and promoting inclusive education across the continent.",
                fullDescription:
                    "<p>Coinciding with International Women's Day, this forum addresses critical issues of gender equality in education across Africa. We will explore strategies to eliminate gender-based barriers to education and promote inclusive learning environments.</p><p>The forum will feature panel discussions on topics including girls' education, gender-responsive pedagogy, safety in schools, and the role of male allies in promoting gender equality.</p><p>Participants will include educators, policymakers, civil society organizations, and students, all working together to develop actionable strategies for creating gender-equitable education systems.</p>",
                image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop",
                category: "Forum",
                capacity: 250,
                registrationDeadline: "2026-03-01",
                fee: "Free (Limited Seats)",
                speakers: [
                    "African Union Education Commissioner",
                    "Gender Equality Advocates",
                    "Teacher Representatives",
                    "Student Voices Panel",
                ],
                agenda: [
                    "Opening Session: State of Gender Equality in African Education",
                    "Panel Discussions: Breaking Barriers",
                    "Workshops: Practical Strategies for Schools",
                    "Action Planning & Commitments",
                ],
            },
            {
                id: "6",
                title: "Rural Education Innovation Workshop",
                slug: "rural-education-innovation-workshop",
                date: "2026-03-25",
                endDate: "2026-03-27",
                time: "8:00 AM - 5:00 PM EAT",
                location: "Makerere University, Kampala, Uganda",
                venue: "Education Department Building",
                description:
                    "Sharing best practices and innovative solutions for education in rural communities.",
                fullDescription:
                    "<p>This workshop focuses specifically on the unique challenges and opportunities in rural education. Participants will explore innovative, context-appropriate solutions that address resource constraints, geographical barriers, and community engagement.</p><p>Through case studies, field visits, and hands-on activities, attendees will learn about successful rural education initiatives, community-based teaching approaches, and strategies for making quality education accessible in remote areas.</p><p>The workshop is particularly valuable for educators working in rural schools, education officials responsible for rural areas, and NGOs supporting rural education programs.</p>",
                image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=500&fit=crop",
                category: "Workshop",
                capacity: 150,
                registrationDeadline: "2026-03-15",
                fee: "$30 (includes materials and field visit transport)",
                speakers: [
                    "Rural Education Specialists",
                    "Community Leaders",
                    "Experienced Rural Teachers",
                    "Education Technology Innovators",
                ],
                agenda: [
                    "Day 1: Understanding Rural Education Contexts",
                    "Day 2: Field Visit to Successful Rural Schools",
                    "Day 3: Innovation Lab & Action Planning",
                ],
            },
        ],

        // Gallery
        gallery: [
            {
                id: "1",
                title: "Teacher Training Workshop - Kampala",
                category: "Training",
                image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=800&fit=crop",
                date: "2025-09-15",
            },
            {
                id: "2",
                title: "Students Engaged in Science Experiment",
                category: "Activities",
                image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=800&fit=crop",
                date: "2025-09-10",
            },
            {
                id: "3",
                title: "Annual Education Conference - Nairobi",
                category: "Events",
                image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=800&fit=crop",
                date: "2025-08-25",
            },
            {
                id: "4",
                title: "Digital Learning Workshop",
                category: "Training",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop",
                date: "2025-08-15",
            },
            {
                id: "5",
                title: "Classroom Collaboration Session",
                category: "Activities",
                image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=800&fit=crop",
                date: "2025-08-01",
            },
            {
                id: "6",
                title: "Teacher Receiving Training Materials",
                category: "Training",
                image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=800&fit=crop",
                date: "2025-07-20",
            },
            {
                id: "7",
                title: "Community Engagement - Rural School",
                category: "Activities",
                image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=800&fit=crop",
                date: "2025-07-15",
            },
            {
                id: "8",
                title: "USEEP Project Launch Event",
                category: "Events",
                image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=800&fit=crop",
                date: "2025-07-10",
            },
            {
                id: "9",
                title: "Science Laboratory Training",
                category: "Training",
                image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&h=800&fit=crop",
                date: "2025-06-28",
            },
            {
                id: "10",
                title: "Students Working on Group Project",
                category: "Activities",
                image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&h=800&fit=crop",
                date: "2025-06-20",
            },
            {
                id: "11",
                title: "Educational Technology Workshop",
                category: "Training",
                image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&h=800&fit=crop",
                date: "2025-06-15",
            },
            {
                id: "12",
                title: "Gender Equality Forum",
                category: "Events",
                image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=800&fit=crop",
                date: "2025-06-08",
            },
            {
                id: "13",
                title: "Teacher Mentorship Program",
                category: "Training",
                image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=800&fit=crop",
                date: "2025-06-01",
            },
            {
                id: "14",
                title: "Student Reading Session",
                category: "Activities",
                image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=800&fit=crop",
                date: "2025-05-25",
            },
            {
                id: "15",
                title: "Regional Education Summit",
                category: "Events",
                image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=800&fit=crop",
                date: "2025-05-18",
            },
            {
                id: "16",
                title: "Mathematics Teaching Methods Workshop",
                category: "Training",
                image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=800&fit=crop",
                date: "2025-05-10",
            },
            {
                id: "17",
                title: "Interactive Learning Activity",
                category: "Activities",
                image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=800&fit=crop",
                date: "2025-05-05",
            },
            {
                id: "18",
                title: "Teacher Excellence Awards Ceremony",
                category: "Events",
                image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=800&fit=crop",
                date: "2025-04-28",
            },
            {
                id: "19",
                title: "Professional Development Session",
                category: "Training",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=800&fit=crop",
                date: "2025-04-20",
            },
            {
                id: "20",
                title: "School Library Reading Program",
                category: "Activities",
                image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=800&fit=crop",
                date: "2025-04-15",
            },
        ],

        // Partners
        partners: [
            {
                id: "1",
                name: "UNESCO",
                logo: "/images/partners/unesco.png",
                website: "https://unesco.org",
            },
            {
                id: "2",
                name: "UNICEF",
                logo: "/images/partners/unicef.png",
                website: "https://unicef.org",
            },
            {
                id: "3",
                name: "African Union",
                logo: "/images/partners/au.png",
                website: "https://au.int",
            },
            {
                id: "4",
                name: "World Bank",
                logo: "/images/partners/worldbank.png",
                website: "https://worldbank.org",
            },
        ],

        // Opportunities
        opportunities: [
            {
                id: "1",
                title: "Education Program Officer",
                type: "job",
                deadline: "2025-11-30",
                description:
                    "We are seeking an experienced Education Program Officer to lead our regional initiatives.",
            },
            {
                id: "2",
                title: "Communications Internship",
                type: "internship",
                deadline: "2025-11-15",
                description:
                    "Join our communications team for a 6-month internship opportunity.",
            },
            {
                id: "3",
                title: "Volunteer Teachers Needed",
                type: "volunteer",
                deadline: "2025-12-31",
                description:
                    "Volunteer to support our teacher training programs across Africa.",
            },
        ],

        // News & Articles
        news: [
            {
                id: "1",
                title: "STIA Trains 500 Teachers in Rural Zimbabwe",
                slug: "stia-trains-500-teachers-rural-zimbabwe",
                excerpt:
                    "Our latest training initiative has successfully equipped 500 teachers with modern pedagogical techniques.",
                content:
                    "<p>Our latest training initiative has successfully equipped 500 teachers with modern pedagogical techniques, focusing on student-centered learning and innovative classroom management strategies.</p><p>The program, which ran for three months across five districts in rural Zimbabwe, brought together educators from diverse backgrounds to share experiences and learn new approaches to teaching.</p>",
                published_date: "2025-09-28",
                author: "Sarah Ndlovu",
                image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop",
                category: "internal",
            },
            {
                id: "2",
                title: "New Partnership with UNESCO",
                slug: "new-partnership-with-unesco",
                excerpt:
                    "STIA announces strategic partnership with UNESCO to expand educational programs across East Africa.",
                content:
                    "<p>STIA announces strategic partnership with UNESCO to expand educational programs across East Africa. This collaboration will bring additional resources and expertise to our teacher training initiatives.</p><p>The partnership focuses on sustainable education development, teacher capacity building, and curriculum innovation across the region.</p>",
                published_date: "2025-09-15",
                author: "Dr. Amina Okonkwo",
                image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop",
                category: "internal",
            },
            {
                id: "3",
                title: "African Education Summit Features STIA",
                slug: "african-education-summit-features-stia",
                excerpt:
                    "The Guardian covers STIA's innovative approach to teacher training at recent education summit.",
                content:
                    "<p>The Guardian covers STIA's innovative approach to teacher training at the recent African Education Summit held in Nairobi. Our Executive Director presented on scalable solutions for rural education.</p><p>The summit brought together education leaders, policymakers, and practitioners from across the continent to discuss the future of education in Africa.</p>",
                published_date: "2025-09-01",
                author: "External",
                image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop",
                category: "external",
                external_source: "The Guardian",
            },
            {
                id: "4",
                title: "Impact Report: 15,000 Teachers Reached",
                slug: "impact-report-15000-teachers-reached",
                excerpt:
                    "Our latest impact report shows remarkable growth in teacher engagement and student outcomes.",
                content:
                    "<p>Our latest impact report shows remarkable growth in teacher engagement and student outcomes across all our program areas. Over the past year, we've reached 15,000 teachers in 12 countries.</p><p>The report highlights significant improvements in teaching quality, student engagement, and learning outcomes in schools where our teachers have been trained.</p>",
                published_date: "2025-08-20",
                author: "Michael Banda",
                image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=500&fit=crop",
                category: "internal",
            },
            {
                id: "5",
                title: "Digital Learning Initiative Launches",
                slug: "digital-learning-initiative-launches",
                excerpt:
                    "STIA launches comprehensive digital learning program to support teachers in remote areas.",
                content:
                    "<p>STIA launches comprehensive digital learning program to support teachers in remote areas. The initiative provides tablets, internet connectivity, and digital teaching resources to educators in underserved communities.</p><p>This program is part of our commitment to bridging the digital divide and ensuring all teachers have access to modern educational tools and resources.</p>",
                published_date: "2025-08-05",
                author: "John Mwangi",
                image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=500&fit=crop",
                category: "internal",
            },
            {
                id: "6",
                title: "Teacher Excellence Awards 2025",
                slug: "teacher-excellence-awards-2025",
                excerpt:
                    "Celebrating outstanding educators who have transformed their communities through innovative teaching.",
                content:
                    "<p>The STIA Teacher Excellence Awards recognize outstanding educators who have demonstrated exceptional commitment to improving education in their communities. This year's winners come from Kenya, Tanzania, and Malawi.</p><p>Winners receive grants to further develop their teaching practices and share their innovations with other educators in their regions.</p>",
                published_date: "2025-07-15",
                author: "Sarah Ndlovu",
                image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop",
                category: "internal",
            },
        ],

        // Newsletters
        newsletters: [
            {
                id: "1",
                title: "STIA Quarterly Newsletter - Q3 2025",
                date: "2025-09-30",
                pdfUrl: "/downloads/newsletter-q3-2025.pdf",
                thumbnail: "/images/newsletters/q3-2025.jpg",
            },
            {
                id: "2",
                title: "STIA Quarterly Newsletter - Q2 2025",
                date: "2025-06-30",
                pdfUrl: "/downloads/newsletter-q2-2025.pdf",
                thumbnail: "/images/newsletters/q2-2025.jpg",
            },
            {
                id: "3",
                title: "STIA Quarterly Newsletter - Q1 2025",
                date: "2025-03-31",
                pdfUrl: "/downloads/newsletter-q1-2025.pdf",
                thumbnail: "/images/newsletters/q1-2025.jpg",
            },
        ],
    }),

    getters: {
        upcomingEvents: (state) => {
            const now = new Date();
            return state.events
                .filter((event) => new Date(event.date) >= now)
                .slice(0, 3);
        },

        activeOpportunities: (state) => {
            const now = new Date();
            return state.opportunities.filter(
                (opp) => new Date(opp.deadline) >= now
            );
        },

        fetchNews: (state) => {},

        recentNews: (state) => {
            return state.news.slice(0, 4);
        },

        internalNews: (state) => {
            return state.news.filter(
                (article) => article.category === "internal"
            );
        },

        externalNews: (state) => {
            return state.news.filter(
                (article) => article.category === "external"
            );
        },

        getNewsBySlug: (state) => (slug) => {
            return state.news.find((article) => article.slug === slug);
        },

        getEventBySlug: (state) => (slug) => {
            return state.events.find((event) => event.slug === slug);
        },
    },
});

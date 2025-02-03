const puppeteer = require('puppeteer');

async function getResumeController(req,res){
    console.log(req.body);
    return res.status(201).json({"resume":req.body})
}

async function downloadResumeController(req, res) {
    const data = {
        "name": "Rohith Nayakar",
        "email": "nayakarrohith@gmail.com",
        "phone": "+1(334) 220-2687",
        "linkedin": "https://linkedin.com/in/nayakar-rohith",
        "github": "https://github.com/Nayakar-Rohith",
        "experience": [
            {
                "title": "Software Engineer",
                "company": "Tata Consultancy Services",
                "dates": "Mar 2021 – Dec 2022",
                "location": "Pune, India",
                "description": [
                    "Developed responsive UI using React.js, improving performance by 15%.",
                    "Engineered RESTful APIs with Node.js, enhancing data efficiency by 25%.",
                    "Received awards for delivering tasks 40% faster than expected."
                ]
            },
            {
                "title": "Frontend Developer Intern",
                "company": "X0PA AI Private Limited",
                "dates": "Jul 2020 – Oct 2020",
                "location": "Hyderabad, India",
                "description": [
                    "Developed scalable UI components using React.js and Redux.",
                    "Implemented a multi-language feature, improving accessibility by 20%."
                ]
            }
        ],
        "projects": [
            {
                "name": "Deep Learning Layer Stacker Tool",
                "description": [
                    "Designed a tool for assembling deep learning models, boosting engagement by 30%.",
                    "Integrated interactive visualizations using D3.js and html2canvas."
                ]
            },
            {
                "name": "Facial Recognition System for Home Security",
                "description": [
                    "Developed a facial recognition system with 88% accuracy.",
                    "Integrated real-time image processing using OpenCV and Keras."
                ]
            }
        ],
        "skills": [
            {
                "name": "Programming Languages",
                "list": ["JavaScript", "Python", "C++", "Java"]
            },
            {
                "name": "Front-End Development",
                "list": ["React.js", "Redux", "Angular", "Bootstrap"]
            },
            {
                "name": "Back-End Development",
                "list": ["Node.js", "Express.js", "MongoDB", "GraphQL"]
            },
            {
                "name": "Cloud & AI",
                "list": ["AWS", "TensorFlow", "OpenCV"]
            }
        ],
        "education": {
            "degree": "Master of Science in Computer Science",
            "university": "Auburn University at Montgomery",
            "years": "May 2023 - Dec 2024"
        }
    };

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Generate HTML for resume dynamically
    const resumeHTML = `
        <html>
        <head>
            <style>
                body { font-family: 'Times New Roman', serif; padding: 40px; }
                .header { font-size: 16px; font-weight: bold; }
                .contact-info { font-size: 10px; font-weight: normal; }
                .section { margin-top: 20px; }
                .section-title { font-size: 11px; font-weight: bold; }
                .job-title { font-size: 10.5px; font-weight: bold; }
                .job-details { font-size: 10px; }
                .project-title { font-size: 10.5px; font-weight: bold; }
                .description { font-size: 10px; }
                .skills-category { font-size: 10px; font-weight: bold; }
                .skills-list { font-size: 10px; }
                .education-degree { font-size: 10px; }
                .education-university { font-size: 10.5px; font-weight: bold; }
                .education-years { font-size: 10px; }
            </style>
        </head>
        <body>
            <div class="header">${data.name}</div>
            <div class="contact-info">${data.email} | ${data.phone} | <a href="${data.linkedin}">LinkedIn</a> | <a href="${data.github}">GitHub</a></div>
            
            ${data.experience.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Work Experience</h2>
                ${data.experience.map(job => `
                    <div>
                        <div class="job-title">${job.title} at ${job.company}</div>
                        <div class="job-details">${job.dates} | ${job.location}</div>
                        <ul class="description">
                            ${job.description.map(point => `<li>${point}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>` : ''}
            
            ${data.projects.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Projects</h2>
                ${data.projects.map(project => `
                    <div>
                        <div class="project-title">${project.name}</div>
                        <ul class="description">
                            ${project.description.map(point => `<li>${point}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>` : ''}
            
            <div class="section">
                <h2 class="section-title">Skills</h2>
                ${data.skills.map(category => `
                    <div>
                        <div class="skills-category">${category.name}</div>
                        <div class="skills-list">${category.list.join(', ')}</div>
                    </div>
                `).join('')}
            </div>

            <div class="section">
                <h2 class="section-title">Education</h2>
                <div class="education-degree">${data.education.degree}, <span class="education-university">${data.education.university}</span></div>
                <div class="education-years">${data.education.years}</div>
            </div>
        </body>
        </html>
    `;

    await page.setContent(resumeHTML, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();
    console.log('PDF Buffer:', pdfBuffer);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.status(200).send(pdfBuffer);
}


module.exports={getResumeController,downloadResumeController}
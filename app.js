document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('resume-data.json');
        const data = await response.json();
        renderResume(data);
    } catch (error) {
        console.error('Error loading resume data:', error);
    }
});

function renderResume(data) {
    const main = document.getElementById('resume-content');
    
    // Render Header
    main.innerHTML = `
        <header class="text-center mb-8">
            <h1 class="text-4xl font-bold mb-2">${data.personalInfo.name}</h1>
            <h2 class="text-2xl text-blue-600 mb-4">${data.personalInfo.title}</h2>
            <div class="flex flex-wrap justify-center gap-4 text-gray-600">
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail w-4 h-4">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <a href="mailto:${data.personalInfo.contact.email}" class="hover:text-blue-600">${data.personalInfo.contact.email}</a>
                </div>
                <span>|</span>
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin w-4 h-4">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect width="4" height="12" x="2" y="9"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <a href="https://www.linkedin.com/in/${data.personalInfo.contact.linkedin}" class="hover:text-blue-600">${data.personalInfo.contact.linkedin}</a>
                </div>
                <span>|</span>
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin w-4 h-4">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>${data.personalInfo.contact.location}</span>
                </div>
            </div>
        </header>

        <!-- Professional Summary -->
        <section class="mb-8">
            <h2 class="text-2xl font-bold mb-4 pb-2 border-b-2 border-blue-600">PROFESSIONAL SUMMARY</h2>
            <p class="text-gray-700 leading-relaxed">${data.professionalSummary}</p>
        </section>

        <!-- Technical Skills -->
        <section class="mb-8">
            <h2 class="text-2xl font-bold mb-6 pb-2 border-b-2 border-blue-600">TECHNICAL SKILLS</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-6 print:gap-6">
                <div>
                    <h3 class="text-xl font-bold text-blue-700 mb-4">Core Skills</h3>
                    <ul class="list-disc pl-5 text-gray-700 space-y-2">
                        ${data.technicalSkills.coreSkills.map(skill => `<li>${skill}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h3 class="text-xl font-bold text-blue-700 mb-4">Languages & Technologies</h3>
                    <div class="space-y-4">
                        <div>
                            <h4 class="font-semibold mb-2">Frontend:</h4>
                            <div class="flex flex-wrap gap-2">
                                ${data.technicalSkills.technologies.frontend.map(tech => `
                                    <span class="px-3 py-1 border border-purple-400 text-purple-700 rounded-full text-sm print:border-purple-700">${tech}</span>
                                `).join('')}
                            </div>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-2">Backend:</h4>
                            <div class="flex flex-wrap gap-2">
                                ${data.technicalSkills.technologies.backend.map(tech => `
                                    <span class="px-3 py-1 border border-purple-400 text-purple-700 rounded-full text-sm print:border-purple-700">${tech}</span>
                                `).join('')}
                            </div>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-2">Development Tools:</h4>
                            <div class="flex flex-wrap gap-2">
                                ${data.technicalSkills.technologies.developmentTools.map(tool => `
                                    <span class="px-3 py-1 border border-orange-400 text-orange-700 rounded-full text-sm print:border-orange-700">${tool}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Experience -->
        <section class="mb-8">
            <h2 class="text-2xl font-bold mb-4 pb-2 border-b-2 border-blue-600">EXPERIENCE</h2>
            ${data.experience.map(job => `
                <div class="mb-6 print:break-inside-avoid">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h3 class="text-xl font-bold">${job.title}</h3>
                            <div class="text-blue-600">${job.company}</div>
                        </div>
                        <div class="text-gray-600">${job.period}</div>
                    </div>
                    <ul class="list-disc pl-5 text-gray-700 space-y-2">
                        ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </section>

        <!-- Projects -->
        <section class="mb-8">
            <h2 class="text-2xl font-bold mb-6 pb-2 border-b-2 border-blue-600">PROJECTS</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-6 print:gap-4">
                ${data.projects.map(project => `
                    <div class="border border-gray-200 p-6 rounded-lg print:border-gray-400 print:break-inside-avoid bg-white">
                        <h3 class="text-xl font-bold text-blue-700 mb-3">${project.name}</h3>
                        <div class="mb-3">
                            <span class="font-semibold">Role:</span> ${project.role}
                        </div>
                        <div class="mb-3">
                            <span class="font-semibold">Description:</span>
                            <ul class="list-disc pl-5 mt-2 space-y-1">
                                ${project.description.map(desc => `<li>${desc}</li>`).join('')}
                            </ul>
                        </div>
                        <div>
                            <div class="flex flex-wrap gap-2 mt-2">
                                ${project.techStack.map(tech => `
                                    <span class="px-3 py-1 border border-purple-400 text-purple-700 rounded-full text-sm print:border-purple-700">${tech}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <!-- Education -->
        <section class="mb-8">
            <h2 class="text-2xl font-bold mb-4 pb-2 border-b-2 border-blue-600">EDUCATION</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${data.education.map(edu => `
                    <div>
                        <h3 class="text-xl font-bold">${edu.degree}</h3>
                        <div class="text-blue-600">${edu.institution}</div>
                        <div class="text-gray-600">${edu.year}</div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}
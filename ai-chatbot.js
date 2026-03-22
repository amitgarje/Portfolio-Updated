const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".chatbot header span");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null;
const inputInitHeight = chatInput.scrollHeight;

// Knowledge base for Amit Garje
const knowledgeBase = {
    skills: "Amit's skills include Java (Advanced), Python (Intermediate), HTML, CSS, JavaScript, SQL. He is also proficient in frameworks like Spring Boot, Hibernate, Node.js, Express.js, and React.js, along with tools like Git, GitHub, Postman, Eclipse, VS Code, and IntelliJ IDEA.",
    education: "Amit is currently pursuing a B.Tech in Computer Engineering from Smt. Indira Gandhi College Of Engineering (Navi Mumbai) with a CGPA of 8.91 (Expected graduation in 2026). He completed his HSC in Science (82%) and SSC (90%).",
    achievements: "Some of Amit's recent achievements include:\n- Solving 100+ LeetCode problems (Top 30%)\n- Earning a 5-Star rating on HackerRank for Java and SQL\n- Developing a full-stack e-commerce system with advanced filtering.",
    projects: "Amit has worked on several projects, including:\n- Sportify E-commerce Website (JSP, Servlet, Java, MySQL)\n- E-Learning Platform (Spring Boot, Hibernate, React.js)\n- Real-Time Chat App (Node.js, Socket.io)\n- Portfolio Website (HTML, CSS, JS, Animations)",
    experience: "Amit completed a Web Developer Internship at OctaNet Services Pvt Ltd (Nov 2023 - Dec 2023), where he designed user-friendly web pages using HTML, CSS, and JS.",
    contact: "You can reach Amit at his contact number: 9029263731. You can also connect with him on LinkedIn: www.linkedin.com/in/amitgarje"
};

const generateResponse = () => {
    const message = userMessage.toLowerCase();
    let response = "";

    if (message.includes("skill") || message.includes("sklills") || message.includes("technology") || message.includes("tech stack") || message.includes("technologies") || message.includes("tools")) {
        response = knowledgeBase.skills;
    } else if (message.includes("education") || message.includes("degree") || message.includes("college") || message.includes("study") || message.includes("university")) {
        response = knowledgeBase.education;
    } else if (message.includes("achievement") || message.includes("achievemt") || message.includes("award") || message.includes("ranking") || message.includes("hacker") || message.includes("leetcode")) {
        response = knowledgeBase.achievements;
    } else if (message.includes("project") || message.includes("work") || message.includes("build") || message.includes("built")) {
        response = knowledgeBase.projects;
    } else if (message.includes("experience") || message.includes("internship") || message.includes("job")) {
        response = knowledgeBase.experience;
    } else if (message.includes("contact") || message.includes("phone") || message.includes("number") || message.includes("email") || message.includes("linkedin") || message.includes("reach") || message.includes("call")) {
        response = knowledgeBase.contact;
    } else if (message.includes("hi") || message.includes("hello") || message.includes("hey")) {
        response = "Hello! I am Amit's AI Assistant. You can ask me about his skills, education, projects, achievements, or ask for his contact information.";
    } else {
        response = "I'm not exactly sure about that. But if there is something different, you can contact Amit directly at his phone number 9029263731 or connect with him on LinkedIn: www.linkedin.com/in/amitgarje";
    }

    // Add response to chatbox with a typing delay effect
    const incomingChatLi = createChatLi("Typing...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        incomingChatLi.querySelector("p").innerText = response;
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 600);
}

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="fas fa-robot"></span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").innerText = message; // Safely set text content
    return chatLi;
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    const outgoingChatLi = createChatLi(userMessage, "outgoing");
    chatbox.appendChild(outgoingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        generateResponse();
    }, 300);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

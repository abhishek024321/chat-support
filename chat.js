(function () {
  const launcher = document.getElementById('launcher');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('closeBtn');
  const clearBtn = document.getElementById('clearBtn');
  const messages = document.getElementById('chatMessages');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const ping = launcher.querySelector('.ping');

  
  function setViewportHeight() {
    document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
  }
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', setViewportHeight);

  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  function openChat() {
    panel.classList.add('open');
    launcher.classList.add('hidden');
    if (ping) ping.style.display = 'none';
   
    if (!isMobile()) input.focus();
    if (isMobile()) document.body.style.overflow = 'hidden';
  }

  function closeChat() {
    panel.classList.remove('open');
    launcher.classList.remove('hidden');
    document.body.style.overflow = '';
  }

  launcher.addEventListener('click', openChat);
  closeBtn.addEventListener('click', closeChat);
  clearBtn.addEventListener('click', clearChat);

  function clearChat() {
    messages.innerHTML = '';
    addBubble("Hey there! How can I help you today?", 'bot');
  }

  function addBubble(text, sender) {
    const div = document.createElement('div');
    div.className = 'bubble ' + sender;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'typing';
    div.id = 'typingIndicator';
    div.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
  }
 
  function getBotReply(rawText) {
    const text = rawText.toLowerCase().trim();

    const rules = [
      { keywords: ['hi', 'hello', 'hey'], reply: "Hey there! How can I help you today?" },
      { keywords: ['help', 'support'], reply: "Sure — I can answer questions about pricing, features, or how to get started. What do you need?" },
      { keywords: ['price', 'pricing', 'cost'], reply: "Pricing depends on what you're after — want me to point you to our plans page?" },
      { keywords: ['thanks', 'thank you'], reply: "You're welcome! Anything else I can help with?" },
      { keywords: ['bye', 'goodbye'], reply: "Take care! Come back anytime." },
      { keywords: ['name'], reply: "I'm just a small demo assistant living in this chat box." },
      { keywords: ['who develop you'], reply: "I was created by Abhishek Bhardwaj 💻 — a passionate Full stack developer from Roorkee." },
      { keywords: ['contact', 'email', 'phone'], reply: "You can reach the team through the contact page — want me to open it for you?" }
,
  
  { keywords: ['hi', 'hello', 'hey'], reply: "Hey there! How can I help you today?" },
  { keywords: ['what is programming', 'define programming'], reply: "Programming is the process of writing instructions that a computer can execute to perform a task." },
  { keywords: ['what is algorithm', 'define algorithm'], reply: "An algorithm is a step-by-step procedure for solving a problem or performing a computation." },
  { keywords: ['what is data structure', 'define data structure'], reply: "A data structure is a way of organizing and storing data so it can be accessed and modified efficiently." },
  { keywords: ['what is oop', 'object oriented programming'], reply: "OOP is a programming paradigm based on objects that contain data (attributes) and behavior (methods)." },
  { keywords: ['what is recursion'], reply: "Recursion is when a function calls itself to solve smaller instances of the same problem." },
  { keywords: ['what is big o', 'time complexity'], reply: "Big O notation describes how an algorithm's runtime or space requirements grow as input size increases." },
  { keywords: ['what is database', 'define database'], reply: "A database is an organized collection of data that can be easily accessed, managed, and updated." },
  { keywords: ['what is api'], reply: "An API (Application Programming Interface) lets different software systems communicate with each other." },
  { keywords: ['what is git', 'what is version control'], reply: "Git is a version control system that tracks changes to code and helps developers collaborate." },
  { keywords: ['what is compiler'], reply: "A compiler translates source code written in a programming language into machine code." },
  { keywords: ['what is operating system'], reply: "An operating system manages computer hardware and software resources and provides services to programs." },
  { keywords: ['what is machine learning'], reply: "Machine learning is a field of AI where systems learn patterns from data to make predictions or decisions." },
  { keywords: ['bye', 'goodbye', 'see you'], reply: "Goodbye! Happy coding!" },

 
  { keywords: ['hi', 'hello coach', 'hey trainer'], reply: "Hey! Ready to crush your fitness goals today?" },
  { keywords: ['how to lose weight'], reply: "Weight loss generally comes from a calorie deficit — burning more calories than you consume, combined with regular exercise." },
  { keywords: ['how to build muscle', 'gain muscle'], reply: "Muscle growth requires progressive resistance training, adequate protein intake, and enough recovery time." },
  { keywords: ['best cardio exercise'], reply: "Running, cycling, swimming, and jump rope are all excellent cardio exercises for heart health and endurance." },
  { keywords: ['how many times a week workout'], reply: "For most people, 3-5 workout sessions per week balances progress with recovery." },
  { keywords: ['what is protein for'], reply: "Protein helps repair and build muscle tissue, making it essential for recovery and growth after workouts." },
  { keywords: ['stretching before workout'], reply: "Dynamic stretching before a workout helps warm up muscles and reduce injury risk." },
  { keywords: ['rest day importance'], reply: "Rest days allow muscles to repair and grow, preventing overtraining and reducing injury risk." },
  { keywords: ['best diet for fitness'], reply: "A balanced diet with lean protein, complex carbs, healthy fats, and vegetables supports most fitness goals." },
  { keywords: ['how much water to drink'], reply: "A general guideline is about 2-3 liters a day, more if you're exercising intensely or in hot weather." },
  { keywords: ['beginner workout plan'], reply: "Beginners should start with full-body workouts 3x a week, focusing on form before adding heavy weight." },
  { keywords: ['bye', 'goodbye', 'see you'], reply: "Great job today! See you at the next workout!" },
];


    

    for (const rule of rules) {
      if (rule.keywords.some(k => text.includes(k))) {
        return rule.reply;
      }
    }

    const fallbacks = [
      "Got it — tell me a bit more about what you're looking for.",
      "I'm not totally sure about that one, but I'm happy to help however I can.",
      "Interesting — could you rephrase that so I can help better?"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addBubble(text, 'user');
    input.value = '';

    showTyping();
    const delay = 500 + Math.random() * 600;
    setTimeout(() => {
      hideTyping();
      addBubble(getBotReply(text), 'bot');
    }, delay);
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') sendMessage();
  });

 
  openChat();
})();
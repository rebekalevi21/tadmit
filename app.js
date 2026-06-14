/* Application JavaScript Logic - ICU Nurse Educator Portal */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initNavigation();
    initHubTabs();
    initStepGuides();
    initSimulation();
    initLinksLibrary();
    initProtocols();
    initCvWidget();
});

/* ==========================================================================
   1. Theme Management (Light/Dark Mode)
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light-mode';
    
    document.body.className = currentTheme;
    updateThemeIcon(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = document.body.className;
        const newTheme = activeTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';
        
        document.body.className = newTheme;
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeToggleBtn = document.getElementById('themeToggle');
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark-mode') {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
}

/* ==========================================================================
   2. Mobile Drawer Navigation Menu
   ========================================================================== */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active-menu');
        const icon = menuToggle.querySelector('i');
        icon.className = navMenu.classList.contains('active-menu') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });
}

/* ==========================================================================
   3. Single Page Section Navigation
   ========================================================================== */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-tab');
            switchToSection(sectionId);
        });
    });

    // Handle hash links on page load or custom button clicks
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            switchToSection(hash);
        }
    });
}

function switchToSection(sectionId) {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    
    // Hide all sections
    document.querySelectorAll('.hero-section, .section-container').forEach(sec => {
        sec.classList.remove('active-section');
    });
    
    // Show active section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active-section');
    }
    
    // Update Nav links active state
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('data-tab') === sectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu if active
    if (navMenu.classList.contains('active-menu')) {
        navMenu.classList.remove('active-menu');
        menuToggle.querySelector('i').className = 'fa-solid fa-bars';
    }
}

/* ==========================================================================
   4. Learner Hub Tab Selection
   ========================================================================== */
function initHubTabs() {
    const tabBtns = document.querySelectorAll('.hub-tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-hub-tab');
            
            // Toggle buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Toggle tab content panels
            document.querySelectorAll('.hub-tab-content').forEach(panel => {
                panel.classList.remove('active-tab');
            });
            document.getElementById(tabId).classList.add('active-tab');
        });
    });
}

/* ==========================================================================
   5. Step-by-Step Guides Panel Player
   ========================================================================== */
const guidesData = {
    'monitor-connection': {
        title: 'חיבור ואיפוס מוניטור פולשני (Invasive Pressure Monitoring)',
        intro: 'מדריך מעשי לחיבור קו עורק (Arterial Line) או לחץ ורידי מרכזי (CVP) למוניטור היחידה:',
        steps: [
            {
                title: 'הכנת המערכת ושטיפת הסט (Flushing)',
                desc: 'יש להכין שקית סליין 0.9% 500 מ"ל, לחבר אליה את סט מתמר הלחץ ולשטוף את כל הצינוריות והברזים היטב כדי לוודא שאין בועות אוויר בסט (בועות גורמות לשיכוך גל הלחץ - Damping).'
            },
            {
                title: 'ניפוח שקית הלחץ (Pressure Bag)',
                desc: 'יש להכניס את שקית הסליין לשרוול לחץ ייעודי ולנפח אותו ללחץ קבוע של 300 ממ"כ (מבטיח שטיפה רציפה ואיטית של 3 מ"ל בשעה למניעת קרישה).'
            },
            {
                title: 'קביעת גובה אפס פיזיולוגי (Phlebostatic Axis)',
                desc: 'יש למקם את מתמר הלחץ בגובה הציר הפלבוסטטי של המטופל - הצטלבות של המרווח הבין-צלעי הרביעי וקו בית השחי האמצעי (מייצג את גובה העלייה הימנית בלב).'
            },
            {
                title: 'ביצוע פעולת איפוס (Zeroing)',
                desc: 'סגור את הברז לכיוון המטופל ופתח אותו לאוויר החופשי. לחץ על כפתור Zero במוניטור הראשי והמתן לאישור כיול (מופיע כ-0 במוניטור). לאחר מכן, סגור את הברז לאוויר ופתח אותו בחזרה אל המטופל.'
            },
            {
                title: 'כוונון התראות (Alarm Limits)',
                desc: 'הגדר את גבולות ההתראה ללחצי הדם (סיסטולי, דיאסטולי וממוצע - MAP) בהתאם ליעד הטיפולי שהוגדר על ידי הרופא.'
            }
        ]
    },
    'surgical-prep': {
        title: 'הכנה לפרוצדורה כירורגית דחופה ביחידה',
        intro: 'ביצוע פרוצדורות פולשניות לצד מיטת המטופל (כמו החדרת נקז חזה או פיום קנה - Tracheostomy) דורש היערכות מהירה ובטוחה של צוות הסיעוד:',
        steps: [
            {
                title: 'הכנת סביבת העבודה ומיגון הצוות',
                desc: 'יש לפנות את השטח סביב מיטת המטופל, לוודא תאורה נאותה ולהכין חלוקים סטריליים, מסכות, כובעים וכפפות סטריליות לכל אנשי הצוות המשתתפים בפרוצדורה.'
            },
            {
                title: 'הכנת עגלת פרוצדורות וציוד סטרילי',
                desc: 'הבא לחדר עגלת מגן ייעודית, ערכה כירורגית בסיסית, חומרי חיטוי (כלורהקסידין), בדי שמירה סטריליים (Drapes), ומזרקים עם חומרי הרדמה מקומית (לידוקאין).'
            },
            {
                title: 'הכנת תרופות הרגעה, שיכוך והחייאה',
                desc: 'הכן מזרקי סדציה ואנלגזיה בהתאם להנחיות הרפואיות (למשל: פרופופול, פנטניל) וודא כי עגלת ההחייאה ומכשיר הדפיברילטור ממוקמים בקרבת מקום ומוכנים לפעולה.'
            },
            {
                title: 'חיבור עזרים ומעקב המודינמי',
                desc: 'הגבר את זרימת החמצן למטופל (פרה-אוקסיגנציה), הגדר קריאת סימנים חיוניים במוניטור למרווחים קצרים (כל 3-5 דקות) ורשום מדדי בסיס לפני תחילת הפעולה.'
            },
            {
                title: 'Time-Out (פסק זמן בטיחותי)',
                desc: 'לפני ביצוע החתך הראשון, עצור את הצוות וודא בקול רם: זהות המטופל, סוג הפרוצדורה, מיקום הפרוצדורה (למשל: צד ימין של החזה), ומתן אנטיביוטיקה מונעת במידת הצורך.'
            }
        ]
    }
};

function initStepGuides() {
    const guideBtns = document.querySelectorAll('.guide-select-btn');
    
    // Render first guide by default
    renderStepGuide('monitor-connection');
    
    guideBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const guideId = btn.getAttribute('data-guide-id');
            
            // Switch active buttons
            guideBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Render Selected Guide
            renderStepGuide(guideId);
        });
    });
}

function renderStepGuide(guideId) {
    const panel = document.getElementById('guideDisplayPanel');
    const data = guidesData[guideId];
    
    if (!data) return;
    
    let stepsHtml = '';
    data.steps.forEach((step, idx) => {
        stepsHtml += `
            <div class="guide-step-item">
                <div class="step-number-circle">${idx + 1}</div>
                <div class="step-content">
                    <h4 class="step-title">${step.title}</h4>
                    <p class="step-desc">${step.desc}</p>
                </div>
            </div>
        `;
    });
    
    panel.innerHTML = `
        <div class="guide-header">
            <h3 class="guide-title">${data.title}</h3>
            <p class="guide-intro">${data.intro}</p>
        </div>
        <div class="guide-steps-list">
            ${stepsHtml}
        </div>
    `;
}

/* ==========================================================================
   6. Clinical Case Study Interactive Simulation
   ========================================================================== */
const simQuestions = [
    {
        vitals: { temp: "38.7°C", hr: "112", bp: "90/50", rr: "24", map: "63" },
        question: "שאלה 1: לאור מדדי המטופל (חום 38.7, דופק 112, ל\"ד 90/50, נשימות 24), מהו החשד הקליני המיידי שלך וכיצד תבצע/י הערכה ראשונית?",
        options: [
            "חשד לאוטם שריר הלב (NSTEMI) עקב הטכיקרדיה, ביצוע אק\"ג דחוף ב-12 חיבורים.",
            "חשד לתגובה דלקתית סיסטמית קשה וספסיס (Sepsis) כתוצאה מזיהום בטני פוטנציאלי, הערכה באמצעות מדדי SIRS / qSOFA.",
            "חשד לאנפילקסיס בשל תת לחץ דם, מתן אדרנלין מיידי בזריקה לשריר הירך."
        ],
        correctIndex: 1,
        explanation: "נכון מאוד! השילוב של חום גבוה, דופק מהיר, נשימות מהירות ותת-לחץ דם (ממוצע MAP 63) ביום 2 לאחר ניתוח בטן גדול מצביע בבירור על תגובה דלקתית סיסטמית (SIRS) וסיכון לספסיס. הערכה מוקדמת מצילה חיים."
    },
    {
        vitals: { temp: "38.5°C", hr: "108", bp: "92/52", rr: "22", map: "65" },
        question: "שאלה 2: הרופא אישר חשד לספסיס. מהי שרשרת הפעולות הראשונה שיש לבצע בשעה הראשונה ('Hour-1 Bundle') בהתאם להנחיות האיגוד הבינלאומי (Surviving Sepsis)?",
        options: [
            "לקיחת שתי תרביות דם, בדיקת רמת לקטט, מתן נוזלים קריסטלואידיים במינון 30 מ\"ל/ק\"ג והתחלת אנטיביוטיקה רחבת טווח.",
            "חיבור מיידי של המטופל למכשיר הנשמה תומך מסוג CPAP ומתן מנת שתן מהירה במזרק.",
            "שליחת המטופל לבדיקת CT בטן דחופה לשלילת דלף כירורגי לפני מתן תרופות כלשהן."
        ],
        correctIndex: 0,
        explanation: "מדויק! פרוטוקול 'שעת הזהב' (Hour-1 Bundle) דורש לקיחת תרביות דם (משני מקומות שונים לפני מתן אנטיביוטיקה), בדיקת רמת לקטט התחלתית, מתן נוזלים מהיר (30 מ\"ל לק\"ג) והתחלת טיפול אנטיביוטי רחב טווח במהירות האפשרית."
    },
    {
        vitals: { temp: "37.8°C", hr: "98", bp: "84/42", rr: "20", map: "56" },
        question: "שאלה 3: לאחר השלמת החייאת נוזלים מלאה (2.5 ליטר סליין), לחץ הדם של המטופל נותר נמוך מאוד (84/42, MAP 56) והלקטט עלה ל-3.5 ממול/לטר. מהו הצעד הטיפולי הבא?",
        options: [
            "מתן מנה נוספת של 3 ליטר נוזלים קריסטלואידיים במהירות כדי להשיג נפח הולם.",
            "מתן עירוי של תמיסת סודיום ביקרבונט לתיקון החומציות בדם.",
            "החדרת קו עורק (Arterial Line) והתחלת עירוי של תרופה מכווצת כלי דם (Vasopressor) - נוראדרנלין (Noradrenaline) כיעד לשמירה על MAP >= 65."
        ],
        correctIndex: 2,
        explanation: "מצוין! כאשר תת-לחץ הדם נותר עמיד להחייאת נוזלים הולמת והלקטט גבוה, המטופל נמצא בשוק ספטי (Septic Shock). הצעד הבא הוא התחלה מהירה של וזופרסורים (נוראדרנלין הוא קו ראשון) דרך עירוי מרכזי/עורקי כדי לשמור על לחץ דם ממוצע MAP תקין."
    }
];

let simState = {
    currentQuestion: 0,
    score: 0,
    answers: [],
    step: 'intro' // 'intro', 'question', 'explanation', 'result'
};

function initSimulation() {
    renderSimScreen();
}

function renderSimScreen() {
    const simBody = document.getElementById('simBody');
    const scoreBadge = document.getElementById('simScoreBadge');
    
    scoreBadge.textContent = `ציון: ${simState.score} / 100`;
    
    if (simState.step === 'intro') {
        simBody.innerHTML = `
            <div class="sim-intro-screen">
                <div class="sim-case-description">
                    <strong>תיאור מקרה:</strong> מטופל בן 68 מאושפז ביחידה לטיפול נמרץ, ביום השני לאחר ניתוח גדול לכריתת מעי גס (Hemicolectomy) בשל גידול. במהלך משמרת הבוקר האחות שמה לב לירידה במצב הערנות שלו, מיעוט שתן וקצב נשימה מהיר.
                </div>
                <div class="sim-vital-signs">
                    <div class="vital-item">
                        <span class="vital-label">חום גוף</span>
                        <span class="vital-value text-red">38.7°C</span>
                    </div>
                    <div class="vital-item">
                        <span class="vital-label">דופק</span>
                        <span class="vital-value text-red">112 לדקה</span>
                    </div>
                    <div class="vital-item">
                        <span class="vital-label">לחץ דם</span>
                        <span class="vital-value text-red">90/50 ממ"כ</span>
                    </div>
                    <div class="vital-item">
                        <span class="vital-label">נשימות</span>
                        <span class="vital-value text-red">24 לדקה</span>
                    </div>
                    <div class="vital-item">
                        <span class="vital-label">סטורציה</span>
                        <span class="vital-value text-green">94%</span>
                    </div>
                </div>
                <button class="btn btn-primary btn-block" onclick="startSimQuestions()">
                    <i class="fa-solid fa-play"></i> התחל סימולציה
                </button>
            </div>
        `;
    } 
    else if (simState.step === 'question') {
        const qData = simQuestions[simState.currentQuestion];
        
        let optionsHtml = '';
        qData.options.forEach((opt, idx) => {
            optionsHtml += `
                <button class="sim-option-btn" onclick="selectSimOption(${idx})">
                    ${opt}
                </button>
            `;
        });
        
        simBody.innerHTML = `
            <div class="sim-question-screen">
                <div class="sim-vital-signs">
                    <div class="vital-item">
                        <span class="vital-label">חום גוף</span>
                        <span class="vital-value">${qData.vitals.temp}</span>
                    </div>
                    <div class="vital-item">
                        <span class="vital-label">דופק</span>
                        <span class="vital-value">${qData.vitals.hr}</span>
                    </div>
                    <div class="vital-item">
                        <span class="vital-label">לחץ דם</span>
                        <span class="vital-value">${qData.vitals.bp}</span>
                    </div>
                    <div class="vital-item">
                        <span class="vital-label">נשימות</span>
                        <span class="vital-value">${qData.vitals.rr}</span>
                    </div>
                    <div class="vital-item">
                        <span class="vital-label">לחץ דם ממוצע (MAP)</span>
                        <span class="vital-value">${qData.vitals.map} ממ"כ</span>
                    </div>
                </div>
                <h4 class="sim-question-title">${qData.question}</h4>
                <div class="sim-options-list">
                    ${optionsHtml}
                </div>
            </div>
        `;
    } 
    else if (simState.step === 'explanation') {
        const qData = simQuestions[simState.currentQuestion];
        const lastSelected = simState.answers[simState.currentQuestion];
        const isCorrect = lastSelected === qData.correctIndex;
        
        let optionsHtml = '';
        qData.options.forEach((opt, idx) => {
            let statusClass = '';
            if (idx === qData.correctIndex) {
                statusClass = 'correct';
            } else if (idx === lastSelected) {
                statusClass = 'wrong';
            }
            optionsHtml += `
                <button class="sim-option-btn ${statusClass}" disabled>
                    ${opt}
                </button>
            `;
        });
        
        simBody.innerHTML = `
            <div class="sim-question-screen">
                <h4 class="sim-question-title">${qData.question}</h4>
                <div class="sim-options-list">
                    ${optionsHtml}
                </div>
                <div class="sim-feedback ${isCorrect ? 'correct' : 'wrong'}">
                    <h5>${isCorrect ? '<i class="fa-solid fa-circle-check"></i> תשובה נכונה!' : '<i class="fa-solid fa-circle-xmark"></i> תשובה שגויה...'}</h5>
                    <p>${qData.explanation}</p>
                </div>
                <button class="btn btn-primary btn-block" onclick="nextSimStep()">
                    ${simState.currentQuestion < simQuestions.length - 1 ? 'לשאלה הבאה <i class="fa-solid fa-arrow-left"></i>' : 'לצפייה בתוצאות הסימולציה'}
                </button>
            </div>
        `;
    } 
    else if (simState.step === 'result') {
        simBody.innerHTML = `
            <div class="sim-result-screen text-center" style="text-align: center;">
                <i class="fa-solid fa-square-poll-vertical" style="font-size: 4rem; color: var(--primary); margin-bottom: 1.5rem;"></i>
                <h3 style="font-size: 1.8rem; margin-bottom: 1rem;">הסימולציה הושלמה בהצלחה!</h3>
                <p style="font-size: 1.2rem; margin-bottom: 2rem;">הציון הסופי שלך הוא: <strong>${simState.score} מתוך 100</strong></p>
                <div class="sim-case-description" style="text-align: right; margin-bottom: 2.5rem;">
                    <h5>נקודות מפתח לסיכום המקרה:</h5>
                    <ul style="padding-right: 1.5rem; list-style-type: disc; margin-top: 0.5rem;">
                        <li>ספסיס הוא מצב חירום רפואי רגיש לזמן (Time-Sensitive). זיהוי מוקדם מציל חיים.</li>
                        <li>פרוטוקול 'שעת הזהב' מהווה את אבן היסוד להפחתת תמותה.</li>
                        <li>מעקב צמוד אחר לחץ דם ממוצע (MAP >= 65) וערכי הלקטט מכוונים את תהליך החייאת הנוזלים וזיהוי שוק ספטי.</li>
                    </ul>
                </div>
                <button class="btn btn-outline" onclick="restartSim()">
                    <i class="fa-solid fa-arrow-rotate-right"></i> התחל סימולציה מחדש
                </button>
            </div>
        `;
    }
}

window.startSimQuestions = function() {
    simState.step = 'question';
    renderSimScreen();
};

window.selectSimOption = function(idx) {
    simState.answers.push(idx);
    const qData = simQuestions[simState.currentQuestion];
    
    // Check if correct
    if (idx === qData.correctIndex) {
        simState.score += Math.round(100 / simQuestions.length);
    }
    
    simState.step = 'explanation';
    renderSimScreen();
};

window.nextSimStep = function() {
    if (simState.currentQuestion < simQuestions.length - 1) {
        simState.currentQuestion++;
        simState.step = 'question';
    } else {
        simState.step = 'result';
    }
    renderSimScreen();
};

window.restartSim = function() {
    simState = {
        currentQuestion: 0,
        score: 0,
        answers: [],
        step: 'intro'
    };
    renderSimScreen();
};

/* ==========================================================================
   7. Links Library Search & Filter System
   ========================================================================== */
const linksData = [
    {
        title: 'חוזר מנכ"ל משרד הבריאות - הנחיות לניהול זיהומים',
        url: 'https://www.health.gov.il',
        desc: 'הנחיות רשמיות ונהלי עבודה למניעת זיהומים נרכשים בבתי חולים.',
        category: 'guidelines',
        categoryLabel: 'הנחיות רשמיות'
    },
    {
        title: 'האיגוד הישראלי לטיפול נמרץ',
        url: 'https://www.icu.org.il',
        desc: 'ניירות עמדה, כנסים מקצועיים והנחיות קליניות של איגוד הרופאים והאחיות בטיפול נמרץ.',
        category: 'associations',
        categoryLabel: 'איגודים מקצועיים'
    },
    {
        title: 'מאגר המאמרים הרפואי PubMed / MEDLINE',
        url: 'https://pubmed.ncbi.nlm.nih.gov',
        desc: 'גישה חופשית למיליוני מאמרים אקדמיים ומחקרים קליניים בתחום הרפואה והסיעוד.',
        category: 'academic',
        categoryLabel: 'מאגרי ידע אקדמיים'
    },
    {
        title: 'הנחיות החייאה מתקדמות - American Heart Association (AHA)',
        url: 'https://www.cpr.heart.org',
        desc: 'הנחיות בינלאומיות מעודכנות לביצוע החייאה בסיסית ומתקדמת (BLS / ACLS).',
        category: 'guidelines',
        categoryLabel: 'הנחיות רשמיות'
    },
    {
        title: 'הסתדרות האחיות בישראל',
        url: 'https://www.nurses.org.il',
        desc: 'אתר הבית של האחיות והאחים בישראל - זכויות, השתלמויות ופיתוח קריירה.',
        category: 'associations',
        categoryLabel: 'איגודים מקצועיים'
    },
    {
        title: 'UpToDate - מאגר החלטות קליניות מבוסס ראיות',
        url: 'https://www.uptodate.com',
        desc: 'מערכת תומכת החלטות קליניות מבוססת הוכחות המובילה בעולם לרופאים ואחיות.',
        category: 'academic',
        categoryLabel: 'מאגרי ידע אקדמיים'
    }
];

let activeFilter = 'all';

function initLinksLibrary() {
    const searchInput = document.getElementById('librarySearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    renderLinksList(linksData);
    
    searchInput.addEventListener('input', () => {
        filterLinks();
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            activeFilter = btn.getAttribute('data-filter');
            filterLinks();
        });
    });
}

function filterLinks() {
    const query = document.getElementById('librarySearch').value.toLowerCase();
    
    const filtered = linksData.filter(link => {
        const matchesCategory = activeFilter === 'all' || link.category === activeFilter;
        const matchesSearch = link.title.toLowerCase().includes(query) || 
                              link.desc.toLowerCase().includes(query) ||
                              link.categoryLabel.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });
    
    renderLinksList(filtered);
}

function renderLinksList(list) {
    const linksList = document.getElementById('linksList');
    
    if (list.length === 0) {
        linksList.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>לא נמצאו קישורים התואמים את החיפוש.</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    list.forEach(link => {
        html += `
            <div class="link-item-card">
                <div class="link-details">
                    <span class="link-badge ${link.category}">${link.categoryLabel}</span>
                    <h4 class="link-title">${link.title}</h4>
                    <p class="card-text" style="margin-bottom: 0.5rem;">${link.desc}</p>
                    <span class="link-url-text">${link.url}</span>
                </div>
                <a href="${link.url}" target="_blank" class="btn-external-link" aria-label="פתח קישור חיצוני בטאב חדש">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </div>
        `;
    });
    
    linksList.innerHTML = html;
}

/* ==========================================================================
   8. Blog Post Expandable Content Accordion
   ========================================================================== */
window.togglePostContent = function(postId) {
    const expandedContent = document.getElementById(`postContent${postId}`);
    const btn = expandedContent.parentElement.querySelector('.btn-read-more');
    const btnText = btn.querySelector('.btn-text');
    
    const isShowing = expandedContent.classList.contains('active-post');
    
    if (isShowing) {
        expandedContent.classList.remove('active-post');
        btn.classList.remove('active');
        btnText.textContent = postId === 1 ? 'קרא את הניתוח המלא' : 'קרא את הכתבה המלאה';
    } else {
        expandedContent.classList.add('active-post');
        btn.classList.add('active');
        btnText.textContent = 'סגור תוכן מורחב';
    }
};

window.filterBlog = function(category) {
    // Navigate user to blog page tab
    switchToSection('blog-thoughts');
    
    const posts = document.querySelectorAll('.blog-post-card');
    
    posts.forEach(post => {
        const hasTag = post.querySelector(`.post-tag`).classList.contains(`tag-${category}`);
        if (category === 'all' || hasTag) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
};

/* ==========================================================================
   9. Modals Controls (Details Views and Printing Protocols)
   ========================================================================== */
const modalData = {
    cheatSheets: {
        'als': `
            <div class="modal-cheat-sheet">
                <h3>סכמת החייאה מתקדמת (ALS) בטיפול נמרץ</h3>
                
                <section>
                    <h4><i class="fa-solid fa-circle-play"></i> שלב 1: זיהוי ראשוני והתחלת פעולות</h4>
                    <ul>
                        <li>בדוק בטיחות סביבתית ותגובתיות של החולה.</li>
                        <li>בדוק דופק קרוטידי ונשימה בו זמנית (למשך עד 10 שניות).</li>
                        <li>במידה ואין תגובה, דופק או נשימה תקינה - הזעק עזרה וקרא לעגלת החייאה ודפיברילטור.</li>
                        <li>התחל מייד עיסויי חזה בקצב של 100-120 בדקה ובעומק של 5-6 ס"מ.</li>
                    </ul>
                </section>

                <section>
                    <h4><i class="fa-solid fa-bolt"></i> שלב 2: אבחון מקצב ומתן שוק</h4>
                    <ul>
                        <li>חבר את מדבקות הדפיברילטור ועצור עיסויים לרגע לבדיקת מקצב.</li>
                        <li><strong>מקצב שוקבילי (Shockable): VF / Pulseless VT</strong>
                            <ol>
                                <li>טען דפיברילטור ותן שוק (150-200J ביפאזי).</li>
                                <li>חדש מייד עיסויי חזה ל-2 דקות נוספות (ללא עיכוב לבדיקת דופק).</li>
                            </ol>
                        </li>
                        <li><strong>מקצב שאינו שוקבילי (Non-Shockable): PEA / Asystole</strong>
                            <ol>
                                <li>תן אדרנלין 1 מ"ג IV/IO מייד.</li>
                                <li>המשך עיסויי חזה ל-2 דקות נוספות.</li>
                            </ol>
                        </li>
                    </ul>
                </section>

                <section>
                    <h4><i class="fa-solid fa-syringe"></i> שלב 3: ניהול תרופות ונתיב אוויר</h4>
                    <ul>
                        <li><strong>אדרנלין (Adrenaline):</strong> 1 מ"ג כל 3-5 דקות. במקצב שוקבילי יינתן לאחר השוק השלישי.</li>
                        <li><strong>אמיודארון (Amiodarone):</strong> מנה ראשונה 300 מ"ג לאחר השוק השלישי, מנה שנייה 150 מ"ג לאחר השוק החמישי.</li>
                        <li><strong>נתיב אוויר מתקדם:</strong> שקול ביצוע אינטובציה או החדרת נתיב אוויר סופרה-גלוטי. במידה והוחדר - הנשם בקצב רציף של 10 נשימות בדקה (נשימה כל 6 שניות) תוך המשך עיסויי חזה רציפים ללא הפסקות.</li>
                    </ul>
                </section>

                <section>
                    <h4><i class="fa-solid fa-magnifying-glass-chart"></i> שלב 4: איתור גורמים הפיכים (4H & 4T)</h4>
                    <p>במהלך ההחייאה יש לחפש ולטפל בגורמים הבאים:</p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.5rem;">
                        <div>
                            <strong>4 H's:</strong>
                            <ul>
                                <li>Hypoxia (חוסר חמצן)</li>
                                <li>Hypovolemia (תת נפח דם)</li>
                                <li>Hydrogen Ion / Acidosis (חמצת)</li>
                                <li>Hypo/Hyperkalemia (הפרעות אשלגן)</li>
                            </div>
                            <div>
                                <strong>4 T's:</strong>
                                <ul>
                                    <li>Tension Pneumothorax (חזה אוויר בלחץ)</li>
                                    <li>Tamponade Cardiac (טמפונדה לבבית)</li>
                                    <li>Toxins (רעלים ותרופות)</li>
                                    <li>Thrombosis (תסחיף ריאתי או כלילי)</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            `,
        'intubation': `
            <div class="modal-cheat-sheet">
                <h3>רשימת תיוג להכנת אינטובציה (Intubation Checklist)</h3>
                
                <section>
                    <h4><i class="fa-solid fa-users"></i> 1. הגדרת תפקידים בצוות (Roles)</h4>
                    <ul>
                        <li><strong>רופא מבצע:</strong> אחראי על לרינגוסקופיה והחדרת הטובוס.</li>
                        <li><strong>אחות/רופא תרופות:</strong> הכנה ומתן תרופות להרדמה והרפיית שרירים (RSI).</li>
                        <li><strong>אחות מסייעת:</strong> קיבוע טובוס, מעקב מוניטור, ביצוע לחיצה קריקואידית (Sellick Maneuver) במידת הצורך.</li>
                    </ul>
                </section>

                <section>
                    <h4><i class="fa-solid fa-toolbox"></i> 2. הכנת ציוד (Equipment)</h4>
                    <ul>
                        <li>מקור סקשן (שאיבה) עובד ונבדק עם קטטר שאיבה רך וקשיח (Yankauer).</li>
                        <li>שני ידיות לרינגוסקופ עובדות ותואמות להבים בגדלים מתאימים (להב מקינטוש 3, 4).</li>
                        <li>צינורות קנה (טובוסים) בשלושה גדלים (למשל: 7.0, 7.5, 8.0) - בדיקת הבלונית (Cuff) באמצעות מזרק.</li>
                        <li>מוליך קשיח (Stylit) מושחל בטובוס ומכופף בצורת "מקל הוקי".</li>
                        <li>מזרק 10 סמ"ק לניפוח בלונית, חומר סיכוך על בסיס מים, סרט או מתקן ייעודי לקיבוע טובוס.</li>
                        <li>בלון הנשמה (Ambu Bag) מחובר למקור חמצן 100% ומסיכת הנשמה תואמת.</li>
                        <li>מכשיר קפנוגרף (EtCO2) מחובר ומכויל במוניטור.</li>
                    </ul>
                </section>

                <section>
                    <h4><i class="fa-solid fa-lungs"></i> 3. פרה-אוקסיגנציה (Pre-oxygenation)</h4>
                    <ul>
                        <li>תן 100% חמצן למטופל למשך 3 דקות לפחות לפני הפרוצדורה באמצעות מסיכת העשרה או בלון אמבו.</li>
                        <li>מטרת שלב זה: שטיפת חנקן מהריאות (Denitrogenation) ויצירת מאגר חמצן למניעת דה-סטורציה בזמן השהיית הנשימה.</li>
                    </ul>
                </section>

                <section>
                    <h4><i class="fa-solid fa-capsules"></i> 4. תרופות להשראה מהירה (RSI Medication)</h4>
                    <p>יש להכין ולסמן מזרקים בבירור:</p>
                    <ul>
                        <li><strong>חומר הרדמה (Sedative):</strong> Etomidate (0.3 mg/kg) או Propofol (1-2 mg/kg) או Ketamine (1-2 mg/kg).</li>
                        <li><strong>משתק שרירים (Paralytic):</strong> Rocuronium (1.2 mg/kg) או Succinylcholine (1.5 mg/kg).</li>
                    </ul>
                </section>

                <section>
                    <h4><i class="fa-solid fa-stethoscope"></i> 5. אישור מיקום הטובוס והפעולות הבאות</h4>
                    <ol>
                        <li>ניפוח בלון הטובוס מייד לאחר ההחדרה.</li>
                        <li>מעקב אחר גל קפנוגרפיה (EtCO2) במוניטור - הראייה המובהקת ביותר למיקום נכון בקנה.</li>
                        <li>האזנה באמצעות סטטוסקופ לחמש נקודות: שתי הריאות בבסיסים, שתי הריאות בפסגות והקיבה (לוודא שאין קולות הנשמה בקיבה).</li>
                        <li>קיבוע הטובוס ורישום גובה השיניים (למשל: 22 ס"מ בשפתיים).</li>
                        <li>ביצוע צילום חזה לאישור סופי של מיקום קצה הטובוס (3-5 ס"מ מעל הקרינה).</li>
                    </ol>
                </section>
            </div>
        `,
        'art-line': `
            <div class="modal-cheat-sheet">
                <h3>ניהול קו עורק (Arterial Line Management)</h3>
                
                <section>
                    <h4><i class="fa-solid fa-circle-info"></i> רקע כללי והתוויות</h4>
                    <p>קו עורק מוחדר לצורך ניטור רציף של לחץ הדם הסיסטולי, הדיאסטולי והממוצע (MAP) וללקיחת דגימות דם חוזרות לבדיקת גזים בדם (ABG) ללא צורך בדקירות חוזרות.</p>
                </section>

                <section>
                    <h4><i class="fa-solid fa-vial"></i> 1. בדיקה מקדימה: מבחן אלן (Allen Test)</h4>
                    <p>לפני החדרת קטטר לעורק הרדיאלי (המיקום השכיח), יש לוודא אספקת דם קולטרלית תקינה לכף היד מהעורק האולנרי:</p>
                    <ol>
                        <li>לחץ על שני העורקים (הרדיאלי והאולנרי) בפרק כף היד עד שהיד הופכת חיוורת.</li>
                        <li>שחרר את הלחץ על העורק האולנרי בלבד.</li>
                        <li>צבע היד צריך לחזור למצב ורדרד תקין בתוך 5-15 שניות (אלן חיובי = אספקה תקינה, בטוח להחדיר).</li>
                    </ol>
                </section>

                <section>
                    <h4><i class="fa-solid fa-arrows-spin"></i> 2. הרכבת ושטיפת המערכת</h4>
                    <ul>
                        <li>חבר את סט מתמר הלחץ לשקית סליין 0.9% 500 מ"ל.</li>
                        <li>שטוף את המערכת וודא שאין בועות אוויר.</li>
                        <li>עטוף את שקית הנוזל בשרוול לחץ (Pressure Bag) ונפח אותו ל-300 ממ"כ.</li>
                    </ul>
                </section>

                <section>
                    <h4><i class="fa-solid fa-gauge"></i> 3. ביצוע כיול לאפס (Zeroing)</h4>
                    <p>יש לבצע כיול פעם במשמרת, לאחר כל ניוד של החולה או אם מופיעים גלי לחץ שאינם הגיוניים:</p>
                    <ol>
                        <li>מקם את שסתום המתמר בגובה הלב של המטופל (Phlebostatic Axis).</li>
                        <li>סובב את הברז התלת-כיווני (Three-way stopcock) כך שהמעבר למטופל נסגר, והמתמר נפתח לאוויר החופשי.</li>
                        <li>לחץ על כפתור Zero במוניטור והמתן לקריאת אפס.</li>
                        <li>סגור את השסתום לאוויר החופשי ופתח את המעבר מחדש אל המטופל. גל הלחץ העורקי יופיע על המסך.</li>
                    </ol>
                </section>

                <section>
                    <h4><i class="fa-solid fa-shield-halved"></i> 4. מעקב סיעודי ומניעת סיבוכים</h4>
                    <ul>
                        <li><strong>חסימת כלי דם ואיסכמיה דיסטלית:</strong> בדוק את כף היד של המטופל בכל שעה - צבע, חום, מילוי קפילרי, ותנועתיות אצבעות.</li>
                        <li><strong>דימום קטסטרופלי:</strong> וודא שכל החיבורים במערכת מהודקים היטב (Luer-Lock) וההתראות המודינמיות במוניטור פעילות.</li>
                        <li><strong>זיהום בזרם הדם:</strong> שמור על טכניקה אספטית קפדנית בעת שאיבת דם או טיפול בחבישה. חטא את הברזים בכל פנייה.</li>
                    </ul>
                </section>
            </div>
        `
    },
    lectures: {
        'epidemiology': `
            <div class="modal-cheat-sheet">
                <h3>ראשי פרקים: אפידמיולוגיה ומניעת זיהומים בטיפול נמרץ</h3>
                <span class="lecture-meta">הרצאה קלינית ומצגת מיועדת לסטודנטים ולקהל הרחב</span>
                
                <section style="margin-top: 1.5rem;">
                    <h4><i class="fa-solid fa-layer-group"></i> פרק 1: הפיזיולוגיה של זיהומים נרכשים (HAI)</h4>
                    <ul>
                        <li>מהם זיהומים נרכשים בבתי חולים וכיצד הם מתפתחים.</li>
                        <li>מדוע חולים בטיפול נמרץ פגיעים במיוחד (קווים פולשניים, טובוסים, מערכת חיסון מוחלשת).</li>
                        <li>שכיחות וסטטיסטיקה של מזהמים נפוצים ביחידות קריטיות.</li>
                    </ul>
                </section>

                <section>
                    <h4><i class="fa-solid fa-bug"></i> פרק 2: חיידקים עמידים והמלחמה האנטיביוטית</h4>
                    <ul>
                        <li>הבנת מנגנוני העמידות של חיידקים: CRE, VRE, MRSA.</li>
                        <li>שימוש מושכל באנטיביוטיקה (Antibiotic Stewardship) ותפקיד האחות במניעה.</li>
                    </ul>
                </section>

                <section>
                    <h4><i class="fa-solid fa-hand-holding-medical"></i> פרק 3: המניעה היא בידיים שלנו</h4>
                    <ul>
                        <li>חמשת הרגעים להגיינת ידיים על פי ארגון הבריאות העולמי (WHO).</li>
                        <li>שימוש נכון בבידודים (מגע, טיפתי, נשימתי).</li>
                        <li>עקרונות הטיפול בציוד פולשני: מניעת דלקת ריאות ממנשם (VAP Bundle) ומניעת זיהומים בצנתר מרכזי (CLABSI Bundle).</li>
                    </ul>
                </section>
            </div>
        `,
        'disaster': `
            <div class="modal-cheat-sheet">
                <h3>ראשי פרקים: ניהול מצבי אסון ורפואת חירום במאקרו</h3>
                <span class="lecture-meta">קורס ניהול מצבי אסון בבית הספר לסיעוד</span>
                
                <section style="margin-top: 1.5rem;">
                    <h4><i class="fa-solid fa-circle-nodes"></i> פרק 1: הגדרת אירוע רב-נפגעים (אר"ן) במערכת הבריאות</h4>
                    <ul>
                        <li>ההבדל בין אירוע רגיל, אר"ן (Mass Casualty) ואירוע אסון המוני (MADI).</li>
                        <li>משוואת פער המשאבים: כיצד הצרכים הרפואיים עולים על יכולות המענה הרגילות בשטח ובבית החולים.</li>
                    </ul>
                </section>

                <section>
                    <h4><i class="fa-solid fa-truck-medical"></i> פרק 2: שיטות ועקרונות מיון (Triage)</h4>
                    <ul>
                        <li>עקרונות שיטת המיון START (Simple Triage and Rapid Treatment) בשטח האסון.</li>
                        <li>מיון שניוני בקבלה לבית החולים וחלוקת המשאבים הקריטיים (חדרי ניתוח, טיפול נמרץ).</li>
                        <li>אתיקה רפואית תחת תנאי מחסור קיצוניים.</li>
                    </ul>
                </section>

                <section>
                    <h4><i class="fa-solid fa-shield-heart"></i> פרק 3: היערכות בתי חולים והמענה הסיעודי</h4>
                    <ul>
                        <li>מבנה הפיקוד של בית החולים בחירום (HICS).</li>
                        <li>שלבי פתיחת מחלקות חירום וניוד מהיר של מאושפזים.</li>
                        <li>תפקיד אחות טיפול נמרץ כחלק מצוות התערבות מהיר (RRT) וכגורם מייצב בשלבי הקבלה הראשונים.</li>
                    </ul>
                </section>
            </div>
        `
    }
};

window.openCheatSheetModal = function(topic) {
    const modal = document.getElementById('detailModal');
    const contentArea = document.getElementById('modalContentArea');
    const htmlContent = modalData.cheatSheets[topic];
    
    if (htmlContent) {
        contentArea.innerHTML = htmlContent;
        modal.classList.add('active-modal');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }
};

window.openLecturePreview = function(lectureId) {
    const modal = document.getElementById('detailModal');
    const contentArea = document.getElementById('modalContentArea');
    const htmlContent = modalData.lectures[lectureId];
    
    if (htmlContent) {
        contentArea.innerHTML = htmlContent;
        modal.classList.add('active-modal');
        document.body.style.overflow = 'hidden';
    }
};

window.closeModal = function() {
    const modal = document.getElementById('detailModal');
    modal.classList.remove('active-modal');
    document.body.style.overflow = 'auto'; // Re-enable scroll
};

// Hook up Close button and click overlay to close
document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
document.getElementById('detailModal').addEventListener('click', (e) => {
    if (e.target.id === 'detailModal') {
        closeModal();
    }
});

/* ==========================================================================
   10. Contact Form Submissions Handling
   ========================================================================== */
window.handleContactSubmit = function(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');
    
    // Simulate API request send
    const submitBtn = form.querySelector('button[type="submit"]');
    const origBtnText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> שולח הודעה...';
    
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origBtnText;
        
        // Hide form and show success
        form.reset();
        successMsg.style.display = 'flex';
        
        // Hide success after 6 seconds
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 6000);
    }, 1200);
};

/* ==========================================================================
   10.5. Departmental Protocols Database & Logic
   ========================================================================== */
const protocolsData = [
    { name: 'Propofol (פרופופול) - סדציה', file: 'PROPOFOL.doc', category: 'sedation', type: 'doc' },
    { name: 'Dexmedetomidine (פרסדקס) - סדציה', file: 'Dexmedetomidine.doc', category: 'sedation', type: 'doc' },
    { name: 'Midazolam (דורמיקום) - סדציה', file: 'midazolam.docx', category: 'sedation', type: 'docx' },
    { name: 'Haloperidol (הלידול) - סדציה/אנטי-פסיכוטי', file: 'Halidol (1).doc', category: 'sedation', type: 'doc' },
    { name: 'Ketamine (קטמין) - סדציה/אנסטזיה', file: 'Ketamine.docx', category: 'sedation', type: 'docx' },
    { name: 'Atracurium (טראקריום) - מרפה שרירים', file: 'Atracurium - tracrium 2016.docx', category: 'sedation', type: 'docx' },
    { name: 'Rocuronium (רוקורוניום - אסמרון)', file: 'Rocuronium - esmeron.docx', category: 'sedation', type: 'docx' },
    { name: 'מרפי שרירים (Muscular Relaxants) בטיפול נמרץ', file: 'Muscular relaxants.docx', category: 'sedation', type: 'docx' },
    
    { name: 'Fentanyl (פנטניל) - אנלגטיקה', file: 'Fentanyl.doc', category: 'analgesia', type: 'doc' },
    { name: 'Morphine (מורפין) - אנלגטיקה', file: 'morphine.doc', category: 'analgesia', type: 'doc' },
    { name: 'Remifentanil (רמיפנטניל) - אנלגטיקה', file: 'remifentanil.docx', category: 'analgesia', type: 'docx' },
    { name: 'Methadone (מתדון) - גמילה ואנלגזיה 2024', file: 'METHADONE 2024.docx', category: 'analgesia', type: 'docx' },
    { name: 'Tramadol (טרמדול) - אנלגטיקה', file: 'TRAMADOL.docx', category: 'analgesia', type: 'docx' },
    
    { name: 'טיפול בהיפרקלמיה (Hyperkalemia)', file: 'HYPERKALEMIA.docx', category: 'electrolytes', type: 'docx' },
    { name: 'תיקון אשלגן (Potassium Replacement)', file: 'POTASSIUM REPLACEMENT final.doc', category: 'electrolytes', type: 'doc' },
    { name: 'תיקון זרחן (Phosphate Replacement) 2022', file: 'Phosphate replacement 2022.docx', category: 'electrolytes', type: 'docx' },
    { name: 'מגנזיום לרעלת הריון (Magnesium Pre-eclampsia)', file: 'Mg for pre-eclampsia 10g in 100cc.doc', category: 'electrolytes', type: 'doc' },
    { name: 'אלגוריתם טיפול בהיפונטרמיה (Hyponatremia)', file: 'Hyponatremia treatment algorithm.pptx', category: 'electrolytes', type: 'pptx' },
    { name: 'סליין היפרטוני (Hypertonic Saline)', file: 'hypertonic saline.doc', category: 'electrolytes', type: 'doc' },
    { name: 'Addamel N (אדאמל N) - מיקרו-אלמנטים', file: 'Addamel N.docx', category: 'electrolytes', type: 'docx' },
    { name: 'פרוטוקול ציטראט ל-CRRT (Citrate protocol CVVHDF)', file: 'Citrate protocol CVVHDF _.docx', category: 'electrolytes', type: 'docx' },
    
    { name: 'Actemra (אקטמרה) - טיפול בקורונה', file: 'ACTEMRA - COVID-19.docx', category: 'other', type: 'docx' },
    { name: 'Amiodarone (אמיודארון) - הפרעות קצב', file: 'AMIODARONE.docx', category: 'other', type: 'docx' },
    { name: 'Dosing Guide: אנטיביוטיקה ב-CRRT', file: 'CRRT antibiotics -  Dosing Guide 2017-08-08.pdf', category: 'other', type: 'pdf' },
    { name: 'מרשם והנחיות ל-CRRT', file: 'CRRT prescription.docx', category: 'other', type: 'docx' },
    { name: 'Dobutamine (דובוטמין) - תמיכה המודינמית', file: 'Dobutamine 2019.docx', category: 'other', type: 'docx' },
    { name: 'Dopamine (דופמין) - תמיכה אינוטרופית', file: 'Dopamine Hcl.doc', category: 'other', type: 'doc' },
    { name: 'Erythromycin (אריתרומיצין) - פרוקינטי', file: 'Erythromycin prokinetic agent.doc', category: 'other', type: 'doc' },
    { name: 'Esmolol (אסמולול) - חוסם בטא מהיר', file: 'Esmolol.doc', category: 'other', type: 'doc' },
    { name: 'Factor VIIa (נובוסבן) - מניעת דימום', file: 'FACTOR VIIA.doc', category: 'other', type: 'doc' },
    { name: 'טיפול פיברינוליטי באמפיאמה (Empyema) 2024', file: 'FIBRINOLYTIC TREATMENT OF EMPYEMA 2024.docx', category: 'other', type: 'docx' },
    { name: 'Furosemide (פוסיד) - משתן', file: 'FUROSEMIDE.doc', category: 'other', type: 'doc' },
    { name: 'Ganciclovir (גנציקלוביר) - אנטי-ויראלי', file: 'Ganciclovir.docx', category: 'other', type: 'docx' },
    { name: 'מדידת לחץ תוך-בטני (IAP)', file: 'IAP measurement.docx', category: 'other', type: 'docx' },
    { name: 'Immunoglobulin Intratect (אימונוגלובולינים)', file: 'Immunoglobulin  intratect.doc', category: 'other', type: 'doc' },
    { name: 'רגישות ליוד ובדיקות CT 2019', file: 'Iodine allergy and CT 2019.docx', category: 'other', type: 'docx' },
    { name: 'Isuprel (איזופרל) - טכיקרדיה / חסם הולכה', file: 'Isuprel.doc', category: 'other', type: 'doc' },
    { name: 'Metoprolol (לופרסור) - חוסם בטא', file: 'Metoprolol.doc', category: 'other', type: 'doc' },
    { name: 'NAC Parvolex (פרוולקס) - הרעלת אקמול', file: 'NAC  parvolex.docx', category: 'other', type: 'docx' },
    { name: 'Neostigmine (נאוסטיגמין) - שיתוק מעיים 2021', file: 'NEOSTIGMINE 2021.docx', category: 'other', type: 'docx' },
    { name: 'Nexium (נקסיום) - סותם חומצה', file: 'Nexium.doc', category: 'other', type: 'doc' },
    { name: 'Nitroglycerine (ניטרו) - ואזודילטור', file: 'Nitroglycerine.doc', category: 'other', type: 'doc' },
    { name: 'פרוטוקול שכיבה על הבטן (Prone Position)', file: 'PRONE POSITION.docx', category: 'other', type: 'docx' },
    { name: 'Promethazine (פנרגן) - נוגד אלרגיה', file: 'Promethazine  (phenergan).docx', category: 'other', type: 'docx' },
    { name: 'Septrin (ספטרין) - אנטיביוטיקה', file: 'SEPTRIN.pdf', category: 'other', type: 'pdf' },
    { name: 'אינהלציית סלבוטמול רציפה (Aerogen)', file: 'Salbutamol continuous via aerogen .docx', category: 'other', type: 'docx' },
    { name: 'טיפול ב-TPA (ממיס קרישים) בטיפול נמרץ', file: 'TPA ????? ?????  בטיפול נמרץ .docx', category: 'other', type: 'docx' },
    { name: 'Tranexamic Acid (הקסקפרון) - נוגד דימום', file: 'Tranexamic acid - hexakapron.doc', category: 'other', type: 'doc' },
    { name: 'Valproic Acid (דפאלפט / חומצה ולפרואית)', file: 'Valproic acid.docx', category: 'other', type: 'docx' },
    { name: 'Zavicefta (זאביצפטה) - אנטיביוטיקה מתקדמת', file: 'ZAVICEFTA.docx', category: 'other', type: 'docx' },
    { name: 'Acyclovir (אציקלוביר) - אנטי-ויראלי', file: 'acyclovir.doc', category: 'other', type: 'doc' },
    { name: 'Adrenaline (אדרנלין) - תמיכה המודינמית', file: 'adrenaline.docx', category: 'other', type: 'docx' },
    { name: 'Amphotericin B (אמפוטריצין B) - אנטי-פטרייתי', file: 'amphotericin protocol.doc', category: 'other', type: 'doc' },
    { name: 'Azithromycin (אזיתרומיצין) - אנטיביוטיקה', file: 'azithromycin.pdf', category: 'other', type: 'pdf' },
    { name: 'Cloxacillin (קלוכסצילין) - אנטיביוטיקה', file: 'cloxacillin.docx', category: 'other', type: 'docx' },
    { name: 'פרוטוקולי טיפול בקורונה 2021', file: 'covid 19 TREATMENT PROTOCOLS 2021February.docx', category: 'other', type: 'docx' },
    { name: 'Dantrolene (דנטרולן) - היפרתרמיה ממאירה', file: 'dantrolene reconstitution2012.pdf', category: 'other', type: 'pdf' },
    { name: 'Heparin (הפרין) - פרוטוקול 80-100', file: 'heparin 80 -100.doc', category: 'other', type: 'doc' },
    { name: 'Heparin (הפרין) - פרוטוקול 80-100 (עותק)', file: 'heparin 80 -100-1.doc', category: 'other', type: 'doc' },
    { name: 'Heparin (הפרין) - פרוטוקול PTT 60-80', file: 'heparin PTT 60 - 80.doc', category: 'other', type: 'doc' },
    { name: 'Heparin (הפרין) - פרוטוקול PTT 60-80 (עותק)', file: 'heparin PTT 60 - 80-1.doc', category: 'other', type: 'doc' },
    { name: 'הפרין בניטור דיאליזה (Hemofiltration)', file: 'heparin follow up hemofiltration.doc', category: 'other', type: 'doc' },
    { name: 'פרוטוקול אינסולין בחמצת סוכרתית (DKA)', file: 'insulin DKA protocol.docx', category: 'other', type: 'docx' },
    { name: 'Labetalol (לביטאלול) - איזון לחץ דם', file: 'labetalol.doc', category: 'other', type: 'doc' },
    { name: 'Lidocaine (לידוקאין / אסרצין)', file: 'lidocaine.esracine.doc', category: 'other', type: 'doc' },
    { name: 'Noradrenaline (נוראדרנלין) - ואזופרסור', file: 'noradrenaline.doc', category: 'other', type: 'doc' },
    { name: 'Phenytoin (פניטואין / דילנטין) - נוגד פרכוסים', file: 'phenytoin sodium.doc', category: 'other', type: 'doc' },
    { name: 'טיפול בסטרידור (Stridor)', file: 'stridor update.doc', category: 'other', type: 'doc' },
    { name: 'Terlipressin (טרליפרסין) - דימום דליות', file: 'terlipressin ..doc', category: 'other', type: 'doc' },
    { name: 'Vasopressin (ואזופרסין) - שוק המודינמי', file: 'vasopressin.doc', category: 'other', type: 'doc' },
    { name: 'Verapamil (איקקור) - הפרעות קצב', file: 'verapamil.doc', category: 'other', type: 'doc' },
    { name: 'פרוטוקול אינסולין במשאבה (IV Insulin)', file: 'אינסולין i v.doc', category: 'other', type: 'doc' },
    { name: 'חיבור מטופל לגז NO (חנקן חמצני)', file: 'חיבור מטופל למכשיר NO.docx', category: 'other', type: 'docx' },
    { name: 'מניעת דלקת ריאות ממנשם (VAP)', file: 'מניעת VAP.docx', category: 'other', type: 'docx' },
    { name: 'פרוטוקול אינסולין תת-עורי (SC Insulin)', file: 'פרוטוקול אינסולין S C.doc', category: 'other', type: 'doc' }
];

let activeProtocolFilter = 'all';

function initProtocols() {
    const searchInput = document.getElementById('protocolSearch');
    const filterBtns = document.querySelectorAll('.protocol-filter');
    
    renderProtocolsList(protocolsData);
    
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            filterProtocols();
        });
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            activeProtocolFilter = btn.getAttribute('data-protocol-filter');
            filterProtocols();
        });
    });
}

function filterProtocols() {
    const query = document.getElementById('protocolSearch').value.toLowerCase();
    
    const filtered = protocolsData.filter(item => {
        const matchesCategory = activeProtocolFilter === 'all' || item.category === activeProtocolFilter;
        const matchesSearch = item.name.toLowerCase().includes(query) || 
                              item.file.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });
    
    renderProtocolsList(filtered);
}

function renderProtocolsList(list) {
    const listContainer = document.getElementById('protocolsList');
    if (!listContainer) return;
    
    if (list.length === 0) {
        listContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>לא נמצאו פרוטוקולים התואמים את החיפוש.</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    list.forEach(item => {
        let categoryLabel = '';
        if (item.category === 'sedation') categoryLabel = 'סדציה';
        else if (item.category === 'analgesia') categoryLabel = 'אנלגטיקה';
        else if (item.category === 'electrolytes') categoryLabel = 'אלקטרוליטים';
        else categoryLabel = 'פרוטוקול מחלקתי';
        
        let fileIcon = 'fa-file-lines';
        if (item.type === 'pdf') fileIcon = 'fa-file-pdf';
        else if (item.type === 'doc' || item.type === 'docx') fileIcon = 'fa-file-word';
        else if (item.type === 'pptx') fileIcon = 'fa-file-powerpoint';
        
        const fileUrl = encodeURI(`פרוטוקולים/${item.file}`);
        
        html += `
            <div class="protocol-file-card">
                <div class="protocol-file-info">
                    <i class="fa-solid ${fileIcon} protocol-file-icon ${item.type}"></i>
                    <div class="protocol-file-meta">
                        <span class="protocol-file-name" title="${item.name}">${item.name}</span>
                        <span class="protocol-file-tag">${categoryLabel} • ${item.type.toUpperCase()}</span>
                    </div>
                </div>
                <a href="${fileUrl}" download class="btn-download-protocol" title="הורדת קובץ">
                    <i class="fa-solid fa-download"></i>
                </a>
            </div>
        `;
    });
    
    listContainer.innerHTML = html;
}

/* ==========================================================================
   11. Floating CV QR Widget Logic
   ========================================================================== */
function initCvWidget() {
    const toggle = document.getElementById('cvWidgetToggle');
    const card = document.getElementById('cvWidgetCard');
    const closeBtn = document.getElementById('cvCardClose');
    
    if (toggle && card && closeBtn) {
        toggle.addEventListener('click', () => {
            card.classList.toggle('active-card');
        });
        
        closeBtn.addEventListener('click', () => {
            card.classList.remove('active-card');
        });
        
        // Close if clicked outside
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !card.contains(e.target)) {
                card.classList.remove('active-card');
            }
        });
    }
}

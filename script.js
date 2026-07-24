// Web Audio Engine Fix for Mobile / Spck Editor
let audioCtx;

function forcePlayAudio() {
    const bgMusic = document.getElementById('bgMusic');
    
    // AudioContext चालू करें
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    if (bgMusic) {
        bgMusic.muted = false;
        bgMusic.volume = 0.7;
        bgMusic.play().then(() => {
            console.log("Audio Playing Successfully!");
        }).catch(err => {
            console.log("Audio play error:", err);
        });
    }
}

// स्क्रीन पर कहीं भी टच या क्लिक होते ही गाना प्ले होगा
window.addEventListener('touchstart', forcePlayAudio, { once: true });
window.addEventListener('click', forcePlayAudio, { once: true });


// ==========================================
// CINEMATIC PARTICLES ENGINE (60FPS Canvas)
// ==========================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Class to generate luxury rose-gold sparkles & tiny petals
class PremiumParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height + canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 1.2 + 0.4;
        this.speedX = Math.sin(Math.random() * 2) * 0.4;
        this.color = Math.random() > 0.5 ? 'rgba(224, 161, 165, ' + (Math.random() * 0.4 + 0.1) + ')' : 'rgba(247, 214, 215, ' + (Math.random() * 0.3 + 0.1) + ')';
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 1 - 0.5;
    }
    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        
        // Reset when moving off screen
        if (this.y < -10) {
            this.y = canvas.height + 10;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        
        // Soft glowing circles/gems
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = window.innerWidth < 768 ? 40 : 80; // Performance optimized for mobile
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new PremiumParticle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

// Start visual ambient elements
initParticles();
animateParticles();


// ==========================================
// SAFE LOADING MANAGER (Bulletproof Version)
// ==========================================
let progress = 0;

function simulateLoading() {
    progress += Math.floor(Math.random() * 5) + 2;

    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');

    if (progressBar) progressBar.style.width = progress + '%';
    if (progressText) progressText.innerText = progress + '%';

    if (progress >= 100) {
        if (progressBar) progressBar.style.width = '100%';
        if (progressText) progressText.innerText = '100%';
        setTimeout(completeLoadingPhase, 500);
    } else {
        setTimeout(simulateLoading, 50);
    }
}

function completeLoadingPhase() {
    const loadingScreen = document.getElementById('stage-loading');
    const welcomePage = document.getElementById('stage-welcome');

    if (loadingScreen) {
        loadingScreen.classList.remove('active');
        loadingScreen.style.display = 'none';
    }
    if (welcomePage) {
        welcomePage.classList.add('active');
        welcomePage.style.display = 'block';
    }

    // लोडिंग पूरी होते ही पहला गाना प्ले करना
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.volume = 0.6;
        bgMusic.play().catch(err => {
            console.log("Autoplay waiting for user touch:", err);
        });
    }
}

// पेज लोड होते ही लोडिंग स्टार्ट करना
window.onload = function() {
    simulateLoading();
};



// ==========================================
// CONFIGURABLE CORE DATA OBJECTS (Edit easily)
// ==========================================
const SECRET_PASSPHRASE = "love"; // Change this to your preferred secret word/date

const CUTE_WRONG_MESSAGES = [
    "Hmm... close, but my heart didn't skip a beat. Try again? 🥺",
    "Are you sure you know me best? Check it once more, darling! ❤️",
    "Access denied! Hint: It's all about what we are or a key password. 😉"
];

// Content for the 10 Interactive Hearts
const HEARTS_DATA = [
    { title: "My Favorite Feeling💞", text: "The way you make me feel..I love your presence..I don't want to live a single second of my life without youu🫂🥺❤️." },
    { title: "Always Yours❤", text: "I belongs to you only....today,tommorow and forever💫💝..ham wo nhi jo tere na kehne se chle jaenge ek hi to dil hai tujhi ko dekar jaenge💫" },
    { title: "Your smile🥰", text: "Your smile is very precious to me 🤌Keep smiling 🤗🎀." },
    { title: "My homie[safe place]🤌", text: "My safe place is in your arms and in your love I got my forever home🫂🌍." },
    { title: "Happiness☺️", text: "There is only one reason for my happiness to love you and be loved by you.🥰" },
    { title: "Your eyes👀", text: "Tumhari aakhon me jo sukkon hai vo kisi aur jagah kahan,duniya ki bheed me bhi tumse hi mila hai mera jahan✨️💖." },
    { title: "Soft corner💌", text: "There is always a soft corner in my heart for you no matter whatever the situation is🤝...Dur reh kr bhi aap mere dil ke pss rahoge...aap kl bhi the aaj bhi ho aur hmesa khaas rahoge.🎀🤌" },
    { title: "My cheerleader🫂", text: "Thank youhhh so so sooo muchh for always be my cheerleader...tujh me hi sb mil gya mujhe ..thi jiski talash vo mil gya mujhe ..ishq, mohabbat,sukoon,dosti ek hi insaan me saara jahan mil gya mujhe🥹🫂💗" },
    { title: "My biggest wish", text: "The wish is dedicated by lines -- jo bhi jitne pal jiyun unhe tere sang jiyun jo bhi kal ho abb mera use tere sang jiyun💝🫂." },
    { title: "Beloved💖", text: "No matter how many words I write, they'll never be enough to tell you how much you mean to me. You'll always be my favorite person.️🌷💖" }
];


// ==========================================
// NAVIGATION & EVENT LISTENERS UTILITIES
// ==========================================

// Global state tracking variables
let clickedHeartsTracker = new Set();

// Function helper to navigate cleanly between stages
function transitionToStage(currentStageId, nextStageId) {
    document.getElementById(currentStageId).classList.remove('active');
    document.getElementById(nextStageId).classList.add('active');
}

// Add luxury ripple effect on click to any button elements
document.querySelectorAll('.luxury-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        let x = e.clientX - e.target.getBoundingClientRect().left;
        let y = e.clientY - e.target.getBoundingClientRect().top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => { ripple.remove(); }, 600);
    });
});

// Welcome Stage Event Handler 
document.getElementById('btn-open-surprise').addEventListener('click', () => {
    const bgMusic = document.getElementById('bgMusic');
    
    if (bgMusic) {
        bgMusic.volume = 0.7;
        bgMusic.play().catch(err => console.log("Play error:", err));
    }

    transitionToStage('stage-welcome', 'stage-gate');
});






// Secret Gate Verification Event Handler
document.getElementById('btn-unlock-gate').addEventListener('click', () => {
    const userInput = document.getElementById('secret-code-input').value.trim().toLowerCase();
    const feedbackElement = document.getElementById('gate-feedback');
    
    if (userInput === SECRET_PASSPHRASE.toLowerCase()) {
        feedbackElement.style.opacity = '0';
        document.querySelector('.gate-container').classList.add('gate-open');
        
        // Start spectacular cinematic screen flash effect
        setTimeout(() => {
            const overlay = document.querySelector('.gate-flash-overlay');
            overlay.style.opacity = '1';
            
            setTimeout(() => {
                transitionToStage('stage-gate', 'stage-hearts');
                overlay.style.opacity = '0';
            }, 500);
        }, 1200);
        
    } else {
        // Choose random funny wrong message response elegantly
        const randomMsg = CUTE_WRONG_MESSAGES[Math.floor(Math.random() * CUTE_WRONG_MESSAGES.length)];
        feedbackElement.innerText = randomMsg;
        feedbackElement.style.opacity = '1';
        document.getElementById('secret-code-input').value = '';
    }
});

// ==========================================
// 10 HEARTS CORE COMPONENT MANAGER
// ==========================================
const modalOverlay = document.getElementById('heart-modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');

document.querySelectorAll('.heart-card').forEach(card => {
    card.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index')) - 1;
        const memoryData = HEARTS_DATA[index];
        
        // Populate and activate upscale modal overlay window
        modalTitle.innerText = memoryData.title;
        modalText.innerText = memoryData.text;
        modalOverlay.classList.add('open');
        
        // Mark tracking indices permanently
        this.classList.add('unlocked');
        clickedHeartsTracker.add(index);
        
        // Verify if all ten hearts items completed successfully
        if (clickedHeartsTracker.size === 10) {
            document.getElementById('btn-continue-journey').classList.add('reveal');
        }
    });
});

// Close active modal helper trigger 
document.getElementById('btn-close-modal').addEventListener('click', () => {
    modalOverlay.classList.remove('open');
});

// Route final action to upcoming Gallery module frame
// Hearts Page से Gallery 1 पर जाने का रास्ता
document.getElementById('btn-continue-journey').addEventListener('click', () => {
    transitionToStage('stage-hearts', 'stage-gallery1');
});

// ==========================================
// GALLERY NAVIGATION LISTENERS
// ==========================================
document.getElementById('btn-to-gift').addEventListener('click', () => {
    transitionToStage('stage-gallery1', 'stage-gift');
});


// ==========================================
// ADVANCED LUXURY MUSIC ARCHITECTURE
// ==========================================

// गानों की लिस्ट (इन्हें आप अपने मर्जी से बदल सकते हैं)
const AUDIO_PLAYLIST = {
    background: "wildflowers-chosic.com_mp3", 
    song1: "song1.mp3",
    song2: "song2.mp3",
    song3: "song3.mp3",
    song4: "song4.mp3",
    
};


// अगर आपके पास अभी गाने अपलोडेड नहीं हैं, तो यह सिस्टम क्रैश होने से बचाएगा और मिक्सकिट से बैकअप गाने चला देगा।
const BACKUP_LINKS = {
    background: "https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3",
    song1: "https://assets.mixkit.co/music/preview/mixkit-serenade-of-love-123.mp3"
};

// Global Audio Engine Helper Functions
function playPremiumMusic(trackKey) {
    const audioEl = document.getElementById('bgMusic');
    
    // गानों का पाथ सेट करें (अगर लोकल फाइल न मिले, तो बैकअप लिंक लोड होगा)
    let sourcePath = AUDIO_PLAYLIST[trackKey] || BACKUP_LINKS[trackKey];
    
    // अगर पहली बार गाना चल रहा है या गाना बदला जा रहा है
    if (audioEl.src !== sourcePath) {
        audioEl.src = sourcePath;
        audioEl.load();
    }
    
    audioEl.play().then(() => {
        fadeInAudio(audioEl, 2500); // 2.5 सेकंड का स्मूथ फेड इन
    }).catch(err => {
        console.log("Browser blocked track playback until user touch interaction.");
    });
}

function pausePremiumMusic() {
    const audioEl = document.getElementById('bgMusic');
    fadeOutAudio(audioEl, 1500, () => {
        audioEl.pause();
    });
}

function resumePremiumMusic() {
    const audioEl = document.getElementById('bgMusic');
    audioEl.play();
    fadeInAudio(audioEl, 1500);
}

function setPremiumVolume(volumeLevel) {
    const audioEl = document.getElementById('bgMusic');
    audioEl.volume = Math.max(0, Math.min(1, volumeLevel)); // Ensure safety clip 0 to 1
}

// Smooth Cinematic Fade In Engine
function fadeInAudio(audioElement, durationInMs) {
    audioElement.volume = 0;
    let targetVolume = 0.35; // Maximum ambient cap so it doesn't hurt ears
    let intervalTime = 50;
    let steps = durationInMs / intervalTime;
    let volumeIncrement = targetVolume / steps;

    let fadeId = setInterval(() => {
        if (audioElement.volume < targetVolume) {
            audioElement.volume = Math.min(targetVolume, audioElement.volume + volumeIncrement);
        } else {
            clearInterval(fadeId);
        }
    }, intervalTime);
}

// Smooth Cinematic Fade Out Engine
function fadeOutAudio(audioElement, durationInMs, callback) {
    let intervalTime = 50;
    let steps = durationInMs / intervalTime;
    let volumeDecrement = audioElement.volume / steps;

    let fadeId = setInterval(() => {
        if (audioElement.volume > 0.02) {
            audioElement.volume = Math.max(0, audioElement.volume - volumeDecrement);
        } else {
            audioElement.volume = 0;
            clearInterval(fadeId);
            if(callback) callback();
        }
    }, intervalTime);
}

// ==========================================
// CONFIGURABLE CELEBRATION DATA (쉽게 변경 가능)
// ==========================================
const CAKE_SPECIAL_PASSPHRASE = "forever"; // बर्थडे केक काटने का सीक्रेट जादुई शब्द

// Optional Birthday Sound Integration Helper (Stored in music/ folder)
const CHEER_SOUND_EFFECT = new Audio("music/cheer.mp3");
 

// ==========================================
// STAGE 7: MAGICAL GIFT BOX CONTROLLER
// ==========================================
document.getElementById('luxury-gift-box').addEventListener('click', function() {
    if (this.classList.contains('gift-unwrapped')) return; // Avoid re-triggering
    
    this.classList.add('gift-unwrapped');
    
    // Sparkle Burst Particle Injector Engine
    for (let i = 0; i < 40; i++) {
        let p = new PremiumParticle();
        p.y = canvas.height / 2 + (Math.random() * 60 - 30);
        p.x = canvas.width / 2 + (Math.random() * 60 - 30);
        p.speedY = Math.random() * 5 - 2; // Explode multi-directionally
        p.speedX = Math.random() * 6 - 3;
        particlesArray.push(p);
    }
    
    // Transition smoothly to cake screen after elegant unwrap pause
    setTimeout(() => {
        transitionToStage('stage-gift', 'stage-cake');
    }, 2200);
});


// ==========================================
// STAGE 8: CAKE CUTTING & CONFETTI CELEBRATION (WISH BASED)
// ==========================================

// 1. विश टाइप करते ही 'Done' बटन को दिखाना
document.getElementById('cake-word-input').addEventListener('input', function() {
    const wishText = this.value.trim();
    const doneBtn = document.getElementById('btn-make-wish');
    
    if (wishText.length >= 1) {
        if (doneBtn) doneBtn.classList.add('reveal');
    } else {
        if (doneBtn) doneBtn.classList.remove('reveal');
    }
});

// 2. 'Done' बटन क्लिक करने पर केक काटना और अगले पेज पर जाना
const wishBtn = document.getElementById('btn-make-wish');
if (wishBtn) {
    wishBtn.addEventListener('click', function() {
        const inputField = document.getElementById('cake-word-input');
        const knife = document.getElementById('interactive-knife');
        const feedback = document.getElementById('cake-feedback');

        // बटन और इनपुट को लॉक करना
        if (inputField) inputField.disabled = true;
        this.style.display = 'none';
        
        if (feedback) {
            feedback.innerText = "Your wish has been locked in the stars! ✨";
            feedback.style.opacity = '1';
        }

        // चाकू में चमक (Glow) लाना
        if (knife) knife.classList.add('knife-glow');

        // चाकू का केक काटना
        setTimeout(() => {
            if (knife) knife.classList.add('knife-cutting-action');

            // केक का कटना और सेलिब्रेशन
            setTimeout(() => {
                const mainCake = document.getElementById('main-cake');
                if (mainCake) mainCake.classList.add('cake-sliced');
                
                // उत्सव का प्रभाव चालू करना
                triggerCinematicCelebration();
            }, 1000);

        }, 1000);
    });
}

// 3. केक कटने के बाद अगले पेज (Letter Stage) पर ले जाना
function triggerCinematicCelebration() {
    // व्हाइट फ्लैश इफेक्ट
    const container = document.querySelector('.experience-container');
    if (container) {
        container.classList.add('flash-white');
        setTimeout(() => { container.classList.remove('flash-white'); }, 500);
    }

    // साउंड इफ़ेक्ट प्ले करना
    if (typeof CHEER_SOUND_EFFECT !== 'undefined') {
        CHEER_SOUND_EFFECT.play().catch(() => console.log("Sound waiting user interaction..."));
    }

    // कॉन्फ़ेट्टी (पार्टिकल्स) उड़ाना
    for (let i = 0; i < 120; i++) {
        setTimeout(() => {
            if (typeof PremiumParticle !== 'undefined') {
                let confetti = new PremiumParticle();
                confetti.y = Math.random() * (canvas.height / 3);
                confetti.x = Math.random() * canvas.width;
                confetti.size = Math.random() * 5 + 3;
                confetti.speedY = -(Math.random() * 3 + 1);
                confetti.color = `rgba(${Math.floor(Math.random()*50+200)}, ${Math.floor(Math.random()*100+100)}, ${Math.floor(Math.random()*50+120)}, ${Math.random()*0.7+0.3})`;
                particlesArray.push(confetti);
            }
        }, i * 15);
    }

    // 🎯 3.5 सेकंड बाद अपने आप लेटर वाले पेज (stage-letter) पर स्विच हो जाएगा!
    setTimeout(() => {
        transitionToStage('stage-cake', 'stage-letter');
        if (typeof startLuxuryTypewriter === 'function') {
            startLuxuryTypewriter(); // लेटर टाइप होना शुरू हो जाएगा
        }
    }, 3500);
}

// ==========================================
// CONFIGURABLE FINAL DATA OBJECTS (Edit text here)
// ==========================================
const LUXURY_LETTER_CONTENT = `🫂Mine❤️,

On this your fabulous birthday, I prayed countless blessings for you..I pray Kanha ji to keep his bleseings upon you🌸 and fill your life with endless happiness,success and beautiful moments.I seek his blessings to guide you always on the right path and you will become a successful man.I hope with his blessings our bond stays forever strong, and we continue to bring happiness to each other's lives and create countless precious memories💫✨️...aur ek wish ki hmara future utna hi sundar ho jitna ham dil se chahte hai🧿 and in every chapter of my life I need youu and turning every little moments in beautiful memories jise ham hmesa yaad kar ske 🌷..aur kbhi v life me isse frk nhi pdta ki time hame kaha le jata hai bs wapis ek dusre ke pss aa jaye🫂 and keep creating beautiful memories because you are not just a beautiful part of my present but the one whom i want to see in every moments of my life...You are my sunshine yrr🥹🤌without you i am just a star without its charm ..you make my world feel more beautiful..Meri life me aapka hona bht important hai and i always treasure this feeling. Just remember one thing aapki khushi mere liye matter krti hai💗🫂 ..I want to see  you achieve everything you dream of and keep shining in every steps of life aur ek chij hmesa yaad rakhiega that uu have someone who cares for youhh for every little things even for your every single tears ..sorry for sometimes if i become rude but in my heart always a soft corner lies for youu... and seriously i never want to see a small trace of sadness on your face bcz your smile matters to me...I will always stand by your side no matter what the situation is and want to be your biggest cheeleader for every success of yours ....❤️❤️I Lovee uhhhhh😍😚😘💋💋💋🫂🫂🫂🫂

Happy Birthday again️💖🎁`;


// Tracks explored songs count
let exploredSongsSet = new Set();
let activeSongObject = null;


// ==========================================
// STAGE 9: TYPEWRITER ENGINE SYSTEM
// ==========================================
function startLuxuryTypewriter() {
    const textContainer = document.getElementById('typewriter-letter');
    let index = 0;
    textContainer.innerHTML = ""; // Clear clean initial state

    // Change background style pacing for intimacy
    document.getElementById('stage-letter').style.background = "radial-gradient(circle at center, #0d0206 0%, #020001 100%)";

    function typeChar() {
        if (index < LUXURY_LETTER_CONTENT.length) {
            textContainer.innerHTML += LUXURY_LETTER_CONTENT.charAt(index);
            index++;
            
            // Auto scroll down to keep up with typing text if it overflows frame
            const box = document.querySelector('.luxury-letter-box');
            box.scrollTop = box.scrollHeight;
            
            // Natural human typing rhythm generator
            let speed = LUXURY_LETTER_CONTENT.charAt(index - 1) === '.' ? 450 : 35;
            setTimeout(typeChar, speed);
        } else {
            // Typing complete! Reveal Next Continuation Action Button cleanly
            document.getElementById('btn-to-songs').classList.add('reveal');
        }
    }
    setTimeout(typeChar, 1000);
}

// Letter से Songs Stage पर जाने की सेटिंग
document.getElementById('btn-to-songs').addEventListener('click', () => {
    // Background संगीत को धीरे से बंद (fade out) करें ताकि यूजर खुद अपनी मर्जी का गाना सुन सके
    fadeOutAudio(document.getElementById('bgMusic'), 1500, () => {
        document.getElementById('bgMusic').pause();
    });
    transitionToStage('stage-letter', 'stage-songs');
});


// ==========================================
// STAGE 10: ADVANCED SONG JUKEBOX TRACKER
// ==========================================
document.querySelectorAll('.song-card').forEach(card => {
    const playBtn = card.querySelector('.play-trigger');
    const trackKey = card.getAttribute('data-track');
    
    playBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Avoid double bubbling
        const globalAudio = document.getElementById('bgMusic');
        
        // If user clicks play on already playing active card, click acts as PAUSE trigger
        if (activeSongObject === card && !globalAudio.paused) {
            globalAudio.pause();
            this.innerText = "▶";
            card.classList.remove('track-playing');
            return;
        }

        // Reset previous active audio card visual states if switching songs
        if (activeSongObject && activeSongObject !== card) {
            activeSongObject.classList.remove('track-playing');
            activeSongObject.querySelector('.play-trigger').innerText = "▶";
        }

        // Set global indicators to new track card target
        activeSongObject = card;
        card.classList.add('track-playing');
        this.innerText = "⏸";
        
        // Log down track exploration values safely
        exploredSongsSet.add(trackKey);
        if (exploredSongsSet.size >= 3) { // Show final button after exploring any 3 songs out of 5
            document.getElementById('btn-to-ending').classList.add('reveal');
        }

        // Play Selected Target Jukebox track item natively
        playPremiumMusic(trackKey);
    });
});

// Real-Time Audio Time Sync Engine inside active jukebox slider tracks
document.getElementById('bgMusic').addEventListener('timeupdate', function() {
    if (!activeSongObject) return;
    
    const currTimeText = activeSongObject.querySelector('.time-curr');
    const durTimeText = activeSongObject.querySelector('.time-dur');
    const fillBar = activeSongObject.querySelector('.player-progress-fill');
    
    // Safety calculations check
    if (this.duration) {
        let pct = (this.currentTime / this.duration) * 100;
        fillBar.style.width = pct + '%';
        
        currTimeText.innerText = formatTimeLayout(this.currentTime);
        durTimeText.innerText = formatTimeLayout(this.duration);
    }
});

// Reset visual symbols when audio file ends playing completely
document.getElementById('bgMusic').addEventListener('ended', function() {
    if (activeSongObject) {
        activeSongObject.classList.remove('track-playing');
        activeSongObject.querySelector('.play-trigger').innerText = "▶";
        activeSongObject = null;
    }
});

function formatTimeLayout(secs) {
    let mins = Math.floor(secs / 60);
    let remSecs = Math.floor(secs % 60);
    if (remSecs < 10) remSecs = "0" + remSecs;
    return mins + ":" + remSecs;
}


// ==========================================
// STAGE 11: FINAL STAGE TERMINATION ROUTING
// ==========================================
document.getElementById('btn-to-ending').addEventListener('click', () => {
    // Fade track down cleanly before switching onto permanent closing screen ambient credits track loop
    fadeOutAudio(document.getElementById('bgMusic'), 1000, () => {
        transitionToStage('stage-songs', 'stage-ending');
        playPremiumMusic('background'); // Resume original sweet ambient loop track
    });
});

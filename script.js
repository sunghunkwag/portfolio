document.addEventListener('DOMContentLoaded', () => {

    /* 
       KINETIC TYPOGRAPHY ENGINE
    */

    // 1. Word-by-Word Animation (High Quality Cinematic)
    function animateWords(element, baseDelay) {
        const text = element.textContent.trim();
        element.innerHTML = "";

        // Word Split
        const words = text.split(/\s+/); // Split by any whitespace

        let totalDuration = 0;

        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.classList.add('word-span');

            // Slow, deliberate stagger for "Statement" feel
            const interval = 0.5; // Slightly slower stagger for impact
            const delay = baseDelay + (index * interval);

            // Long, smooth duration with elastic easing
            span.style.animation = `cinematicWordFadeUp 2.8s cubic-bezier(0.19, 1, 0.22, 1) forwards`;
            span.style.animationDelay = `${delay}s`;

            element.appendChild(span);
        });

        // Return finish time for chaining
        return baseDelay + (words.length * 0.4) + 1.5;
    }

    // 2. Character-by-Character Animation (For names, simpler)
    function animateCharacters(element, baseDelay) {
        const text = element.textContent.trim();
        element.innerHTML = "";

        const chars = text.split("");

        chars.forEach((char, index) => {
            const span = document.createElement('span');
            // Check for space
            if (char === " ") {
                span.innerHTML = "&nbsp;";
            } else {
                span.textContent = char;
            }
            // Reuse old simplified style if needed, or define a simpler char sytle.
            // But we deleted .char-span styles above? 
            // WAIT -> We need to ensure .char-span styles exist OR reuse .word-span styles tailored.
            // Let's actually RE-ADD a small char-span style in JS or CSS?
            // Actually, for consistency, let's just re-use the concept but inject styles dynamically 
            // OR assumes we didn't delete .char-span completely?
            // Checking plan: I replaced .char-span with .word-span in CSS.
            // BAD MOVE. I should have KEPT .char-span for the names.
            // Correcting via inline styles to save a roundtrip, or better yet, I'll fix CSS in next step.

            // For now, let's use a class 'char-span-legacy' and I will fix CSS immediately after.
            span.classList.add('char-span-legacy');

            const interval = 0.05;
            const delay = baseDelay + (index * interval);

            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.animation = `cinematicWordFadeUp 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`; // Recycle keyframe
            span.style.animationDelay = `${delay}s`;

            element.appendChild(span);
        });

        return baseDelay + (chars.length * 0.05) + 1.5;
    }

    // -------------------------------------------------------------------------
    // Sequence Execution
    // -------------------------------------------------------------------------

    // A. Main Title: "Advanced AI System" -> Word by Word
    const title = document.querySelector('.main-title');
    title.style.opacity = '1';
    title.style.animation = 'none';

    // Start after small initial pause
    const titleFinish = animateWords(title, 0.5);

    // B. English Name: "Sung Hun Kwag" -> Char by Char (Fast flow)
    const engName = document.querySelector('.eng-name');
    animateCharacters(engName, titleFinish - 0.5); // Start before title fully fades out? No, overlap nicely.

    // C. Separator & Korean Name
    const separator = document.querySelector('.separator');
    const korName = document.querySelector('.kor-name');

    animateCharacters(separator, titleFinish + 0.2);
    animateCharacters(korName, titleFinish + 0.4);

    // -------------------------------------------------------------------------
    // 2. Interactive Background Effects
    // -------------------------------------------------------------------------
    const cards = document.querySelectorAll('.glass-card');
    const bgVideo = document.getElementById('bg-video');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            bgVideo.style.transition = "filter 0.5s ease";
            bgVideo.style.filter = "brightness(0.7) blur(2px)";
        });

        card.addEventListener('mouseleave', () => {
            bgVideo.style.filter = "brightness(1.0) blur(0px)";
        });
    });

    console.log("Portfolio Loaded. Kinetic Typography Active.");
});

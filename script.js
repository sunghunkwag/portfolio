document.addEventListener('DOMContentLoaded', () => {

    /* 
       KINETIC TYPOGRAPHY ENGINE
       Splits text into characters and animates them with a "Kinetic Reveal"
       (Scale + Blur + Fade) heavily staggered.
    */

    function animateCharacters(element, baseDelay) {
        const text = element.textContent.trim();
        element.innerHTML = "";

        // Character Split
        const chars = text.split("");

        chars.forEach((char, index) => {
            const span = document.createElement('span');
            // Check for space
            if (char === " ") {
                span.innerHTML = "&nbsp;";
            } else {
                span.textContent = char;
            }
            span.classList.add('char-span');

            // Dense Stagger for liquid flow
            const interval = 0.08;
            const delay = baseDelay + (index * interval);

            // Soft Blur Reveal: 2.0s duration (Very Slow & Soft)
            span.style.animation = `softBlurReveal 2.0s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
            span.style.animationDelay = `${delay}s`;

            element.appendChild(span);
        });

        // Return finish time
        return baseDelay + (chars.length * 0.08) + 2.0;
    }

    // -------------------------------------------------------------------------
    // 1. Kinetic Typography Sequence
    // -------------------------------------------------------------------------

    // A. Main Title: "Advanced AI Research"
    const title = document.querySelector('.main-title');
    // Ensure opacity 1 for container so children span animations are visible
    title.style.opacity = '1';
    title.style.animation = 'none'; // Disable container fade

    const titleFinish = animateCharacters(title, 0.5);

    // B. English Name: "Sung Hun Kwag"
    const engName = document.querySelector('.eng-name');
    animateCharacters(engName, titleFinish - 0.2); // Overlap slightly for flow

    // C. Separator & Korean Name (Simple fade or char based? Let's do all char for consistency)
    const separator = document.querySelector('.separator');
    const korName = document.querySelector('.kor-name');

    // Manual handling for vertical separator if needed, but char split works fine
    animateCharacters(separator, titleFinish + 0.5);
    animateCharacters(korName, titleFinish + 0.8);

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

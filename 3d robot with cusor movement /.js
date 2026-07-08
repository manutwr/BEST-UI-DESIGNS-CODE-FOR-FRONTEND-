const head = document.getElementById('robotHead');
const glow = document.getElementById('robotGlow');
const earL = document.getElementById('earL');
const earR = document.getElementById('earR');
const pupils = document.querySelectorAll('.pupil');

document.addEventListener('mousemove', (event) => {
    // Get center coordinates of the display window
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Determine how far away the mouse is from the exact center
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;

    // 1. Calculate Face Tilt rotation angles
    const tiltX = (mouseY / centerY) * -25; // Rotates head up/down
    const tiltY = (mouseX / centerX) * 30;  // Rotates head left/right

    // 2. Rotate Head & Shadow Backplane
    head.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    glow.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(-10px)`;

    // 3. Move Ears dynamically for a layered depth look
    earL.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY - 35}deg) translateX(${tiltY * 0.2}px)`;
    earR.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY + 35}deg) translateX(${tiltY * 0.2}px)`;

    // 4. Track Cursor Position with the Pupils
    pupils.forEach(pupil => {
        const maxMovement = 12; // Keeps eye inside the socket
        const eyeX = (mouseX / centerX) * maxMovement;
        const eyeY = (mouseY / centerY) * maxMovement;

        pupil.style.transform = `translate(${eyeX}px, ${eyeY}px) rotate(-45deg)`;
    });
});

// Center everything back smoothly if the mouse leaves the browser window
document.addEventListener('mouseleave', () => {
    head.style.transform = `rotateX(0deg) rotateY(0deg)`;
    glow.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(-10px)`;
    earL.style.transform = `rotateY(-35deg)`;
    earR.style.transform = `rotateY(35deg)`;
    
    pupils.forEach(pupil => {
        pupil.style.transform = `translate(0px, 0px) rotate(-45deg)`;
    });
});

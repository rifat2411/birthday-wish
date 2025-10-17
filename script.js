// Array of cute messages (updated based on your provided list)
const messages = [
    "Happy Birthday! You're one in a million, and the world is brighter with you in it! 🎉",
    "Wishing you a day filled with laughter, cake, and all your favorite things! 🥳",
    "May your birthday be as sweet as you are! Sending hugs and good vibes your way! ❤️",
    "Cheers to another year of adventures! You're amazing! 🌟",
    "Happy Birthday! Keep shining like the star you are! ✨",
    "Blow out the candles and make a wish—it's your special day! 🕯️",
    "You're not getting older, you're getting better! Have a fantastic birthday! 🎈",
    "My dearest, on your birthday, I want you to know how much you light up my world. You're my heart's greatest joy! Forever yours, with all my love. ❤️", // Cute love letter
    "Happy Birthday, Hayati! You're the light of my life, and I wish you endless happiness and love. 🩶",
    "I LOVE YOU SO SO MUCH MY DEAR WIFEY 🩶🩶",
];

// Array of image URLs
// Images should be placed in the same directory as your HTML file, or provide a relative/absolute path to their location.
// For example: "images/photo1.jpg" if your images are in an "images" folder.
// Supported formats: .jpg, .png, .gif, etc.
const images = [
    "IMG_20250927_135549.jpg", // Example placeholder - replace with your own
    "IMG_20250927_135946.jpg",
    "IMG_20250927_140057.jpg",
    "IMG_20250927_152513.jpg",
    "IMG_20250927_131959.jpg",
    "IMG_20250927_152608.jpg",
];

// --- New Logic for Tracking Messages ---
let availableMessageIndices = messages.map((_, index) => index); // Start with all indices available

// Function to get a unique random message index and remove it from the available list
function getUniqueMessageIndex() {
    if (availableMessageIndices.length === 0) {
        return -1; // No more unique messages
    }
    const randomArrayIndex = Math.floor(Math.random() * availableMessageIndices.length);
    const messageIndex = availableMessageIndices[randomArrayIndex];
    
    // Remove the chosen index from the available list to prevent repetition
    availableMessageIndices.splice(randomArrayIndex, 1); 
    
    return messageIndex;
}
// -------------------------------------


document.getElementById('generate-btn').addEventListener('click', generateWish);
document.getElementById('next-btn').addEventListener('click', generateWish); // Use the same function for both

function generateWish() {
    const name = document.getElementById('name-input').value || 'friend';
    const messagesDisplay = document.getElementById('messages-display');
    messagesDisplay.innerHTML = ''; // Clear previous messages
    
    const randomImage = images[Math.floor(Math.random() * images.length)];
    
    const selectedMessages = [];
    const numMessagesToSelect = Math.min(Math.floor(Math.random() * 2) + 1, availableMessageIndices.length); // Select 1 or 2, but not more than what's available

    for (let i = 0; i < numMessagesToSelect; i++) {
        const uniqueIndex = getUniqueMessageIndex();
        if (uniqueIndex !== -1) {
            // Personalize the message and add it to the display list
            selectedMessages.push(messages[uniqueIndex].replace(/you/gi, name)); 
        }
    }

    if (selectedMessages.length > 0) {
        // Display messages with animations
        selectedMessages.forEach((msg, index) => {
            const p = document.createElement('p');
            p.innerText = msg;
            p.classList.add('animate__animated', 'animate__fadeInUp');
            setTimeout(() => { // Add a delay for staggering
                p.classList.add('visible');
            }, index * 500); 
            messagesDisplay.appendChild(p);
        });
        
        const imageOutput = document.getElementById('image-output');
        imageOutput.src = randomImage;
        imageOutput.style.display = 'block';
        imageOutput.classList.remove('animate__slideInRight'); // Remove for re-animation
        void imageOutput.offsetWidth; // Trigger reflow
        imageOutput.classList.add('animate__animated', 'animate__slideInRight'); // Re-animate
        
        // Show next button only if there are still messages available
        document.getElementById('next-btn').style.display = availableMessageIndices.length > 0 ? 'block' : 'none';
    } else {
        // If no more unique messages
        messagesDisplay.innerHTML = `<p style="color: #ff0000;">That's all the wishes we have! Refresh to start over. 😥</p>`;
        document.getElementById('image-output').style.display = 'none';
        document.getElementById('next-btn').style.display = 'none';
    }
}

// Initial check to prevent the 'Next' button from being shown initially if only one message is generated on first click
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('next-btn').style.display = 'none';
});
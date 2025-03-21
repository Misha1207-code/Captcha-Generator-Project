let captchaText = "";
//Function to generate a new CAPTCHA
function generateCaptcha() {
    const canvas = document.getElementById("captchaCanvas");
    const ctx = canvas.getContext("2d");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    captchaText = "";

    canvas.width = 250;
    canvas.height = 80;

    for (let i = 0; i < 7; i++) {
        captchaText += chars[Math.floor(Math.random() * chars.length)];
    }
    ctx['fillStyle'] = "#eee";

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 100; i++) {
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.2})`;
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }

    for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.strokeStyle = `rgba(0,0,0,0.5)`;
        ctx.lineWidth = Math.random() * 2;
        ctx.stroke();
    }

    ctx.font = "40px Arial";
    ctx.fillStyle = "#333";
    ctx.textBaseline = "middle";
    let x = 30;
    for (let char of captchaText) {
        ctx.save();
        ctx.translate(x, 40);
        ctx.rotate((Math.random() - 0.5) * 0.3);
        ctx.fillText(char, 0, 0);
        ctx.restore();
        x += 35;
    }

    // Add a subtle wave distortion effect
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const displacement = Math.sin(y / 10) * 5; // Adjust the wave strength
            const newX = x + displacement;
            if (newX >= 0 && newX < canvas.width) {
                const index = (y * canvas.width + x) * 4;
                const newIndex = (y * canvas.width + Math.floor(newX)) * 4;
                data[index] = imageData.data[newIndex];
                data[index + 1] = imageData.data[newIndex + 1];
                data[index + 2] = imageData.data[newIndex + 2];
                data[index + 3] = imageData.data[newIndex + 3];
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function validateCaptcha() {
    const userInput = document.getElementById("captchaInput").value;
    const message = document.getElementById("captchaMessage");
    const isCaseSensitive = document.getElementById("caseSensitive").checked;
    const inputText = isCaseSensitive ? userInput : userInput.toLowerCase();
    const originalText = isCaseSensitive ? captchaText : captchaText.toLowerCase();

    if (inputText === originalText) {
        message.style.color = "green";
        message.innerText = "✅ CAPTCHA Matched!";
    } else {
        message.style.color = "red";
        message.innerText = "❌ Incorrect CAPTCHA, Try Again!";
        generateCaptcha();
    }

    document.getElementById("captchaInput").value = "";
}

function clearInput() {
    document.getElementById("captchaInput").value = "";
    document.getElementById("captchaMessage").innerText = "";
}

function toggleDarkMode() {
    document.body.classList.toggle("dark mode");
}

window.onload = generateCaptcha;

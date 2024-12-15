// Global variables to store license info
let isGenerating = false; // Flag for seed generation state
let seedCount = 0; // Number of generated seeds
let selectedCryptos = []; // Array to track selected cryptocurrencies
let totalEarnings = 0.00; // Global variable to track total earnings

// Global dashboard data to persist values
const dashboardData = {
    Bitcoin: 0.00,
    Ethereum: 0.00,
    Solana: 0.00,
    BNB: 0.00
};

// Full BIP-39 English word list for seed phrase generation
const bip39WordList = [
    "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract", "absurd",
    "abuse", "access", "accident", "account", "accuse", "achieve", "acid", "acoustic", "acquire",
    "across", "act", "action", "actor", "actress", "actual", "adapt", "add", "address", "adjust",
    "adult", "advance", "advertise", "advice", "aerobic", "affair", "afraid", "again", "age",
    "agent", "agree", "ahead", "aim", "air", "airport", "aisle", "alarm", "album", "alcohol",
    "alert", "alien", "all", "alley", "allow", "almost", "alone", "alpha", "already", "also",
    "alter", "always", "amateur", "among", "amount", "amused", "anxiety", "any", "apart",
    "apology", "appear", "apple", "approve", "april", "arch", "area", "arena", "argue",
    "arm", "armed", "army", "around", "arrange", "arrest", "arrive", "art", "article",
    "artist", "ask", "aspect", "assault", "assert", "assess", "asset", "assist", "assume",
    "asthma", "at", "attack", "attempt", "attend", "attitude", "attract", "auction", "audience",
    "author", "auto", "available", "average", "avoid", "awake", "aware", "away", "awesome",
    "axis", "baby", "bachelor", "bacon", "badge", "bag", "balance", "ball", "bamboo", "banana",
    "band", "bank", "bar", "barely", "bark", "barrel", "base", "basic", "basket", "battle",
    "beach", "bean", "beauty", "because", "become", "beef", "before", "begin", "behave", "behind",
    "believe", "below", "belt", "bench", "benefit", "best", "better", "between", "beyond",
    "bicycle", "bid", "big", "bill", "bird", "birth", "biscuit", "black", "blade", "blame",
    "blanket", "blast", "bleach", "bless", "blind", "blood", "blossom", "blue", "blur", "board",
    "boat", "body", "book", "boost", "border", "bore", "borrow", "bottom", "bowl", "box",
    "brain", "branch", "brand", "bread", "break", "breathe", "brick", "bridge", "brief", "bright",
    "bring", "brother", "brown", "brush", "bubble", "buddy", "budget", "build", "bulb", "bullet",
    "burn", "burst", "bus", "business", "busy", "butter", "buyer", "cabin", "cage", "cake",
    "call", "camera", "camp", "can", "cancel", "candy", "canvas", "capable", "capital", "captain",
    "card", "care", "carry", "case", "cash", "cat", "catalog", "catch", "cause", "ceiling",
    "cell", "center", "chain", "chair", "charge", "chat", "cheap", "check", "cheese", "chest",
    "chief", "child", "choice", "choose", "church", "circle", "citizen", "city", "claim", "class",
    "clean", "clear", "climb", "clip", "clock", "close", "cloud", "clown", "club", "clue",
    "coach", "coat", "code", "coffee", "cold", "collect", "college", "color", "column", "combine",
    "come", "comfort", "common", "company", "concert", "conclude", "condition", "conflict", "connect",
    "consider", "control", "convert", "cook", "cool", "copy", "core", "couch", "could", "count",
    "country", "course", "cousin", "cover", "create", "credit", "crew", "cricket", "crush", "cry",
    "cube", "culture", "cup", "current", "custom", "cute", "cycle", "dad", "damage", "dance",
    "danger", "dawn", "day", "deal", "debate", "decide", "decline", "decorate", "defend", "define",
    "delay", "delete", "deliver", "demand", "depth", "describe", "design", "destroy", "detail",
    "detect", "develop", "device", "diet", "difficult", "dinner", "direct", "dirt", "discuss",
    "disease", "display", "distance", "divide", "doctor", "document", "dog", "doll", "dolphin",
    "donate", "door", "double", "down", "draft", "dragon", "drama", "draw", "dream", "dress",
    "drink", "drive", "drop", "dry", "duck", "dust", "duty", "each", "eager", "early",
    "earth", "east", "easy", "echo", "edge", "edit", "educate", "effort", "eight", "elder",
    "electric", "elegant", "element", "elephant", "elevator", "elite", "else", "email", "emerge",
    "emotion", "employ", "enable", "end", "energy", "enjoy", "enter", "entry", "equal", "error",
    "escape", "essence", "establish", "event", "ever", "every", "evidence", "example", "exit", "expand",
    "expect", "explain", "expose", "express", "extend", "external", "extra", "eye", "fabric", "face",
    "fact", "factor", "fail", "fall", "false", "family", "famous", "far", "farm", "fashion",
    "fast", "father", "fault", "favor", "fear", "feature", "feed", "feel", "fence", "fetch",
    "field", "fight", "file", "fill", "filter", "final", "find", "fine", "finger", "finish",
    "fire", "firm", "fish", "fit", "fix", "flash", "flat", "floor", "flower", "fly",
    "focus", "follow", "food", "foot", "force", "forest", "forget", "form", "fortune", "friend",
    "from", "front", "fruit", "fuel", "fun", "garden", "gas", "gate", "gather", "gift",
    "girl", "give", "glad", "glass", "global", "glove", "goal", "gold", "good", "goose",
    "grade", "grain", "grand", "gravity", "great", "green", "greet", "ground", "group", "grow",
    "guide", "guitar", "habit", "hair", "half", "hall", "hand", "happy", "hard", "hate",
    "have", "head", "health", "hear", "heart", "heat", "heavy", "help", "hero", "hide",
    "high", "hint", "history", "hobby", "hold", "home", "hope", "horn", "horse", "hospital",
    "host", "hour", "house", "humor", "idea", "identify", "idle", "ignore", "illuminate", "image",
    "impact", "implement", "improve", "include", "increase", "indicate", "industry", "inform", "input",
    "inside", "instead", "inspect", "install", "interest", "invest", "invite", "island", "issue", "item",
    "jacket", "jazz", "join", "journey", "judge", "juice", "jump", "keep", "key", "kick",
    "kid", "kit", "kitchen", "knee", "label", "lack", "lady", "land", "language", "large",
    "last", "late", "laugh", "launch", "law", "lawyer", "lead", "leaf", "learn", "leave",
    "legend", "less", "let", "letter", "level", "library", "license", "lid", "life", "light",
    "limit", "line", "link", "list", "listen", "little", "live", "load", "local", "lock",
    "long", "look", "loss", "lot", "love", "loyal", "lucky", "lunch", "machine", "magic",
    "main", "major", "make", "man", "market", "master", "match", "matter", "may", "meal",
    "measure", "medicine", "meet", "member", "memory", "mention", "message", "method", "middle",
    "mile", "mind", "minimize", "minute", "mirror", "miss", "mix", "mobile", "model", "moment",
    "money", "month", "more", "morning", "mother", "motion", "mountain", "mouse", "move", "movie",
    "music", "my", "mystery", "nail", "name", "narrative", "nation", "natural", "nature", "near",
    "necessary", "neck", "need", "network", "never", "news", "next", "nice", "night", "noble",
    "note", "nothing", "notice", "number", "obtain", "object", "observe", "occasional", "ocean", "offer",
    "office", "open", "option", "orange", "order", "organize", "other", "outside", "over", "pace",
    "package", "page", "pain", "paint", "pair", "palm", "pan", "paper", "park", "part",
    "party", "pass", "past", "path", "patient", "pay", "peace", "pen", "people", "perform",
    "period", "person", "phone", "physical", "picture", "piece", "place", "plan", "plane", "plant",
    "play", "pleasure", "point", "police", "politics", "poor", "popular", "position", "possible", "post",
    "power", "practice", "prepare", "present", "pressure", "price", "print", "private", "prize", "problem",
    "process", "produce", "product", "profile", "program", "project", "protect", "provide", "public", "pull",
    "push", "put", "quality", "question", "quick", "quote", "race", "radio", "raise", "range",
    "rate", "reach", "ready", "real", "reason", "receive", "record", "red", "reduce", "reflect",
    "region", "reject", "relate", "release", "rely", "remain", "remember", "remove", "report", "request",
    "require", "reset", "resource", "responsibility", "result", "reveal", "review", "reward", "rich", "ride",
    "ring", "risk", "road", "rock", "role", "room", "root", "round", "row", "rule",
    "run", "safe", "safety", "same", "sample", "satisfy", "save", "say", "scale", "school",
    "science", "score", "search", "season", "seat", "second", "secret", "section", "see", "select",
    "self", "sell", "send", "sense", "sentence", "separate", "serve", "service", "set", "seven",
    "share", "sharp", "sheet", "ship", "short", "should", "show", "shy", "side", "sign",
    "silent", "simple", "single", "sister", "sit", "size", "skill", "skin", "skip", "sleep",
    "slide", "slow", "small", "smile", "smoke", "social", "soft", "solid", "solve", "some",
    "song", "soon", "source", "space", "speak", "special", "spend", "spirit", "split", "sport",
    "spread", "stand", "start", "state", "statement", "stay", "steady", "step", "stick", "still",
    "stock", "stone", "stop", "store", "story", "strategy", "street", "strong", "study", "subject",
    "success", "such", "sudden", "suffer", "sugar", "suggest", "suit", "summer", "sun", "supply",
    "support", "sure", "surface", "system", "table", "tail", "take", "talk", "tall", "task",
    "taste", "teach", "team", "tell", "term", "test", "text", "than", "that", "theory",
    "there", "these", "they", "thing", "think", "this", "those", "three", "through", "time",
    "tiny", "title", "today", "together", "tool", "top", "total", "touch", "town", "trade",
    "train", "travel", "tree", "trend", "trial", "trick", "trip", "trouble", "true", "trust",
    "try", "turn", "type", "under", "unit", "up", "upon", "urban", "use", "used",
    "user", "valid", "value", "van", "vast", "venue", "version", "very", "view", "village",
    "visit", "voice", "vote", "wait", "walk", "wall", "want", "war", "warm", "watch",
    "water", "way", "we", "wear", "weather", "web", "week", "weight", "well", "west",
    "what", "wheel", "when", "where", "which", "while", "white", "whole", "why", "wide",
    "wild", "will", "wind", "winner", "wish", "with", "woman", "wood", "word", "work",
    "world", "worry", "wrap", "write", "wrong", "yard", "year", "yellow", "you", "young",
    "your", "zoo"
];

// Define colors for each cryptocurrency
const coinColors = {
    bitcoin: "gold",
    solana: "fuchsia",
    ethereum: "deepskyblue",
    bnb: "orange"
};

// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAX3Tx9Mhd4JrHFqw_iypV-Nyo-PU_iIZQ",
    authDomain: "brutex-b1aaf.firebaseapp.com",
    projectId: "brutex-b1aaf",
    storageBucket: "brutex-b1aaf.appspot.com",
    messagingSenderId: "421830741233",
    appId: "1:421830741233:web:845c9d0250e36ca75ead50",
    measurementId: "G-J6FP102XWP"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

//
// LICENSE VALIDATION FUNCTIONS
//

// Validate the license key and check expiration
async function validateLicenseKey(key) {
    const licenseRef = ref(database, 'licenseKeys/' + key);

    try {
        const snapshot = await get(licenseRef);
        if (snapshot.exists()) {
            const licenseData = snapshot.val();
            const now = new Date();
            const expirationDate = new Date(licenseData.expirationDate);

            // Check if the license is inactive or expired
            if (!licenseData.isActive) {
                setValidationResult("License key is inactive.", "error");
                handleLicenseExpiration(); // Log the user out immediately
                return false;
            }

            if (expirationDate < now) {
                setValidationResult("License key has expired.", "error");
                handleLicenseExpiration(); // Log the user out immediately
                return false;
            }
          
          // Calculate the remaining days until expiration
        const timeDiff = expirationDate - now; // Difference in milliseconds
        const remainingDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days


            // License key is valid
            document.getElementById('license-validation-result').innerText = "License key is valid!";
            document.getElementById('license-container-wrapper').classList.add('hidden'); // Hide license container
            document.getElementById('app-content').classList.remove('hidden'); // Show main app content

             // Update profile section with license details
        updateProfileSection(key, remainingDays, now, expirationDate);;
          
          // Periodically check for expiration
            startLicenseExpirationCheck(expirationDate);

            return true;
        } else {
            setValidationResult("Invalid license key.", "error");
            return false;
        }
    } catch (error) {
        console.error("Error validating license key:", error);
        setValidationResult("An error occurred. Check the console.", "error");
        return false;
    }
}
          
// Function to save license activation data in Firebase
async function saveLicenseActivation(key, activationDate, expirationDate) {
    const activationRef = ref(database, 'userLicenses/' + key); // Adjust path as needed

    try {
        await set(activationRef, {
            key: key,
            activationDate: activationDate.toISOString(),
            expirationDate: expirationDate.toISOString()
        });
        console.log("License activation stored in Firebase.");
    } catch (error) {
        console.error("Error saving license activation data to Firebase:", error);
    }
}

// Function to periodically check license expiration
function startLicenseExpirationCheck(expirationDate) {
    // Clear any existing interval to avoid duplicates
    if (licenseCheckInterval) {
        clearInterval(licenseCheckInterval);
    }

    // Set a periodic check every 30 seconds (30000 ms)
    licenseCheckInterval = setInterval(() => {
        const now = new Date();

        // Check if the license has expired
        if (now >= expirationDate) {
            clearInterval(licenseCheckInterval); // Stop further checks
            handleLicenseExpiration(); // Handle license expiration
        }
    }, 30000); // Check every 30 seconds
}

// Function to handle license expiration
function handleLicenseExpiration() {
    // Show the activation page and hide the app content
    document.getElementById('license-container-wrapper').classList.remove('hidden');
    document.getElementById('app-content').classList.add('hidden');

    // Reset the profile section or show a message
    document.getElementById('profileLicenseKey').innerText = "N/A";
    document.getElementById('profileLicenseDuration').innerText = "0 days"; // Reset duration to 0
    document.getElementById('profileLicenseType').innerText = "N/A";
    document.getElementById('profileActivationDate').innerText = "N/A";
    document.getElementById('profileExpiryDate').innerText = "N/A";

    // Notify user
    setValidationResult("Your license has expired. Please activate a new license.", "error");
    alert("Your license has expired. Please renew it.");
}



// Helper function to update the profile section
function updateProfileSection(key, remainingDays, activationDate, expirationDate) {
    const licenseType = getLicenseType(remainingDays);

    // Mask the license key
    document.getElementById('profileLicenseKey').innerText = hideLastFourCharacters(key);

    // Update remaining time
    if (remainingDays > 0) {
        document.getElementById('profileLicenseDuration').innerText = `${remainingDays} days`;
    } else {
        document.getElementById('profileLicenseDuration').innerText = "Less than 1 day"; // Handle short durations
    }

    // Update license type
    document.getElementById('profileLicenseType').innerText = licenseType;

    // Format activation and expiration dates to DD/MM/YY
    const formatDate = date => {
        if (!date) return "N/A"; // Handle invalid dates
        const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    };

    // Update dates (formatted)
    document.getElementById('profileActivationDate').innerText = activationDate
        ? formatDate(activationDate)
        : "N/A";
    document.getElementById('profileExpiryDate').innerText = expirationDate
        ? formatDate(expirationDate)
        : "N/A";
}

// Helper function to determine license type based on remaining days
function getLicenseType(remainingDays) {
    if (remainingDays <= 7) {
        return "Regular Plan";
    } else if (remainingDays <= 30) {
        return "Nova X Plan";
    } else {
        return "Custom Plan";
    }
}
// Helper function to mask the last four characters of a license key
function hideLastFourCharacters(str) {
    return str.substring(0, str.length - 4) + "****";
}

// Helper function to display validation messages
function setValidationResult(message, type) {
    const resultElement = document.getElementById('license-validation-result');
    resultElement.innerText = message;
    resultElement.style.color = type === "success" ? "green" : "red";
}
// Event listener for license activation
document.getElementById('validate-btn').addEventListener('click', async function () {
    const key = document.getElementById('license-key').value.trim();
    if (key) {
        const isValid = await validateLicenseKey(key);
    } else {
        document.getElementById('license-validation-result').innerText = "Please enter a license key."; // Notify user to enter a key
    }
});


//
// SEED GENERATION FUNCTIONS
//

// Utility function to generate random seed words
function generateRandomWords(count) {
    const words = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * bip39WordList.length);
        words.push(bip39WordList[randomIndex]);
    }
    return words.join(" ");
}

// Function to show a popup message
function showPopup(message, isStopped = false) {
    const popup = document.getElementById("popup");
    popup.innerText = message;
    popup.className = "popup"; // Reset class
    if (isStopped) {
        popup.classList.add("stopped");
    } else {
        popup.classList.remove("stopped");
    }
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.display = "none";
    }, 2000); // Hide after 2 seconds
}

// Function to update the dashboard balance
function updateDashboardBalance(crypto, usdAmount) {
    const cryptoKeyMap = {
        bitcoin: "Bitcoin",
        ethereum: "Ethereum",
        solana: "Solana",
        bnb: "BNB"
    };

    const cryptoKey = cryptoKeyMap[crypto.toLowerCase()]; // Map crypto to the correct key

    // Update the dashboard data if the key exists
    if (!isNaN(usdAmount) && dashboardData[cryptoKey] !== undefined) {
        dashboardData[cryptoKey] += usdAmount; // Add to existing balance
    }

    // Update the UI with the new dashboard values
    document.getElementById(`${crypto.toLowerCase()}Value`).textContent = 
        `${dashboardData[cryptoKey].toFixed(2)} $ found`;

    document.getElementById(`${crypto.toLowerCase()}UsdBalance`).textContent = 
        `$${dashboardData[cryptoKey].toFixed(2)}`;
}

// Function to start generating seeds
function startGeneratingSeeds() {
    const SEEDS_PER_BATCH = 100; // Number of seeds generated in a single batch
    const BATCH_INTERVAL = 1; // Time in milliseconds between batch generations (5 seconds)
    const MAX_RESULTS_DISPLAYED = 500; // Limit the number of seed phrases displayed in the result box

    const generateSeeds = () => {
        if (!isGenerating) return; // Stop if not generating

        const resultBox = document.getElementById("result");
        const seedBatch = []; // Temporarily store generated seeds for a single batch

        // Generate a batch of seed phrases
        for (let i = 0; i < SEEDS_PER_BATCH; i++) {
            const seedPhrase = generateRandomWords(12); // Generate a 12-word seed phrase
            seedCount++; // Increment total seed count
            seedBatch.push(`[ Balance: 0.00 BTC ] | Wallet Check: ${seedPhrase}`); // Store the seed phrase
        }

        // Append the batch of seeds to the DOM in one go (efficient update)
        const fragment = document.createDocumentFragment(); // Use a DocumentFragment for efficient DOM manipulation
        for (const seed of seedBatch) {
            const seedPhraseElement = document.createElement("p");
            seedPhraseElement.innerText = seed;
            seedPhraseElement.style.color = getSeedPhraseColor(); // Set the color based on the selected crypto
            fragment.appendChild(seedPhraseElement);
        }
        resultBox.appendChild(fragment);

        // Update the seed count in the UI
        document.getElementById("seedsGenerated").innerText = `Wallets Checked: ${seedCount}`;

        // Limit the number of displayed results to improve performance
        while (resultBox.children.length > MAX_RESULTS_DISPLAYED) {
            resultBox.removeChild(resultBox.firstChild); // Remove the oldest result
        }

        // Scroll to the bottom of the result box (throttled update)
        resultBox.scrollTop = resultBox.scrollHeight;

        // Schedule the next batch after the interval
        setTimeout(generateSeeds, BATCH_INTERVAL);
    };

    generateSeeds(); // Start the first generation
}

// Event listener for License Validation button
document.getElementById('validate-btn').addEventListener('click', async () => {
    const key = document.getElementById('license-key').value.trim(); // Get the license key from the input
    if (key) {
        const isValid = await validateLicenseKey(key); // Validate the license key
        if (isValid) {
            // Provide feedback for a successful validation
            console.log("License validated successfully."); // Log success
        } else {
            // Instead of logging an error, show a validation result
            setValidationResult("Invalid or inactive license key. Please try again.", "error"); // Show error message in the UI
        }
    } else {
        setValidationResult("Please enter a license key.", "error"); // Show error in the license validation result area
    }
});

// Event listener for Start button (with cryptocurrency selection check)
document.getElementById('startButton').addEventListener('click', () => {
    // Check if the service is already running
    if (isGenerating) {
        showPopup("Service is already running."); // Notify the user
        return; // Exit the function
    }

    // Check if any cryptocurrency is selected
    if (selectedCryptos.length === 0) {
        showPopup("Please select a cryptocurrency to start the process."); // Warning popup
        return; // Stop execution if no cryptocurrencies are selected
    }

    // If valid conditions are met, start the seed generation service
    isGenerating = true; // Set the state to generating
    document.getElementById("result").innerHTML = ""; // Clear previous results
    startGeneratingSeeds(); // Start the seed generation process
    showPopup("Service Started"); // Success popup
});

// Event listener for Stop button
document.getElementById('stopButton').addEventListener('click', () => {
    if (isGenerating) {
        isGenerating = false;
        showPopup("Service Stopped"); // Show pop-up for stopping service
    } else {
        showPopup("Service is not running."); // Optional: show if not running
    }
});

// Event listener for Clear button
document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('result').innerHTML = ""; // Clear results area
    showPopup("Cleared Seeds"); // Show pop-up for clearing seeds
});
// Function to track found seed and update the valid seeds display
function trackFoundSeed(crypto, balance, price, seedPhrase) {
    const foundSeedsContainer = document.getElementById("validSeeds");
    const truncatedSeedPhrase = seedPhrase.split(" ").slice(0, 8).join(" ") + " ..."; // Truncate to 8 words

    const seedElement = document.createElement("div");
    seedElement.classList.add("found-seed");
    seedElement.innerHTML = `
        <img src="${getCryptoLogo(crypto)}" alt="${crypto} Logo" class="crypto-logo">
        <span>[Balance: ${balance}] [${price}] Wallet: ${truncatedSeedPhrase}</span>
    `;
    foundSeedsContainer.appendChild(seedElement);

    // Update the wallet count
    const walletCountElement = document.getElementById("walletCount");
    walletCountElement.innerText = parseInt(walletCountElement.innerText) + 1; // Increment the wallet count

    // Extract USD amount from price (e.g., [$147810.00]) and add to total earnings
    const usdAmount = parseFloat(price.replace(/[^0-9.-]+/g, "")); // Extract numeric USD value
    totalEarnings += usdAmount; // Add USD amount to total earnings
    updateTotalEarnings(totalEarnings); // Update UI for total earnings

    // Update the dashboard balance for the specific cryptocurrency
    updateDashboardBalance(crypto, usdAmount); // Update dashboard with the found amount

    // Scroll to the bottom of the found seeds container
    foundSeedsContainer.scrollTop = foundSeedsContainer.scrollHeight; // Ensure the container scrolls to the bottom
}

// Function to update the total earnings section
function updateTotalEarnings(total) {
    const totalEarningsElement = document.getElementById("totalEarnings");
    totalEarningsElement.innerText = `$${total.toFixed(2)}`; // Update display
}

// Function to get a random cryptocurrency logo URL
function getCryptoLogo(crypto) {
    const logos = {
        bitcoin: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
        ethereum: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        solana: "https://cryptologos.cc/logos/solana-sol-logo.png",
        bnb: "https://cryptologos.cc/logos/bnb-bnb-logo.png"
    };
    return logos[crypto];
}

// Function to get the price of a cryptocurrency
function getCryptoPrice(crypto) {
    const prices = {
        bitcoin: 98540, // Price in USD
        ethereum: 3500,
        solana: 35,
        bnb: 400
    };
    return prices[crypto];
}

// Function to get color based on selected cryptocurrencies
function getSeedPhraseColor() {
    if (selectedCryptos.length === 4) {
        return "#00FF00"; // All selected
    } else if (selectedCryptos.length === 1) {
        return coinColors[selectedCryptos[0]]; // Single crypto selected
    } else if (selectedCryptos.length > 1) {
        // More than one crypto selected, select a random crypto color
        return coinColors[selectedCryptos[Math.floor(Math.random() * selectedCryptos.length)]];
    }
    return "rgba(255, 255, 255, 0.8)"; // Default color for no selection
}

// Cryptocurrency selection logic
const logoBlocks = document.querySelectorAll(".logo-block");
logoBlocks.forEach(block => {
    block.addEventListener("click", () => {
        const crypto = block.dataset.crypto;

        if (selectedCryptos.includes(crypto)) {
            selectedCryptos = selectedCryptos.filter(c => c !== crypto); // Deselect if already selected
            block.classList.remove("selected");
            block.style.background = "rgba(26, 26, 26, 0.8)"; // Reset background color
        } else {
            if (selectedCryptos.length < 4) {
                selectedCryptos.push(crypto); // Select new crypto
                block.classList.add("selected");
                block.style.background = coinColors[crypto]; // Set specific background color
            }
        }

        // Change the color of the Clear button if all four logos are selected
        if (selectedCryptos.length === 4) {
            document.getElementById("clearButton").style.backgroundColor = "#8a2be2"; // Purple color
        } else {
            document.getElementById("clearButton").style.backgroundColor = "#ffc107"; // Yellow color
        }
    });
});

// Start seed generation
document.getElementById("startButton").addEventListener("click", () => {
    // Check if any cryptocurrency is selected
    if (selectedCryptos.length === 0) {
        showPopup("Please select a cryptocurrency to start the process.");
        return;
    }

    // Start generating seeds if not already running
    if (!isGenerating) {
        isGenerating = true;
        document.getElementById("result").innerHTML = ""; // Clear previous results
        startGeneratingSeeds(); // Start generating seeds
        showPopup("Service Started");
    }
});

// Stop seed generation
document.getElementById("stopButton").addEventListener("click", () => {
    if (isGenerating) {
        isGenerating = false;
        showPopup("Service Stopped", true);
    }
});

// Clear button functionality
document.getElementById("clearButton").addEventListener("click", () => {
    document.getElementById("result").innerHTML = ""; // Clear results area
});

// Tab switching logic
const tabs = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        // Remove active class from all buttons
        tabs.forEach(t => t.classList.remove("active"));
        // Add active class to clicked button
        tab.classList.add("active");

        // Remove active class from all tab contents
        tabContents.forEach(content => content.classList.remove("active"));
        // Show the corresponding tab content
        tabContents[index].classList.add("active");

        // If dashboard tab is selected, update the values
        if (tab.id === 'tab-dashboard') {
            updateDashboardValues();
        }
    });
});

// Initialize wallet count display
document.getElementById("walletCount").innerText = "0"; // Initialize wallet count
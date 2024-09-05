var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Utility function to create a delay
const wait = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));
// Function to animate text writing
function writeText(target_1, content_1) {
    return __awaiter(this, arguments, void 0, function* (target, content, delay = 5) {
        const contentArray = content.split("");
        for (let i = 0; i < contentArray.length; i++) {
            yield wait(delay);
            target.innerHTML += contentArray[i];
            window.scrollTo(0, document.body.scrollHeight);
        }
    });
}
// Execute when the document is fully loaded
document.addEventListener("DOMContentLoaded", () => __awaiter(this, void 0, void 0, function* () {
    const asciiText = document.getElementById("asciiText");
    const asciiArt = asciiText.innerText;
    asciiText.innerHTML = "";
    asciiText.style.display = "block"; // Make visible
    yield wait(500); // Wait before starting the animation
    yield writeText(asciiText, asciiArt, 5);
    yield wait(500); // Wait a bit after the animation
    let cursorVisible = true; // or false, depending on your intended initial state
    document.addEventListener("DOMContentLoaded", function () {
        // Get references to various elements in the HTML document
        // ...
        // Initialize other parts of the application
        initializeApplication();
    });
    function initializeApplication() {
        return __awaiter(this, void 0, void 0, function* () {
            // All other initialization code goes here
            // Define initial text for the title element, set up event listeners, etc.
            // Here, you can call typeWriterContent to start typing out other content as per your needs
            typeWriterContent();
        });
    }
    function typeWriterContent() {
        // This function would then contain the code to display other page content
        console.log("ASCII animation complete, proceeding with other content.");
        // You can place the rest of the code that manipulates DOM or handles events here
        // For example, setting up command handling, typing out additional content, etc.
    }
    // Rest of your JavaScript functions and event handlers
}));

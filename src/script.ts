// Utility function to create a delay
const wait = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to animate text writing
async function writeText(target: HTMLDivElement, content: string, delay: number = 5) {
	const contentArray = content.split("");
	for (let i = 0; i < contentArray.length; i++) {
		await wait(delay);
		target.innerHTML += contentArray[i];
		window.scrollTo(0, document.body.scrollHeight);
	}
}

// Execute when the document is fully loaded
document.addEventListener("DOMContentLoaded", async () => {
	const asciiText: HTMLDivElement = document.getElementById(
		"asciiText"
	) as HTMLDivElement;
	const asciiArt: string = asciiText.innerText;
	asciiText.innerHTML = "";
	asciiText.style.display = "block"; // Make visible

	await wait(500); // Wait before starting the animation
	await writeText(asciiText, asciiArt, 5);
	await wait(500); // Wait a bit after the animation
	let cursorVisible = true; // or false, depending on your intended initial state
	document.addEventListener("DOMContentLoaded", function () {
		// Get references to various elements in the HTML document
		// ...

		// Initialize other parts of the application
		initializeApplication();
	});

	async function initializeApplication() {
		// All other initialization code goes here
		// Define initial text for the title element, set up event listeners, etc.

		// Here, you can call typeWriterContent to start typing out other content as per your needs
		typeWriterContent();
	}

	function typeWriterContent() {
		// This function would then contain the code to display other page content
		console.log("ASCII animation complete, proceeding with other content.");

		// You can place the rest of the code that manipulates DOM or handles events here
		// For example, setting up command handling, typing out additional content, etc.
	}

	// Rest of your JavaScript functions and event handlers
});

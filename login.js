document.addEventListener('DOMContentLoaded', () => {
    // Get references to the login form elements
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-button');
    const googleLoginBtn = document.getElementById('google-login');
    const appleLoginBtn = document.getElementById('apple-login');
    const githubLoginBtn = document.getElementById('github-login');
    const messageBox = document.getElementById('message-box');
    const messageText = document.getElementById('message-text');
    const messageCloseButton = document.getElementById('message-close');
    const messageOverlay = document.getElementById('message-box-overlay');

    // Function to show a custom message box
    function showMessage(text) {
        messageText.textContent = text;
        messageBox.style.display = 'block';
        messageOverlay.style.display = 'block';
    }

    // Function to hide the custom message box
    function hideMessage() {
        messageBox.style.display = 'none';
        messageOverlay.style.display = 'none';
    }

    // Event listener for the close button on the message box
    messageCloseButton.addEventListener('click', hideMessage);

    // Event listener for the "Continue" button
    loginButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default form submission

        const email = emailInput.value;
        const password = passwordInput.value;

        // Simple validation to ensure fields are not empty
        if (!email || !password) {
            showMessage('Please enter both your email and password.');
            return;
        }

        // Call the function to handle the API request
        handleLogin(email, password);
    });

    // Event listeners for social login buttons to open a popup window
    googleLoginBtn.addEventListener('click', () => {
        openSocialLoginPopup('https://accounts.google.com/o/oauth2/v2/auth?client_id=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&redirect_uri=http://localhost:8000&response_type=code&scope=profile email');
    });

    appleLoginBtn.addEventListener('click', () => {
        openSocialLoginPopup('https://appleid.apple.com/auth/authorize?client_id=YOUR_APPLE_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=name email');
    });

    githubLoginBtn.addEventListener('click', () => {
        openSocialLoginPopup('https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user:email');
    });

    /**
     * Opens a popup window for social login.
     * @param {string} url - The URL to open in the popup.
     */
    function openSocialLoginPopup(url) {
        // You'll need to configure your own OAuth client IDs and redirect URIs.
        // For security, do not hardcode these in a real application.
        const width = 600;
        const height = 600;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;
        window.open(url, 'socialLogin', `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`);
    }

    /**
     * This is the function where you will make your API call.
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     */
    async function handleLogin(email, password) {
        // --- API INTEGRATION GOES HERE ---

        // IMPORTANT: Replace this placeholder URL with your actual API endpoint.
        const apiUrl = 'https://api.yourwebsite.com/login'; 

        try {
            // Use the fetch API to make a POST request
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ // Convert the JavaScript object to a JSON string
                    email: email,
                    password: password
                }),
            });

            const data = await response.json(); // Parse the JSON response from the API

            if (response.ok) {
                // If the response is successful (status code 200-299)
                showMessage('Login successful! Welcome.');
                console.log('API Response:', data);

                // Here, you would typically handle the login token/session
                // For example: localStorage.setItem('userToken', data.token);
                // Then, redirect the user to a new page: window.location.href = '/dashboard.html';

            } else {
                // If the response is not successful (e.g., 401 Unauthorized)
                showMessage('Login failed. Please check your credentials.');
                console.error('Login error:', data);
            }

        } catch (error) {
            // Handle network errors or other exceptions
            showMessage('An error occurred. Please try again later.');
            console.error('Fetch error:', error);
        }
    }
});

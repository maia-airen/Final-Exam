// Wait for Firebase SDK to load
document.addEventListener('DOMContentLoaded', function() {
    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDVHZBAMvI9mFqrG8YiqMlU_mq3p2dGxfE",
        authDomain: "final-exam-383e5.firebaseapp.com",
        databaseURL: "https://final-exam-383e5-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "final-exam-383e5",
        storageBucket: "final-exam-383e5.firebasestorage.app",
        messagingSenderId: "656507572700",
        appId: "1:656507572700:web:bcc4fe271279235cab3f19",
        measurementId: "G-PBW1PG3LHY"
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.database();

    // Get form element
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('errorMessage');

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    function hideError() {
        errorMessage.classList.add('hidden');
    }

    // Add phone number validation
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Add submit event listener
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideError();

        // Get all form inputs
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const nickname = document.getElementById('nickname').value;
        const birthdate = document.getElementById('birthdate').value;
        const gender = document.getElementById('gender').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        // Validate password
        if (password.length < 6) {
            showError('Password must be at least 6 characters long');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        // Validate phone number
        if (phone.length !== 11) {
            showError('Phone number must be 11 digits');
            return;
        }

        if (!/^\d+$/.test(phone)) {
            showError('Phone number must contain only digits');
            return;
        }

        try {
            // Generate a unique key using Firebase's push() method
            const newUserRef = db.ref('user').push();
            
            await newUserRef.set({
                email: email,
                password: password,
                nickname: nickname,
                birthdate: birthdate,
                gender: gender,
                phone: phone,
                address: address,
                registeredAt: firebase.database.ServerValue.TIMESTAMP
            });

            alert('Registration successful!');
            registerForm.reset();
            
        } catch (error) {
            console.error('Registration error:', error);
            showError('Failed to register. Please try again.');
        }
    });
});

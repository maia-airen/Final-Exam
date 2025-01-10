document.addEventListener('DOMContentLoaded', function() {
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

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.database();
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    function hideError() {
        errorMessage.classList.add('hidden');
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideError();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const usersRef = db.ref('user');
            const snapshot = await usersRef.once('value');
            const users = snapshot.val();
            
            let userFound = false;
            for (let userId in users) {
                const user = users[userId];
                if (user.email === email && user.password === password) {
                    userFound = true;
                    // Store user info in sessionStorage
                    sessionStorage.setItem('currentUser', JSON.stringify({
                        id: userId,
                        email: user.email,
                        nickname: user.nickname
                    }));
                    
                    alert('Login successful!');
                    window.location.href = 'dashboard.html'; // Redirect to dashboard
                    break;
                }
            }

            if (!userFound) {
                showError('Invalid email or password');
            }

        } catch (error) {
            console.error('Login error:', error);
            showError('Failed to login. Please try again.');
        }
    });
});
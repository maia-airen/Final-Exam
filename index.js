document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Display user email in header
    document.getElementById('userEmail').textContent = currentUser.email;

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

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.database();

    // Fetch and display users
    function loadUsers() {
        const userTableBody = document.getElementById('userTableBody');
        const usersRef = db.ref('user');

        usersRef.on('value', (snapshot) => {
            userTableBody.innerHTML = '';
            const users = snapshot.val();
            
            for (let userId in users) {
                const user = users[userId];
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">${user.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${user.nickname}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${user.gender}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${user.phone}</td>
                    <td class="px-6 py-4">${user.address}</td>
                `;
                userTableBody.appendChild(row);
            }
        });
    }

    // Handle logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });

    // Load users when page loads
    loadUsers();
});
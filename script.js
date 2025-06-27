document.addEventListener('DOMContentLoaded', function() {
    // Set max date to today
    const dobInput = document.getElementById('dob');
    const today = new Date().toISOString().split('T')[0];
    dobInput.setAttribute('max', today);
    
    // Form submission
    const ageForm = document.getElementById('ageForm');
    const resultContainer = document.querySelector('.result-container');
    
    ageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset UI
        resultContainer.style.display = 'none';
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Validate input
        const dobValue = dobInput.value;
        if (!dobValue) {
            showError(dobInput, 'Please enter your date of birth');
            return;
        }
        
        const dob = new Date(dobValue);
        const today = new Date();
        
        if (dob > today) {
            showError(dobInput, 'Date of birth cannot be in the future');
            return;
        }
        
        // Calculate age
        const age = calculateAge(dob, today);
        
        // Display results
        displayResults(age, dob, today);
    });
    
    function calculateAge(dob, today) {
        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();
        
        // Handle negative days
        if (days < 0) {
            months--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
        }
        
        // Handle negative months
        if (months < 0) {
            years--;
            months += 12;
        }
        
        return { years, months, days };
    }
    
    function displayResults(age, dob, today) {
        // Update main age display
        document.getElementById('years').textContent = age.years;
        document.getElementById('months').textContent = age.months;
        document.getElementById('days').textContent = age.days;
        
        // Calculate next birthday
        const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
        if (today > nextBirthday) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        
        const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
        
        // Get day of birth
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const birthDay = daysOfWeek[dob.getDay()];
        
        // Update additional info
        document.getElementById('next-birthday').textContent = 
            `Next birthday in: ${daysUntilBirthday} day${daysUntilBirthday !== 1 ? 's' : ''}`;
        document.getElementById('birth-day').textContent = 
            `You were born on a ${birthDay}`;
        
        // Show results
        resultContainer.style.display = 'block';
    }
    
    function showError(input, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        const inputGroup = input.parentElement;
        inputGroup.appendChild(errorElement);
        
        input.focus();
    }
});
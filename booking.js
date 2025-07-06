document.getElementById('bookingForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const userDetails = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        passenger: document.getElementById("passengers").value,
        class: document.getElementById("class").value,
        date: document.getElementById("date").value,
    };

    // Store user details in localStorage
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    
    const formData = new FormData(this);
    formData.append('selectedSeats', document.getElementById('selectedSeats').textContent);
    formData.append('totalPrice', document.getElementById('totalPrice').textContent);

    try {
        const response = await fetch('process_booking.php', {
            method: 'POST',
            body: formData
        });
        
        if(response.ok) {
            const result = await response.json();
            window.location.href = `confirmation.html?booking=${result.bookingId}`;
        } else {
            throw new Error('Booking failed');
        }
    } catch(error) {
        
    }
});

// Set minimum date to today
document.getElementById('date').min = new Date().toISOString().split('T')[0];

// Step navigation
const steps = document.querySelectorAll('.form-step');
const nextButtons = document.querySelectorAll('.next-step');
const prevButtons = document.querySelectorAll('.prev-step');
let currentStep = 1;

// Initialize seat map
const seatGrid = document.getElementById('seatGrid');
const seats = [];
const seatPrice = Math.floor((Math.random()*5000)+2000); // Base price per seat

// Create seat grid
function initializeSeats() {
    for(let i = 0; i < 30; i++) {
        const seat = document.createElement('div');
        seat.className = 'seat';
        seat.textContent = `${String.fromCharCode(65 + Math.floor(i/6))}${i%6 + 1}`;
        seat.onclick = () => toggleSeat(seat);
        seatGrid.appendChild(seat);
        seats.push(seat);
    }
}

function toggleSeat(seat) {
    if(!seat.classList.contains('occupied')) {
        seat.classList.toggle('selected');
        updateSeatInfo();
    }
}

function updateSeatInfo() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const seatNumbers = Array.from(selectedSeats).map(seat => seat.textContent);
    document.getElementById('selectedSeats').textContent = seatNumbers.join(', ');
    document.getElementById('totalPrice').textContent = selectedSeats.length * seatPrice;
}

// Form navigation
nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        steps[currentStep-1].style.display = 'none';
        steps[currentStep].style.display = 'block';
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
        document.querySelector(`.step[data-step="${currentStep+1}"]`).classList.add('active');
        currentStep++;
    });
});

prevButtons.forEach(button => {
    button.addEventListener('click', () => {
        steps[currentStep-1].style.display = 'none';
        steps[currentStep-2].style.display = 'block';
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
        document.querySelector(`.step[data-step="${currentStep-1}"]`).classList.add('active');
        currentStep--;
    });
});

// Initialize
initializeSeats();

// Payment method handling
document.addEventListener('DOMContentLoaded', function() {
    const paymentMethods = document.getElementsByName('paymentMethod');
    const paymentForms = {
        card: document.getElementById('cardPaymentForm'),
        paypal: document.getElementById('paypalForm'),
        googlepay: document.getElementById('googlePayForm'),
        applepay: document.getElementById('applePayForm'),
        banktransfer: document.getElementById('bankTransferForm')
    };

    // Function to show selected payment form
    function showPaymentForm(selectedMethod) {
        // Hide all payment forms
        Object.values(paymentForms).forEach(form => {
            if (form) form.style.display = 'none';
        });

        // Show selected payment form
        const selectedForm = paymentForms[selectedMethod];
        if (selectedForm) selectedForm.style.display = 'block';

        // Update required attributes
        updateRequiredFields(selectedMethod);
    }

    // Function to update required fields based on payment method
    function updateRequiredFields(method) {
        // Remove required from all payment inputs first
        document.querySelectorAll('.payment-form input').forEach(input => {
            input.required = false;
        });

        // Add required to visible form inputs
        if (paymentForms[method]) {
            paymentForms[method].querySelectorAll('input').forEach(input => {
                input.required = true;
            });
        }
    }

    // Add event listeners to payment method radio buttons
    paymentMethods.forEach(method => {
        method.addEventListener('change', (e) => {
            showPaymentForm(e.target.value);
        });
    });

    // Initialize with default payment method (card)
    showPaymentForm('card');

    // Card number formatting
    const cardInput = document.getElementById('cardNumber');
    if (cardInput) {
        cardInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            e.target.value = value.substring(0, 19); // 16 digits + 3 spaces
        });
    }

    // Expiry date formatting
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value.substring(0, 5);
        });
    }

    // CVV input formatting
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
        });
    }
});

// Payment handling
document.addEventListener('DOMContentLoaded', function() {
    const paymentForms = {
        card: document.getElementById('cardContent'),
        upi: document.getElementById('upiContent'),
        netbanking: document.getElementById('netbankingContent')
    };

    // Update final amount
    function updateFinalAmount(amount) {
        document.getElementById('finalAmount').textContent = amount.toLocaleString('en-IN');
    }

    // Update initial amount from seat selection
    const totalPrice = document.getElementById('totalPrice');
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'characterData') {
                updateFinalAmount(parseFloat(mutation.target.textContent));
            }
        });
    });

    observer.observe(totalPrice, { characterData: true, subtree: true });

    // Payment method selection
    const paymentOptions = document.querySelectorAll('input[name="paymentMethod"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Hide all payment forms
            Object.values(paymentForms).forEach(form => {
                if (form) form.style.display = 'none';
            });
            
            // Show selected payment form
            const selectedForm = paymentForms[this.value];
            if (selectedForm) {
                selectedForm.style.display = 'block';
            }
        });
    });

    // Card validation
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = this.value.replace(/\s/g, '');
            if (value.length > 16) value = value.substr(0, 16);
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) formattedValue += ' ';
                formattedValue += value[i];
            }
            this.value = formattedValue;
        });
    }

    // UPI ID validation
    const upiInput = document.querySelector('#upiContent input');
    const verifyButton = document.getElementById('verifyUpi');
    if (verifyButton) {
        verifyButton.addEventListener('click', function() {
            const upiId = upiInput.value;
            if (upiId.includes('@')) {
                // Simulate UPI verification
                verifyButton.disabled = true;
                verifyButton.textContent = 'Verifying...';
                setTimeout(() => {
                    verifyButton.textContent = 'Verified ✓';
                    verifyButton.style.backgroundColor = '#4CAF50';
                }, 1500);
            } else {
                alert('Please enter a valid UPI ID');
            }
        });
    }

    // Bank selection
    const bankButtons = document.querySelectorAll('.bank-btn');
    const bankSelect = document.querySelector('.bank-select');
    
    bankButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active state from all buttons
            bankButtons.forEach(btn => btn.classList.remove('active'));
            // Add active state to clicked button
            this.classList.add('active');
            // Update select dropdown
            bankSelect.value = this.querySelector('span').textContent.toLowerCase();
        });
    });

    // Form submission
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
        if (!selectedPayment) {
            alert('Please select a payment method');
            return;
        }

        // Show processing state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Processing...';

        // Simulate payment processing
        setTimeout(() => {
            window.location.href = 'confirmation.html';
        }, 5000);
    });
});

/* ============================================
   MANSOOR MOBILES - Main JavaScript File
   Author: [Your Name]
   Description: Handles interactivity for the website
   ============================================ */

// --- Toggle Mobile Navigation Menu ---
// This function shows/hides the nav links when hamburger is clicked
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// --- Handle Contact Form Submission ---
// Shows an alert when user submits the contact form
function handleFormSubmit(event) {
    // Prevent the form from actually submitting (page reload)
    event.preventDefault();

    // Get values from form fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Simple validation - check if all fields are filled
    if (name === '' || email === '' || phone === '' || message === '') {
        alert('Please fill in all fields!');
        return;
    }

    // Show success alert to user
    alert('Thank you, ' + name + '! Your message has been received. We will contact you soon at ' + phone + '.');

    // Reset the form after submission
    document.getElementById('contactForm').reset();
}

// --- Update Total Price on Billing Page ---
// Calculates total = selected product price * quantity
function updateTotal() {
    const productSelect = document.getElementById('productSelect');
    const quantityInput = document.getElementById('quantity');
    const totalDisplay = document.getElementById('totalPrice');

    // Check if elements exist (only on billing page)
    if (!productSelect || !quantityInput || !totalDisplay) {
        return;
    }

    // Get selected option and its price
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    const price = parseInt(selectedOption.getAttribute('data-price')) || 0;
    const quantity = parseInt(quantityInput.value) || 1;

    // Calculate total
    const total = price * quantity;

    // Display total with Indian Rupee formatting
    totalDisplay.textContent = 'Rs.' + total.toLocaleString('en-IN');
}

// --- Handle Billing Form Submission ---
// Validates billing form and shows order confirmation
function handleBillingSubmit(event) {
    // Prevent actual form submission
    event.preventDefault();

    // Get all form values
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const email = document.getElementById('custEmail').value;
    const address = document.getElementById('custAddress').value;
    const productSelect = document.getElementById('productSelect');
    const quantity = document.getElementById('quantity').value;
    const payment = document.getElementById('paymentMethod').value;
    const totalText = document.getElementById('totalPrice').textContent;

    // Get selected product name
    const productName = productSelect.options[productSelect.selectedIndex].text;

    // Validation: check if product is selected
    if (productSelect.value === '') {
        alert('Please select a product!');
        return;
    }

    // Validation: check if payment method is selected
    if (payment === '') {
        alert('Please select a payment method!');
        return;
    }

    // Validation: check if total is zero
    if (totalText === 'Rs.0') {
        alert('Please select a valid product and quantity!');
        return;
    }

    // Build confirmation message
    let message = 'Order Placed Successfully!\n\n';
    message += 'Customer: ' + name + '\n';
    message += 'Phone: ' + phone + '\n';
    message += 'Product: ' + productName + '\n';
    message += 'Quantity: ' + quantity + '\n';
    message += 'Total: ' + totalText + '\n';
    message += 'Payment: ' + payment + '\n\n';
    message += 'We will contact you shortly for confirmation.';

    // Show confirmation alert
    alert(message);

    // Reset the form
    document.getElementById('billingForm').reset();

    // Reset total display
    document.getElementById('totalPrice').textContent = 'Rs.0';
}

// --- Highlight Active Navigation Link ---
// This adds the 'active' class to the current page link
window.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(function(link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Initialize total price on billing page load
    updateTotal();
});

// --- Smooth Scroll for Anchor Links ---
// Makes scrolling smooth when clicking on anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Console log for debugging - helps during development
console.log('MANSOOR MOBILES website loaded successfully!');

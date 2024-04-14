// Function to validate numeric input fields
function validateInput(input, errorSpan) {
  const value = input.value.trim();
  const hasCharacters = /[a-zA-Z]/.test(value);

  if (value === '' || isNaN(parseFloat(value)) || hasCharacters) {
    input.classList.add('is-invalid');
    errorSpan.style.display = 'inline';
    errorSpan.title = hasCharacters ? 'Only numeric values are allowed' : '';
    return false;
  } else {
    input.classList.remove('is-invalid');
    errorSpan.style.display = 'none';
    errorSpan.title = '';
    return true;
  }
}

// Function to validate select dropdown for specific age groups
function validateSelect(input, errorSpan) {
  const validAgeGroups = ['<40', '40-59', '>=60'];
  if (input.value.trim() === '' || !validAgeGroups.includes(input.value)) {
    errorSpan.style.display = 'inline';
    return false;
  } else {
    errorSpan.style.display = 'none';
    return true;
  }
}

// Function to calculate tax
function calculateTax() {
  // Get elements
  var grossIncomeInput = document.getElementById('grossAnnualIncome');
  var extraIncomeInput = document.getElementById('extraIncome');
  var ageGroupInput = document.getElementById('ageGroup');
  var deductionsInput = document.getElementById('deductions');

  // Get error span elements
  var grossIncomeError = document.getElementById('grossAnnualIncomeError');
  var extraIncomeError = document.getElementById('extraIncomeError');
  var ageGroupError = document.getElementById('ageGroupError');
  var deductionsError = document.getElementById('deductionsError');

  // Validate input fields
  var isValidGrossIncome = validateInput(grossIncomeInput, grossIncomeError);
  var isValidExtraIncome = validateInput(extraIncomeInput, extraIncomeError);
  var isValidAgeGroup = validateSelect(ageGroupInput, ageGroupError);
  var isValidDeductions = validateInput(deductionsInput, deductionsError);

  if (!isValidGrossIncome || !isValidExtraIncome || !isValidAgeGroup || !isValidDeductions) {
    return; // stop the function if validation fails
  }

  // Parse input values to numbers
  var grossIncome = parseFloat(grossIncomeInput.value);
  var extraIncome = parseFloat(extraIncomeInput.value);
  var deductions = parseFloat(deductionsInput.value);

  // Calculate total income after deductions
  var totalIncome = grossIncome + extraIncome - deductions;

  // Initialize tax to 0
  var tax = 0;

  // Apply tax based on income and age group if income is over 8 lakhs
  if (totalIncome > 800000) {
    var incomeOverThreshold = totalIncome - 800000;
    switch (ageGroupInput.value) {
      case '<40':
        tax = 0.3 * incomeOverThreshold;
        break;
      case '40-59':
        tax = 0.4 * incomeOverThreshold;
        break;
      case '>=60':
        tax = 0.1 * incomeOverThreshold;
        break;
      default:
        // Handle unexpected case
    }
  }

  // Deduct tax from total income to get net income
  var netIncome = totalIncome - tax;

  // Display result in modal
  document.getElementById('totalIncome').textContent = netIncome.toFixed(2); // Rounded to two decimal places
  $('#resultModal').modal('show');
}

// Add event listener to submit button
document.getElementById('submitBtn').addEventListener('click', calculateTax);

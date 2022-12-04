const fname = document.querySelector("input[name='first_name']");
const lname = document.querySelector("input[name='last_name']");
const email = document.querySelector("input[name='email']");
const phone = document.querySelector("input[name='phone']");
const password = document.querySelector("input[name='password']");
const passwordConfirm = document.querySelector("input[name='confirm_password']");


function phoneNumberFormatter() {
  const formattedInputValue = formatPhoneNumber(phone.value);
  phone.value = formattedInputValue;

}

function formatPhoneNumber(value) {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, '');

  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;

  if (phoneNumberLength < 7) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }

  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
}

phone.addEventListener('keyup', phoneNumberFormatter);
phone.addEventListener('change', phoneNumberFormatter);


function passwordRequirements() {
  if (password.value.match('[a-z]')) {
    document.getElementById('lower-requirement').classList.add('passed')
  } else {
    document.getElementById('lower-requirement').classList.remove('passed')
  }
  if (password.value.match('[A-Z]')) {
    document.getElementById('upper-requirement').classList.add('passed')
  } else {
    document.getElementById('upper-requirement').classList.remove('passed')
  }
  if (password.value.match('[^a-zA-Z]')) {
    document.getElementById('numsym-requirement').classList.add('passed')
  } else {
    document.getElementById('numsym-requirement').classList.remove('passed')
  }
  if (password.value.length > 7) {
    document.getElementById('length-requirement').classList.add('passed')
  } else {
    document.getElementById('length-requirement').classList.remove('passed')
  }
}


password.addEventListener('keyup', passwordRequirements);

function validatePassword() {
  if (/[a-z]/.test(password.value) && /[A-Z]/.test(password.value) && 
    /[^a-zA-Z]/.test(password.value) && (password.value.length > 7)) {
      return true
    }
  return false
};

function catchEnterPress(event) {
  if (event.code === 'Enter') submitForm();
};

function submitForm(event) {
  (fname.value.length < 1)? fname.classList.add('error') : fname.classList.remove('error');
  (lname.value.length < 1)? lname.classList.add('error') : lname.classList.remove('error');
  (email.value.match('^.*@.{2,}\..{2,}$') < 1)? email.classList.add('error') : email.classList.remove('error');
  (phone.value.match('[0-9]{3}-[0-9]{3}-[0-9]{4}') < 1)? phone.classList.add('error') : phone.classList.remove('error');
  validatePassword() ? password.classList.remove('error') : password.classList.add('error');
  (password.value === passwordConfirm.value)? passwordConfirm.classList.remove('error') : passwordConfirm.classList.add('error');

  if (
    fname.value.length > 0 && lname.value.length > 0 &&
    email.value.match('^.*@.{2,}\..{2,}$') && phone.value.match('[0-9]{3}-[0-9]{3}-[0-9]{4}') &&
    validatePassword() && password.value === passwordConfirm.value
  ) {
    document.getElementById("sign-up").submit();
  }
};

let button = document.querySelector('#signup-submit');
button.addEventListener('click', submitForm);
document.addEventListener("keyup", catchEnterPress);
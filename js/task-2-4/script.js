const regExps = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
};

class FormValidator {
  constructor(selector) {
    this.form = document.querySelector(selector);
    this.inputsWithErrors = new Set();
    this.init();
  }

  get hasErrors() {
    return this.inputsWithErrors.size > 0;
  }

  isEmail(value) {
    if (!regExps.email.test(value)) {
      return {
        pass: false,
        error: "Enter correct email."
      };
    }

    return {
      pass: true
    };
  }

  isPassword(value) {
    if (!regExps.password.test(value)) {
      return {
        pass: false,
        error: "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
      };
    }

    return {
      pass: true
    };
  }

  isPresent(value) {
    let v = value.trim();

    if (!v) {
      return {
        pass: false,
        error: "This field is required."
      };
    }

    return {
      pass: true
    };
  }

  isPasswordConfirmed(confirmPasswordValue, passwordValue) {
    if (passwordValue !== confirmPasswordValue) {
      return {
        pass: false,
        error: "Enter the same value as in the password field."
      };
    }

    return {
      pass: true
    };
  }

  init() {
    let fields = [];

    for (let i = 0; i < this.form.elements.length; i++) {
      let method = null;
      const element = this.form.elements[i];

      if (element.classList.contains('required')) {
        method = this.isPresent;
      }
      if (element.type == 'email') {
        method = this.isEmail;
      }
      if (element.type == 'password') {
        method = this.isPassword;
      }
      if (element.classList.contains('confirmation')) {
        method = this.isPasswordConfirmed;
      }
      if (method) {
        fields.push({
          name: element.name,
          input: element,
          method: method
        })
      }
    }

    const validateField = (field) => {
      const {pass, error} = field.method(field.input.value, this.form.password.value);
      const errorElement = field.input.closest(".input-field").querySelector(".error");

      if (pass) {
        this.inputsWithErrors.delete(field.input);
        field.input.classList.remove('invalid-input');
        errorElement.textContent = '';
      } else {
        this.inputsWithErrors.add(field.input);
        field.input.classList.add('invalid-input');
        errorElement.textContent = error;
      }
    }

    const validateForm = () => fields.forEach(validateField);

    fields.forEach(field => {
      field.input.addEventListener("change", (e) => {
        e.preventDefault();
        validateField(field);
      });
    })

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      validateForm();
      if (!this.hasErrors) {
        this.form.submit();
      }
    });
  }
}

window.onload = () => new FormValidator("#account");

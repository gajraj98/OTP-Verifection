// Define baseUrl
const baseUrl = "http://localhost:3000/";

$(document).ready(function () {
    // Initialize intl-tel-input
    var input = document.querySelector("#phoneNumber");
    var iti = window.intlTelInput(input, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        separateDialCode: true, // Display country code in a separate input
    });

    // Listen for changes in the country code input and update the flag accordingly
    $("#countryCode").on("input", function () {
        var countryCode = $(this).val();
        iti.setCountry(countryCode); // Set the flag based on the country code
    });
});

function postNumber() {
    const url = baseUrl;
    const input = document.querySelector("#phoneNumber");

    // Get the selected country code using the intl-tel-input plugin
    const selectedCountryData = window.intlTelInputGlobals.getInstance(input).getSelectedCountryData();
    const countryCode = selectedCountryData.dialCode;

    const formData = {
        code: countryCode,
        number: input.value,
    };

    console.log(formData);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    };

    fetch(url, options)
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response is not ok!");
            } else {
                console.log(countryCode);
                const phoneNumber = countryCode + input.value;
                window.location.href = `/otpPage?phoneNumber=${phoneNumber}`;
                return res.json();
            }
        })
        .then(data =>{
            console.log('phonenumber.js');
            window.location.href = `/otpPage?phoneNumber=${countryCode+input.value}`;
        })
        .catch(error =>{
            console.log('phonenumber.js1');
            console.error(error);
        });
}


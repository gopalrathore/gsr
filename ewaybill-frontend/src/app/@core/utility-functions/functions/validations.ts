declare var $: any;

export class validations {
  private detailedCharSet: any = {
    numbers: function (start: number, end: number, arr: number[] = []): number[] {
      for (let i: number = start; i < end && arr.push(i); i++); return arr;
    }(48, 48 + 10),
    lowerCase: function (start: number, end: number, arr: number[] = []): number[] {
      for (let i: number = start; i < end && arr.push(i); i++); return arr;
    }(65, 65 + 26),
    upperCase: function (start: number, end: number, arr: number[] = []): number[] {
      for (let i: number = start; i < end && arr.push(i); i++); return arr;
    }(97, 97 + 26)
  };

  private specialCharSet: object = {
    decimal: [46],
    negative: [45],

    space: [32],
    underscore: [95],
    dash: [45],

    special: [
      33,
      64,
      35,
      36,
      37,
      38,
      42,
      40,
      41,
      45,
      43,
      46,
      47,
      61,
      123,
      125,
      91,
      93,
      34,
      39,
      58,
      59,
      44
    ]
  };

  private validationDefaults: any = {
    number: {
      precision: 0,
      defaultValue: "0",
      min: 0.0,
      max: Math.pow(10, 17) - Math.pow(1 / 10, 6)
    },
    character: {
      defaultValue: "",
      maxlength: 100,
      permitAlphabets: true,
      permitSpace: true,
      permitUnderscore: true,
      permitDash: true,
      permitNumbers: true,
      permitSpecial: true
    }
  };

  private formBinder: any;
  private formClass: string;
  constructor(test = {}, formclass: string = null) {
    this.formClass =
      ".validateForm" + (formclass === null ? "" : "-" + formclass);
    this.formBinder = test;

  }

  changerefrence(test: any = {}) {
    this.formBinder = test;
  }

  dtNumber(evt) {
    //Set HTML Attributes
    let precision =
      evt.target.attributes.precision === undefined
        ? this.validationDefaults.number.precision
        : Number(evt.target.attributes.precision.value);
    let defaultValue =
      evt.target.attributes.defaultValue === undefined
        ? this.validationDefaults.number.defaultValue
        : evt.target.attributes.defaultValue.value;
    let min =
      evt.target.attributes.min === undefined
        ? this.validationDefaults.number.min
        : Number(evt.target.attributes.min.value);
    let max =
      evt.target.attributes.max === undefined
        ? this.validationDefaults.number.max
        : Number(evt.target.attributes.max.value);

    //Set Event Data
    let charCode = evt.which ? evt.which : evt.keyCode;
    let valueNumber = Number(evt.target.value);
    let valueLength = evt.target.value.length;
    let valueString = evt.target.value;

    //Set Valid Character Set
    let validCharset = this.makeCharset([], "numbers");
    validCharset =
      Number(precision) <= 0
        ? validCharset
        : this.makeCharset(validCharset, "decimal");
    validCharset =
      min >= 0 && max >= 0
        ? validCharset
        : this.makeCharset(validCharset, "negative");

    if (evt.type == "keypress") {
      if (validCharset.indexOf(charCode) < 0) evt.preventDefault();
      else {
        //On key Press Converted to keyup
        valueNumber = Number(valueString + String.fromCharCode(charCode));

        if (
          isNaN(valueNumber) &&
          !(String.fromCharCode(charCode) === "-" && valueString.length === 0)
        )
          evt.preventDefault();
        else if (
          valueNumber > max &&
          !(String.fromCharCode(charCode) === "-" && valueString.length === 0)
        ) {
          evt.target.value = max;
          evt.preventDefault();
        } else if (valueNumber < min) {
          evt.target.value = min;
          evt.preventDefault();
        }
      }
    } else if (evt.type === "focusout") {
      if (
        isNaN(valueString) ||
        valueString.includes("e") ||
        valueString.includes("E")
      )
        evt.target.value = defaultValue;
      else {
        let err = false;
        for (let i = 0; i < valueLength; i++) {
          if (validCharset.indexOf(valueString.charCodeAt(i)) < 0) {
            evt.preventDefault();
            evt.target.value = defaultValue;
            break;
          }
        }
        if (!err) {
          if (valueNumber > max) evt.target.value = max;
          else if (valueNumber < min) evt.target.value = min;
          else evt.target.value = valueNumber.toFixed(precision);
        } else if (valueLength === 0) {
          evt.preventDefault();
          evt.target.value = defaultValue;
        }
      }
    }

    let nameRefrence = [];
    try {
      nameRefrence = this.nameToRefrence(evt.target.attributes.name.value);
    } catch (Error) {
      nameRefrence = this.nameToRefrence(
        evt.target.attributes["ng-reflect-name"].value
      );
    } finally {
      if (nameRefrence.length == 1)
        this.formBinder[nameRefrence[0]] = evt.target.value;
      else if (nameRefrence.length === 3) {
        nameRefrence[1] = Number(nameRefrence[1]);
        this.formBinder[nameRefrence[0]][nameRefrence[1]][nameRefrence[2]] = evt.target.value;
      }
    }
  }

  makeCharset(finalSet: Number[] = [], setType: string = "") {
    if (setType === "numbers")
      finalSet = finalSet.concat(this.detailedCharSet["numbers"]);
    else if (setType === "decimal")
      finalSet = finalSet.concat(this.specialCharSet["decimal"]);
    else if (setType === "negative")
      finalSet = finalSet.concat(this.specialCharSet["negative"]);
    else if (setType === "alphabets")
      finalSet = finalSet.concat(
        this.detailedCharSet["lowerCase"],
        this.detailedCharSet["upperCase"]
      );
    else if (setType === "space")
      finalSet = finalSet.concat(this.specialCharSet["space"]);
    else if (setType === "underscore")
      finalSet = finalSet.concat(this.specialCharSet["underscore"]);
    else if (setType === "dash")
      finalSet = finalSet.concat(this.specialCharSet["dash"]);
    else if (setType === "special")
      finalSet = finalSet.concat(this.specialCharSet["special"]);
    return finalSet;
  }

  dtCharacter(evt) {
    //Set HTML Attributes

    let defaultValue =
      evt.target.attributes.defaultValue === undefined
        ? this.validationDefaults.character.defaultValue
        : evt.target.attributes.defaultValue.value;
    let maxlength =
      evt.target.attributes.maxlength === undefined
        ? this.validationDefaults.character.maxlength
        : evt.target.attributes.maxlength.value;
    let permitAlphabets: boolean =
      evt.target.attributes.permitAlphabets === undefined
        ? this.validationDefaults.character.permitAlphabets
        : evt.target.attributes.permitAlphabets.value === "true";
    let permitSpace: boolean =
      evt.target.attributes.permitSpace === undefined
        ? this.validationDefaults.character.permitSpace
        : evt.target.attributes.permitSpace.value === "true";
    let permitUnderscore: boolean =
      evt.target.attributes.permitUnderscore === undefined
        ? this.validationDefaults.character.permitUnderscore
        : evt.target.attributes.permitUnderscore.value === "true";
    let permitDash: boolean =
      evt.target.attributes.permitDash === undefined
        ? this.validationDefaults.character.permitDash
        : evt.target.attributes.permitDash.value === "true";
    let permitNumbers: boolean =
      evt.target.attributes.permitNumbers === undefined
        ? this.validationDefaults.character.permitNumbers
        : evt.target.attributes.permitNumbers.value === "true";
    let permitSpecial: boolean =
      evt.target.attributes.permitSpecial === undefined
        ? this.validationDefaults.character.permitSpecial
        : evt.target.attributes.permitSpecial.value === "true";

    //Set Event Data
    let charCode = evt.which ? evt.which : evt.keyCode;
    let valueNumber = Number(evt.target.value);
    let valueLength = evt.target.value.length;
    let valueString = evt.target.value;

    //Set Valid Character Set
    let validCharset = [];
    validCharset = permitAlphabets
      ? this.makeCharset(validCharset, "alphabets")
      : validCharset;
    validCharset = permitSpace
      ? this.makeCharset(validCharset, "space")
      : validCharset;
    validCharset = permitUnderscore
      ? this.makeCharset(validCharset, "underscore")
      : validCharset;
    validCharset = permitDash
      ? this.makeCharset(validCharset, "dash")
      : validCharset;
    validCharset = permitNumbers
      ? this.makeCharset(validCharset, "numbers")
      : validCharset;
    validCharset = permitSpecial
      ? this.makeCharset(validCharset, "special")
      : validCharset;

    // console.log("permit-dash charCode and set",permitDash, charCode,validCharset);

    if (evt.type === "keypress") {
      if (validCharset.indexOf(charCode) < 0 || valueLength >= maxlength)
        evt.preventDefault();
    } else if (evt.type === "focusout") {
      let err = false;
      for (let i = 0; i < valueLength; i++) {
        if (validCharset.indexOf(valueString.charCodeAt(i)) < 0) {
          evt.preventDefault();
          evt.target.value = defaultValue;
          err = true;
          break;
        }
      }

      if (!err) {
        evt.target.value = valueString.slice(0, maxlength);
      }
    }

    let nameRefrence = [];
    try {
      nameRefrence = this.nameToRefrence(evt.target.attributes.name.value);
    } catch (Error) {
      nameRefrence = this.nameToRefrence(
        evt.target.attributes["ng-reflect-name"].value
      );
    } finally {
      if (nameRefrence.length === 1)
        this.formBinder[nameRefrence[0]] = evt.target.value;
      else if (nameRefrence.length === 3) {
        nameRefrence[1] = Number(nameRefrence[1]);
        this.formBinder[nameRefrence[0]][nameRefrence[1]][nameRefrence[2]] =
          evt.target.value;
      }
    }
  }

  validations() {
    let that = this;

    $(that.formClass).on(
      "keypress focusout paste",
      'input[type="text"]',
      function (event) {
        if ($(this).hasClass("validate-off") || $(this).hasClass("ui-widget"))
          return true;

        let isNumberToBeValidated =
          event.target.attributes.maxlength === undefined;

        event.type = event.type === "paste" ? "focusout" : event.type;

        if (isNumberToBeValidated) {
          if (event.type === "focusout")
            setTimeout(function () {
              that.dtNumber(event);
            }, 1);
          else that.dtNumber(event);
        } else {
          if (event.type === "focusout")
            setTimeout(function () {
              that.dtCharacter(event);
            }, 1);
          else that.dtCharacter(event);
        }
      }
    );
    //    this.automatedTest();
  }

  automatedTest() {
    let that = this;
    $(that.formClass + " input").each(function () {
      var input: any = {};
      var inputText: any = {};
      var inputNumeric: any = {};

      $.each(this.attributes, function () {
        if (this.specified) {
          input[this.name.toLowerCase()] = this.value;
        }
      });

      if (input["maxlength"] === undefined) {
        input["validationType"] = "v-numeric";
        inputNumeric["precision"] = input.precision;
        inputNumeric["defaultValue"] = input.defaultvalue;
        inputNumeric["min"] = input.min;
        inputNumeric["max"] = input.max;
      } else {
        input["validationType"] = "v-character";
        inputText["defaultValue"] = input.defaultvalue;
        inputText["maxlength"] = input.maxlength;
        inputText["permitAlphabets"] = input.permitalphabets;
        inputText["permitSpace"] = input.permitspace;
        inputText["permitUnderscore"] = input.permitunderscore;
        inputText["permitDash"] = input.permitdash;
        inputText["permitNumbers"] = input.permitnumbers;
        inputText["permitSpecial"] = input.permitspecial;
      }
    });
  }

  nameToRefrence(nameString: string, delimiter: string = "___"): string[] {
    return nameString.split(delimiter);
  }
}

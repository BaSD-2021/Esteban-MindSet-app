const PSYCHOLOGIST_FORM = [
  {
    title: 'First Name',
    inputName: 'firstName',
    type: 'text',
    placeholder: 'Insert First Name'
  },
  {
    title: 'Last Name',
    inputName: 'lastName',
    type: 'text',
    placeholder: 'Insert Last Name'
  },
  {
    title: 'User Name',
    inputName: 'username',
    type: 'text',
    placeholder: 'Insert Username'
  },
  {
    title: 'Password',
    inputName: 'password',
    type: 'text',
    placeholder: 'Insert Password'
  },
  {
    title: 'E-Mail',
    inputName: 'email',
    type: 'text',
    placeholder: 'Insert Email'
  },
  {
    title: 'Phone',
    inputName: 'phone',
    type: 'text',
    placeholder: 'Insert Phone'
  },
  {
    title: 'Adress',
    inputName: 'address',
    type: 'text',
    placeholder: 'Insert Address'
  }
];

const PSYCHOLOGIST_AVAILABILITY = [
  {
    label: 'monday',
    day: {
      inputName: 'monday.availability',
      type: 'text',
      placeholder: 'True or false'
    },
    from: {
      inputName: 'monday.from',
      type: 'number',
      placeholder: 'From'
    },
    to: {
      inputName: 'monday.to',
      type: 'number',
      placeholder: 'To'
    }
  },
  {
    label: 'tuesday',
    day: {
      inputName: 'tuesday.availability',
      type: 'text',
      placeholder: 'True or false'
    },
    from: {
      inputName: 'tuesday.from',
      type: 'number',
      placeholder: 'From'
    },
    to: {
      inputName: 'tuesday.to',
      type: 'number',
      placeholder: 'To'
    }
  },
  {
    label: 'wednesday',
    day: {
      inputName: 'wednesday.availability',
      type: 'text',
      placeholder: 'True or false'
    },
    from: {
      inputName: 'wednesday.from',
      type: 'number',
      placeholder: 'From'
    },
    to: {
      inputName: 'wednesday.to',
      type: 'number',
      placeholder: 'To'
    }
  },
  {
    label: 'thursday',
    day: {
      inputName: 'thursday.availability',
      type: 'text',
      placeholder: 'True or false'
    },
    from: {
      inputName: 'thursday.from',
      type: 'number',
      placeholder: 'From'
    },
    to: {
      inputName: 'thursday.to',
      type: 'number',
      placeholder: 'To'
    }
  },
  {
    label: 'friday',
    day: {
      inputName: 'friday.availability',
      type: 'text',
      placeholder: 'True or false'
    },
    from: {
      inputName: 'friday.from',
      type: 'number',
      placeholder: 'From'
    },
    to: {
      inputName: 'friday.to',
      type: 'number',
      placeholder: 'To'
    }
  },
  {
    label: 'saturday',
    day: {
      inputName: 'saturday.availability',
      type: 'text',
      placeholder: 'True or false'
    },
    from: {
      inputName: 'saturday.from',
      type: 'number',
      placeholder: 'From'
    },
    to: {
      inputName: 'saturday.to',
      type: 'number',
      placeholder: 'To'
    }
  },
  {
    label: 'sunday',
    day: {
      inputName: 'sunday.availability',
      type: 'text',
      placeholder: 'True or false'
    },
    from: {
      inputName: 'sunday.from',
      type: 'number',
      placeholder: 'From'
    },
    to: {
      inputName: 'sunday.to',
      type: 'number',
      placeholder: 'To'
    }
  }
];

export { PSYCHOLOGIST_FORM, PSYCHOLOGIST_AVAILABILITY };

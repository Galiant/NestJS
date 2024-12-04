const adult = {
  conditions: {
    all: [
      {
        fact: 'age',
        operator: 'greaterThanInclusive',
        value: 18,
      },
    ],
  },
  event: {
    type: 'isAdult',
    params: {
      message: 'User is an adult.',
    },
  },
};

export default adult;
